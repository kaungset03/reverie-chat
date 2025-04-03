import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const InputForm = () => {
  const AI_MODELS = [
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
  ];
  return (
    <form className="w-lg lg:w-3xl mx-auto flex flex-col gap-2">
      <Textarea
        placeholder="Type your message..."
        className="min-h-[100px] max-h-[250px] resize-none bg-muted/30 border-2 rounded-xl text-base"
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
        <Button type="submit" className="px-4">
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </form>
  );
};
export default InputForm;
