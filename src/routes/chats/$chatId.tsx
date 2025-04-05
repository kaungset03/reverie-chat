import { createFileRoute } from "@tanstack/react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import InputForm from "@/components/InputForm";
import ChatResponse from "@/components/ChatResponse";

export const Route = createFileRoute("/chats/$chatId")({
  // Or in a component
  component: PostComponent,
});

const defaultChatMessages: ChatMessage[] = [
  {
    role: "user",
    content: "Why is the sky blue?",
  },
  {
    role: "assistant",
    content: `
The color of the sky, often referred to as apparent colors or atmospheric color, is due to a combination of factors related to light scattering and absorption in Earth's atmosphere. Here are the key reasons why the sky appears blue:

1. **Scattering of UV Light**: In the atmosphere, there is a range of wavelengths, with UV light being the longest (and least refracted) and visible light being the shortest. Blue light has a shorter wavelength than UV light, which causes it to scatter more efficiently in all directions due to molecular particles in the air acting as tiny atmospheric screens. This scattering makes the sky appear blue.

2. **Meteorology**: The sun's position in the sky (elevation angle) affects how much UV light is scattered and absorbed. At lower elevations, where the sun is higher on the horizon or near overhead, more of the shorter wavelengths (including blue) are scattered back into view. This results in a darker sky at sunset or sunrise.

3. **Turbulence**: Turbulence in the atmosphere can cause light to scatter and refract in random directions. Turbulent conditions can lead to more scattered light, contributing to the perceived color changes over time during sunset.

4. **Hygrostatic Effect**: Light passing through cool air (which is often the case at higher altitudes where sunlight enters Earth's atmosphere) may appear slightly redder due to a phenomenon called the hygrostatic effect, though this is not as significant for everyday blue skies.

5. **Turbulence and Scattering**: Turbulent conditions in the stratosphere can cause more scattering of shorter wavelengths compared to clear atmospheric conditions at sea level, leading to a darker sky during sunset or sunrise when the sun is near the horizon.

In summary, the blue color of the sky is primarily due to the scattering of UV light by tiny molecules in Earth's atmosphere.`,
  },
  {
    role: "user",
    content: "What is the use of python?",
  },
  {
    role: "assistant",
    content: `
Python is a versatile and widely-used programming language, primarily known for its scalability and ability to handle large datasets and complex tasks efficiently. Here's an organized summary of its key features and uses:

1. **Interpretative Language**: Python is interpreted, meaning it executes code on the fly as it's written, unlike compiled languages which compile once. This allows for quick execution, suitable for dynamic programming.

2. **Scalability**: It excels at managing large datasets and complex tasks, making it ideal for scalable applications that need to handle significant amounts of data or resources.

3. **Libraries and Tools**: Python's extensive library ecosystem provides pre-built solutions for various computational tasks, enhancing efficiency and reducing code duplication.

4. **Ease of Use**: With its simple syntax and vast community support, Python is user-friendly, allowing many individuals to learn and apply it effectively.

5. **Integration with Other Languages**: While used across multiple domains, Python's flexibility allows integration with other languages like Java for web development, bridging the gap between different programming paradigms.

6. **Versatility**: Python's broad applications span web development, AI, machine learning, data science, and education, making it a valuable tool in computer science and beyond.

In summary, Python is renowned for its scalability, ease of use, and extensive library support, making it a powerful choice for developers tackling a wide range of computational challenges.`,
  },
];

function PostComponent() {
  // const { chatId } = Route.useParams();
  // get chat message based on chat id
  const [messages, setMessages] = useState<ChatMessage[] | []>(
    defaultChatMessages
  );
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
