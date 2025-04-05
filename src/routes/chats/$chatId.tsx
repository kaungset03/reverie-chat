import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import InputForm from "@/components/InputForm";
import ChatResponse from "@/components/ChatResponse";

export const Route = createFileRoute("/chats/$chatId")({
  // Or in a component
  component: PostComponent,
});

// get chat history messages based on chatId

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
    setMessages((prev) => [...prev, newMessage]);
    // Clear the input field
    setInput("");
    // invoke rust to get response
    invoke("chat_with_history", { current: input, history: messages })
      .then((response) => {
        // add response to the chat
        const newResponse: ChatMessage = {
          role: "assistant",
          content: response as string,
        };
        console.log("Response:", response);
        setMessages((prev) => [...prev, newResponse]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
      <section className="flex-1 overflow-hidden">
        <div className="w-full h-full max-h-full overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground">
          <div className="w-lg lg:w-3xl mx-auto flex flex-col gap-y-6 p-3">
            {messages.map((message, index) =>
              message.role === "user" ? (
                <div key={index} className="flex justify-end">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg max-w-xs">
                    {message.content}
                  </div>
                </div>
              ) : (
                <ChatResponse key={index} message={message} />
              )
            )}
          </div>
        </div>
      </section>
      <div className="sticky bottom-0 bg-background pb-2">
        <InputForm
          value={input}
          handleOnChange={handleInputChange}
          handleOnSubmit={handleInputSubmit}
        />
      </div>
    </main>
  );
}
