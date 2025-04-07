use std::sync::{Arc, Mutex};

use ollama_rs::generation::chat::request::ChatMessageRequest;
use ollama_rs::generation::chat::{ChatMessage, ChatMessageResponseStream};
use ollama_rs::Ollama;
use tauri::ipc::Channel;
use tokio_stream::StreamExt;

// #[tauri::command]
// pub async fn get_complete_response(message: &str) -> Result<String, ()> {
//     let ollama = Ollama::default();
//     let model = "deepseek-r1:1.5b".to_string();
//     let prompt = message.to_string();

//     let res = ollama.generate(GenerationRequest::new(model, prompt)).await;

//     if let Ok(res) = res {
//         Ok(format!("{}", res.response))
//     } else {
//         Err(())
//     }
// }

// #[tauri::command]
// pub async fn chat_with_history(current: &str, mut history: Vec<ChatMessage>) -> Result<String, ()> {
//     let mut ollama = Ollama::default();
//     let model = "deepseek-r1:1.5b".to_string();

//     let user_message = ChatMessage::user(current.to_string());

//     let result = ollama
//         .send_chat_messages_with_history(
//             &mut history,
//             ChatMessageRequest::new(model, vec![user_message]),
//         )
//         .await;

//     if let Ok(res) = result {
//         Ok(format!("{}", res.message.content))
//     } else {
//         Err(())
//     }
// }

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
