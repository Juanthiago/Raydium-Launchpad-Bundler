import React from "react";
import { Chat } from "@/data/mockChats";
import ChatMessage from "./ChatMessage";

interface ChatWindowProps {
  chat: Chat | undefined;
  onCreateTask?: (message: any) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, onCreateTask }) => {
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Selecione uma conversa para começar
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <header className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">{chat.name}</div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 space-y-2 bg-gray-50 dark:bg-neutral-900">
        {chat.messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} onCreateTask={onCreateTask} />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
