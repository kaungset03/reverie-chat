import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { allChatsQueryOptions } from "../queries/useGetAllChatsQuery";

const useCreateNewChatMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (message: string) => {
      const chatId = await invoke("create_new_chat", {
        message: message,
      }).then((res) => res);
      return chatId as string;
    },
    onSuccess: (chatId) => {
      // Invalidate queries to refresh the chat list
      queryClient.invalidateQueries(allChatsQueryOptions());
      navigate({ to: "/chats/$chatId", params: { chatId } });
    },
    onError: (error) => {
      console.error("Error creating new chat:", error);
    },
  });
  return { mutate, isPending };
};
export default useCreateNewChatMutation;
