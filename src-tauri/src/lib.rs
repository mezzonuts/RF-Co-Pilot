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
            commands::health_check,
            commands::db_insert_cell,
            commands::db_query_cells_by_band,
            commands::db_insert_dt_logs,
            commands::qdrant_search_similar_kpi,
            commands::export_report,
            commands::export_qgis_project,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

