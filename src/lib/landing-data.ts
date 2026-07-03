import { ASSETS } from "@/lib/assets";

export const LANDING_NAV_LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#plataforma", label: "Plataforma" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
] as const;

export const LANDING_LOGIN_URL = "/login";

export const LANDING_HERO = {
  badge: "Plataforma de Gestão Integrada",
  headline: "Gestão inteligente para sua empresa crescer",
  subheadline:
    "Três soluções poderosas em uma única plataforma: Gestão Societária, Gestão de Contratos e Gestão de Escalas Médicas. Tudo integrado para simplificar sua operação e maximizar resultados.",
  trustBadges: [
    "Sem cartão de crédito",
    "14 dias grátis",
    "Suporte dedicado",
  ] as const,
  ctaPrimary: "Começar Agora",
  ctaSecondary: "Agendar Demonstração",
  statValue: "+2.500",
  statLabel: "contratos gerenciados na plataforma",
  chartEyebrow: "Uma plataforma, três módulos",
  chartTitle: "Três soluções poderosas trabalhando juntas",
} as const;

export const LANDING_SOLUTIONS = {
  heading: "Três soluções. Uma plataforma.",
  description:
    "Cada módulo foi projetado para resolver desafios específicos da sua operação — e juntos, formam um ecossistema completo de gestão.",
  cta: "Saiba mais",
  items: [
    {
      id: "societaria",
      title: "Gestão Societária",
      excerpt:
        "Controle total sobre a estrutura societária da sua empresa. Gerencie sócios, participações, atos societários, procurações e documentos corporativos com rastreabilidade completa.",
      href: "/solucao/societaria",
      accent: "blue" as const,
      isFeatured: true,
    },
    {
      id: "sgc",
      title: "SGC — Gestão de Contratos",
      excerpt:
        "Do cadastro à medição final. Gerencie contratos, aditivos, certidões negativas, notas fiscais com retenções tributárias e recebimentos — tudo em um só lugar, com workflow de aprovação.",
      href: "/solucao/sgc",
      accent: "orange" as const,
      isFeatured: false,
    },
    {
      id: "escalas",
      title: "Unique Escalas",
      excerpt:
        "Gestão inteligente de escalas médicas e plantões. Organize profissionais, turnos, trocas e coberturas com aplicativo mobile integrado. Ideal para hospitais, clínicas e cooperativas.",
      href: "/solucao/escalas",
      accent: "purple" as const,
      isFeatured: false,
    },
  ],
};

export const LANDING_FEATURES = [
  {
    title: "Controle de Certidões (CNDs)",
    description:
      "Monitore CND Federal, FGTS, Estadual, Municipal, Trabalhista e Fórum com alertas automáticos de vencimento. Nunca mais perca um prazo.",
  },
  {
    title: "Gestão Financeira com Retenções",
    description:
      "Demonstrativo completo de ISS, INSS, IR, PIS, COFINS e CSLL. Valor líquido calculado automaticamente para cada nota fiscal.",
  },
  {
    title: "Workflow de Aprovação",
    description:
      "Fluxos configuráveis multi-nível para contratos, aditivos, medições e notas fiscais. Cada etapa com responsável, prazo e histórico.",
  },
  {
    title: "Upload e Armazenamento",
    description:
      "Contratos, aditivos, notas fiscais, certidões e evidências armazenados com segurança. Acesse qualquer documento em segundos.",
  },
  {
    title: "Multi-Empresa",
    description:
      "Gerencie contratos de diferentes empresas ou filiais do grupo com segregação total de dados e visão consolidada.",
  },
  {
    title: "Relatórios Gerenciais",
    description:
      "Dashboards em tempo real com exportação em PDF e Excel. Filtre por período, tomador, prestador ou status.",
  },
] as const;

export const LANDING_PLATFORM = {
  heading: "Visão completa em um único painel",
  description:
    "Dashboard intuitivo com indicadores-chave, alertas de vencimento e acompanhamento financeiro em tempo real. Tome decisões com base em dados, não em suposições.",
  image: ASSETS.dashboard,
  imageAlt: "Dashboard Unique Gestor",
} as const;

export const LANDING_STATS = [
  { value: "+2.500", label: "Contratos gerenciados" },
  { value: "+180", label: "Empresas confiam na plataforma" },
  { value: "99,8%", label: "Disponibilidade do sistema" },
  { value: "-70%", label: "Redução no tempo de gestão" },
] as const;

export const LANDING_TESTIMONIALS = [
  {
    quote:
      "A Unique Gestor revolucionou nossa gestão de contratos. Antes perdíamos horas procurando documentos e calculando retenções. Hoje tudo está a um clique de distância.",
    name: "Maria Fernanda Costa",
    role: "Gerente Administrativa — Hospital São Lucas",
  },
  {
    quote:
      "O controle de certidões negativas com alertas automáticos nos salvou de multas e bloqueios. O sistema paga o investimento no primeiro mês.",
    name: "Ricardo Almeida",
    role: "Diretor Financeiro — Grupo Engenharia ABC",
  },
  {
    quote:
      "O módulo de escalas médicas eliminou os conflitos de horário e reduziu as trocas de última hora em 80%. Nossa equipe finalmente tem previsibilidade.",
    name: "Dra. Patrícia Mendes",
    role: "Coordenadora Médica — Clínica Vida Nova",
  },
] as const;

