
import { useState } from "react";
import { ConversationList } from "@/components/ConversationList";
import { ChatInterface } from "@/components/ChatInterface";

interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  timestamp: string;
  status: string;
  unreadCount: number;
  assignedTo: string;
  team: string;
}

export default function Index() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="flex h-screen">
      <ConversationList 
        onSelectConversation={handleSelectConversation}
        selectedConversationId={selectedConversation?.id}
      />
      <ChatInterface conversation={selectedConversation} />
    </div>
  );
}
