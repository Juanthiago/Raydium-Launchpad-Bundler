"use client";
import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import MessageInput from "./MessageInput";
import { mockChats, Chat, Message } from "@/data/mockChats";
import ChatTaskModal from "./modal/ChatTaskModal";

const ChatLayout: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState(mockChats[0]?.id || "");
  const [chats, setChats] = useState<Chat[]>(mockChats);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  const handleSend = (content: string) => {
    if (!selectedChat) return;
    const newMsg: Message = {
      id: `m${selectedChat.messages.length + 1}`,
      sender: "me",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderName: "me",
    };
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMsg] }
          : chat
      )
    );
  };

  const handleCreateTask = (message: Message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className="flex h-full w-full bg-gray-10 dark:bg-neutral-900 rounded-none md:rounded-xl shadow-none md:shadow overflow-hidden">
      <ChatList selectedChatId={selectedChatId} onSelect={setSelectedChatId} />
      <div className="flex flex-col flex-1 min-w-0">
        <ChatWindow chat={selectedChat} onCreateTask={handleCreateTask} />
        <MessageInput onSend={handleSend} disabled={!selectedChat} />
        <ChatTaskModal
          open={modalOpen}
          onOpenChange={handleCloseModal}
          selectedMessage={selectedMessage}
        />
      </div>
    </div>
  );
};

export default ChatLayout;
