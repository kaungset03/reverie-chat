import { queryOptions } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

const allChatsQueryOptions = () =>
  queryOptions({
    queryKey: ["getAllChats"],
    queryFn: async () => {
      const chats = await invoke("get_all_chats").then((res) => res);
      return chats as Chat[];
    },
  });

export default allChatsQueryOptions;
