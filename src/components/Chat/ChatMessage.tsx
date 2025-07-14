import React, { useState } from "react";
import { Message } from "@/data/mockChats";

interface ChatMessageProps {
  message: Message;
  onCreateTask?: (message: Message) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onCreateTask }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative group px-4 py-2 rounded-xl transition-colors max-w-[350px] ${
        message.sender === "me"
          ? "bg-green-400 dark:bg-green-400 ml-auto"
          : "bg-gray-100 dark:bg-neutral-900"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">
          {message.senderName || message.sender}
        </span>
        <span className="text-xs text-gray-400">{message.timestamp}</span>
      </div>
      <div className="text-base">{message.content}</div>
      {onCreateTask && (
        <div
          className={`flex justify-end mt-1 transition-opacity ${
            hovered ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
        >
          <button
            className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-green-400 transition-all"
            onClick={() => onCreateTask(message)}
            aria-label="Criar tarefa"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14m7-7H5" />
            </svg>
            Criar tarefa
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
