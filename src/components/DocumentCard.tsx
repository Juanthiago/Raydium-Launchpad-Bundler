
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  User,
  Download,
  BookOpen
} from "lucide-react";

// Interface para definir a estrutura de um documento
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

// Configurações de tipos de documentos com cores e ícones
const typeConfig = {
  report: { label: 'Relatório', color: 'bg-blue-100 text-blue-800', icon: '📊' },
  meeting: { label: 'Ata de Reunião', color: 'bg-purple-100 text-purple-800', icon: '🤝' },
  observation: { label: 'Observação', color: 'bg-yellow-100 text-yellow-800', icon: '👁️' },
  procedure: { label: 'Procedimento', color: 'bg-green-100 text-green-800', icon: '📋' },
  analysis: { label: 'Análise', color: 'bg-red-100 text-red-800', icon: '🔍' }
};

// Configurações de equipes com cores
const teamConfig = {
  support: { label: 'Suporte', color: 'bg-blue-100 text-blue-800' },
  sales: { label: 'Comercial', color: 'bg-green-100 text-green-800' },
  technical: { label: 'Técnico', color: 'bg-purple-100 text-purple-800' },
  internal: { label: 'Interno', color: 'bg-gray-100 text-gray-800' }
};

interface DocumentCardProps {
  document: Document;
}

// Componente para exibir um card individual de documento
export function DocumentCard({ document }: DocumentCardProps) {
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
}
