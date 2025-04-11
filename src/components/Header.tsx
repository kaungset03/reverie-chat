import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

const Header = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b border-border">
      <h1 className="text-xl font-semibold">Chat Assistant</h1>
      <Button variant="outline" onClick={handleThemeChange}>
        {theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </Button>
    </header>
  );
};
export default Header;
