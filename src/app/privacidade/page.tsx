import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Unique Gestor",
  description: "Política de privacidade e tratamento de dados (LGPD) da Unique Gestor.",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <main id="main-content" className="container mx-auto px-4 pt-28 pb-24 max-w-3xl">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-8">
          Política de Privacidade
        </h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-400 leading-relaxed">
          <p>
            A Unique Gestor está comprometida com a proteção dos dados pessoais
            em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
            13.709/2018).
          </p>
          <h2 className="font-display font-semibold text-xl text-white">
            Dados coletados
          </h2>
          <p>
            Coletamos dados de identificação e contato (nome, e-mail, telefone,
            empresa) fornecidos voluntariamente em formulários, demonstrações e
            contratação do serviço.
          </p>
          <h2 className="font-display font-semibold text-xl text-white">
            Finalidade do tratamento
          </h2>
          <p>
            Os dados são utilizados para contato comercial, prestação do serviço,
            suporte técnico, melhoria da plataforma e cumprimento de obrigações
            legais.
          </p>
          <h2 className="font-display font-semibold text-xl text-white">
            Seus direitos
          </h2>
          <p>
            Você pode solicitar acesso, correção, exclusão ou portabilidade dos
            seus dados, bem como revogar consentimentos, entrando em contato pelo
            e-mail{" "}
            <a href="mailto:contato@uniquegestor.com.br" className="text-blue-400 hover:underline">
              contato@uniquegestor.com.br
            </a>
            .
          </p>
          <h2 className="font-display font-semibold text-xl text-white">
            Segurança
          </h2>
          <p>
            Adotamos criptografia, controle de acesso granular, backups
            automáticos e monitoramento contínuo para proteger suas informações.
          </p>
          <p className="text-gray-500 text-sm pt-8">
            Última atualização: junho de 2026.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
