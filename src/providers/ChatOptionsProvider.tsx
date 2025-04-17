import { createContext, useContext, useState } from "react";

type ChatOptionsProviderProps = {
  children: React.ReactNode;
  defaultModel?: string;
  storageKey?: string;
};

type ChatOptions = {
  model?: string;
  temperature: number;
};

type ChatOptionsProviderState = {
  chatOptions: ChatOptions;
  handleChatOptions: (options: ChatOptions) => void;
};

const initialState: ChatOptionsProviderState = {
  chatOptions: {
    temperature: 0.0,
  },
  handleChatOptions: () => null,
};

const ChatOptionsProviderContext =
  createContext<ChatOptionsProviderState>(initialState);

export function ChatOptionsProvider({
  children,
  defaultModel,
  storageKey = "chat-options",
  ...props
}: ChatOptionsProviderProps) {
  const defaultOptions: ChatOptions = {
    model: defaultModel,
    temperature: 0.0,
  };
  const stored = localStorage.getItem(storageKey);
  const initialOptions: ChatOptions = stored
    ? (JSON.parse(stored) as ChatOptions)
    : defaultOptions;

  const [options, setOptions] = useState<ChatOptions>(initialOptions);

  const handleChatOptions = (options: ChatOptions) => {
    localStorage.setItem(storageKey, JSON.stringify(options));
    setOptions(options);
  };

  const value: ChatOptionsProviderState = {
    chatOptions: options,
    handleChatOptions,
  };

  return (
    <ChatOptionsProviderContext.Provider {...props} value={value}>
      {children}
    </ChatOptionsProviderContext.Provider>
  );
}

export const useChatOptions = () => {
  const context = useContext(ChatOptionsProviderContext);
  if (context === undefined) {
    throw new Error("useChatOptions must be used within a ChatOptionsProvider");
  }

  return context;
};
