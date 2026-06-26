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
    <footer className="relative border-t border-white/5 py-12">
      <div
        className="absolute inset-0 bg-gradient-to-t from-blue-950/10 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="font-display font-bold text-lg">
                Unique Gestor
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Plataforma de gestão integrada para empresas que buscam eficiência,
              controle e inovação.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Soluções</h4>
            <ul className="space-y-2">
              {FOOTER_SOLUTIONS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Empresa</h4>
            <ul className="space-y-2">
              {FOOTER_COMPANY.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2">
              {FOOTER_LEGAL.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Unique Gestor. Todos os direitos
            reservados.
          </div>
          <div className="text-sm text-gray-500">www.uniquegestor.com.br</div>
        </div>
      </div>
    </footer>
  );
}