export const LANDING_PLANS = [
  {
    name: "Essencial",
    price: "R$ 297",
    priceNote: "/mês",
    description: "Ideal para: Pequenas empresas e prestadores individuais",
    features: [
      "1 módulo à escolha (Societária, SGC ou Escalas)",
      "Até 50 contratos ativos",
      "3 usuários",
      "Suporte por e-mail",
      "Armazenamento de 5 GB",
    ],
    cta: "Começar Agora",
    popular: false,
  },
  {
    name: "Profissional",
    price: "R$ 597",
    priceNote: "/mês",
    description: "Ideal para: Empresas em crescimento com múltiplas operações",
    features: [
      "2 módulos à escolha",
      "Contratos ilimitados",
      "10 usuários",
      "Suporte prioritário (chat + e-mail)",
      "Armazenamento de 25 GB",
      "Workflow de aprovação",
      "Relatórios gerenciais",
    ],
    cta: "Começar Agora",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    priceNote: "",
    description: "Ideal para: Grupos empresariais e operações complexas",
    features: [
      "Todos os 3 módulos",
      "Usuários ilimitados",
      "Multi-empresa",
      "Integrações com ERP (SAP, TOTVS, Omie)",
      "API dedicada",
      "Gerente de conta exclusivo",
      "SLA garantido de 99,9%",
      "Armazenamento ilimitado",
    ],
    cta: "Falar com Consultor",
    popular: false,
  },
] as const;

export const LANDING_FAQ_ITEMS = [
  {
    question: "O que é a Unique Gestor?",
    answer:
      "A Unique Gestor é uma plataforma de gestão integrada que reúne três soluções em um único ambiente: Gestão Societária, Sistema de Gestão de Contratos (SGC) e Gestão de Escalas Médicas (Unique Escalas). Foi desenvolvida para empresas que precisam de controle, rastreabilidade e eficiência operacional.",
  },
  {
    question: "Preciso contratar todos os módulos?",
    answer:
      "Não. Você pode contratar apenas o módulo que precisa no plano Essencial, ou combinar dois módulos no plano Profissional. O plano Enterprise inclui todos os três módulos com funcionalidades avançadas.",
  },
  {
    question: "Como funciona o período de teste?",
    answer:
      "Oferecemos 14 dias de teste gratuito com acesso completo a todas as funcionalidades do plano escolhido. Não é necessário cartão de crédito para iniciar. Ao final do período, você decide se deseja continuar.",
  },
  {
    question: "A plataforma é segura?",
    answer:
      "Sim. Utilizamos criptografia de ponta a ponta, servidores com certificação ISO 27001, backup diário automático e estamos em total conformidade com a LGPD (Lei Geral de Proteção de Dados).",
  },
  {
    question: "É possível integrar com nosso ERP atual?",
    answer:
      "Sim. No plano Enterprise, oferecemos integração bidirecional via API RESTful com os principais ERPs do mercado (SAP, TOTVS, Omie, Sankhya) e sistemas de contabilidade. Integrações customizadas também podem ser desenvolvidas sob demanda.",
  },
  {
    question: "Quanto tempo leva a implantação?",
    answer:
      "A implantação padrão leva de 5 a 15 dias úteis, dependendo da complexidade e do volume de dados a migrar. Incluímos treinamento da equipe, configuração inicial e acompanhamento no primeiro mês.",
  },
  {
    question: "O sistema funciona em dispositivos móveis?",
    answer:
      "Sim. A plataforma é 100% responsiva e funciona em qualquer navegador. O módulo Unique Escalas conta ainda com aplicativo mobile nativo (iOS e Android) para médicos e gestores.",
  },
  {
    question: "Como funciona o suporte técnico?",
    answer:
      "O suporte varia conforme o plano: e-mail (Essencial), chat + e-mail com prioridade (Profissional) e gerente de conta dedicado com SLA garantido (Enterprise). Nosso tempo médio de resposta é inferior a 2 horas em dias úteis.",
  },
] as const;

export const LANDING_CONTACT = {
  heading: "Agende uma demonstração personalizada",
  description:
    "Preencha o formulário abaixo e nossa equipe entrará em contato para apresentar a plataforma de acordo com as necessidades da sua empresa.",
} as const;

export const LANDING_FOOTER = {
  description:
    "Plataforma de gestão integrada para societário, contratos e escalas médicas. Controle, rastreabilidade e eficiência operacional.",
  cnpj: "XX.XXX.XXX/0001-XX",
  columns: {
    solucoes: {
      title: "Soluções",
      links: [
        { label: "Gestão Societária", href: "/solucao/societaria" },
        { label: "SGC — Contratos", href: "/solucao/sgc" },
        { label: "Unique Escalas", href: "/solucao/escalas" },
      ],
    },
    empresa: {
      title: "Empresa",
      links: [
        { label: "Sobre nós", href: "#contato" },
        { label: "Blog", href: "#contato" },
        { label: "Carreiras", href: "#contato" },
        { label: "Contato", href: "#contato" },
      ],
    },
    suporte: {
      title: "Suporte",
      links: [
        { label: "Central de Ajuda", href: "#contato" },
        { label: "Documentação", href: "#contato" },
        { label: "Status do Sistema", href: "#contato" },
        { label: "API", href: "#contato" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { label: "Termos de Uso", href: "/termos" },
        { label: "Política de Privacidade", href: "/privacidade" },
        { label: "LGPD", href: "/privacidade" },
      ],
    },
  },
  contact: {
    phone: "(11) 99999-9999",
    email: "contato@uniquegestor.com.br",
    address: ["São Paulo, SP", "Brasil"],
  },
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
} as const;

export const LANDING_CTA = {
  title: "Pronto para transformar sua gestão?",
  button: "Agendar Demonstração Gratuita",
} as const;

export const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20plataforma%20Unique%20Gestor.%20Podem%20me%20ajudar%3F";

export const COMPANY_SIZES = [
  { value: "mei", label: "MEI" },
  { value: "micro", label: "Micro" },
  { value: "pequena", label: "Pequena" },
  { value: "media", label: "Média" },
  { value: "grande", label: "Grande" },
] as const;
