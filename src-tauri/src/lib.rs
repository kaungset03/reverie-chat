use crate::commands::{chat_with_history, chat_with_history_stream, get_complete_response};

mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_complete_response,
            chat_with_history,
            chat_with_history_stream
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
