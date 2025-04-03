import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const Header = () => {
  const { state } = useSidebar();
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      {state === "collapsed" && <SidebarTrigger className="mr-2" />}
      <h1 className="text-xl font-semibold">Chat Assistant</h1>
      <Button variant="outline" onClick={handleThemeChange}>
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
export default Header;
