import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background w-full h-screen overflow-hidden">
        <Header />
        <Outlet />
      </SidebarInset>
      <TanStackRouterDevtools position="bottom-right" />
    </SidebarProvider>
  ),
});
