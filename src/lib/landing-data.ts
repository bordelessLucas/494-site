import { ASSETS } from "@/lib/assets";

export const LANDING_NAV_LINKS = [
  { href: "#solucoes", label: "Soluções", hasDropdown: true },
  { href: "#empresa", label: "Empresa", hasDropdown: true },
  { href: "#sistemas", label: "Sistemas", hasDropdown: true },
  { href: "#faq", label: "Recursos", hasDropdown: true },
  { href: "#contato", label: "Contato", hasDropdown: false },
] as const;

export const LANDING_TRUSTED_SEGMENTS = [
  { name: "hospitais", display: "Hospitais" },
  { name: "construtoras", display: "Construtoras" },
  { name: "contabilidade", display: "Contabilidade" },
] as const;

export const LANDING_HERO = {
  headline: "Gestão integrada para simplificar a",
  headlineAccent: "sua operação",
  subheadline:
    "Plataforma SaaS com Gestão Societária, SGC (Contratos) e Unique Escalas em um único ecossistema — com conformidade LGPD, automação e suporte dedicado.",
  trustedLabel: "Utilizada por empresas em todo o Brasil",
  statValue: "500+",
  statLabel: "contratos e documentos gerenciados com segurança na plataforma",
  chartEyebrow: "Uma plataforma, três módulos",
  chartTitle: "Três sistemas poderosos trabalhando juntos",
  ctaPrimary: "Agendar demonstração",
  ctaSecondary: "Conhecer os sistemas",
} as const;

export const LANDING_INTRO = {
  heading: "A melhor experiência para gerir societário, contratos e escalas",
  description:
    "Somos especialistas em transformar processos complexos em fluxos digitais simples. Nossa plataforma integra os três pilares da sua operação com segurança, automação e visibilidade em tempo real.",
  statValue: "3",
  statSubtext: "Sistemas integrados em uma única plataforma",
  videoLabel: "Como funciona",
} as const;

export const LANDING_SYSTEM_FILTERS = [
  { id: "all", label: "Todos os sistemas", count: 3 },
  { id: "societaria", label: "Gestão Societária", count: 1 },
  { id: "sgc", label: "SGC — Contratos", count: 1 },
  { id: "escalas", label: "Unique Escalas", count: 1 },
] as const;

export const LANDING_SYSTEMS = [
  {
    id: "societaria",
    slug: "societaria",
    title: "Gestão Societária",
    description:
      "Controle completo do quadro societário, atos constitutivos, alterações contratuais e documentação legal da sua empresa.",
    image: ASSETS.solutionCorporate,
    imageAlt: "Gestão Societária",
    href: "/solucao/societaria",
    category: "societaria",
    tags: ["Quadro Societário", "Atos Constitutivos", "Documentação Legal"],
  },
  {
    id: "sgc",
    slug: "sgc",
    title: "SGC — Gestão de Contratos",
    description:
      "Sistema completo para gerenciar contratos, aditivos, certidões, notas fiscais, medições e workflow de aprovação.",
    image: ASSETS.solutionContracts,
    imageAlt: "SGC — Gestão de Contratos",
    href: "/solucao/sgc",
    category: "sgc",
    tags: ["Contratos e Aditivos", "Certidões Negativas", "Workflow"],
  },
  {
    id: "escalas",
    slug: "escalas",
    title: "Unique Escalas",
    description:
      "Gestão inteligente de escalas médicas e plantões com aplicativo mobile para profissionais de saúde.",
    image: ASSETS.solutionMedical,
    imageAlt: "Unique Escalas",
    href: "/solucao/escalas",
    category: "escalas",
    tags: ["Escalas Médicas", "App Mobile", "Plantões"],
  },
] as const;

export const LANDING_SYSTEMS_HEADING =
  "Conheça os três sistemas que compõem a plataforma Unique Gestor";

