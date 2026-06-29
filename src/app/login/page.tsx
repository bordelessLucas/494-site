import { Button } from "@/components/ui/button";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar — Unique Gestor",
  description: "Acesse a plataforma Unique Gestor.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <main id="main-content" className="container mx-auto px-4 pt-32 pb-24 max-w-md text-center">
        <h1 className="heading-page mb-4">Área do cliente</h1>
        <p className="text-gray-400 mb-8">
          O portal de acesso à plataforma está em implantação. Entre em contato
          com nossa equipe para obter suas credenciais de acesso.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/#contato">
            <Button variant="gradient" className="w-full">
              Solicitar acesso
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full">
              Voltar ao site
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
