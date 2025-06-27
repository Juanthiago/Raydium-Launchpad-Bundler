
import { useState } from "react";
import { ConversationList } from "@/components/ConversationList";
import { ChatInterface } from "@/components/ChatInterface";

// Interface que define a estrutura de uma conversa
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
  // Estado que controla qual conversa está selecionada
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  // Função que é chamada quando uma conversa é selecionada na lista
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="flex h-screen">
      {/* Lista de conversas do lado esquerdo */}
      <ConversationList 
        onSelectConversation={handleSelectConversation}
        selectedConversationId={selectedConversation?.id}
      />
      {/* Interface de chat do lado direito */}
      <ChatInterface conversation={selectedConversation} />
    </div>
  );
}
