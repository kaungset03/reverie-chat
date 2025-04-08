use std::sync::{Arc, Mutex};

use ollama_rs::generation::chat::request::ChatMessageRequest;
use ollama_rs::generation::chat::{ChatMessage, ChatMessageResponseStream};
use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::Ollama;
use tauri::ipc::Channel;
use tokio_stream::StreamExt;

// complete single chat generation and stream response
#[tauri::command]
pub async fn chat_generation_stream(message: &str, stream: Channel<String>) -> Result<(), String> {
    let ollama = Ollama::default();
    let model = "deepseek-r1:1.5b".to_string();

    let mut stream_response = ollama
        .generate_stream(GenerationRequest::new(model, message.to_string()))
        .await
        .map_err(|e| (e.to_string()))?;

    while let Some(Ok(res)) = stream_response.next().await {
        for r in res {
            stream.send(r.response).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

// chat wit history and stream response
#[tauri::command]
pub async fn chat_with_history_stream(
    messages: Vec<ChatMessage>,
    stream: Channel<String>,
) -> Result<(), String> {
    let ollama = Ollama::default();
    let model = "deepseek-r1:1.5b".to_string();
    let (history, user_message) = messages.split_at(messages.len() - 1);
    let user_message = user_message[0].clone();
    let history = Arc::new(Mutex::new(history.to_vec()));

    let mut stream_response: ChatMessageResponseStream = ollama
        .send_chat_messages_with_history_stream(
            history,
            ChatMessageRequest::new(model, vec![user_message]),
        )
        .await
        .map_err(|e| e.to_string())?;

    while let Some(Ok(res)) = stream_response.next().await {
        stream
            .send(res.message.content)
            .map_err(|e| e.to_string())?;
    }

    Ok(())
}
