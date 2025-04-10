import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import useDeleteChatByIdMutation from "@/features/mutations/useDeleteChatByIdMutation";

type ChatOptionsDropdownProps = {
  chat: Chat;
};

const ChatOptionsDropdown = ({ chat }: ChatOptionsDropdownProps) => {
  const { mutate } = useDeleteChatByIdMutation();

  const handleDeleteChat = () => {
    mutate(chat.id);
  };

  return (
    <div className="flex items-center">
      <Button
        variant={"ghost"}
        className="opacity-0 group-hover/menu:opacity-100 text-primary"
      >
        <Pen className="h-3 w-3" />
      </Button>
      <DeleteAlertDialog title={chat.title} onConfirm={handleDeleteChat}>
        <Button
          variant={"ghost"}
          className="opacity-0 group-hover/menu:opacity-100 text-destructive"
        >
          <Trash className="h-3 w-3" />
        </Button>
      </DeleteAlertDialog>
    </div>
  );
};
export default ChatOptionsDropdown;
