
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Plus, 
  Paperclip, 
  MoreVertical, 
  FileText, 
  CheckSquare,
  User,
  Clock,
  Phone,
  MessageSquare
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateTaskModal } from "./CreateTaskModal";
import { CreateDocumentModal } from "./CreateDocumentModal";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'customer' | 'agent' | 'internal';
  senderName: string;
  isInternal?: boolean;
  mentions?: string[];
}

interface ChatInterfaceProps {
  conversation?: {
    id: string;
    customerName: string;
    customerPhone: string;
    status: string;
    assignedTo: string;
    team: string;
  } | null;
}

const messages: Message[] = [
  {
    id: '1',
    content: 'Olá! Preciso de ajuda com meu pedido #12345. O produto ainda não chegou.',
    timestamp: '10:15',
    sender: 'customer',
    senderName: 'Maria Santos'
  },
  {
    id: '2',
    content: 'Olá Maria! Vou verificar o status do seu pedido. Pode me informar seu CPF para localizar mais rapidamente?',
    timestamp: '10:16',
    sender: 'agent',
    senderName: 'João Silva'
  },
  {
    id: '3',
    content: '@joao, vi que este cliente teve problema similar na semana passada. Vou criar uma task para investigar.',
    timestamp: '10:17',
    sender: 'internal',
    senderName: 'Ana Costa',
    isInternal: true,
    mentions: ['joao']
  },
  {
    id: '4',
    content: 'Meu CPF é 123.456.789-00',
    timestamp: '10:18',
    sender: 'customer',
    senderName: 'Maria Santos'
  }
];

export function ChatInterface({ conversation }: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showInternalMessages, setShowInternalMessages] = useState(true);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleMessageAction = (messageId: string, action: 'task' | 'document') => {
    const message = messages.find(m => m.id === messageId);
    setSelectedMessage(message || null);
    if (action === 'task') {
      setShowTaskModal(true);
    } else {
      setShowDocumentModal(true);
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Selecione uma conversa</h3>
          <p className="text-muted-foreground">
            Escolha uma conversa da lista para começar a atender
          </p>
        </div>
      </div>
    );
  }

  const filteredMessages = showInternalMessages 
    ? messages 
    : messages.filter(m => !m.isInternal);

  return (
    <div className="flex-1 flex flex-col chat-container">
      {/* Header */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {conversation.customerName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{conversation.customerName}</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{conversation.customerPhone}</span>
                <Badge variant="outline" className="text-xs">
                  {conversation.team}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={showInternalMessages ? "default" : "outline"}
              size="sm"
              onClick={() => setShowInternalMessages(!showInternalMessages)}
            >
              Internas
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-1" />
              {conversation.assignedTo}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver histórico</DropdownMenuItem>
                <DropdownMenuItem>Transferir conversa</DropdownMenuItem>
                <DropdownMenuItem>Fechar conversa</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'} group`}
          >
            <div className="flex space-x-2 max-w-[70%]">
              {message.sender !== 'agent' && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className={
                    message.isInternal 
                      ? "bg-purple-100 text-purple-600" 
                      : "bg-muted"
                  }>
                    {message.senderName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className="space-y-1">
                <div className={`message-bubble ${
                  message.sender === 'agent' 
                    ? 'message-sent' 
                    : message.isInternal
                      ? 'bg-purple-50 border border-purple-200'
                      : 'message-received'
                }`}>
                  {message.isInternal && (
                    <div className="text-xs text-purple-600 font-medium mb-1">
                      Mensagem interna
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{message.senderName}</span>
                  <span>•</span>
                  <span>{message.timestamp}</span>
                  <Clock className="h-3 w-3" />
                  
                  {/* Action buttons */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2"
                      onClick={() => handleMessageAction(message.id, 'task')}
                    >
                      <CheckSquare className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2"
                      onClick={() => handleMessageAction(message.id, 'document')}
                    >
                      <FileText className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="resize-none"
            />
          </div>
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modals */}
      <CreateTaskModal
        open={showTaskModal}
        onOpenChange={setShowTaskModal}
        selectedMessage={selectedMessage}
        conversationId={conversation.id}
      />
      
      <CreateDocumentModal
        open={showDocumentModal}
        onOpenChange={setShowDocumentModal}
        messageId={selectedMessage?.id || null}
        conversationId={conversation.id}
      />
    </div>
  );
}
