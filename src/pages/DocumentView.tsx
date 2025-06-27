
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar,
  User,
  Tag,
  Edit,
  Share,
  Download,
  Copy,
  Check
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

// Dados mockados dos documentos (normalmente viria de uma API)
const documents: Document[] = [
  {
    id: '1',
    title: 'Relatório de Análise - Problemas de Entrega',
    type: 'report',
    category: 'Atendimento ao Cliente',
    content: `# Relatório de Análise - Problemas de Entrega

## Resumo Executivo
Durante o último trimestre, identificamos um padrão recorrente de problemas relacionados à entrega de produtos. Este relatório apresenta uma análise detalhada dos incidentes, suas causas raízes e recomendações para melhoria.

## Principais Problemas Identificados

### 1. Atrasos na Entrega
- **Frequência**: 23% das entregas apresentaram atraso superior a 2 dias
- **Principais causas**: 
  - Problemas logísticos com transportadora (45%)
  - Falta de produto em estoque (30%)
  - Endereços incorretos fornecidos pelos clientes (25%)

### 2. Produtos Danificados
- **Frequência**: 8% das entregas apresentaram produtos com avarias
- **Principais causas**:
  - Embalagem inadequada (60%)
  - Manuseio incorreto durante transporte (40%)

## Impacto no Negócio
- Aumento de 15% nas reclamações de clientes
- Redução de 3% na satisfação geral do cliente
- Aumento de custos com reenvios e devoluções

## Recomendações

### Curto Prazo (1-3 meses)
1. **Melhoria na Embalagem**
   - Implementar novo padrão de embalagem para produtos frágeis
   - Treinamento da equipe de expedição

2. **Comunicação Proativa**
   - Implementar sistema de notificações automáticas sobre status da entrega
   - Criar canal direto de comunicação para problemas de entrega

### Médio Prazo (3-6 meses)
1. **Diversificação de Transportadoras**
   - Contratar pelo menos 2 transportadoras adicionais
   - Implementar sistema de backup automático

2. **Melhoria no Controle de Estoque**
   - Implementar sistema de alerta de baixo estoque
   - Melhorar previsão de demanda

## Próximos Passos
1. Apresentar recomendações para a diretoria
2. Definir orçamento para implementação das melhorias
3. Criar cronograma detalhado de implementação
4. Estabelecer métricas de acompanhamento

---
*Relatório elaborado pela equipe de Atendimento ao Cliente em colaboração com Logística e Qualidade.*`,
    author: 'João Silva',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    tags: ['entrega', 'análise', 'trimestral', 'logística', 'qualidade'],
    customer: 'Múltiplos clientes',
    team: 'support'
  },
  {
    id: '2',
    title: 'Ata de Reunião - Alinhamento Comercial',
    type: 'meeting',
    category: 'Comercial',
    content: `# Ata de Reunião - Alinhamento Comercial

**Data**: 08/01/2024  
**Horário**: 14:00 - 16:00  
**Local**: Sala de Reuniões - 3º Andar  

## Participantes
- Pedro Reis (Gerente Comercial)
- Maria Santos (Coordenadora de Vendas)
- Carlos Oliveira (Analista Comercial)
- Ana Costa (Representante Técnico)

## Pauta
1. Revisão de resultados do último semestre
2. Definição de metas para o próximo semestre
3. Estratégias de crescimento
4. Novos produtos e serviços

## Discussões e Decisões

### 1. Resultados do Último Semestre
- **Faturamento**: R$ 2.5M (5% acima da meta)
- **Novos clientes**: 45 (meta era 40)
- **Taxa de conversão**: 18% (manteve estabilidade)

**Pontos positivos identificados**:
- Boa performance da equipe de vendas externa
- Aumento significativo de vendas online
- Melhoria na qualidade dos leads

**Pontos de atenção**:
- Tempo médio de fechamento ainda elevado (45 dias)
- Perda de alguns clientes grandes para concorrência
- Necessidade de melhorar follow-up pós-venda

### 2. Metas para o Próximo Semestre
- **Faturamento**: R$ 3.2M (+28% vs período anterior)
- **Novos clientes**: 60 (+33% vs período anterior)
- **Taxa de conversão**: 22% (+4pp vs período anterior)
- **Ticket médio**: R$ 8.500 (+15% vs período anterior)

### 3. Estratégias de Crescimento

#### 3.1 Expansão de Mercado
- Foco em novos segmentos: saúde e educação
- Contratação de 2 novos vendedores especializados
- Parceria com consultorias especializadas

#### 3.2 Melhoria de Processos
- Implementação de CRM mais robusto
- Automatização de follow-ups
- Criação de materiais de apoio à venda

#### 3.3 Capacitação da Equipe
- Treinamento mensal sobre produtos
- Workshop de técnicas de vendas
- Certificações em metodologias de venda

### 4. Novos Produtos e Serviços
- Lançamento da versão premium do produto principal
- Serviço de consultoria especializada
- Programa de fidelidade para clientes recorrentes

## Ações Definidas

| Ação | Responsável | Prazo |
|------|-------------|-------|
| Contratação de novos vendedores | Pedro Reis | 15/02/2024 |
| Implementação do novo CRM | Carlos Oliveira | 01/03/2024 |
| Desenvolvimento materiais de venda | Maria Santos | 20/02/2024 |
| Estruturação programa fidelidade | Ana Costa | 31/03/2024 |

## Próxima Reunião
**Data**: 05/02/2024  
**Horário**: 14:00  
**Pauta**: Acompanhamento das ações e resultados do primeiro mês

---
*Ata redigida por Carlos Oliveira e aprovada por todos os participantes.*`,
    author: 'Pedro Reis',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    tags: ['reunião', 'vendas', 'estratégia', 'metas', 'comercial'],
    team: 'sales'
  },
  {
    id: '3',
    title: 'Procedimento de Escalabilidade da API',
    type: 'procedure',
    category: 'Técnico',
    content: `# Procedimento de Escalabilidade da API

## Objetivo
Este documento estabelece os procedimentos para escalar a API em situações de alto volume de requisições, garantindo disponibilidade e performance adequadas.

## Quando Aplicar
- Quando o número de requisições por segundo exceder 1.000 RPS
- Quando o tempo de resposta médio ultrapassar 500ms
- Quando a utilização de CPU dos servidores exceder 80%
- Durante eventos promocionais ou picos de tráfego previstos

## Monitoramento e Alertas

### Métricas Principais
- **RPS (Requisições por Segundo)**: Limite normal até 800 RPS
- **Tempo de Resposta**: Média desejável abaixo de 300ms
- **Taxa de Erro**: Máximo aceitável de 0.1%
- **Utilização de Recursos**: CPU < 70%, Memória < 80%

### Alertas Configurados
- **Crítico**: RPS > 1.200 ou Tempo Resposta > 1s
- **Aviso**: RPS > 1.000 ou Tempo Resposta > 500ms
- **Info**: Tendência de crescimento sustentado por 10min

## Procedimentos de Escalabilidade

### Nível 1 - Escalabilidade Horizontal Automática
**Quando**: RPS entre 800-1.200

1. **Auto Scaling Kubernetes**
   \`\`\`bash
   # Verificar status atual dos pods
   kubectl get hpa api-deployment
   
   # Verificar métricas
   kubectl top pods -l app=api
   \`\`\`

2. **Configurações Atuais**
   - Min replicas: 3
   - Max replicas: 10
   - Target CPU: 70%
   - Scale up: +2 pods quando CPU > 70% por 2min
   - Scale down: -1 pod quando CPU < 50% por 5min

### Nível 2 - Escalabilidade Manual
**Quando**: RPS > 1.200 ou auto scaling insuficiente

1. **Aumentar Replicas Manualmente**
   \`\`\`bash
   # Escalar para 15 replicas
   kubectl scale deployment api-deployment --replicas=15
   
   # Verificar status
   kubectl rollout status deployment/api-deployment
   \`\`\`

2. **Otimizar Configurações de Pod**
   \`\`\`yaml
   # Aumentar recursos por pod
   resources:
     requests:
       cpu: 500m
       memory: 1Gi
     limits:
       cpu: 1000m
       memory: 2Gi
   \`\`\`

### Nível 3 - Escalabilidade de Infraestrutura
**Quando**: Limite de recursos do cluster atingido

1. **Adicionar Novos Nós ao Cluster**
   \`\`\`bash
   # AWS EKS
   eksctl scale nodegroup --cluster=prod-cluster --name=api-nodes --nodes=8
   
   # Verificar novos nós
   kubectl get nodes
   \`\`\`

2. **Configurar Load Balancer Adicional**
   - Configurar múltiplas zonas de disponibilidade
   - Implementar circuit breaker
   - Configurar rate limiting por IP/usuário

## Otimizações de Performance

### Database
1. **Connection Pool**
   - Aumentar max connections: 50 → 100
   - Ajustar timeout: 30s → 60s

2. **Cache Redis**
   - Implementar cache de consultas frequentes
   - TTL padrão: 300 segundos
   - Invalidação automática em updates

### Aplicação
1. **Configurações JVM** (se aplicável)
   \`\`\`bash
   -Xms2g -Xmx4g
   -XX:+UseG1GC
   -XX:MaxGCPauseMillis=100
   \`\`\`

2. **Configurações Node.js** (se aplicável)
   \`\`\`bash
   NODE_OPTIONS="--max-old-space-size=4096"
   UV_THREADPOOL_SIZE=16
   \`\`\`

## Rollback e Contingência

### Quando Fazer Rollback
- Taxa de erro > 1% por mais de 2 minutos
- Tempo de resposta > 2s consistentemente
- Indisponibilidade do serviço

### Procedimento de Rollback
1. **Rollback da Aplicação**
   \`\`\`bash
   kubectl rollout undo deployment/api-deployment
   kubectl rollout status deployment/api-deployment
   \`\`\`

2. **Reduzir Replicas**
   \`\`\`bash
   kubectl scale deployment api-deployment --replicas=3
   \`\`\`

3. **Notificar Equipe**
   - Slack: #alerts-prod
   - Email: equipe-devops@empresa.com

## Checklist Pós-Escalabilidade

- [ ] Verificar se todas as replicas estão healthy
- [ ] Confirmar balanceamento de carga funcionando
- [ ] Validar métricas normalizaram
- [ ] Atualizar documentação se necessário
- [ ] Agendar review dos procedimentos

## Contatos de Emergência
- **DevOps**: João Silva (+55 11 99999-9999)
- **SRE**: Maria Santos (+55 11 88888-8888)
- **CTO**: Pedro Costa (+55 11 77777-7777)

---
*Procedimento criado pela equipe de DevOps/SRE - Versão 2.1*
*Última atualização: 10/01/2024*`,
    author: 'Ana Costa',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10',
    tags: ['api', 'escalabilidade', 'performance', 'devops', 'kubernetes'],
    team: 'technical'
  }
];

