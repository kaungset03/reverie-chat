import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { allChatsQueryOptions } from "@/features/queries/useGetAllChatsQuery";

const useDeleteChatByIdMutation = () => {
  const navigate = useNavigate();
  const router = useRouterState();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (chatId: string) => {
      try {
        await invoke("delete_chat_by_id", { id: chatId });
        return chatId;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    onSuccess: (chatId) => {
      queryClient.invalidateQueries(allChatsQueryOptions());
      // TODO: if the deleted chat was the current path, navigate to the home page
      console.log(router.location.pathname);
      if (router.location.pathname === `/chats/${chatId}`) {
        navigate({ to: "/" });
      }
    },
    onError: (error) => {
      console.error("Error deleting chat:", error);
    },
  });

  return { mutate, isPending };
};
export default useDeleteChatByIdMutation;
