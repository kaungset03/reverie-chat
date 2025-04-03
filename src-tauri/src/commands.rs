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
