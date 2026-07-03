export const SOLUTION_PAGE_DETAILS = {
  societaria: {
    badge: "Módulo Societário",
    heroTitle: "Controle total sobre a estrutura da sua empresa",
    heroSubtitle:
      "Gerencie sócios, participações, atos societários, procurações e documentos corporativos com rastreabilidade completa e segurança jurídica.",
    features: [
      { title: "Quadro Societário", description: "Visualize a composição societária atualizada com percentuais de participação, data de entrada e tipo de sócio (administrador, cotista, investidor)." },
      { title: "Atos Societários", description: "Registre e controle alterações contratuais, assembleias, atas e deliberações com versionamento e assinatura digital." },
      { title: "Procurações", description: "Gerencie procurações com controle de vigência, poderes concedidos e alertas de vencimento automáticos." },
      { title: "Documentos Corporativos", description: "Armazene contrato social, estatuto, certidões e alvarás com organização por empresa e controle de validade." },
      { title: "Participações Cruzadas", description: "Mapeie participações em outras empresas do grupo com visão consolidada da estrutura societária." },
      { title: "Histórico de Alterações", description: "Linha do tempo completa de todas as modificações societárias com documentos vinculados e responsáveis." },
      { title: "Alertas de Vencimento", description: "Notificações automáticas para renovação de documentos, vencimento de procurações e prazos regulatórios." },
      { title: "Relatórios Societários", description: "Gere relatórios de composição, histórico de alterações e quadro de participações para auditorias e due diligence." },
      { title: "Multi-Empresa", description: "Gerencie a estrutura societária de múltiplas empresas do grupo em um único painel com segregação de dados." },
    ],
    flowTitle: "Como funciona na prática",
    flowSteps: [
      { title: "Cadastro Inicial", description: "Registre as empresas do grupo com dados completos (CNPJ, endereço, objeto social, capital social)." },
      { title: "Composição Societária", description: "Cadastre sócios com CPF/CNPJ, percentual de participação, tipo e data de entrada." },
      { title: "Documentação", description: "Faça upload do contrato social, atas e demais documentos com controle de versão." },
      { title: "Atos e Alterações", description: "Registre cada alteração contratual com justificativa, documentos e aprovações." },
      { title: "Monitoramento", description: "Receba alertas de vencimento e acompanhe a saúde documental pelo dashboard." },
    ],
    ctaTitle: "Organize sua estrutura societária hoje",
    ctaSubtitle:
      "Elimine planilhas e pastas desorganizadas. Tenha controle total com rastreabilidade e segurança.",
    metaDescription:
      "Controle sócios, participações, atos societários e documentos corporativos com rastreabilidade completa. Plataforma segura e em conformidade com a LGPD.",
  },
  sgc: {
    badge: "SGC — Sistema de Gestão de Contratos",
    heroTitle: "Do cadastro à medição final. Controle absoluto.",
    heroSubtitle:
      "Gerencie todo o ciclo de vida dos seus contratos: cadastro, aditivos, certidões negativas, notas fiscais com retenções tributárias, medições e recebimentos — com workflow de aprovação em cada etapa.",
    features: [
      { title: "Cadastro de Tomadores", description: "Dados completos do cliente (CNPJ, endereço, contato, responsável). Você como prestador gerencia seus tomadores." },
      { title: "Cadastro de Prestadores", description: "Dados da empresa prestadora com controle documental obrigatório (CNDs, certidões, dados bancários)." },
      { title: "Contratos", description: "Cadastro completo com objeto, vigência, valores, partes envolvidas, condições de pagamento e upload do PDF." },
      { title: "Aditivos Contratuais", description: "Histórico de aditivos com justificativa obrigatória, impacto financeiro, novo prazo e documentos anexos." },
      { title: "Certidões Negativas (CNDs)", description: "Controle de 6 tipos de certidão (Federal, FGTS, Estadual, Municipal, Trabalhista, Fórum) com emissão e vencimento." },
      { title: "Gestão Financeira", description: "Demonstrativo de impostos retidos (ISS, INSS, IR, PIS, COFINS, CSLL), valor líquido e controle de recebimento por mês/tomador." },
      { title: "Notas Fiscais", description: "Registro de NFs com upload, vinculação ao contrato, mês de referência e cálculo automático de retenções." },
      { title: "Workflow de Aprovação", description: "Fluxos configuráveis para contratos, aditivos, medições e NFs com múltiplos níveis de aprovação." },
      { title: "Medições", description: "Registro de medições periódicas com valores, percentual executado e documentos comprobatórios." },
      { title: "Evidências", description: "Armazenamento de relatórios, fotos, laudos e documentos de comprovação vinculados ao contrato." },
      { title: "Solicitações Internas", description: "Portal para áreas requisitantes solicitarem novos contratos com justificativa e fluxo de aprovação." },
      { title: "Assinatura Eletrônica", description: "Integração com plataformas de assinatura digital (ClickSign, DocuSign, D4Sign) com validade jurídica ICP-Brasil." },
    ],
    flowTitle: "Ciclo completo do contrato",
    flowSteps: [
      { title: "Solicitação", description: "Área requisitante solicita novo contrato com justificativa e orçamento estimado." },
      { title: "Aprovação", description: "Workflow multi-nível (gestor → financeiro → jurídico → diretoria) com prazos e notificações." },
      { title: "Cadastro", description: "Contrato registrado com dados completos, partes envolvidas e upload do documento assinado." },
      { title: "Vigência", description: "Monitoramento ativo com alertas de vencimento, renovação e aditivos." },
      { title: "Medição", description: "Registro periódico de medições com evidências e aprovação do gestor." },
      { title: "Emissão de NF", description: "Prestador emite NF → conferência de impostos → validação de CNDs → aprovação." },
      { title: "Pagamento", description: "Controle de recebimento com valor líquido, data de pagamento e comprovante." },
    ],
    highlights: [
      {
        title: "Transparência total nas retenções tributárias",
        description:
          "Cada nota fiscal é registrada com demonstrativo completo de impostos retidos. O sistema calcula automaticamente ISS, INSS, IR, PIS, COFINS e CSLL, exibindo o valor líquido que será efetivamente pago. Sem surpresas, sem erros manuais.",
      },
      {
        title: "Nunca mais perca o vencimento de uma CND",
        description:
          "Monitore as 6 certidões obrigatórias de cada prestador com semáforo visual (verde/amarelo/vermelho). Alertas automáticos 30, 15 e 7 dias antes do vencimento. Opção de bloqueio de pagamento para prestadores com documentação irregular.",
      },
    ],
    ctaTitle: "Assuma o controle dos seus contratos",
    ctaSubtitle:
      "Chega de planilhas, pastas no drive e cálculos manuais de impostos. Centralize tudo em uma plataforma inteligente.",
    metaDescription:
      "Gerencie contratos, aditivos, certidões negativas, notas fiscais com retenções tributárias e recebimentos. Workflow de aprovação e controle financeiro completo.",
  },
  escalas: {
    badge: "Unique Escalas",
    heroTitle: "Escalas médicas sem conflitos. Plantões sob controle.",
    heroSubtitle:
      "Organize profissionais, turnos, trocas e coberturas com inteligência. Aplicativo mobile para médicos e gestores. Ideal para hospitais, clínicas, UPAs e cooperativas médicas.",
    features: [
      { title: "Montagem de Escalas", description: "Crie escalas mensais por setor, especialidade e turno com distribuição equilibrada de carga horária." },
      { title: "Gestão de Plantões", description: "Visualize plantões disponíveis, ocupados e descobertos em tempo real com painel de cobertura." },
      { title: "Trocas e Coberturas", description: "Profissionais solicitam trocas pelo app. Gestores aprovam com um toque. Histórico completo de alterações." },
      { title: "App Mobile", description: "Aplicativo nativo (iOS e Android) para médicos consultarem escalas, solicitarem trocas e receberem notificações." },
      { title: "Banco de Horas", description: "Controle automático de horas trabalhadas, extras, folgas e saldo de banco de horas por profissional." },
      { title: "Notificações Push", description: "Alertas em tempo real para novos plantões, trocas aprovadas, alterações de escala e lembretes." },
      { title: "Múltiplas Unidades", description: "Gerencie escalas de diferentes unidades (hospital, UPA, ambulatório) em um único painel consolidado." },
      { title: "Relatórios de Produtividade", description: "Horas por profissional, taxa de cobertura, trocas realizadas e indicadores de pontualidade." },
      { title: "Integração com RH", description: "Exporte dados de horas trabalhadas para folha de pagamento e sistemas de ponto eletrônico." },
      { title: "Regras de Negócio", description: "Configure limites de carga horária, intervalos obrigatórios entre plantões e restrições por especialidade." },
      { title: "Calendário Visual", description: "Visualização em calendário com código de cores por status (confirmado, pendente, descoberto, troca)." },
      { title: "Gestão de Profissionais", description: "Cadastro completo com CRM, especialidades, disponibilidade, preferências de turno e histórico." },
    ],
    flowTitle: "Da montagem ao plantão",
    flowSteps: [
      { title: "Cadastro de Profissionais", description: "Registre médicos com CRM, especialidades, carga horária máxima e preferências." },
      { title: "Configuração de Setores", description: "Defina unidades, setores, turnos e regras de cobertura mínima." },
      { title: "Montagem da Escala", description: "Crie a escala mensal com distribuição automática ou manual, respeitando regras configuradas." },
      { title: "Publicação", description: "Publique a escala e notifique todos os profissionais automaticamente pelo app." },
      { title: "Confirmação", description: "Profissionais confirmam presença pelo app. Gestores visualizam pendências." },
      { title: "Trocas", description: "Solicitações de troca são feitas pelo app com sugestão de substitutos disponíveis." },
      { title: "Acompanhamento", description: "Dashboard em tempo real com cobertura, ausências e indicadores de performance." },
    ],
    audienceTitle: "Para quem é o Unique Escalas?",
    audience: [
      { segment: "Hospitais", description: "Gestão de escalas de múltiplos setores (UTI, emergência, centro cirúrgico, enfermarias) com centenas de profissionais." },
      { segment: "Clínicas", description: "Organização de plantões e atendimentos por especialidade com controle de agenda." },
      { segment: "UPAs e Prontos-Socorros", description: "Cobertura 24h com gestão de turnos rotativos e substituições de emergência." },
      { segment: "Cooperativas Médicas", description: "Distribuição equitativa de plantões entre cooperados com controle de produtividade." },
      { segment: "Empresas de Home Care", description: "Escalas de profissionais em domicílio com geolocalização e confirmação de presença." },
    ],
    ctaTitle: "Elimine conflitos de escala hoje",
    ctaSubtitle:
      "Seus profissionais merecem previsibilidade. Sua gestão merece controle. Comece agora.",
    metaDescription:
      "Organize escalas médicas, plantões e trocas com app mobile. Ideal para hospitais, clínicas e cooperativas. Elimine conflitos de horário.",
  },
} as const;

export type SolutionSlug = keyof typeof SOLUTION_PAGE_DETAILS;

export function getSolutionPageDetail(slug: string) {
  return SOLUTION_PAGE_DETAILS[slug as SolutionSlug] ?? null;
}
