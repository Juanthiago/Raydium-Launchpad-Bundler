import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  FileText, 
  Calendar,
  User,
  Download,
  Filter,
  Eye,
  ExternalLink,
  BookOpen
} from "lucide-react";

interface Document {
  id: string;
  title: string;
  type: 'report' | 'meeting' | 'observation' | 'procedure' | 'analysis';
  category: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  customer?: string;
  team: 'support' | 'sales' | 'technical' | 'internal';
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Relatório de Análise - Problemas de Entrega',
    type: 'report',
    category: 'Atendimento ao Cliente',
    content: 'Análise detalhada dos problemas recorrentes de entrega identificados no último trimestre...',
    author: 'João Silva',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    tags: ['entrega', 'análise', 'trimestral'],
    customer: 'Múltiplos clientes',
    team: 'support'
  },
  {
    id: '2',
    title: 'Ata de Reunião - Alinhamento Comercial',
    type: 'meeting',
    category: 'Comercial',
    content: 'Discussão sobre novas estratégias de vendas e metas para o próximo semestre...',
    author: 'Pedro Reis',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    tags: ['reunião', 'vendas', 'estratégia'],
    team: 'sales'
  },
  {
    id: '3',
    title: 'Procedimento de Escalabilidade da API',
    type: 'procedure',
    category: 'Técnico',
    content: 'Documentação dos procedimentos para escalar a API em caso de alto volume de requisições...',
    author: 'Ana Costa',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
    tags: ['api', 'escalabilidade', 'performance'],
    team: 'technical'
  }
];

const typeConfig = {
  report: { label: 'Relatório', color: 'bg-blue-100 text-blue-800', icon: '📊' },
  meeting: { label: 'Ata de Reunião', color: 'bg-purple-100 text-purple-800', icon: '🤝' },
  observation: { label: 'Observação', color: 'bg-yellow-100 text-yellow-800', icon: '👁️' },
  procedure: { label: 'Procedimento', color: 'bg-green-100 text-green-800', icon: '📋' },
  analysis: { label: 'Análise', color: 'bg-red-100 text-red-800', icon: '🔍' }
};

const teamConfig = {
  support: { label: 'Suporte', color: 'bg-blue-100 text-blue-800' },
  sales: { label: 'Comercial', color: 'bg-green-100 text-green-800' },
  technical: { label: 'Técnico', color: 'bg-purple-100 text-purple-800' },
  internal: { label: 'Interno', color: 'bg-gray-100 text-gray-800' }
};

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Componente Card atualizado com link para página individual
  const DocumentCard = ({ document }: { document: Document }) => {
    const type = typeConfig[document.type];
    const team = teamConfig[document.team];

    return (
      <Card className="hover:shadow-md transition-shadow group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-sm font-medium line-clamp-2 flex-1 mr-2">
              <Link 
                to={`/documents/${document.id}`}
                className="hover:text-primary transition-colors"
              >
                {document.title}
              </Link>
            </CardTitle>
            <Badge variant="outline" className={type.color}>
              {type.icon} {type.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {document.content.substring(0, 150)}...
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{document.author}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{document.createdAt}</span>
            </div>
            
            {document.customer && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Cliente:</span>
                <span className="text-xs font-medium">{document.customer}</span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-1 mt-2">
              {document.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {document.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{document.tags.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t">
              <Badge variant="outline" className={`text-xs ${team.color}`}>
                {team.label}
              </Badge>
              
              <div className="flex space-x-1">
                <Link to={`/documents/${document.id}`}>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BookOpen className="h-3 w-3" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const categories = ['all', ...Array.from(new Set(documents.map(doc => doc.category)))];

  return (
    <div className="p-6 space-y-6">
      {/* Header da página */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <FileText className="h-6 w-6 mr-3 text-primary" />
            Base de Conhecimento
          </h1>
          <p className="text-muted-foreground">
            Acesse toda a documentação e conhecimento da empresa
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{documents.length}</p>
                <p className="text-xs text-muted-foreground">Total de Documentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{documents.filter(d => d.type === 'procedure').length}</p>
                <p className="text-xs text-muted-foreground">Procedimentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Array.from(new Set(documents.map(d => d.author))).length}</p>
                <p className="text-xs text-muted-foreground">Autores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {documents.filter(d => {
                    const docDate = new Date(d.createdAt);
                    const thisMonth = new Date();
                    return docDate.getMonth() === thisMonth.getMonth() && 
                           docDate.getFullYear() === thisMonth.getFullYear();
                  }).length}
                </p>
                <p className="text-xs text-muted-foreground">Este Mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de busca e filtros */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar na base de conhecimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros Avançados
        </Button>
      </div>

      {/* Tabs de categorias */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 lg:w-fit">
          <TabsTrigger value="all">
            Todos ({documents.length})
          </TabsTrigger>
          <TabsTrigger value="Atendimento ao Cliente">
            Atendimento ({documents.filter(d => d.category === 'Atendimento ao Cliente').length})
          </TabsTrigger>
          <TabsTrigger value="Comercial">
            Comercial ({documents.filter(d => d.category === 'Comercial').length})
          </TabsTrigger>
          <TabsTrigger value="Técnico">
            Técnico ({documents.filter(d => d.category === 'Técnico').length})
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(document => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum documento encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou criar um novo documento
              </p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}
