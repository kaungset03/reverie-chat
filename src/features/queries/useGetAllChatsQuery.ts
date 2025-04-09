import { queryOptions, useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export const allChatsQueryOptions = () =>
  queryOptions({
    queryKey: ["getAllChats"],
    queryFn: async () => {
      const chats = await invoke("get_all_chats").then((res) => res);
      return chats as Chat[];
    },
  });

const useGetAllChatsQuery = () => {
  const { data, isLoading } = useQuery(allChatsQueryOptions());
  return {
    data,
    isLoading,
  };
};
export default useGetAllChatsQuery;
