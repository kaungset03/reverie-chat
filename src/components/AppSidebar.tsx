import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Settings,
  MessageCircle,
  EllipsisVertical,
  Plus,
} from "lucide-react";

const AppSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const chats = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
          onClick={toggleSidebar}
          className="rounded-full w-full flex justify-center items-center"
        >
          <Plus />
          {isExpanded && <span>New Chat</span>}
        </Button>
      </div>
      <nav className="w-full h-[calc(100vh-300px)] px-2">
        <ul
          className={`flex flex-col gap-y-1 w-full h-full overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground ${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
        >
          {chats.map((c) => (
            <li
              key={c}
              className="w-full flex items-center justify-between relative group"
            >
              <Button
                variant="ghost"
                className="justify-start w-full h-11 rounded-full"
              >
                <MessageCircle className="h-4 w-4" />
                {isExpanded && (
                  <span className="w-8/10 whitespace-nowrap overflow-hidden text-ellipsis">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Porro consequuntur saepe, itaque id maiores nam deserunt.
                    Quis excepturi perferendis in.
                  </span>
                )}
              </Button>
              {isExpanded && (
                <Button
                  variant={"ghost"}
                  className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full px-2 py-0.5"
                >
                  <EllipsisVertical />
                </Button>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full flex items-center justify-center p-2">
        <Button variant="ghost" className={`w-full h-full cursor-pointer`}>
          <Settings className="h-4 w-4" />
          {isExpanded && <span className="ml-2">Settings</span>}
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;
