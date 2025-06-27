
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Documents from "./pages/Documents";
import DocumentView from "./pages/DocumentView";
import Bugs from "./pages/Bugs";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Configuração do cliente para React Query (gerenciamento de estado)
const queryClient = new QueryClient();

const App = () => (
  // Provedor do React Query para toda a aplicação
  <QueryClientProvider client={queryClient}>
    {/* Provedor de tooltips */}
    <TooltipProvider>
      {/* Componentes de notificação */}
      <Toaster />
      <Sonner />
      {/* Roteador da aplicação */}
      <BrowserRouter>
        {/* Provedor da sidebar */}
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            {/* Sidebar de navegação */}
            <AppSidebar />
            {/* Conteúdo principal das páginas */}
            <main className="flex-1">
              <Routes>
                {/* Definição das rotas da aplicação */}
                <Route path="/" element={<Index />} /> {/* Página inicial - Conversas */}
                <Route path="/tasks" element={<Tasks />} /> {/* Página de Tarefas */}
                <Route path="/documents" element={<Documents />} /> {/* Página de Documentos */}
                <Route path="/documents/:id" element={<DocumentView />} /> {/* Página individual do documento */}
                <Route path="/bugs" element={<Bugs />} /> {/* Página de Bugs */}
                <Route path="/settings" element={<Settings />} /> {/* Página de Configurações */}
                <Route path="*" element={<NotFound />} /> {/* Página 404 */}
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
