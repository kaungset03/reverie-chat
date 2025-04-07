use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, types::chrono::Utc};
use uuid::Uuid;

use crate::AppState;

#[derive(Debug, Serialize, Deserialize, FromRow)]
struct Chat {
    id: String,
    title: String,
    created_at: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Message {
    id: i32,
    chat_id: String,
    role: String,
    content: String,
    created_at: String,
}

// create a new chat, new message and return the chat id
#[tauri::command]
pub async fn create_new_chat(
    state: tauri::State<'_, AppState>,
    message: &str,
) -> Result<String, String> {
    let db = &state.db;
    let chat_id = Uuid::new_v4();

    let mut transaction = db
        .begin()
        .await
        .map_err(|e| format!("Transaction error: {}", e))?;

    let chat_insert: (String,) = sqlx::query_as(
        "INSERT INTO chats (id, title, created_at) VALUES ($1, $2, $3) RETURNING id",
    )
    .bind(chat_id.to_string())
    .bind("New Chat")
    .bind(Utc::now().to_string())
    .fetch_one(&mut *transaction)
    .await
    .map_err(|e| format!("Insert chat error: {}", e))?;

    let message_insert: (String,) = sqlx::query_as(
        "INSERT INTO messages (chat_id, role, content, created_at) VALUES ($1, $2, $3, $4) RETURNING chat_id",
    )
    .bind(chat_insert.0)
    .bind("user")
    .bind(message)
    .bind(Utc::now().to_string())
    .fetch_one(&mut *transaction)
    .await
    .map_err(|e| format!("Insert message error: {}", e))?;

    transaction
        .commit()
        .await
        .map_err(|e| format!("Transaction commit error: {}", e))?;

    Ok(message_insert.0)
}

// get all chats

// get all messages for a chat
#[tauri::command]
pub async fn get_chat_messages(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<Vec<Message>, String> {
    let db = &state.db;

    let messages = sqlx::query_as::<_, Message>("SELECT * FROM messages WHERE chat_id = $1")
        .bind(id)
        .fetch_all(db)
        .await
        .map_err(|e| format!("Get messages error: {}", e))?;

    Ok(messages)
}
