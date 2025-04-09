import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import InputForm from "@/components/InputForm";
import ChatResponse from "@/components/ChatResponse";
import messagesByChatIdQueryOptions from "@/features/allMessagesQuery";
import { Channel, invoke } from "@tauri-apps/api/core";

export const Route = createFileRoute("/chats/$chatId")({
  component: PostComponent,
  loader: ({ context: { queryClient }, params: { chatId } }) =>
    queryClient.ensureQueryData(messagesByChatIdQueryOptions(chatId)),
  pendingComponent: () => <p>Loading..</p>,
});

function PostComponent() {
  const { chatId } = Route.useParams();
  const { data: messages } = useSuspenseQuery(
    messagesByChatIdQueryOptions(chatId)
  );
  const queryClient = Route.useRouteContext().queryClient;

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasStreamRef = useRef(false);

  const [input, setInput] = useState<string>("");
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [streaming, setStreaming] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // invoke rust command
    const onEvent = new Channel<string>();
    onEvent.onmessage = (message) => {
      setStreaming((prev) => prev + message);
    };

    const userPrompt = input
    setCurrentPrompt(userPrompt);
    setInput("");

    invoke("chat_with_history_stream", {
      content: userPrompt,
      chat: chatId,
      stream: onEvent,
    })
      .then(() => {
        // invalidate query and clear streaming
        queryClient.invalidateQueries(messagesByChatIdQueryOptions(chatId));
        setCurrentPrompt("");
        setStreaming("");
      })
      .catch((e) => {
        console.log("Error: ", e);
      });
  };

  useEffect(() => {
    const handleStream = () => {
      const onEvent = new Channel<string>();
      onEvent.onmessage = (message) => {
        // console.log(message);
        setStreaming((prev) => prev + message);
      };

      invoke("chat_generation_stream", {
        content: messages[0].content,
        chat: chatId,
        stream: onEvent,
      })
        .then(() => {
          // invalidate query and clear streaming
          queryClient.invalidateQueries(messagesByChatIdQueryOptions(chatId));
          setStreaming("");
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    };

    if (messages.length <= 1 && !hasStreamRef.current) {
      hasStreamRef.current = true;
      handleStream();
    }
    return () => {
      hasStreamRef.current = false;
      setStreaming("");
    };
  }, [chatId, messages]);

  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
      <section className="flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          className="w-full h-full max-h-full overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground"
        >
          <div className="w-lg lg:w-3xl mx-auto flex flex-col gap-y-6 p-3">
            {messages.map((message) =>
              message.role === "user" ? (
                <div key={message.id} className="flex justify-end">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg max-w-xs">
                    {message.content}
                  </div>
                </div>
              ) : (
                <ChatResponse key={message.id} message={message.content} />
              )
            )}
            {currentPrompt !== "" && (
              <div className="flex justify-end">
                <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg max-w-xs">
                  {currentPrompt}
                </div>
              </div>
            )}
            {streaming !== "" && <ChatResponse message={streaming} />}
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
