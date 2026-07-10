import { MacNavbar } from "@/components/mac/mac-navbar";
import { MacFooter } from "@/components/mac/mac-footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a Unique Gestor coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD.",
  alternates: {
    canonical: "/privacidade",
  },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    title: "Dados que coletamos",
    content:
      "Coletamos dados de identificação e contato (nome, e-mail, telefone, empresa, cargo) fornecidos voluntariamente em formulários, demonstrações e contratação do serviço. Também coletamos dados de uso da plataforma para melhoria do serviço.",
  },
  {
    title: "Como utilizamos seus dados",
    content:
      "Os dados são utilizados para contato comercial, prestação do serviço, suporte técnico, melhoria da plataforma, envio de comunicações relevantes e cumprimento de obrigações legais.",
  },
  {
    title: "Base legal para o tratamento",
    content:
      "O tratamento de dados pessoais é realizado com base no consentimento do titular, execução de contrato, cumprimento de obrigação legal e legítimo interesse, conforme previsto na LGPD.",
  },
  {
    title: "Compartilhamento de dados",
    content:
      "Não vendemos seus dados. O compartilhamento ocorre apenas com prestadores de serviço essenciais (hospedagem, e-mail) sob contratos de confidencialidade, ou quando exigido por lei.",
  },
  {
    title: "Armazenamento e segurança",
    content:
      "Utilizamos criptografia de ponta a ponta, servidores com certificação ISO 27001, backup diário automático e controle de acesso granular por perfil para proteger suas informações.",
  },
  {
    title: "Retenção de dados",
    content:
      "Os dados são mantidos pelo período necessário à prestação do serviço e cumprimento de obrigações legais. Após o encerramento do contrato, os dados são eliminados ou anonimizados conforme solicitado.",
  },
  {
    title: "Seus direitos como titular",
    content:
      "Você pode solicitar acesso, correção, exclusão, portabilidade, revogação de consentimento ou oposição ao tratamento dos seus dados a qualquer momento.",
  },
  {
    title: "Cookies e tecnologias de rastreamento",
    content:
      "Utilizamos cookies essenciais para funcionamento da plataforma e cookies analíticos para entender o uso do site. Você pode gerenciar suas preferências no navegador.",
  },
  {
    title: "Encarregado de Dados (DPO)",
    content:
      "Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com nosso Encarregado de Dados pelo e-mail privacidade@uniquegestor.com.br.",
  },
  {
    title: "Alterações nesta política",
    content:
      "Esta política pode ser atualizada periodicamente. Alterações significativas serão comunicadas por e-mail ou aviso na plataforma.",
  },
] as const;

export default function PrivacidadePage() {
  return (
    <div className="mac-page min-h-screen">
      <MacNavbar />
      <main id="main-content" className="mac-container max-w-3xl pt-20 pb-16 sm:pt-28 sm:pb-24">
        <h1 className="mac-heading-lg text-white">Política de Privacidade</h1>
        <p className="mt-4 text-sm text-zinc-500">Última atualização: julho de 2026</p>
        <p className="mt-6 text-base leading-relaxed text-zinc-400">
          A Unique Gestor (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo; ou &ldquo;Empresa&rdquo;) está
          comprometida com a proteção dos dados pessoais de seus usuários, clientes e
          visitantes. Esta Política de Privacidade descreve como coletamos, utilizamos,
          armazenamos e protegemos suas informações pessoais em conformidade com a Lei
          Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </p>
        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-bold text-white">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {section.content}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-zinc-500">
          Contato do DPO:{" "}
          <a
            href="mailto:privacidade@uniquegestor.com.br"
            className="text-[#4d7cff] hover:underline"
          >
            privacidade@uniquegestor.com.br
          </a>
          {" · "}
          <a href="tel:+5511999999999" className="text-[#4d7cff] hover:underline">
            (11) 99999-9999
          </a>
        </p>
      </main>
      <MacFooter />
    </div>
  );
}
