// get messages by chatId

import { queryOptions } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

const messagesByChatIdQueryOptions = (chatId: string) =>
  queryOptions({
    queryKey: ["getChatMessages", { chatId }],
    queryFn: async () => {
      const messages = await invoke("get_chat_messages", { id: chatId }).then(
        (res) => res
      );
      return messages as Message[];
    },
  });

export default messagesByChatIdQueryOptions;
