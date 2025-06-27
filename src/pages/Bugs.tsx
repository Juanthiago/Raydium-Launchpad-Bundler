
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Bug, 
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  ExternalLink
} from "lucide-react";

interface BugReport {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  reporter: string;
  createdAt: string;
  updatedAt: string;
  category: 'ui' | 'backend' | 'integration' | 'performance' | 'security';
  jiraTicket?: string;
  steps: string[];
  environment: string;
}

const bugs: BugReport[] = [
  {
    id: '1',
    title: 'Erro ao enviar mensagens longas',
    description: 'Sistema apresenta erro quando mensagens ultrapassam 500 caracteres',
    status: 'open',
    priority: 'high',
    assignee: 'Ana Costa',
    reporter: 'João Silva',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    category: 'backend',
    steps: [
      'Abrir conversa com cliente',
      'Digitar mensagem com mais de 500 caracteres',
      'Tentar enviar mensagem',
      'Observar erro no console'
    ],
    environment: 'Produção'
  },
  {
    id: '2',
    title: 'Interface de tarefas não carrega em mobile',
    description: 'Tela de tarefas apresenta layout quebrado em dispositivos móveis',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Pedro Reis',
    reporter: 'Maria Oliveira',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-11',
    category: 'ui',
    jiraTicket: 'CONV-123',
    steps: [
      'Acessar sistema via mobile',
      'Navegar para aba Tarefas',
      'Observar layout quebrado'
    ],
    environment: 'Homologação'
  },
  {
    id: '3',
    title: 'Lentidão na sincronização com WhatsApp',
    description: 'Demora excessiva para sincronizar mensagens do WhatsApp',
    status: 'resolved',
    priority: 'critical',
    assignee: 'Ana Costa',
    reporter: 'João Silva',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-10',
    category: 'integration',
    jiraTicket: 'CONV-121',
    steps: [
      'Receber mensagem no WhatsApp',
      'Aguardar sincronização',
      'Observar tempo de resposta > 30s'
    ],
    environment: 'Produção'
  }
];

const priorityConfig = {
  low: { label: 'Baixa', color: 'bg-green-100 text-green-800', icon: '🟢' },
  medium: { label: 'Média', color: 'bg-yellow-100 text-yellow-800', icon: '🟡' },
  high: { label: 'Alta', color: 'bg-orange-100 text-orange-800', icon: '🟠' },
  critical: { label: 'Crítica', color: 'bg-red-100 text-red-800', icon: '🔴' }
};

const statusConfig = {
  open: { label: 'Aberto', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  'in-progress': { label: 'Em Progresso', color: 'bg-blue-100 text-blue-800', icon: Clock },
  resolved: { label: 'Resolvido', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  closed: { label: 'Fechado', color: 'bg-gray-100 text-gray-800', icon: CheckCircle }
};

const categoryConfig = {
  ui: { label: 'Interface', color: 'bg-purple-100 text-purple-800' },
  backend: { label: 'Backend', color: 'bg-blue-100 text-blue-800' },
  integration: { label: 'Integração', color: 'bg-green-100 text-green-800' },
  performance: { label: 'Performance', color: 'bg-yellow-100 text-yellow-800' },
  security: { label: 'Segurança', color: 'bg-red-100 text-red-800' }
};

export default function Bugs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || bug.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const BugCard = ({ bug }: { bug: BugReport }) => {
    const priority = priorityConfig[bug.priority];
    const status = statusConfig[bug.status];
    const category = categoryConfig[bug.category];
    const StatusIcon = status.icon;

    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium line-clamp-2 flex-1 mr-2">
              {bug.title}
            </CardTitle>
            <div className="flex space-x-1">
              <Badge variant="outline" className={priority.color}>
                {priority.icon}
              </Badge>
              <Badge variant="outline" className={status.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {bug.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Responsável:</span>
                <span className="text-xs font-medium">{bug.assignee}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{bug.createdAt}</span>
              </div>
              <Badge variant="outline" className={`text-xs ${category.color}`}>
                {category.label}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="text-xs text-muted-foreground">
                Ambiente: <span className="font-medium">{bug.environment}</span>
              </div>
              
              {bug.jiraTicket && (
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {bug.jiraTicket}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const getStatusCounts = () => {
    return {
      all: bugs.length,
      open: bugs.filter(b => b.status === 'open').length,
      'in-progress': bugs.filter(b => b.status === 'in-progress').length,
      resolved: bugs.filter(b => b.status === 'resolved').length,
      closed: bugs.filter(b => b.status === 'closed').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Controle de Bugs</h1>
          <p className="text-muted-foreground">
            Reporte, acompanhe e resolva bugs do sistema
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Sincronizar Jira
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Reportar Bug
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar bugs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-5 lg:w-fit">
          <TabsTrigger value="all">
            Todos ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="open">
            Abertos ({statusCounts.open})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            Em Progresso ({statusCounts['in-progress']})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolvidos ({statusCounts.resolved})
          </TabsTrigger>
          <TabsTrigger value="closed">
            Fechados ({statusCounts.closed})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBugs.map(bug => (
              <BugCard key={bug.id} bug={bug} />
            ))}
          </div>

          {filteredBugs.length === 0 && (
            <div className="text-center py-12">
              <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum bug encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou reporte um novo bug
              </p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
