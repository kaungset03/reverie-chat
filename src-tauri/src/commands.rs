use ollama_rs::generation::chat::request::ChatMessageRequest;
use ollama_rs::generation::chat::ChatMessage;
use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::Ollama;

// get complete response from the ollama model
#[tauri::command]
pub async fn get_complete_response(message: &str) -> Result<String, ()> {
    let ollama = Ollama::default();
    let model = "deepseek-r1:1.5b".to_string();
    let prompt = message.to_string();

    let res = ollama.generate(GenerationRequest::new(model, prompt)).await;

    if let Ok(res) = res {
        Ok(format!("{}", res.response))
    } else {
        Err(())
    }
}

// get chat response from the ollama model
#[tauri::command]
pub async fn chat_with_history(current: &str, mut history: Vec<ChatMessage>) -> Result<String, ()> {
    let mut ollama = Ollama::default();
    let model = "deepseek-r1:1.5b".to_string();

    let user_message = ChatMessage::user(current.to_string());

    let result = ollama
        .send_chat_messages_with_history(
            &mut history,
            ChatMessageRequest::new(model, vec![user_message]),
        )
        .await;

    if let Ok(res) = result {
        Ok(format!("{}", res.message.content))
    } else {
        Err(())
    }
}
