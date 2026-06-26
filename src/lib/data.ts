export const ASSETS = {
  heroBg:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663461749137/jMi3AK7MmYbMbiXBmo7DTQ/hero-bg-h4TAgKnP4MypLHD9rpXQti.webp",
  solutionCorporate:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663461749137/jMi3AK7MmYbMbiXBmo7DTQ/solution-corporate-TLwQxnS2HsDEa9CA3caL5s.webp",
  solutionContracts:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663461749137/jMi3AK7MmYbMbiXBmo7DTQ/solution-contracts-9afYEpjdGLcp3ECKUYi6Cx.webp",
  solutionMedical:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663461749137/jMi3AK7MmYbMbiXBmo7DTQ/solution-medical-LVxjnwwmmPR3W3GQvZcMXC.webp",
  dashboard:
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663461749137/jMi3AK7MmYbMbiXBmo7DTQ/dashboard-mockup-mmgiANjRqks8esS26EPh4a.webp",
} as const;

export const PLATFORM_SCREENS = [
  {
    slug: "societaria",
    title: "Gestão Societária",
    description: "Quadro societário, atos constitutivos e documentação legal",
    image: ASSETS.dashboard,
    imageAlt: "Dashboard Gestão Societária",
    urlPath: "societaria",
    color: "amber" as const,
  },
  {
    slug: "sgc",
    title: "SGC — Contratos",
    description: "Contratos, aditivos, certidões e workflow de aprovação",
    image: ASSETS.solutionContracts,
    imageAlt: "Dashboard SGC — Gestão de Contratos",
    urlPath: "sgc",
    color: "blue" as const,
  },
  {
    slug: "escalas",
    title: "Unique Escalas",
    description: "Escalas médicas, plantões e app mobile",
    image: ASSETS.solutionMedical,
    imageAlt: "Dashboard Unique Escalas",
    urlPath: "escalas",
    color: "green" as const,
  },
] as const;

export const NAV_LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#funcionalidades", label: "Funcionalidades" },
  { href: "#plataforma", label: "Plataforma" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
] as const;

export const HERO_TRUST_BADGES = [
  "Demonstração gratuita",
  "Implantação assistida",
  "Suporte dedicado",
] as const;

export const FORM_STEPS = [
  { number: 1, label: "Seus dados" },
  { number: 2, label: "Módulos" },
  { number: 3, label: "Mensagem" },
] as const;

export const LOGIN_URL = "/login";

export const SOLUTIONS = [
  {
    slug: "societaria",
    title: "Gestão Societária",
    description:
      "Controle completo do quadro societário, atos constitutivos, alterações contratuais e documentação legal da sua empresa.",
    image: ASSETS.solutionCorporate,
    imageAlt: "Gestão Societária",
    href: "/solucao/societaria",
    color: "amber" as const,
    tags: [
      "Quadro Societário",
      "Atos Constitutivos",
      "Alterações Contratuais",
      "Documentação Legal",
    ],
    highlights: [
      "Controle centralizado do quadro societário",
      "Alertas de vencimento de documentos",
      "Histórico completo de alterações contratuais",
      "Armazenamento seguro na nuvem",
    ],
  },
  {
    slug: "sgc",
    title: "SGC — Gestão de Contratos",
    description:
      "Sistema completo para gerenciar contratos, aditivos, certidões, notas fiscais, medições e workflow de aprovação.",
    image: ASSETS.solutionContracts,
    imageAlt: "SGC — Gestão de Contratos",
    href: "/solucao/sgc",
    color: "blue" as const,
    tags: [
      "Contratos e Aditivos",
      "Certidões Negativas",
      "Gestão Financeira",
      "Workflow de Aprovação",
    ],
    highlights: [
      "Workflow de aprovação configurável",
      "Controle de CNDs e certidões",
      "Medições e notas fiscais integradas",
      "Dashboards financeiros em tempo real",
    ],
  },
  {
    slug: "escalas",
    title: "Unique Escalas",
    description:
      "Gestão inteligente de escalas médicas e plantões com aplicativo mobile para profissionais de saúde.",
    image: ASSETS.solutionMedical,
    imageAlt: "Unique Escalas",
    href: "/solucao/escalas",
    color: "green" as const,
    tags: [
      "Escalas Médicas",
      "Gestão de Plantões",
      "App Mobile",
      "Troca de Turnos",
    ],
    highlights: [
      "App nativo iOS e Android",
      "Troca de plantões com aprovação",
      "Notificações push em tempo real",
      "Relatórios de cobertura e produtividade",
    ],
  },
] as const;

