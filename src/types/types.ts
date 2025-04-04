declare global {
  type MessageRole = "user" | "assistant" | "system" | "tool";

  type ToolCall = {};

  type Image = {};

  type ChatMessage = {
    role: MessageRole;
    content: string;
    tool_calls?: ToolCall[];
    images?: Image[];
  };
}

export {};
