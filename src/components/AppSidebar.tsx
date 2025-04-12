import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, Settings, Plus } from "lucide-react";
import SettingDialog from "@/components/SettingDialog";
import ConversationsList from "@/components/ConversationsList";

const AppSidebar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={cn(
        "h-screen border-r border-sidebar-border transition-all duration-300 grid grid-cols-1 gap-6 grid-rows-[64px_64px_auto_64px]",
        isExpanded ? "w-68" : "w-20"
      )}
    >
      <div className="w-full flex items-center p-4">
        <Button variant="outline" onClick={toggleSidebar} className="w-12 h-10">
          <Menu />
        </Button>
      </div>
      <div className="w-full flex items-center px-5">
        <Button
          variant="outline"
          onClick={() => navigate({ to: "/" })}
          className="rounded-full w-full flex justify-center items-center"
        >
          <Plus />
          {isExpanded && <span>New Chat</span>}
        </Button>
      </div>
      <nav className="w-full h-[calc(100vh-300px)] px-2">
        <ConversationsList isExpanded={isExpanded} />
      </nav>
      <div className="w-full flex items-center justify-center p-2">
        <SettingDialog>
          <Button variant="ghost" className={`w-full h-full cursor-pointer`}>
            <Settings className="h-4 w-4" />
            {isExpanded && <span className="ml-2">Settings</span>}
          </Button>
        </SettingDialog>
      </div>
    </aside>
  );
};

export default AppSidebar;
