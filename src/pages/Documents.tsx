
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  FileText
} from "lucide-react";
import { DocumentCard } from "@/components/DocumentCard";
import { DocumentStats } from "@/components/DocumentStats";
import { DocumentFilters } from "@/components/DocumentFilters";
import { documents } from "@/data/documents";

// Página principal de documentos - Base de Conhecimento
export default function Documents() {
  // Estados para controle de busca e filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Função para filtrar documentos baseado na busca e categoria
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
      <DocumentStats documents={documents} />

      {/* Barra de busca e filtros */}
      <DocumentFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

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
