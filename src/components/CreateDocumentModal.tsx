
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

interface CreateDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageId: string | null;
  conversationId: string;
}

export function CreateDocumentModal({ open, onOpenChange, messageId, conversationId }: CreateDocumentModalProps) {
  const [documentData, setDocumentData] = useState({
    title: '',
    type: '',
    content: '',
    category: '',
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating document:', documentData, 'for message:', messageId, 'conversation:', conversationId);
    
    // Reset form
    setDocumentData({
      title: '',
      type: '',
      content: '',
      category: '',
      tags: '',
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Criar Novo Documento</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doc-title">Título do Documento *</Label>
            <Input
              id="doc-title"
              placeholder="Digite o título do documento..."
              value={documentData.title}
              onChange={(e) => setDocumentData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Documento</Label>
              <Select value={documentData.type} onValueChange={(value) => setDocumentData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="report">Relatório</SelectItem>
                  <SelectItem value="meeting">Ata de Reunião</SelectItem>
                  <SelectItem value="observation">Observação</SelectItem>
                  <SelectItem value="procedure">Procedimento</SelectItem>
                  <SelectItem value="analysis">Análise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={documentData.category} onValueChange={(value) => setDocumentData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer-service">Atendimento ao Cliente</SelectItem>
                  <SelectItem value="technical">Técnico</SelectItem>
                  <SelectItem value="sales">Comercial</SelectItem>
                  <SelectItem value="internal">Interno</SelectItem>
                  <SelectItem value="training">Treinamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo *</Label>
            <Textarea
              id="content"
              placeholder="Digite o conteúdo do documento..."
              value={documentData.content}
              onChange={(e) => setDocumentData(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Separe as tags por vírgula (ex: urgente, cliente-vip, bug)"
              value={documentData.tags}
              onChange={(e) => setDocumentData(prev => ({ ...prev, tags: e.target.value }))}
            />
            <p className="text-xs text-muted-foreground">
              Use tags para facilitar a busca e organização dos documentos
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!documentData.title.trim() || !documentData.content.trim()}>
              Criar Documento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
