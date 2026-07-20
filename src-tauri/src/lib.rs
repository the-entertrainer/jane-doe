use tauri_plugin_fs::FsExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            let _scope = app.fs_scope();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Failed to initialize native platform bootstrapper");
}
