import { createFileRoute } from "@tanstack/react-router";
import InputForm from "@/components/InputForm";

export const Route = createFileRoute("/chats/$chatId")({
  // Or in a component
  component: PostComponent,
});

function PostComponent() {
  const { chatId } = Route.useParams();
  const messages = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "user",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "assistant",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "user",
    },
    {
      id: 4,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "assistant",
    },
    {
      id: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "user",
    },
    {
      id: 6,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "assistant",
    },
    {
      id: 7,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "user",
    },
    {
      id: 8,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "assistant",
    },
    {
      id: 9,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "user",
    },
    {
      id: 10,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "assistant",
    },
    {
      id: 11,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "user",
    },
    {
      id: 12,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit tempore veritatis consectetur eius doloribus.",
      sender: "assistant",
    },
  ];
  return (
    <main className="flex-1 flex flex-col h-[calc(100vh-64px)]">
      <section className="flex-1 overflow-hidden">
        <div className="w-full h-full max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-foreground scrollbar-track-background">
          <div className="w-lg lg:w-3xl mx-auto flex flex-col">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} p-4`}
              >
                <div
                  className={`max-w-xs p-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="sticky bottom-0 bg-background pb-2">
        <InputForm />
      </div>
    </main>
  );
}
