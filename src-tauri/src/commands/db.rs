use serde::{Deserialize, Serialize};
use sqlx::{prelude::FromRow, types::chrono::Utc, Pool, Sqlite};
use uuid::Uuid;

use crate::AppState;

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Chat {
    id: String,
    title: String,
    created_at: String,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Message {
    pub id: i32,
    pub chat_id: String,
    pub role: String,
    pub content: String,
    pub created_at: String,
}

pub async fn add_new_message(db: &Pool<Sqlite>, chat_id: String, content: String, role: String) {
    let _ = sqlx::query(
        "INSERT INTO messages (chat_id, role, content, created_at) VALUES ($1, $2, $3, $4)",
    )
    .bind(chat_id)
    .bind(role)
    .bind(content)
    .bind(Utc::now().to_string())
    .execute(db)
    .await
    .map_err(|e| format!("Insert message error: {}", e));
}

pub async fn chat_messages_by_chat_id(
    db: &Pool<Sqlite>,
    chat_id: String,
) -> Result<Vec<Message>, String> {
    let messages = sqlx::query_as::<_, Message>("SELECT * FROM messages WHERE chat_id = $1")
        .bind(chat_id)
        .fetch_all(db)
        .await
        .map_err(|e| format!("Get messages error: {}", e))?;

    Ok(messages)
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
#[tauri::command]
pub async fn get_all_chats(state: tauri::State<'_, AppState>) -> Result<Vec<Chat>, String> {
    let db = &state.db;

    let chats = sqlx::query_as::<_, Chat>("SELECT * FROM chats")
        .fetch_all(db)
        .await
        .map_err(|e| format!("Get chats error: {}", e))?;

    Ok(chats)
}

// delete a chat by id
#[tauri::command]
pub async fn delete_chat_by_id(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<(), String> {
    let db = &state.db;
    sqlx::query("DELETE FROM chats WHERE id = $1")
        .bind(id)
        .execute(db)
        .await
        .map_err(|e| format!("Delete chat error: {}", e))?;

    Ok(())
}

// delete all chats
#[tauri::command]
pub async fn delete_all_chats(state: tauri::State<'_, AppState>) -> Result<(), String> {
    let db = &state.db;
    sqlx::query("DELETE FROM chats")
        .execute(db)
        .await
        .map_err(|e| format!("Delete chat error: {}", e))?;

    Ok(())
}

// get all messages for a chat
#[tauri::command]
pub async fn get_chat_messages(
    state: tauri::State<'_, AppState>,
    id: String,
) -> Result<Vec<Message>, String> {
    let db = &state.db;

    let messages = chat_messages_by_chat_id(db, id)
        .await
        .map_err(|e| e.to_string())?;
    Ok(messages)
}
