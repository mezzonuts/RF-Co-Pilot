use tauri::Builder;

mod commands;

pub fn run() {
    // Initialize logger for the sidecar (writes to logs/sidecar.log)
    env_logger::init();
    Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            commands::parse_dt_file,
            commands::compute_kpi,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

