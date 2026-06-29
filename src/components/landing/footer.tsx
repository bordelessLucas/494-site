import Link from "next/link";

const FOOTER_SOLUTIONS = [
  { href: "/solucao/societaria", label: "Gestão Societária" },
  { href: "/solucao/sgc", label: "SGC — Contratos" },
  { href: "/solucao/escalas", label: "Unique Escalas" },
  { href: "/#funcionalidades", label: "Integrações" },
] as const;

const FOOTER_COMPANY = [
  { href: "/#contato", label: "Sobre nós" },
  { href: "/#contato", label: "Blog" },
  { href: "/#contato", label: "Carreiras" },
  { href: "/#contato", label: "Contato" },
] as const;

const FOOTER_LEGAL = [
  { href: "/termos", label: "Termos de Uso" },
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/privacidade", label: "LGPD" },
  { href: "/termos", label: "SLA" },
] as const;

export function Footer() {
  return (
    <footer className="relative py-16">
      <div className="divider-gradient absolute top-0 left-[10%] right-[10%]" aria-hidden />
      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-md gradient-border bg-white/[0.04] flex items-center justify-center">
                <span className="text-white/80 font-bold text-xs">U</span>
              </div>
              <span className="font-display font-bold text-base tracking-tight">
                Unique Gestor
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Plataforma de gestão integrada para empresas que buscam eficiência,
              controle e inovação.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm tracking-tight mb-5 text-white/80">
              Soluções
            </h4>
            <ul className="space-y-3">
              {FOOTER_SOLUTIONS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm tracking-tight mb-5 text-white/80">
              Empresa
            </h4>
            <ul className="space-y-3">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm tracking-tight mb-5 text-white/80">
              Legal
            </h4>
            <ul className="space-y-3">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="divider-gradient absolute top-0 left-0 right-0" aria-hidden />
          <div className="text-sm text-gray-600 pt-8">
            © {new Date().getFullYear()} Unique Gestor. Todos os direitos
            reservados.
          </div>
          <div className="text-sm text-gray-600">www.uniquegestor.com.br</div>
        </div>
      </div>
    </footer>
  );
}
