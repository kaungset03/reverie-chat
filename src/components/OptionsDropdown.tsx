import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { EllipsisVertical, PenBox, Share, Trash } from "lucide-react";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import useDeleteChatByIdMutation from "@/features/mutations/useDeleteChatByIdMutation";

type ChatOptionsDropdownProps = {
  chat: Chat;
};

const OptionsDropdown = ({ chat }: ChatOptionsDropdownProps) => {
  const { mutate } = useDeleteChatByIdMutation();

  const handleDeleteChat = () => {
    mutate(chat.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute right-0 opacity-0 hover:opacity-100 group-hover:opacity-100 hover:bg-accent transition-[opacity,_colors] duration-300 rounded-full px-1 py-2">
        <EllipsisVertical size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <DropdownMenuItem className="h-10">
          <Share />
          <Label>Share</Label>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-10">
          <PenBox />
          <Label>Rename</Label>
        </DropdownMenuItem>
        <DeleteAlertDialog title={chat.title} onConfirm={handleDeleteChat}>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            variant="destructive"
            className="h-10"
          >
            <Trash />
            <Label>Delete</Label>
          </DropdownMenuItem>
        </DeleteAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default OptionsDropdown;


{/* <Link
to={`/chats/$chatId`}
params={{ chatId: c.id }}
className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium w-full h-11 rounded-full"
>
<MessageCircle className="h-4 w-4" />
<span className="w-8/10 whitespace-nowrap overflow-hidden text-ellipsis">
  {c.title}
</span>
</Link> */}
