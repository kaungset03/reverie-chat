import useGetListOfModelsQuery from "@/features/queries/useGetListOfModelsQuery";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatOptions } from "@/providers/ChatOptionsProvider";

type InputFormProps = {
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const InputForm = ({
  value,
  handleOnChange,
  handleOnSubmit,
}: InputFormProps) => {
  const { data: models } = useGetListOfModelsQuery();
  const { handleChatOptions, chatOptions } = useChatOptions();

  const handleModelChange = (model: string) => {
    handleChatOptions({ ...chatOptions, model });
  };

  return (
    <form
      className="w-lg lg:w-3xl mx-auto flex flex-col gap-2 p-3 rounded-3xl bg-input dark:bg-input/30 shadow-md shadow-background/20 backdrop-blur-md"
      onSubmit={handleOnSubmit}
    >
      <Textarea
        placeholder="Type your message..."
        className="min-h-[40px] max-h-[140px] placeholder:text-base resize-none shadow-none border-none rounded-lg scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground"
        value={value}
        onChange={handleOnChange}
      />
      <div className="flex items-center justify-between">
        <Select onValueChange={handleModelChange}>
          <SelectTrigger className="min-w-44 rounded-3xl border-primary">
            <SelectValue placeholder={chatOptions.model} />
          </SelectTrigger>
          <SelectContent className="rounded-3xl">
            {models?.map((model) => (
              <SelectItem
                className="rounded-2xl h-10"
                key={model.name}
                value={model.name}
              >
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="submit"
          className="size-10 flex justify-center items-center rounded-full"
        >
          <SendHorizonal />
        </Button>
      </div>
    </form>
  );
};
export default InputForm;
