
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  timestamp: string;
  status: 'open' | 'waiting' | 'resolved' | 'internal';
  unreadCount: number;
  assignedTo: string;
  team: 'support' | 'sales' | 'technical';
  avatar?: string;
}

const conversations: Conversation[] = [
  {
    id: '1',
    customerName: 'Maria Santos',
    customerPhone: '+55 11 99999-0001',
    lastMessage: 'Preciso de ajuda com meu pedido #12345',
    timestamp: '10:30',
    status: 'open',
    unreadCount: 3,
    assignedTo: 'João Silva',
    team: 'support'
  },
  {
    id: '2',
    customerName: 'Carlos Lima',
    customerPhone: '+55 11 99999-0002',
    lastMessage: 'Obrigado pelo atendimento!',
    timestamp: '09:45',
    status: 'resolved',
    unreadCount: 0,
    assignedTo: 'Ana Costa',
    team: 'support'
  },
  {
    id: '3',
    customerName: 'Tech Team',
    customerPhone: 'internal',
    lastMessage: '@joao precisa verificar o bug do checkout',
    timestamp: '11:15',
    status: 'internal',
    unreadCount: 1,
    assignedTo: 'Sistema',
    team: 'technical'
  },
  {
    id: '4',
    customerName: 'Roberto Silva',
    customerPhone: '+55 11 99999-0003',
    lastMessage: 'Aguardando retorno sobre o orçamento',
    timestamp: '08:20',
    status: 'waiting',
    unreadCount: 0,
    assignedTo: 'Pedro Reis',
    team: 'sales'
  }
];

const statusConfig = {
  open: { label: 'Aberto', icon: MessageSquare, color: 'bg-blue-500' },
  waiting: { label: 'Aguardando', icon: Clock, color: 'bg-yellow-500' },
  resolved: { label: 'Resolvido', icon: CheckCircle, color: 'bg-green-500' },
  internal: { label: 'Interno', icon: AlertCircle, color: 'bg-purple-500' }
};

const teamConfig = {
  support: { label: 'Suporte', color: 'bg-blue-100 text-blue-800' },
  sales: { label: 'Comercial', color: 'bg-green-100 text-green-800' },
  technical: { label: 'Técnico', color: 'bg-purple-100 text-purple-800' }
};

interface ConversationListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export function ConversationList({ onSelectConversation, selectedConversationId }: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = selectedTeam === 'all' || conv.team === selectedTeam;
    const matchesStatus = selectedStatus === 'all' || conv.status === selectedStatus;
    
    return matchesSearch && matchesTeam && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      all: conversations.length,
      open: conversations.filter(c => c.status === 'open').length,
      waiting: conversations.filter(c => c.status === 'waiting').length,
      resolved: conversations.filter(c => c.status === 'resolved').length,
      internal: conversations.filter(c => c.status === 'internal').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Conversas</h2>
          <Button size="sm" className="h-8">
            <MessageSquare className="h-4 w-4 mr-1" />
            Nova
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <Select value={selectedTeam} onValueChange={setSelectedTeam}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os times</SelectItem>
                <SelectItem value="support">Suporte</SelectItem>
                <SelectItem value="sales">Comercial</SelectItem>
                <SelectItem value="technical">Técnico</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 m-4 mb-0">
          <TabsTrigger value="all" className="text-xs">
            Todas ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="open" className="text-xs">
            Abertas ({statusCounts.open})
          </TabsTrigger>
          <TabsTrigger value="internal" className="text-xs">
            Internas ({statusCounts.internal})
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => {
              const status = statusConfig[conversation.status];
              const team = teamConfig[conversation.team];
              const isSelected = selectedConversationId === conversation.id;
              
              return (
                <div
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation)}
                  className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                    isSelected ? 'bg-primary/10 border border-primary/30' : 'bg-background'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback className="bg-muted">
                          {conversation.customerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${status.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate text-sm">
                          {conversation.customerName}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={`text-xs ${team.color}`}>
                          {team.label}
                        </Badge>
                        
                        {conversation.unreadCount > 0 && (
                          <Badge className="h-5 min-w-5 text-xs bg-primary">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
