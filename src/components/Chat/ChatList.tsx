import React from "react";
import { mockChats, Chat } from "@/data/mockChats";

interface ChatListProps {
  selectedChatId: string;
  onSelect: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ selectedChatId, onSelect }) => {
  return (
    <aside className="w-56 max-w-xs bg-white dark:bg-neutral-950 border-r border-gray-200 dark:border-neutral-800 h-full overflow-y-auto">
      <ul>
        {mockChats.map((chat) => (
          <li
            key={chat.id}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors ${
              selectedChatId === chat.id
                ? "bg-gray-100 dark:bg-neutral-900"
                : ""
            }`}
            onClick={() => onSelect(chat.id)}
          >
            <img
              src={chat.avatar}
              alt={chat.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium">{chat.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
                {chat.messages[chat.messages.length - 1]?.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatList;
