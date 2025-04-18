import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

type ChatResponseProps = {
  message: string;
};

const ChatResponse = ({ message }: ChatResponseProps) => {
  return (
    <div className="min-w-full prose prose-strong:text-foreground text-accent-foreground">
      <Markdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            // The 'node' prop is not used by SyntaxHighlighter and can cause type issues
            // The 'ref' prop from Markdown might be incompatible, so we don't spread it.
            const { ref, ...rest } = props;
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={dark}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        skipHtml={false}
      >
        {message}
      </Markdown>
    </div>
  );
};
export default ChatResponse;
