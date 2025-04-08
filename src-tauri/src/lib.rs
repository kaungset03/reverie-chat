use database::setup_db;
use sqlx::{Pool, Sqlite};
use tauri::Manager as _;

mod commands;
mod database;

pub type Db = Pool<Sqlite>;

pub struct AppState {
    db: Db,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::ollama::chat_generation_stream,
            commands::ollama::chat_with_history_stream,
            commands::db::get_all_chats,
            commands::db::create_new_chat,
            commands::db::get_chat_messages,
        ])
        .setup(|app| {
            tauri::async_runtime::block_on(async {
                let db = setup_db(app).await;
                app.manage(AppState { db });
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
