export type TourModuleId = "societaria" | "sgc" | "escalas";

export type TourAccent = "blue" | "orange" | "purple";

export type TourScreenLayout = "kpis" | "table" | "list" | "grid";

export type TourStatusTone = "ok" | "warn" | "danger" | "neutral";

export type TourHotspot = {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  benefit: string;
};

export type TourKpi = {
  label: string;
  value: string;
  tone?: TourStatusTone;
};

export type TourRow = {
  primary: string;
  secondary: string;
  status?: string;
  statusTone?: TourStatusTone;
};

export type TourScreen = {
  id: string;
  label: string;
  title: string;
  layout: TourScreenLayout;
  kpis?: TourKpi[];
  rows?: TourRow[];
  hotspots: TourHotspot[];
};

export type TourModule = {
  id: TourModuleId;
  label: string;
  shortLabel: string;
  accent: TourAccent;
  description: string;
  screens: TourScreen[];
};

export const TOUR_SECTION = {
  heading: "Visão completa em um único painel",
  description:
    "Dashboard intuitivo com indicadores-chave, alertas de vencimento e acompanhamento financeiro em tempo real. Tome decisões com base em dados, não em suposições.",
  hint: "Clique nos pontos para saber mais",
  cta: "Agendar demo deste módulo",
} as const;

export const TOUR_ACCENT_HEX: Record<TourAccent, string> = {
  blue: "#4d7cff",
  orange: "#22d3ee",
  purple: "#b456ff",
};

