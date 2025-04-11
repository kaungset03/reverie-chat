import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { type QueryClient } from "@tanstack/react-query";

const Root = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex h-screen">
        <AppSidebar />
        <main className="bg-background flex-1 flex flex-col overflow-hidden">
          <Header />
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools position="bottom-right" />
    </ThemeProvider>
  );
};

type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});
