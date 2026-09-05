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

/// Tauri command: Insert a cell into Cell Master database.
/// 
/// # Arguments
/// - `cell_data`: JSON object with site_id, cell_id, lat, lon, and optional band, pci, azimuth, etc.
/// 
/// # Returns
/// - JSON object with status and inserted cell ID
#[tauri::command]
pub async fn db_insert_cell(
    cell_data: Value,
) -> Result<Value, String> {
    let cell_json = serde_json::to_string(&cell_data)
        .map_err(|e| format!("Failed to serialize cell data: {}", e))?;
    
    let py_exe = get_python_exe()?;
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    cmd.arg(format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.database import get_db; db = get_db(); db.insert_cell(json.loads('{}'))",
        cell_json.replace("'", "\\'")
    ));
    
    let output = cmd.output()
        .map_err(|e| format!("Failed to insert cell: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("DB error: {}", stderr));
    }
    
    info!("Cell inserted: {}", cell_data.get("cell_id").unwrap_or(&json!("unknown")));
    Ok(json!({ "status": "ok", "cell_id": cell_data.get("cell_id") }))
}

/// Tauri command: Query cells by band.
/// 
/// # Arguments
/// - `band`: Band name (e.g., "n78", "b3")
/// 
/// # Returns
/// - JSON object with array of cells
#[tauri::command]
pub async fn db_query_cells_by_band(
    band: String,
) -> Result<Value, String> {
    let py_exe = get_python_exe()?;
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    cmd.arg(format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.database import get_db; db = get_db(); cells = db.query_cells_by_band('{}'); print(json.dumps({{'cells': [dict(c) for c in cells]}})); db.close()",
        band
    ));
    
    let output = cmd.output()
        .map_err(|e| format!("Failed to query cells: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("DB error: {}", stderr));
    }
    
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout)
        .map_err(|e| format!("Failed to parse query result: {}", e))
}

/// Tauri command: Batch insert DT logs.
/// 
/// # Arguments
/// - `logs`: Array of JSON objects with timestamp, lat, lon, rsrp, sinr, etc.
/// 
/// # Returns
/// - JSON object with count of inserted logs
#[tauri::command]
pub async fn db_insert_dt_logs(
    logs: Vec<Value>,
) -> Result<Value, String> {
    let logs_json = serde_json::to_string(&logs)
        .map_err(|e| format!("Failed to serialize logs: {}", e))?;
    
    let py_exe = get_python_exe()?;
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    cmd.arg(format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.database import get_db; db = get_db(); count = db.insert_dt_log_batch(json.loads('{}'))",
        logs_json.replace("'", "\\'")
    ));
    
    let output = cmd.output()
        .map_err(|e| format!("Failed to insert DT logs: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("DB error: {}", stderr));
    }
    
    info!("DT logs inserted: {}", logs.len());
    Ok(json!({ "status": "ok", "count": logs.len() }))
}

/// Tauri command: Search similar KPI metrics via Qdrant.
/// 
/// # Arguments
/// - `kpi_sample`: JSON object with avg_rsrp, avg_sinr, avg_throughput_dl, etc.
/// - `limit`: Number of results to return (default 5)
/// 
/// # Returns
/// - JSON array of similar KPI records
#[tauri::command]
pub async fn qdrant_search_similar_kpi(
    kpi_sample: Value,
    limit: Option<usize>,
) -> Result<Value, String> {
    let limit_val = limit.unwrap_or(5);
    let kpi_json = serde_json::to_string(&kpi_sample)
        .map_err(|e| format!("Failed to serialize KPI: {}", e))?;
    
    let py_exe = get_python_exe()?;
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    cmd.arg(format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.qdrant_client import get_qdrant_manager; mgr = get_qdrant_manager(); results = mgr.search_similar_kpi(json.loads('{}'), limit={}); print(json.dumps({{'results': results}})); mgr.close()",
        kpi_json.replace("'", "\\'"), limit_val
    ));
    
    let output = cmd.output()
        .map_err(|e| format!("Failed to search KPI: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Qdrant error: {}", stderr));
    }
    
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout)
        .map_err(|e| format!("Failed to parse search result: {}", e))
}

