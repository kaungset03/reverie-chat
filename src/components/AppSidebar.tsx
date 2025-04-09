import { MessageSquare, PlusCircle } from "lucide-react";
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

import { Link } from "@tanstack/react-router";
import useGetAllChatsQuery from "@/features/queries/useGetAllChatsQuery";
import SettingDialog from "./SettingDialog";

const AppSidebar = () => {
  const { data: conversations } = useGetAllChatsQuery();

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
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/chats/$chatId"
                      params={{ chatId: conversation.id }}
                      className="flex items-center gap-2"
                      activeProps={{
                        className: "bg-accent text-accent-foreground",
                      }}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>{conversation.title}</span>
                    </Link>
                  </SidebarMenuButton>
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
