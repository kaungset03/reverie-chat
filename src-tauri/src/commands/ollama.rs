use std::sync::{Arc, Mutex};

use ollama_rs::generation::chat::request::ChatMessageRequest;
use ollama_rs::generation::chat::{ChatMessage, ChatMessageResponseStream, MessageRole};
use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::Ollama;
use regex::Regex;
use tauri::ipc::Channel;
use tokio_stream::StreamExt;

use crate::AppState;

use super::db::{add_new_message, chat_messages_by_chat_id, Message};

impl From<&Message> for ChatMessage {
    fn from(msg: &Message) -> Self {
        ChatMessage {
            role: match msg.role.as_str() {
                "user" => MessageRole::User,
                "assistant" => MessageRole::Assistant,
                "system" => MessageRole::System,
                _ => MessageRole::User,
            },
            content: msg.content.clone(),
            tool_calls: vec![], // assuming you're not using tools
            images: None,       // assuming no images for now
        }
    }
}

fn remove_think_tags(text: &str) -> String {
    let re = Regex::new(r"(?s)<think>.*?</think>").unwrap();
    let result = re.replace_all(text, "").to_string();
    result
}

// create a title for chat based on the first message
pub async fn generate_title(message: &str) -> String {
    let ollama = Ollama::default();
    let model = "deepseek-r1:1.5b".to_string();
    let title_prompt = format!(
        "Generate a short, descriptive title (5-8 words) for the following conversation prompt:\n\"{}\"",
        message
    );

    let response = ollama
        .generate(GenerationRequest::new(model, title_prompt))
        .await;
    if let Ok(res) = response {
        let title = remove_think_tags(&res.response);
        title
    }else {
        "New Chat".to_string()
    }
}

// complete single chat generation and stream response
#[tauri::command]
pub async fn chat_generation_stream(
    state: tauri::State<'_, AppState>,
    content: &str,
    chat: &str,
    stream: Channel<String>,
) -> Result<(), String> {
    let ollama = Ollama::default();
    let model = "deepseek-r1:1.5b".to_string();

    let mut stream_response = ollama
        .generate_stream(GenerationRequest::new(model, content.to_string()))
        .await
        .map_err(|e| (e.to_string()))?;

    let mut message = String::new();

    while let Some(Ok(res)) = stream_response.next().await {
        for r in res {
            message.push_str(&r.response);
            stream.send(r.response).map_err(|e| e.to_string())?;
        }
    }

    // add message to db
    let db = &state.db;
    add_new_message(db, chat.to_string(), message, "assistant".to_string()).await;

    Ok(())
}

// chat wit history and stream response
#[tauri::command]
pub async fn chat_with_history_stream(
    state: tauri::State<'_, AppState>,
    content: &str,
    chat: &str,
    stream: Channel<String>,
) -> Result<(), String> {
    let ollama = Ollama::default();
    let model = "deepseek-r1:1.5b".to_string();

    let db = &state.db;

    // get history messages from db
    let db_messages = chat_messages_by_chat_id(db, chat.to_string())
        .await
        .map_err(|e| e.to_string())?;
    let history_messages: Vec<ChatMessage> = db_messages.iter().map(ChatMessage::from).collect();
    let history_messages = Arc::new(Mutex::new(history_messages));

    // add current user prompt to db
    add_new_message(
        db,
        chat.to_string(),
        content.to_string(),
        "user".to_string(),
    )
    .await;

    // get ollama response
    // stream response
    let user_message = ChatMessage::new(
        ollama_rs::generation::chat::MessageRole::User,
        content.to_string(),
    );
    let mut stream_response: ChatMessageResponseStream = ollama
        .send_chat_messages_with_history_stream(
            history_messages,
            ChatMessageRequest::new(model, vec![user_message]),
        )
        .await
        .map_err(|e| e.to_string())?;

    let mut response = String::new();
    while let Some(Ok(res)) = stream_response.next().await {
        response.push_str(&res.message.content);
        stream
            .send(res.message.content)
            .map_err(|e| e.to_string())?;
    }

    // add new response to db
    add_new_message(db, chat.to_string(), response, "assistant".to_string()).await;

    Ok(())
}
