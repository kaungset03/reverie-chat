import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/Header";
import AppSidebar from "@/components/AppSidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ChatOptionsProvider } from "@/providers/ChatOptionsProvider";
import { type QueryClient } from "@tanstack/react-query";
import { listOfModelsQueryOptions } from "../features/queries/useGetListOfModelsQuery";

const Root = () => {
  const { models } = Route.useLoaderData();
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <ChatOptionsProvider defaultModel={models[0].name} storageKey="chat-options">
        <div className="flex h-screen">
          <AppSidebar />
          <main className="bg-background flex-1 flex flex-col overflow-hidden">
            <Header />
            <Outlet />
          </main>
        </div>
        <TanStackRouterDevtools position="bottom-right" />
      </ChatOptionsProvider>
    </ThemeProvider>
  );
};

type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
  loader: async ({ context }) => {
    const { queryClient } = context;
    const models = await queryClient.fetchQuery(listOfModelsQueryOptions());
    return { models };
  },
});
