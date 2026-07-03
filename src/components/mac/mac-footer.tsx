import { UniqueLogo } from "@/components/mac/mac-logo";
import { LANDING_FOOTER } from "@/lib/landing-data";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function MacFooter() {
  const columns = [
    LANDING_FOOTER.columns.solucoes,
    LANDING_FOOTER.columns.empresa,
    LANDING_FOOTER.columns.suporte,
    LANDING_FOOTER.columns.legal,
  ];

  return (
    <footer className="border-t border-white/[0.06] pb-12 pt-16 md:pt-20">
      <div className="mac-container">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <UniqueLogo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500">
              {LANDING_FOOTER.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {LANDING_FOOTER.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-base font-bold text-white">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <li className="flex items-center gap-2 text-sm text-zinc-500">
              <Phone className="h-4 w-4 text-[#4d7cff]" strokeWidth={1.5} />
              {LANDING_FOOTER.contact.phone}
            </li>
            <li className="flex items-center gap-2 text-sm text-zinc-500">
              <Mail className="h-4 w-4 text-[#4d7cff]" strokeWidth={1.5} />
              {LANDING_FOOTER.contact.email}
            </li>
            <li className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="h-4 w-4 text-[#4d7cff]" strokeWidth={1.5} />
              {LANDING_FOOTER.contact.address.join(", ")}
            </li>
          </ul>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Unique Gestor. Todos os direitos
          reservados. CNPJ: {LANDING_FOOTER.cnpj}
        </p>
      </div>
    </footer>
  );
}
