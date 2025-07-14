import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Message } from "@/data/mockChats";
import { Button } from "@/components/ui/button";

interface CreateTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMessage: Message | null;
}

const ChatTaskModal = ({
  open,
  onOpenChange,
  selectedMessage,
}: CreateTaskModalProps) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: undefined as Date | undefined,
    reporter: "",
    assignee: "",
    team: "",
    createdDate: new Date(),
    updatedDate: new Date(),
    status: "To Do",
  });

  useEffect(() => {
    if (selectedMessage && open) {
      setTaskData((prev) => ({
        ...prev,
        title: `Tarefa relacionada à mensagem ${selectedMessage.id}`,
        description: `Descrição da tarefa relacionada à mensagem: ${selectedMessage.content}\n\nEnviada em: ${selectedMessage.timestamp}`,
        reporter: selectedMessage.sender,
        createdDate: new Date(),
        updatedDate: new Date(),
        status: "To Do",
      }));
    }
  }, [selectedMessage, open]);

  const handleClose = () => onOpenChange(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode salvar a tarefa

    setTaskData({
      title: "",
      description: "",
      priority: "",
      dueDate: undefined,
      reporter: "",
      assignee: "",
      team: "",
      createdDate: new Date(),
      updatedDate: new Date(),
      status: "To Do",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Tarefa</DialogTitle>
          <DialogDescription>Insira os dados da tarefa</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedMessage && (
            <>
              <div className="bg-muted/50 p-4 rounded-lg border border-muted">
                <div className="text-sm font-medium text-muted-foreground mb-1">
                  Baseado na mensagem de {selectedMessage.sender}:
                </div>
                <div className="text-sm bg-background p-2 rounded border">
                  "{selectedMessage.content}"
                  <div className="text-xs text-muted-foreground mt-1">
                    Enviado em: {selectedMessage.timestamp}
                  </div>
                </div>
              </div>

              {/* Restante do formulário aqui (title, description, selects, etc.) */}
              {/* ... insira os campos conforme já tinha feito */}
              {/* Para economizar espaço, você pode manter o conteúdo que já criou corretamente aqui */}
            </>
          )}

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!taskData.title.trim()}>
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatTaskModal;
