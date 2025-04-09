import { useState } from "react";
//import { invoke } from "@tauri-apps/api/core";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import useCreateNewChatMutation from "@/features/mutations/useCreateNewChatMutation";

const Welcome = () => {
  const AI_MODELS = [
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
  ];
  const { mutate, isPending } = useCreateNewChatMutation()
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === "") return;
    // Call the mutation function with the input value
    mutate(input);
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
        <form
          onSubmit={handleSubmit}
          className="w-2/3 max-w-lg flex flex-col gap-2"
        >
          <Textarea
            placeholder="Type your message"
            className="min-h-[72px] max-h-[200px] resize-none bg-muted/30 border-2 border-primary rounded-2xl text-base scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Select>
              <SelectTrigger className="w-[180px] bg-muted/30 border-2 focus:ring-violet-500 focus:border-violet-500">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" className="px-4" disabled={isPending}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Welcome;
