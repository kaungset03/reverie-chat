import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Welcome = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Message sent:", input);
    // navigate to the chat page with the input
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setInput("");
      console.log("Navigating to chat page...");
    }, 1000); // Simulate a network request
  };

  return (
    <main className="flex-1">
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <div className="text-center">
          <h3 className="text-lg font-medium">Welcome to AI Chat</h3>
          <p className="text-muted-foreground">
            Start a conversation by typing a message below.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="relative w-2/3 max-w-lg">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="pr-12 py-6 bg-muted/30 border-2 rounded-xl focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-0 focus-visible:border-violet-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg h-9 w-9"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Welcome;
