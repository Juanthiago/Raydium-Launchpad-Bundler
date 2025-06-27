
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter
} from "lucide-react";

interface DocumentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

// Componente para filtros e busca de documentos
export function DocumentFilters({ searchTerm, onSearchChange }: DocumentFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar na base de conhecimento..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        Filtros Avançados
      </Button>
    </div>
  );
}