/// Tauri command: Export KPI report to PDF or Excel.
/// 
/// # Arguments
/// - `output_path`: Path where report will be saved (e.g., "/tmp/report.pdf")
/// - `format`: "pdf" or "excel"
/// - `kpi_summary`: JSON object with KPI metrics for report header
/// 
/// # Returns
/// - JSON object with status and output_path
#[tauri::command]
pub async fn export_report(
    output_path: String,
    format: String,
    kpi_summary: Option<Value>,
) -> Result<Value, String> {
    let kpi_json = kpi_summary
        .map(|v| serde_json::to_string(&v).unwrap_or_default())
        .unwrap_or_default();
    
    let py_exe = get_python_exe()?;
    let cmd_str = if format == "pdf" {
        format!(
            "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.reporting import export_pdf_report; export_pdf_report('{}', kpi_summary=json.loads('{}'))",
            output_path.replace("'", "\\'"), kpi_json.replace("'", "\\'")
        )
    } else {
        format!(
            "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.reporting import export_excel_report; import polars as pl; df = pl.DataFrame(); export_excel_report(df, '{}', kpi_summary=json.loads('{}'))",
            output_path.replace("'", "\\'"), kpi_json.replace("'", "\\'")
        )
    };
    
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    cmd.arg(cmd_str);
    
    let output = cmd.output()
        .map_err(|e| format!("Failed to export report: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Export error: {}", stderr));
    }
    
    info!("Report exported to {}", output_path);
    Ok(json!({ "status": "ok", "path": output_path, "format": format }))
}

/// Tauri command: Export parsed DT data to QGIS project.
/// 
/// # Arguments
/// - `csv_path`: Path where CSV will be saved
/// - `qgs_path`: Path where .qgs project will be saved
/// 
/// # Returns
/// - JSON object with status and paths
#[tauri::command]
pub async fn export_qgis_project(
    csv_path: String,
    qgs_path: String,
) -> Result<Value, String> {
    let py_exe = get_python_exe()?;
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    cmd.arg(format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.qgis_export import export_to_qgis_csv, generate_qgs_project; export_to_qgis_csv({{}}, '{}'); generate_qgs_project('{}'); print(json.dumps({{'status': 'ok'}}))",
        csv_path.replace("'", "\\'"), qgs_path.replace("'", "\\'")
    ));
    
    let output = cmd.output()
        .map_err(|e| format!("Failed to export QGIS: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("QGIS export error: {}", stderr));
    }
    
    info!("QGIS project exported: csv={}, qgs={}", csv_path, qgs_path);
    Ok(json!({ "status": "ok", "csv_path": csv_path, "qgs_path": qgs_path }))
}

/// Tauri command: Ingest a knowledge file (PDF/DOCX/TXT) into Obsidian vault.
/// 
/// # Arguments
/// - `file_path`: Absolute path to the source file.
/// 
/// # Returns
/// - JSON object with status, message, concepts, atomic_notes, etc.
#[tauri::command]
pub async fn vault_ingest_file(file_path: String) -> Result<Value, String> {
    let path = std::path::Path::new(&file_path);
    if !path.exists() {
        return Err(format!("File not found: {}", file_path));
    }
    
    let abs_path = path.canonicalize().map_err(|e| format!("Invalid path: {}", e))?;
    let abs_path_str = abs_path.to_string_lossy();
    
    let py_exe = get_python_exe()?;
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    let py_code = format!(
        "import json, sys; from pathlib import Path; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.vault_ingest import get_vault_engine; engine = get_vault_engine(); result = engine.ingest_file(Path(r'{}')); print(json.dumps(result))",
        abs_path_str
    );
    cmd.arg(py_code);
    
    info!("Ingesting file: {}", abs_path_str);
    let output = cmd.output()
        .map_err(|e| format!("Failed to run ingest command: {}", e))?;
    
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        error!("Python ingest error: {}", stderr);
        return Err(format!("Python ingest error: {}", stderr));
    }
    
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout)
        .map_err(|e| format!("Failed to parse ingest result JSON: {}. Output: {}", e, stdout))
}

