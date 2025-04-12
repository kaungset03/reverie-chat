import { useTheme } from "@/providers/ThemeProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import useDeleteAllChatsMutation from "@/features/mutations/useDeleteAllChatsMutation";

type SettingDialogProps = {
  children: React.ReactNode;
};

const SettingDialog = ({ children }: SettingDialogProps) => {
  const themes = ["Light", "Dark", "System"];
  const { setTheme, theme } = useTheme();
  const { mutate: deleteAllChats } = useDeleteAllChatsMutation();

  const handleDeleteAllChats = () => {
    deleteAllChats();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <ul className="w-full flex flex-col">
          <li className="w-full flex items-center justify-between px-3 py-4 border-t border-t-sidebar-border">
            <Label>Theme</Label>
            <Select
              onValueChange={(v) =>
                setTheme(v.toLowerCase() as "light" | "dark" | "system")
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={theme.charAt(0).toUpperCase() + theme.slice(1)}
                />
              </SelectTrigger>
              <SelectContent>
                {themes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
          <li className="w-full flex items-center justify-between px-3 py-4 border-t border-t-sidebar-border">
            <Label>Custom instructions</Label>
            <Button variant={"ghost"}>
              <span>On</span>
              <ChevronRight />
            </Button>
          </li>
          <li className="w-full flex items-center justify-between px-3 py-4 border-t border-t-sidebar-border">
            <Label>Delete all chats</Label>
            <DeleteAlertDialog
              title="all conversations"
              onConfirm={handleDeleteAllChats}
            />
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};
export default SettingDialog;
