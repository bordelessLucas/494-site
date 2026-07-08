import { MacFooter } from "@/components/mac/mac-footer";
import { MacNavbar } from "@/components/mac/mac-navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições de uso da plataforma Unique Gestor. Leia antes de utilizar nossos serviços.",
  alternates: {
    canonical: "/termos",
  },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    title: "Aceitação dos termos",
    content:
      "Ao acessar ou utilizar a plataforma Unique Gestor, disponível em www.uniquegestor.com.br e seus subdomínios, você concorda integralmente com estes termos.",
  },
  {
    title: "Descrição dos serviços",
    content:
      "A Unique Gestor oferece uma plataforma SaaS de gestão integrada com os módulos Gestão Societária, SGC (Contratos) e Unique Escalas, acessível via navegador e aplicativo mobile.",
  },
  {
    title: "Cadastro e conta de acesso",
    content:
      "O usuário é responsável pela veracidade dos dados cadastrais e pela confidencialidade de suas credenciais de acesso. O compartilhamento de login é proibido.",
  },
  {
    title: "Obrigações do usuário",
    content:
      "O usuário deve utilizar a plataforma de forma lícita, em conformidade com a legislação vigente e políticas internas de sua organização, sem comprometer a segurança do sistema.",
  },
  {
    title: "Planos e pagamento",
    content:
      "Os planos Essencial, Profissional e Enterprise possuem condições comerciais específicas. O não pagamento pode resultar na suspensão do acesso após notificação prévia.",
  },
  {
    title: "Propriedade intelectual",
    content:
      "Todo o software, design e documentação da Unique Gestor são de propriedade exclusiva da empresa. Os dados inseridos pelo cliente permanecem de sua titularidade.",
  },
  {
    title: "Disponibilidade e SLA",
    content:
      "Comprometemo-nos com alta disponibilidade da plataforma. O plano Enterprise inclui SLA garantido de 99,9%. Demais planos seguem os níveis definidos no contrato comercial.",
  },
  {
    title: "Limitação de responsabilidade",
    content:
      "A Unique Gestor não se responsabiliza por danos indiretos decorrentes do uso da plataforma, exceto nos casos previstos em lei ou expressamente acordados em contrato.",
  },
  {
    title: "Rescisão e cancelamento",
    content:
      "O usuário pode cancelar sua assinatura a qualquer momento. A Unique Gestor reserva-se o direito de suspender contas que violem estes termos.",
  },
  {
    title: "Disposições gerais",
    content:
      "Estes termos podem ser atualizados periodicamente. O uso continuado da plataforma após alterações constitui aceitação dos novos termos.",
  },
  {
    title: "Foro competente",
    content:
      "Fica eleito o foro da comarca de São Paulo, SP, para dirimir quaisquer controvérsias decorrentes destes termos.",
  },
] as const;

export default function TermosPage() {
  return (
    <div className="mac-page min-h-screen">
      <MacNavbar />
      <main id="main-content" className="mac-container max-w-3xl pt-20 pb-16 sm:pt-28 sm:pb-24">
        <h1 className="mac-heading-lg text-white">Termos de Uso</h1>
        <p className="mt-4 text-sm text-zinc-500">Última atualização: julho de 2026</p>
        <p className="mt-6 text-base leading-relaxed text-zinc-400">
          Estes Termos de Uso regulam o acesso e a utilização da plataforma Unique
          Gestor. Ao utilizar nossos serviços, você concorda integralmente com estes
          termos.
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
          Dúvidas:{" "}
          <a
            href="mailto:contato@uniquegestor.com.br"
            className="text-[#4d7cff] hover:underline"
          >
            contato@uniquegestor.com.br
          </a>
        </p>
      </main>
      <MacFooter />
    </div>
  );
}
