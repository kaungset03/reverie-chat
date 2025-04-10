import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { invoke } from "@tauri-apps/api/core";
import { allChatsQueryOptions } from "@/features/queries/useGetAllChatsQuery";

const useDeleteAllChatsMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        await invoke("delete_all_chats", {});
      } catch (error) {
        throw new Error(error as string);
      }
    },
    onSuccess: () => {
      // invalidate chat queries and navigate to the home page
      queryClient.invalidateQueries(allChatsQueryOptions());
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error("Error deleting all chats:", error);
    },
  });
  return { mutate, isPending };
};
export default useDeleteAllChatsMutation;
