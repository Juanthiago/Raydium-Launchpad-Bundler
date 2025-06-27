
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Calendar, 
  User, 
  Clock,
  CheckSquare,
  AlertCircle,
  Filter
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  customer: string;
  team: 'support' | 'sales' | 'technical';
  createdAt: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Investigar problema de entrega',
    description: 'Cliente Maria Santos reportou atraso na entrega do pedido #12345',
    status: 'todo',
    priority: 'high',
    assignee: 'João Silva',
    dueDate: '2024-01-15',
    customer: 'Maria Santos',
    team: 'support',
    createdAt: '2024-01-10'
  },
  {
    id: '2',
    title: 'Preparar proposta comercial',
    description: 'Elaborar proposta personalizada para cliente corporativo',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Pedro Reis',
    dueDate: '2024-01-18',
    customer: 'Empresa XYZ',
    team: 'sales',
    createdAt: '2024-01-12'
  },
  {
    id: '3',
    title: 'Atualizar documentação da API',
    description: 'Documentar novos endpoints da API de integração',
    status: 'done',
    priority: 'low',
    assignee: 'Ana Costa',
    dueDate: '2024-01-12',
    customer: 'Sistema Interno',
    team: 'technical',
    createdAt: '2024-01-08'
  }
];

const priorityConfig = {
  low: { label: 'Baixa', color: 'bg-green-100 text-green-800', icon: '🟢' },
  medium: { label: 'Média', color: 'bg-yellow-100 text-yellow-800', icon: '🟡' },
  high: { label: 'Alta', color: 'bg-red-100 text-red-800', icon: '🔴' }
};

const statusConfig = {
  todo: { label: 'A Fazer', color: 'bg-gray-100 text-gray-800' },
  'in-progress': { label: 'Em Andamento', color: 'bg-blue-100 text-blue-800' },
  done: { label: 'Concluído', color: 'bg-green-100 text-green-800' }
};

const teamConfig = {
  support: { label: 'Suporte', color: 'bg-blue-100 text-blue-800' },
  sales: { label: 'Comercial', color: 'bg-green-100 text-green-800' },
  technical: { label: 'Técnico', color: 'bg-purple-100 text-purple-800' }
};

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getTasksByStatus = (status: string) => {
    return status === 'all' ? filteredTasks : filteredTasks.filter(task => task.status === status);
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const priority = priorityConfig[task.priority];
    const status = statusConfig[task.status];
    const team = teamConfig[task.team];

    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium line-clamp-2">
              {task.title}
            </CardTitle>
            <Badge variant="outline" className={priority.color}>
              {priority.icon} {priority.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task.customer}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task.dueDate}</span>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                    {task.assignee.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{task.assignee}</span>
              </div>
              
              <Badge variant="outline" className={`text-xs ${team.color}`}>
                {team.label}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Tarefas</h1>
          <p className="text-muted-foreground">
            Organize e acompanhe todas as tarefas da equipe
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tarefas..."
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
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">
            Todas ({tasks.length})
          </TabsTrigger>
          <TabsTrigger value="todo">
            A Fazer ({tasks.filter(t => t.status === 'todo').length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            Em Andamento ({tasks.filter(t => t.status === 'in-progress').length})
          </TabsTrigger>
          <TabsTrigger value="done">
            Concluídas ({tasks.filter(t => t.status === 'done').length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {selectedStatus === 'all' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">A Fazer</h3>
                  <Badge variant="secondary">
                    {getTasksByStatus('todo').length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {getTasksByStatus('todo').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <h3 className="text-sm font-medium">Em Andamento</h3>
                  <Badge variant="secondary">
                    {getTasksByStatus('in-progress').length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {getTasksByStatus('in-progress').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <CheckSquare className="h-4 w-4 text-green-500" />
                  <h3 className="text-sm font-medium">Concluído</h3>
                  <Badge variant="secondary">
                    {getTasksByStatus('done').length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {getTasksByStatus('done').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {getTasksByStatus(selectedStatus).map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma tarefa encontrada</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou criar uma nova tarefa
              </p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
