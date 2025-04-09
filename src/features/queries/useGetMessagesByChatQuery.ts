import { queryOptions, useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export const messagesByChatQueryOptions = (chatId: string) =>
  queryOptions({
    queryKey: ["getChatMessages", { chatId }],
    queryFn: async () => {
      const messages = await invoke("get_chat_messages", { id: chatId }).then(
        (res) => res
      );
      return messages as Message[];
    },
  });

const useGetMessagesByChatQuery = (chatId: string) => {
  const { data, isLoading } = useQuery(messagesByChatQueryOptions(chatId));
  return { data, isLoading };
};
export default useGetMessagesByChatQuery;
