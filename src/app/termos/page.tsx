import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso — Unique Gestor",
  description: "Termos de uso da plataforma Unique Gestor.",
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <main id="main-content" className="container mx-auto px-4 pt-28 pb-24 max-w-3xl">
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-8">
          Termos de Uso
        </h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-gray-400 leading-relaxed">
          <p>
            Ao utilizar a plataforma Unique Gestor, você concorda com estes termos.
            O serviço é oferecido sob modelo SaaS (Software as a Service), com
            acesso mediante contrato ou período de avaliação autorizado.
          </p>
          <h2 className="font-display font-semibold text-xl text-white">
            Uso da plataforma
          </h2>
          <p>
            O usuário é responsável pela veracidade dos dados inseridos e pelo
            uso adequado das funcionalidades, em conformidade com a legislação
            vigente e políticas internas de sua organização.
          </p>
          <h2 className="font-display font-semibold text-xl text-white">
            Disponibilidade e SLA
          </h2>
          <p>
            Comprometemo-nos com alta disponibilidade da plataforma. Os níveis
            de serviço (SLA) específicos são definidos no contrato comercial
            conforme o plano contratado.
          </p>
          <h2 className="font-display font-semibold text-xl text-white">
            Propriedade intelectual
          </h2>
          <p>
            Todo o software, design e documentação da Unique Gestor são de
            propriedade exclusiva da empresa. Os dados inseridos pelo cliente
            permanecem de sua titularidade.
          </p>
          <p className="text-gray-500 text-sm pt-8">
            Última atualização: junho de 2026. Para dúvidas, contate{" "}
            <a href="mailto:contato@uniquegestor.com.br" className="text-blue-400 hover:underline">
              contato@uniquegestor.com.br
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
