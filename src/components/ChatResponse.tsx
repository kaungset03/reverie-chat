import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChatResponseProps = {
  message: ChatMessage;
};

const ChatResponse = ({ message }: ChatResponseProps) => {
  return (
    <div className="min-w-full prose prose-strong:text-foreground text-accent-foreground">
      <Markdown 
        remarkPlugins={[remarkGfm]}
        skipHtml={true}
      >
        {message.content}
      </Markdown>
    </div>
  );
};
export default ChatResponse;
