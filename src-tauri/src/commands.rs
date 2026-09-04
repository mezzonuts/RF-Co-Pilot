// src-tauri/src/commands.rs
//
// Tauri Commands — Bridge between React frontend and Python sidecar.
// Each command spawns a Python subprocess, captures JSON output, and returns to React via `invoke()`.

use std::process::Command;
use std::path::PathBuf;
use serde_json::{json, Value};
use log::{info, error};

/// Resolve path to Python interpreter in the system.
/// On Windows, tries the hermes venv first, falls back to system python.
fn get_python_exe() -> Result<PathBuf, String> {
    // Try hermes-agent venv python (most reliable)
    let hermes_py = PathBuf::from(r"C:\Users\PC\AppData\Local\hermes\hermes-agent\venv\Scripts\python.exe");
    if hermes_py.exists() {
        return Ok(hermes_py);
    }
    
    // Fall back to system python
    let cmd_result = std::process::Command::new("where")
        .arg("python")
        .output();
    
    if let Ok(output) = cmd_result {
        if output.status.success() {
            let path_str = String::from_utf8_lossy(&output.stdout);
            let py_path = PathBuf::from(path_str.trim());
            if py_path.exists() {
                return Ok(py_path);
            }
        }
    }
    
    Err("Python executable not found. Install Python or ensure hermes venv is available.".to_string())
}

/// Run a Python module as a subprocess and return its JSON output.
/// 
/// # Args
/// - `module`: Python module name (e.g., "telecom_agent.parsers")
/// - `args`: List of (flag, value) pairs (e.g., [("--file", "path/to/file"), ("--vendor", "generic")])
/// 
/// # Returns
/// - JSON object from Python module's stdout
fn run_python_module(module: &str, args: &[(&str, &str)]) -> Result<Value, String> {
    let py_exe = get_python_exe()?;
    
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-m");
    cmd.arg(module);
    
    for (key, value) in args {
        cmd.arg(*key);
        cmd.arg(*value);
    }
    
    info!("Running: {:?} -m {} with args: {:?}", py_exe, module, args);
    
    let output = cmd
        .output()
        .map_err(|e| format!("Failed to spawn Python subprocess: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        error!("Python module '{}' failed: {}", module, stderr);
        return Err(format!("Python error: {}", stderr));
    }
    
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout)
        .map_err(|e| format!("Failed to parse JSON from Python: {}. Output: {}", e, stdout))
}

/// Tauri command: Parse a Drive Test CSV file.
/// 
/// # Arguments
/// - `file_path`: Path to DT log CSV file
/// - `vendor`: Optional vendor format ("generic", "tems", "nrt") — defaults to "generic"
/// 
/// # Returns
/// - JSON object with parsed data and metadata
#[tauri::command]
pub async fn parse_dt_file(
    file_path: String,
    vendor: Option<String>,
) -> Result<Value, String> {
    // Basic path validation: check if file exists and prevent directory traversal
    let path = std::path::Path::new(&file_path);
    if !path.exists() {
        return Err(format!("File not found: {}", file_path));
    }
    
    // Check extension
    let ext = path.extension().and_then(|e| e.to_str()).unwrap_or("");
    if ext != "csv" && ext != "txt" {
        return Err("Invalid file type. Only .csv and .txt are supported.".to_string());
    }

    let vendor_str = vendor.unwrap_or_else(|| "generic".to_string());
    info!("parse_dt_file: file_path={}, vendor={}", file_path, vendor_str);
    
    run_python_module(
        "telecom_agent.parsers",
        &[("--file", &file_path), ("--vendor", &vendor_str)],
    )
}

/// Tauri command: Compute KPI metrics from a Drive Test CSV file.
/// 
/// # Arguments
/// - `file_path`: Path to DT log CSV file
/// - `action`: Optional KPI action ("avg_kpi", "percentile", "worst_spots", "throughput") — defaults to "avg_kpi"
/// - `vendor`: Optional vendor format — defaults to "generic"
/// 
/// # Returns
/// - JSON object with KPI results
/// 
/// # Example (from React)
/// ```ts
/// const kpi = await invoke('compute_kpi', { 
///     filePath: 'path/to/dt_log.csv',
///     action: 'avg_kpi',
///     vendor: 'generic'
/// });
/// console.log(kpi.result); // { 'JKT_1023_2': { rsrp_avg: -94.5, ... }, ... }
/// ```
#[tauri::command]
pub async fn compute_kpi(
    file_path: String,
    action: Option<String>,
    vendor: Option<String>,
) -> Result<Value, String> {
    let action_str = action.unwrap_or_else(|| "avg_kpi".to_string());
    let vendor_str = vendor.unwrap_or_else(|| "generic".to_string());
    info!("compute_kpi: file_path={}, action={}, vendor={}", file_path, action_str, vendor_str);
    
    run_python_module(
        "telecom_agent.kpi",
        &[
            ("--file", &file_path),
            ("--action", &action_str),
            ("--vendor", &vendor_str),
        ],
    )
}

/// Tauri command: Health check — ensures Python sidecar and dependencies are available.
/// 
/// # Returns
/// - JSON object with status ("ok", "missing_python", "missing_modules")
/// 
/// # Example (from React)
/// ```ts
/// const health = await invoke('health_check');
/// if (health.status === 'ok') {
///     console.log('Sidecar ready');
/// } else {
///     console.error('Sidecar unavailable:', health.error);
/// }
/// ```
#[tauri::command]
pub async fn health_check() -> Result<Value, String> {
    match get_python_exe() {
        Ok(py_exe) => {
            info!("Health check: Python found at {:?}", py_exe);
            Ok(json!({
                "status": "ok",
                "python_executable": py_exe.to_string_lossy(),
            }))
        }
        Err(e) => {
            error!("Health check failed: {}", e);
            Ok(json!({
                "status": "missing_python",
                "error": e,
            }))
        }
    }
}