export const TOUR_MODULES: TourModule[] = [
  {
    id: "societaria",
    label: "Gestão Societária",
    shortLabel: "Societária",
    accent: "blue",
    description:
      "Quadro societário, atos, procurações e documentos com rastreabilidade completa.",
    screens: [
      {
        id: "quadro",
        label: "Quadro societário",
        title: "Composição societária",
        layout: "kpis",
        kpis: [
          { label: "Sócios ativos", value: "8", tone: "ok" },
          { label: "Empresas do grupo", value: "3", tone: "neutral" },
          { label: "Capital social", value: "R$ 2,4M", tone: "neutral" },
          { label: "Docs a vencer", value: "2", tone: "warn" },
        ],
        rows: [
          {
            primary: "Ana Ribeiro",
            secondary: "Administradora · 40%",
            status: "Ativo",
            statusTone: "ok",
          },
          {
            primary: "Holding Norte Ltda.",
            secondary: "Cotista · 35%",
            status: "Ativo",
            statusTone: "ok",
          },
          {
            primary: "Carlos Mendes",
            secondary: "Investidor · 25%",
            status: "Ativo",
            statusTone: "ok",
          },
        ],
        hotspots: [
          {
            id: "soc-kpi",
            x: 28,
            y: 22,
            title: "Visão consolidada",
            description:
              "Indicadores do grupo em um painel: sócios, capital e documentos críticos.",
            benefit: "Decisões societárias com dados atualizados, sem planilhas.",
          },
          {
            id: "soc-list",
            x: 55,
            y: 58,
            title: "Quadro atualizado",
            description:
              "Participações, tipo de sócio e percentual sempre sincronizados.",
            benefit: "Rastreabilidade completa para auditorias e due diligence.",
          },
        ],
      },
      {
        id: "atos",
        label: "Atos societários",
        title: "Atos e alterações",
        layout: "table",
        rows: [
          {
            primary: "Alteração contratual nº 14",
            secondary: "Aumento de capital · 12/03/2026",
            status: "Assinado",
            statusTone: "ok",
          },
          {
            primary: "Ata de assembleia",
            secondary: "Deliberação de diretoria · 28/02/2026",
            status: "Pendente",
            statusTone: "warn",
          },
          {
            primary: "Entrada de sócio",
            secondary: "Carlos Mendes · 15/01/2026",
            status: "Registrado",
            statusTone: "ok",
          },
        ],
        hotspots: [
          {
            id: "soc-atos",
            x: 48,
            y: 42,
            title: "Histórico versionado",
            description:
              "Cada ato com documentos, responsáveis e linha do tempo.",
            benefit: "Nunca perca o rastro de uma alteração contratual.",
          },
          {
            id: "soc-assinatura",
            x: 82,
            y: 28,
            title: "Status de assinatura",
            description:
              "Acompanhe pendências e documentos aguardando assinatura digital.",
            benefit: "Menos follow-up manual entre jurídico e diretoria.",
          },
        ],
      },
      {
        id: "procuracoes",
        label: "Procurações",
        title: "Procurações e vigência",
        layout: "list",
        rows: [
          {
            primary: "Procuração bancária — Ana Ribeiro",
            secondary: "Vence em 18 dias",
            status: "Atenção",
            statusTone: "warn",
          },
          {
            primary: "Representação comercial — Holding Norte",
            secondary: "Vigente até 12/2026",
            status: "OK",
            statusTone: "ok",
          },
          {
            primary: "Poderes judiciais — Carlos Mendes",
            secondary: "Venceu há 3 dias",
            status: "Vencida",
            statusTone: "danger",
          },
        ],
        hotspots: [
          {
            id: "soc-alerta",
            x: 72,
            y: 32,
            title: "Alertas de vencimento",
            description:
              "Notificações automáticas para renovação de procurações e documentos.",
            benefit: "Evite operar com poderes vencidos ou irregularidades.",
          },
          {
            id: "soc-poderes",
            x: 35,
            y: 62,
            title: "Controle de poderes",
            description:
              "Vigência, poderes concedidos e documentos vinculados em um só lugar.",
            benefit: "Segurança jurídica no dia a dia da operação.",
          },
        ],
      },
      {
        id: "documentos",
        label: "Documentos",
        title: "Documentos corporativos",
        layout: "grid",
        rows: [
          {
            primary: "Contrato social",
            secondary: "Versão 14 · válido",
            status: "OK",
            statusTone: "ok",
          },
          {
            primary: "CNPJ / cartão",
            secondary: "Atualizado 2026",
            status: "OK",
            statusTone: "ok",
          },
          {
            primary: "Alvará municipal",
            secondary: "Vence em 40 dias",
            status: "Atenção",
            statusTone: "warn",
          },
          {
            primary: "Certidão FGTS",
            secondary: "Renovação necessária",
            status: "Crítico",
            statusTone: "danger",
          },
        ],
        hotspots: [
          {
            id: "soc-docs",
            x: 40,
            y: 45,
            title: "Arquivo organizado",
            description:
              "Contrato social, estatuto, certidões e alvarás por empresa.",
            benefit: "Acesse qualquer documento corporativo em segundos.",
          },
          {
            id: "soc-validade",
            x: 75,
            y: 55,
            title: "Controle de validade",
            description:
              "Semáforo visual para documentos próximos do vencimento.",
            benefit: "Conformidade contínua sem caça a pastas no drive.",
          },
        ],
      },
    ],
  },
  {
    id: "sgc",
    label: "SGC — Contratos",
    shortLabel: "SGC",
    accent: "orange",
    description:
      "Ciclo completo: contratos, CNDs, NFs com retenções e workflow de aprovação.",
    screens: [
      {
        id: "contratos",
        label: "Contratos",
        title: "Contratos ativos",
        layout: "kpis",
        kpis: [
          { label: "Ativos", value: "128", tone: "ok" },
          { label: "Em aprovação", value: "9", tone: "warn" },
          { label: "A vencer (30d)", value: "14", tone: "warn" },
          { label: "Valor mensal", value: "R$ 1,8M", tone: "neutral" },
        ],
        rows: [
          {
            primary: "Hospital São Lucas — Manutenção",
            secondary: "Vigência até 31/12/2026 · R$ 86.400/mês",
            status: "Ativo",
            statusTone: "ok",
          },
          {
            primary: "Grupo Norte — Engenharia",
            secondary: "Aditivo #3 em análise",
            status: "Workflow",
            statusTone: "warn",
          },
          {
            primary: "Clínica Horizonte — Facilities",
            secondary: "Renovação em 22 dias",
            status: "Atenção",
            statusTone: "warn",
          },
        ],
        hotspots: [
          {
            id: "sgc-painel",
            x: 30,
            y: 20,
            title: "Painel de contratos",
            description:
              "Visão do portfólio com vigência, valores e status de aprovação.",
            benefit: "Controle absoluto do ciclo de vida contratual.",
          },
          {
            id: "sgc-lista",
            x: 58,
            y: 60,
            title: "Detalhe por contrato",
            description:
              "Objeto, partes, aditivos e documentos em um único registro.",
            benefit: "Fim das pastas espalhadas e e-mails perdidos.",
          },
        ],
      },
      {
        id: "cnds",
        label: "CNDs",
        title: "Certidões negativas",
        layout: "table",
        rows: [
          {
            primary: "CND Federal",
            secondary: "Prestador Alpha · vence em 12 dias",
            status: "Amarelo",
            statusTone: "warn",
          },
          {
            primary: "FGTS",
            secondary: "Prestador Alpha · regular",
            status: "Verde",
            statusTone: "ok",
          },
          {
            primary: "Municipal",
            secondary: "Prestador Beta · vencida",
            status: "Vermelho",
            statusTone: "danger",
          },
          {
            primary: "Trabalhista",
            secondary: "Prestador Gamma · regular",
            status: "Verde",
            statusTone: "ok",
          },
        ],
        hotspots: [
          {
            id: "sgc-semaforo",
            x: 78,
            y: 35,
            title: "Semáforo de CNDs",
            description:
              "Federal, FGTS, Estadual, Municipal, Trabalhista e Fórum com status visual.",
            benefit: "Nunca mais pague prestador com documentação irregular.",
          },
          {
            id: "sgc-alerta-cnd",
            x: 42,
            y: 55,
            title: "Alertas automáticos",
            description:
              "Avisos 30, 15 e 7 dias antes do vencimento de cada certidão.",
            benefit: "Renovação proativa, sem surpresas no fechamento.",
          },
        ],
      },
      {
        id: "nfs",
        label: "Notas fiscais",
        title: "NFs e retenções",
        layout: "table",
        rows: [
          {
            primary: "NF 4521 — Hospital São Lucas",
            secondary: "Bruto R$ 86.400 · Líquido R$ 74.218",
            status: "Aprovada",
            statusTone: "ok",
          },
          {
            primary: "NF 4498 — Grupo Norte",
            secondary: "ISS + INSS + IR calculados",
            status: "Conferência",
            statusTone: "warn",
          },
          {
            primary: "NF 4480 — Clínica Horizonte",
            secondary: "Aguardando comprovante",
            status: "Recebimento",
            statusTone: "neutral",
          },
        ],
        hotspots: [
          {
            id: "sgc-retencoes",
            x: 50,
            y: 38,
            title: "Retenções automáticas",
            description:
              "ISS, INSS, IR, PIS, COFINS e CSLL calculados por nota fiscal.",
            benefit: "Valor líquido sem erro manual de planilha.",
          },
          {
            id: "sgc-liquido",
            x: 78,
            y: 28,
            title: "Demonstrativo financeiro",
            description:
              "Bruto, retenções e líquido vinculados ao contrato e ao mês.",
            benefit: "Transparência total para financeiro e auditoria.",
          },
        ],
      },
      {
        id: "workflow",
        label: "Workflow",
        title: "Aprovações em andamento",
        layout: "list",
        rows: [
          {
            primary: "Aditivo #3 — Grupo Norte",
            secondary: "Jurídico → Diretoria",
            status: "2/4",
            statusTone: "warn",
          },
          {
            primary: "Novo contrato — UPA Centro",
            secondary: "Gestor → Financeiro",
            status: "1/3",
            statusTone: "warn",
          },
          {
            primary: "Medição mar/2026 — São Lucas",
            secondary: "Aprovado",
            status: "OK",
            statusTone: "ok",
          },
        ],
        hotspots: [
          {
            id: "sgc-fluxo",
            x: 45,
            y: 40,
            title: "Workflow multi-nível",
            description:
              "Fluxos configuráveis para contratos, aditivos, medições e NFs.",
            benefit: "Cada etapa com responsável, prazo e histórico.",
          },
          {
            id: "sgc-sla",
            x: 80,
            y: 55,
            title: "SLA visível",
            description:
              "Acompanhe pendências e evite gargalos entre áreas.",
            benefit: "Ciclo de aprovação mais rápido e auditável.",
          },
        ],
      },
    ],
  },
  {
    id: "escalas",
    label: "Unique Escalas",
    shortLabel: "Escalas",
    accent: "purple",
    description:
      "Escalas médicas, plantões, trocas e cobertura com app mobile.",
    screens: [
      {
        id: "cobertura",
        label: "Cobertura",
        title: "Cobertura do plantão",
        layout: "kpis",
        kpis: [
          { label: "Cobertura", value: "96%", tone: "ok" },
          { label: "Descobertos", value: "3", tone: "danger" },
          { label: "Trocas pendentes", value: "7", tone: "warn" },
          { label: "Profissionais", value: "214", tone: "neutral" },
        ],
        rows: [
          {
            primary: "UTI — Plantão noturno",
            secondary: "Hoje · 2 vagas descobertas",
            status: "Crítico",
            statusTone: "danger",
          },
          {
            primary: "Emergência — Diurno",
            secondary: "Cobertura completa",
            status: "OK",
            statusTone: "ok",
          },
          {
            primary: "Centro cirúrgico",
            secondary: "1 troca aguardando aprovação",
            status: "Pendente",
            statusTone: "warn",
          },
        ],
        hotspots: [
          {
            id: "esc-cobertura",
            x: 28,
            y: 22,
            title: "Painel de cobertura",
            description:
              "Plantões disponíveis, ocupados e descobertos em tempo real.",
            benefit: "Gestores veem buracos na escala antes do turno começar.",
          },
          {
            id: "esc-setores",
            x: 55,
            y: 58,
            title: "Por setor e turno",
            description:
              "UTI, emergência, centro cirúrgico e mais — tudo no mesmo painel.",
            benefit: "Ideal para hospitais com múltiplas unidades.",
          },
        ],
      },
      {
        id: "escala",
        label: "Escala mensal",
        title: "Escala de março",
        layout: "grid",
        rows: [
          {
            primary: "Dr. Paulo Lima",
            secondary: "Clínica médica · 12 plantões",
            status: "Confirmado",
            statusTone: "ok",
          },
          {
            primary: "Dra. Helena Costa",
            secondary: "Pediatria · 10 plantões",
            status: "Confirmado",
            statusTone: "ok",
          },
          {
            primary: "Dr. André Souza",
            secondary: "Ortopedia · 1 pendência",
            status: "Pendente",
            statusTone: "warn",
          },
          {
            primary: "Dra. Marina Alves",
            secondary: "Anestesia · troca solicitada",
            status: "Troca",
            statusTone: "warn",
          },
        ],
        hotspots: [
          {
            id: "esc-montagem",
            x: 40,
            y: 40,
            title: "Montagem inteligente",
            description:
              "Distribuição por setor, especialidade e carga horária.",
            benefit: "Escalas equilibradas sem conflitos de horário.",
          },
          {
            id: "esc-regras",
            x: 75,
            y: 55,
            title: "Regras de negócio",
            description:
              "Limites de carga, intervalos obrigatórios e restrições por especialidade.",
            benefit: "Conformidade automática na montagem da escala.",
          },
        ],
      },
      {
        id: "trocas",
        label: "Trocas",
        title: "Trocas e coberturas",
        layout: "list",
        rows: [
          {
            primary: "Dra. Marina → Dr. Paulo",
            secondary: "Plantão 14/03 · UTI noite",
            status: "Aprovar",
            statusTone: "warn",
          },
          {
            primary: "Dr. André → Dra. Helena",
            secondary: "Plantão 16/03 · Emergência",
            status: "Aprovado",
            statusTone: "ok",
          },
          {
            primary: "Cobertura emergencial",
            secondary: "UTI · hoje 19h",
            status: "Aberto",
            statusTone: "danger",
          },
        ],
        hotspots: [
          {
            id: "esc-troca",
            x: 48,
            y: 38,
            title: "Trocas pelo app",
            description:
              "Profissionais solicitam; gestores aprovam com histórico completo.",
            benefit: "Menos WhatsApp, mais rastreabilidade.",
          },
          {
            id: "esc-cobertura-rapida",
            x: 78,
            y: 62,
            title: "Cobertura rápida",
            description:
              "Sugestão de substitutos disponíveis para buracos na escala.",
            benefit: "Preencha plantões descobertos em minutos.",
          },
        ],
      },
      {
        id: "app",
        label: "App mobile",
        title: "Visão do profissional",
        layout: "list",
        rows: [
          {
            primary: "Meus plantões — semana",
            secondary: "4 confirmados · 1 pendente",
            status: "App",
            statusTone: "neutral",
          },
          {
            primary: "Notificação push",
            secondary: "Troca aprovada · UTI 14/03",
            status: "Nova",
            statusTone: "ok",
          },
          {
            primary: "Banco de horas",
            secondary: "Saldo +6h este mês",
            status: "OK",
            statusTone: "ok",
          },
        ],
        hotspots: [
          {
            id: "esc-app",
            x: 42,
            y: 35,
            title: "App iOS e Android",
            description:
              "Médicos consultam escala, pedem trocas e recebem alertas.",
            benefit: "Engajamento real da equipe na ponta.",
          },
          {
            id: "esc-horas",
            x: 70,
            y: 65,
            title: "Banco de horas",
            description:
              "Horas trabalhadas, extras e folgas controlados automaticamente.",
            benefit: "Exportação pronta para RH e folha de pagamento.",
          },
        ],
      },
    ],
  },
];

export function getTourModule(id: TourModuleId): TourModule {
  const module = TOUR_MODULES.find((item) => item.id === id);
  if (!module) {
    throw new Error(`Módulo de tour não encontrado: ${id}`);
  }
  return module;
}