// Configurações para tipos de documento
const typeConfig = {
  report: { label: 'Relatório', color: 'bg-blue-100 text-blue-800', icon: '📊' },
  meeting: { label: 'Ata de Reunião', color: 'bg-purple-100 text-purple-800', icon: '🤝' },
  observation: { label: 'Observação', color: 'bg-yellow-100 text-yellow-800', icon: '👁️' },
  procedure: { label: 'Procedimento', color: 'bg-green-100 text-green-800', icon: '📋' },
  analysis: { label: 'Análise', color: 'bg-red-100 text-red-800', icon: '🔍' }
};

// Configurações para equipes
const teamConfig = {
  support: { label: 'Suporte', color: 'bg-blue-100 text-blue-800' },
  sales: { label: 'Comercial', color: 'bg-green-100 text-green-800' },
  technical: { label: 'Técnico', color: 'bg-purple-100 text-purple-800' },
  internal: { label: 'Interno', color: 'bg-gray-100 text-gray-800' }
};

export default function DocumentView() {
  const { id } = useParams<{ id: string }>(); // Pega o ID da URL
  const navigate = useNavigate(); // Para navegação programática
  const [document, setDocument] = useState<Document | null>(null);
  const [copied, setCopied] = useState(false); // Estado para feedback de cópia

  // Busca o documento quando o componente carrega
  useEffect(() => {
    if (id) {
      const foundDocument = documents.find(doc => doc.id === id);
      setDocument(foundDocument || null);
    }
  }, [id]);

  // Função para copiar link do documento
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Se documento não encontrado
  if (!document) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Documento não encontrado</h1>
          <p className="text-gray-600 mb-6">O documento solicitado não existe ou foi removido.</p>
          <Button onClick={() => navigate('/documents')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Documentos
          </Button>
        </div>
      </div>
    );
  }

  const type = typeConfig[document.type];
  const team = teamConfig[document.team];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixo com ações */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/documents')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <Badge variant="outline" className={type.color}>
                {type.icon} {type.label}
              </Badge>
              <Badge variant="outline" className={team.color}>
                {team.label}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copiado!' : 'Copiar Link'}
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Baixar
              </Button>
              <Button size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Conteúdo principal do documento */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {document.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Renderiza o conteúdo em markdown-style */}
                <div className="prose prose-lg max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {document.content}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar com informações */}
          <div className="lg:col-span-1 space-y-6">
            {/* Informações do documento */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">
                  Informações do Documento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Autor</p>
                    <p className="text-sm text-gray-600">{document.author}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Criado em</p>
                    <p className="text-sm text-gray-600">{document.createdAt}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Atualizado em</p>
                    <p className="text-sm text-gray-600">{document.updatedAt}</p>
                  </div>
                </div>

                {document.customer && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Cliente</p>
                      <p className="text-sm text-gray-600">{document.customer}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                  <Tag className="h-4 w-4 mr-2" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {document.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documentos relacionados */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">
                  Documentos Relacionados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents
                    .filter(doc => doc.id !== document.id && doc.category === document.category)
                    .slice(0, 3)
                    .map(relatedDoc => (
                      <Link
                        key={relatedDoc.id}
                        to={`/documents/${relatedDoc.id}`}
                        className="block p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {relatedDoc.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          por {relatedDoc.author}
                        </p>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
