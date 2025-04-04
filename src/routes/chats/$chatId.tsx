import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import InputForm from "@/components/InputForm";

export const Route = createFileRoute("/chats/$chatId")({
  // Or in a component
  component: PostComponent,
});

function PostComponent() {
  // const { chatId } = Route.useParams();
  // get chat message based on chat id
  const [messages, setMessages] = useState<ChatMessage[] | []>([]);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") {
      return;
    }
    // Add user message to the chat
    const newMessage: ChatMessage = {
      role: "user",
      content: input,
    };
    // invoke rust to get response
    invoke("chat_with_history", { current: input, history: messages })
      .then((response) => {
        // add response to the chat
        const newResponse: ChatMessage = {
          role: "assistant",
          content: response as string,
        };
        setMessages((prev) => [...prev, newMessage, newResponse]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
      <section className="flex-1 overflow-hidden">
        <div className="w-full h-full max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background">
          <div className="w-lg lg:w-3xl mx-auto flex flex-col">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} p-4`}
              >
                <div
                  className={`max-w-xs p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="sticky bottom-0 bg-background pb-2">
        <InputForm value={input} handleOnChange={handleInputChange} handleOnSubmit={handleInputSubmit} />
      </div>
    </main>
  );
}
