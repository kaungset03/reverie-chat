import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import OptionsDropdown from "@/components/OptionsDropdown";
import useGetAllChatsQuery from "@/features/queries/useGetAllChatsQuery";

type ConversationsListProps = {
  isExpanded: boolean;
};

const ConversationsList = ({ isExpanded }: ConversationsListProps) => {
  const { data } = useGetAllChatsQuery();

  return (
    <ul
      className={`flex flex-col gap-y-1 w-full h-full overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-foreground ${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
    >
      {data?.map((c) => (
        <li
          key={c.id}
          className="w-full flex items-center justify-between relative group"
        >
          <Link
            to={`/chats/$chatId`}
            params={{ chatId: c.id }}
            activeProps={{className: "bg-accent text-accent-foreground"}}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium w-full h-11 rounded-full px-1 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="w-8/10 whitespace-nowrap overflow-hidden text-ellipsis">
              {c.title}
            </span>
          </Link>
          <OptionsDropdown chat={c} />
        </li>
      ))}
    </ul>
  );
};
export default ConversationsList;
