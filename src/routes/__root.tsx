import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background w-full h-screen overflow-hidden">
          <Header />
          <Outlet />
        </SidebarInset>
        <TanStackRouterDevtools position="bottom-right" />
      </SidebarProvider>
    </ThemeProvider>
  ),
});
