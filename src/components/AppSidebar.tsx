import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Link, useNavigate } from "@tanstack/react-router";
import SettingDialog from "@/components/SettingDialog";
import ChatOptionsDropdown from "@/components/ChatOptionsDropdown";
import useGetAllChatsQuery from "@/features/queries/useGetAllChatsQuery";

const AppSidebar = () => {
  const navigate = useNavigate();
  const { data: conversations } = useGetAllChatsQuery();

  const handleNavigate = (chatId: string) => {
    navigate({ to: "/chats/$chatId", params: { chatId } });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <h2 className="text-lg font-semibold">Reverie Chat</h2>
          <SidebarTrigger />
        </div>
        <div className="px-2 pb-2">
          <Link to="/">
            <Button className="w-full justify-start gap-2" variant="outline">
              <PlusCircle className="h-4 w-4" />
              New Chat
            </Button>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations?.map((conversation) => (
                <SidebarMenuItem
                  key={conversation.id}
                  className="flex items-center justify-between hover:bg-accent hover:text-accent-foreground rounded-lg duration-300 ease-in-out group/menu"
                >
                  <SidebarMenuButton
                    className="hover:bg-transparent"
                    onClick={() => handleNavigate(conversation.id)}
                  >
                    <span>Lorem ipsum dolor sit</span>
                  </SidebarMenuButton>
                  <ChatOptionsDropdown chat={conversation} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SettingDialog />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
