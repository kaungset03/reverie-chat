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


type InputFormProps = {
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}


const InputForm = ({ value, handleOnChange, handleOnSubmit }: InputFormProps) => {
  const AI_MODELS = [
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
  ];
  return (
    <form className="w-lg lg:w-3xl mx-auto flex flex-col gap-2" onSubmit={handleOnSubmit}>
      <Textarea
        placeholder="Type your message..."
        className="min-h-[80px] max-h-[180px] px-4 resize-none border-2 rounded-lg text-base scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground"
        value={value}
        onChange={handleOnChange}
      
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