export const LANDING_TESTIMONIALS = [
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
  {
    quote:
      "A integração entre os módulos eliminou retrabalho entre jurídico, financeiro e operação. Hoje temos um único ponto de verdade.",
    name: "Mariana Costa",
    role: "COO — Holding Vertice",
  },
  {
    quote:
      "Implantação assistida, suporte ágil e uma plataforma que realmente escala com o nosso crescimento. Recomendo sem hesitar.",
    name: "Fernando Alves",
    role: "Diretor de TI — Rede Saúde Norte",
  },
] as const;

export const LANDING_SOLUTIONS = {
  heading: "Três soluções integradas para cada etapa da sua gestão",
  description:
    "Cada módulo foi projetado para resolver desafios específicos do seu negócio, com integração total entre societário, contratos e escalas médicas.",
  cta: "Ver mais",
  items: [
    {
      id: "societaria",
      title: "Gestão Societária",
      excerpt:
        "Controle completo do quadro societário, atos constitutivos, alterações contratuais e documentação legal da sua empresa.",
      readTime: "4 min de leitura",
      href: "/solucao/societaria",
      accent: "blue" as const,
      isFeatured: true,
    },
    {
      id: "sgc",
      title: "SGC — Gestão de Contratos",
      excerpt:
        "Sistema completo para gerenciar contratos, aditivos, certidões, notas fiscais, medições e workflow de aprovação.",
      readTime: "5 min de leitura",
      href: "/solucao/sgc",
      accent: "orange" as const,
      isFeatured: false,
    },
    {
      id: "escalas",
      title: "Unique Escalas",
      excerpt:
        "Gestão inteligente de escalas médicas e plantões com aplicativo mobile para profissionais de saúde.",
      readTime: "6 min de leitura",
      href: "/solucao/escalas",
      accent: "purple" as const,
      isFeatured: false,
    },
  ],
};

export const LANDING_FAQ_ITEMS = [
  {
    question: "A Unique Gestor é uma plataforma 100% online?",
    answer:
      "Sim. Toda a plataforma funciona na nuvem, acessível de qualquer dispositivo com internet. Não é necessário instalar software — basta um navegador ou o app mobile do Unique Escalas.",
  },
  {
    question: "Posso contratar apenas um dos três sistemas?",
    answer:
      "Sim. Cada módulo funciona de forma independente: Gestão Societária, SGC ou Unique Escalas. Você pode começar com um e ativar os demais quando precisar. A integração entre eles é automática.",
  },
  {
    question: "Como funciona a segurança dos meus dados?",
    answer:
      "Utilizamos criptografia, backups automáticos, controle de acesso por perfil e conformidade com a LGPD. Seus dados ficam segregados por empresa e ambiente.",
  },
  {
    question: "Quanto tempo leva para implantar a plataforma?",
    answer:
      "Módulos individuais levam de 5 a 15 dias úteis. A plataforma completa com migração e treinamento leva de 30 a 60 dias, com acompanhamento dedicado da nossa equipe.",
  },
] as const;

export const LANDING_FOOTER = {
  description:
    "A Unique Gestor oferece uma suíte completa para gestão societária, contratos e escalas médicas. Automatize processos, garanta conformidade e escale sua operação com uma plataforma pensada para o mercado brasileiro.",
  navigation: [
    { label: "Soluções", href: "#solucoes" },
    { label: "Empresa", href: "#empresa" },
    { label: "Sistemas", href: "#sistemas" },
    { label: "Recursos", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ],
  licence: [
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "E-mail", href: "mailto:contato@uniquegestor.com.br" },
  ],
  contact: {
    phone: "(11) 9 0000-0000",
    email: "contato@uniquegestor.com.br",
    address: ["São Paulo, SP", "Brasil"],
  },
} as const;

export const LANDING_CTA = {
  title: "Pronto para conhecer a plataforma?",
  button: "Falar com especialista",
} as const;

export const LANDING_LOGIN_URL = "/login";
