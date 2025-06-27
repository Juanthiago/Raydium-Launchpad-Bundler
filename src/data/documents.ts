
// Interface para definir a estrutura de um documento
export interface Document {
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

// Dados mock dos documentos
export const documents: Document[] = [
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