/// Tauri command: Ingest from raw text content (browser fallback when file.path unavailable).
/// Frontend sends fileName + content (file.text()), backend writes to raw/ then reuses pipeline.
#[tauri::command]
pub async fn vault_ingest_content(fileName: String, content: String) -> Result<Value, String> {
    let safe = std::path::Path::new(&fileName)
        .file_name()
        .and_then(|n| n.to_str())
        .unwrap_or("upload.txt")
        .to_string();
    let py_exe = get_python_exe()?;
    let mut cmd = Command::new(&py_exe);
    cmd.arg("-c");
    // escape single quotes for inline python string
    let esc_name = safe.replace('\'', "\\'");
    let esc_content = content.replace('\\', "\\\\").replace('\'', "\\'").replace('\n', "\\n").replace('\r', "\\r");
    let py_code = format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.vault_ingest import get_vault_engine; e=get_vault_engine(); r=e.ingest_content(r'{}', '{}'); print(json.dumps(r))",
        esc_name, esc_content
    );
    cmd.arg(py_code);
    info!("Ingesting content: {} ({} chars)", safe, content.len());
    let output = cmd.output().map_err(|e| format!("Failed to run ingest_content: {}", e))?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        error!("ingest_content error: {}", stderr);
        return Err(format!("Python ingest_content error: {}", stderr));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout).map_err(|e| format!("Failed to parse ingest_content JSON: {}. Output: {}", e, stdout))
}

/// Tauri command: Get vault tree (left panel navigator).
#[tauri::command]
pub async fn vault_get_tree() -> Result<Value, String> {
    let py_exe = get_python_exe()?;
    let py_code = "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.vault_api import build_tree; from pathlib import Path; root = Path(r'C:\\Users\\PC\\Documents\\Obsidian\\Dika\\wiki'); print(json.dumps(build_tree(root), default=str))";
    let output = std::process::Command::new(&py_exe)
        .arg("-c")
        .arg(py_code)
        .output()
        .map_err(|e| format!("Failed to run vault_get_tree: {}", e))?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Python vault_get_tree error: {}", stderr));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout).map_err(|e| format!("Failed to parse tree JSON: {}. Output: {}", e, stdout))
}

/// Tauri command: Get vault file content (center panel).
#[tauri::command]
pub async fn vault_get_file(path: String) -> Result<Value, String> {
    let py_exe = get_python_exe()?;
    let safe_path = path.replace('\\', "/").replace('"', "");
    let py_code = format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.vault_api import get_file_content; r = get_file_content(r'{}'); print(json.dumps(r, default=str))",
        safe_path
    );
    let output = std::process::Command::new(&py_exe)
        .arg("-c")
        .arg(&py_code)
        .output()
        .map_err(|e| format!("Failed to run vault_get_file: {}", e))?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Python vault_get_file error: {}", stderr));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    let result: Value = serde_json::from_str(&stdout).map_err(|e| format!("Failed to parse file JSON: {}. Output: {}", e, stdout))?;
    if result.is_null() {
        return Err("File not found".to_string());
    }
    Ok(result)
}

/// Tauri command: Get knowledge graph (right panel).
#[tauri::command]
pub async fn vault_get_graph() -> Result<Value, String> {
    let py_exe = get_python_exe()?;
    let py_code = "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.vault_api import build_knowledge_graph; g = build_knowledge_graph(); print(json.dumps(g, default=str))";
    let output = std::process::Command::new(&py_exe)
        .arg("-c")
        .arg(py_code)
        .output()
        .map_err(|e| format!("Failed to run vault_get_graph: {}", e))?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Python vault_get_graph error: {}", stderr));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout).map_err(|e| format!("Failed to parse graph JSON: {}. Output: {}", e, stdout))
}

/// Tauri command: Search vault.
#[tauri::command]
pub async fn vault_search(query: String, limit: Option<i32>) -> Result<Value, String> {
    let py_exe = get_python_exe()?;
    let limit_val = limit.unwrap_or(20);
    let safe_query = query.replace('"', "").replace('\\', "/");
    let py_code = format!(
        "import json, sys; sys.path.insert(0, 'src-tauri/python'); from telecom_agent.vault_api import search_vault; r = search_vault(r'{}', {}); print(json.dumps(r, default=str))",
        safe_query, limit_val
    );
    let output = std::process::Command::new(&py_exe)
        .arg("-c")
        .arg(&py_code)
        .output()
        .map_err(|e| format!("Failed to run vault_search: {}", e))?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        return Err(format!("Python vault_search error: {}", stderr));
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    serde_json::from_str(&stdout).map_err(|e| format!("Failed to parse search JSON: {}. Output: {}", e, stdout))
}
