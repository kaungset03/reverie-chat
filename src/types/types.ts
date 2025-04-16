declare global {
  type MessageRole = "user" | "assistant" | "system" | "tool";

  interface Message {
    id: number;
    chat_id: string;
    role: MessageRole;
    content: string;
    created_at: string;
  }

  interface Chat {
    id: string;
    title: string;
    created_at: string;
  }

  interface LocalModel {
    name: string;
    modified_at: string;
    size: number;
  }
}

export {};

// #[derive(Debug, Serialize, Deserialize, FromRow)]
// struct Chat {
//     id: String,
//     title: String,
//     created_at: String,
// }

// #[derive(Debug, Serialize, Deserialize, FromRow)]
// pub struct Message {
//     id: i32,
//     chat_id: String,
//     role: String,
//     content: String,
//     created_at: String,
// }
