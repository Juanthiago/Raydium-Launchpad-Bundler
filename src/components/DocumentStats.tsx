
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  BookOpen,
  User,
  Calendar
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

interface DocumentStatsProps {
  documents: Document[];
}

// Componente para exibir estatísticas dos documentos
export function DocumentStats({ documents }: DocumentStatsProps) {
  // Calcula estatísticas dos documentos
  const totalDocuments = documents.length;
  const procedureCount = documents.filter(d => d.type === 'procedure').length;
  const authorCount = Array.from(new Set(documents.map(d => d.author))).length;
  const thisMonthCount = documents.filter(d => {
    const docDate = new Date(d.createdAt);
    const thisMonth = new Date();
    return docDate.getMonth() === thisMonth.getMonth() && 
           docDate.getFullYear() === thisMonth.getFullYear();
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalDocuments}</p>
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
              <p className="text-2xl font-bold">{procedureCount}</p>
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
              <p className="text-2xl font-bold">{authorCount}</p>
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
              <p className="text-2xl font-bold">{thisMonthCount}</p>
              <p className="text-xs text-muted-foreground">Este Mês</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