export function getSolutionBySlug(slug: string) {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export const FEATURES = [
  {
    icon: "shield" as const,
    title: "Segurança Total",
    description:
      "Criptografia de ponta, controle de acesso granular e conformidade com LGPD.",
  },
  {
    icon: "zap" as const,
    title: "Automação Inteligente",
    description:
      "Workflows automáticos, alertas de vencimento e cálculos tributários.",
  },
  {
    icon: "chart" as const,
    title: "Relatórios Avançados",
    description:
      "Dashboards personalizáveis com exportação em PDF, Excel e CSV.",
  },
  {
    icon: "users" as const,
    title: "Multi-Empresa",
    description:
      "Gerencie múltiplas filiais com segregação total de dados e perfis.",
  },
  {
    icon: "globe" as const,
    title: "100% Cloud",
    description:
      "Acesse de qualquer lugar, qualquer dispositivo. Sempre disponível.",
  },
  {
    icon: "file" as const,
    title: "Assinatura Digital",
    description:
      "Integração com ClickSign, DocuSign e D4Sign (ICP-Brasil).",
  },
] as const;

export const STATS = [
  { value: "500+", label: "Contratos Gerenciados" },
  { value: "150+", label: "Empresas Atendidas" },
  { value: "99.9%", label: "Disponibilidade" },
  { value: "24/7", label: "Suporte Técnico" },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "O Unique Escalas revolucionou a gestão dos nossos plantões. Reduzimos em 70% o tempo gasto com escalas e eliminamos conflitos de horários.",
    name: "Dr. Ricardo Mendes",
    role: "Diretor Clínico — Hospital São Lucas",
  },
  {
    quote:
      "O SGC nos deu visibilidade total sobre nossos contratos. O controle de CNDs e o workflow de aprovação são impecáveis.",
    name: "Ana Paula Ferreira",
    role: "Gerente de Contratos — Grupo Construtora ABC",
  },
  {
    quote:
      "A Gestão Societária simplificou todo o controle dos nossos clientes. Tudo centralizado, com alertas e documentação organizada.",
    name: "Carlos Eduardo Silva",
    role: "Sócio — Escritório Contábil Silva & Associados",
  },
] as const;

export const PLANS = [
  {
    name: "Starter",
    price: "Sob consulta",
    priceNote: "Valores personalizados conforme módulos e usuários",
    description: "Para pequenas empresas que precisam de uma solução específica.",
    features: [
      "1 módulo à escolha",
      "Até 5 usuários",
      "Suporte por e-mail",
      "Atualizações incluídas",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "Sob consulta",
    priceNote: "Valores personalizados conforme módulos e usuários",
    description: "Para empresas em crescimento que precisam de integração.",
    features: [
      "2 módulos à escolha",
      "Até 20 usuários",
      "Suporte prioritário",
      "API de integração",
      "Multi-empresa",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    priceNote: "Valores personalizados conforme módulos e usuários",
    description: "Para grandes operações com necessidades avançadas.",
    features: [
      "Todos os módulos",
      "Usuários ilimitados",
      "Suporte 24/7 dedicado",
      "Customizações",
      "SLA garantido",
      "Treinamento presencial",
    ],
    popular: false,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "A Unique Gestor é uma plataforma 100% online?",
    answer:
      "Sim. Toda a plataforma funciona na nuvem (cloud), acessível de qualquer dispositivo com internet — computador, tablet ou celular. Não é necessário instalar nenhum software.",
  },
  {
    question:
      "Posso contratar apenas um dos módulos (Societária, SGC ou Escalas)?",
    answer:
      "Sim. Cada módulo funciona de forma independente. Você pode começar com um e adicionar outros conforme a necessidade da sua empresa. A integração entre eles é automática quando ativados juntos.",
  },
  {
    question: "Como funciona a segurança dos meus dados?",
    answer:
      "Utilizamos criptografia de ponta a ponta, servidores com certificação ISO 27001, backups automáticos diários e controle de acesso granular por perfil. A plataforma está em conformidade com a LGPD.",
  },
  {
    question:
      "O sistema emite alertas de vencimento de contratos e certidões?",
    answer:
      "Sim. O SGC envia alertas automáticos por e-mail e notificação push quando contratos, certidões negativas (CNDs) ou documentos estão próximos do vencimento. Você configura a antecedência dos alertas.",
  },
  {
    question: "O Unique Escalas possui aplicativo mobile?",
    answer:
      "Sim. O Unique Escalas conta com aplicativo nativo para iOS e Android. Os profissionais podem visualizar seus plantões, solicitar trocas, confirmar presença e receber notificações diretamente no celular.",
  },
  {
    question: "É possível integrar com meu ERP ou sistema contábil?",
    answer:
      "Sim. A plataforma oferece APIs RESTful para integração bidirecional com ERPs (SAP, TOTVS, Omie), sistemas contábeis e outras ferramentas. No plano Profissional e Enterprise, a integração é assistida pela nossa equipe.",
  },
  {
    question: "Quanto tempo leva para implantar a plataforma?",
    answer:
      "A implantação varia conforme a complexidade: módulos individuais levam de 5 a 15 dias úteis. A plataforma completa com migração de dados e treinamento leva de 30 a 60 dias. Oferecemos acompanhamento dedicado durante todo o processo.",
  },
  {
    question: "Existe período de teste gratuito?",
    answer:
      "Oferecemos demonstração gratuita da plataforma com acompanhamento da nossa equipe. Para avaliação estendida, entre em contato — definimos o melhor formato conforme sua operação.",
  },
] as const;

export const CONTACT_INFO = [
  {
    icon: "globe" as const,
    label: "Website",
    value: "www.uniquegestor.com.br",
    href: "https://www.uniquegestor.com.br",
    external: true,
  },
  {
    icon: "mail" as const,
    label: "E-mail",
    value: "contato@uniquegestor.com.br",
    href: "mailto:contato@uniquegestor.com.br",
  },
  {
    icon: "phone" as const,
    label: "Telefone",
    value: "(11) 9 0000-0000",
    href: "tel:+5511900000000",
  },
  {
    icon: "map" as const,
    label: "Localização",
    value: "São Paulo, SP — Brasil",
  },
] as const;

export const WHATSAPP_URL =
  "https://wa.me/5511900000000?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20plataforma%20Unique%20Gestor.";
