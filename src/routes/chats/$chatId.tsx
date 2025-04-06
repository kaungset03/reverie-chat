import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Channel, invoke } from "@tauri-apps/api/core";
import InputForm from "@/components/InputForm";
import ChatResponse from "@/components/ChatResponse";

export const Route = createFileRoute("/chats/$chatId")({
  component: PostComponent,
});

function PostComponent() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[] | []>([]);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPrompt: ChatMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newPrompt];
    setMessages(updatedMessages); 
    setInput("");

    const onEvent = new Channel<string>();
    onEvent.onmessage = (message) => {
      // add message to the last message of messages
      setMessages((prev) => {
        const updated = [...prev];
        // check if the last message is assistant or not
        const lastMessage = updated[updated.length - 1];
        if (lastMessage && lastMessage.role === "assistant") {
          // append chunk of message to content
          updated[updated.length - 1] = {
            ...lastMessage,
            content: lastMessage.content + message,
          };
        } else {
          // add new message
          updated.push({
            role: "assistant",
            content: message,
          });
        }

        return updated;
      });

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    invoke("chat_with_history_stream", {
      messages: updatedMessages,
      stream: onEvent,
    }).then(() => {
      console.log("Stream finished");
    }).catch((e) => {
      console.log("Error: ", e);
    });
  };


  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
      <section className="flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          className="w-full h-full max-h-full overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground"
        >
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
