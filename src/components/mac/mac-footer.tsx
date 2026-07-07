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
    <footer className="border-t border-white/[0.06] pb-8 pt-12 sm:pb-12 sm:pt-16 md:pt-20">
      <div className="mac-container">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-5 lg:gap-10">
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

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-white/[0.06] pt-6 sm:mt-12 sm:flex-row sm:items-center sm:gap-6 sm:pt-8">
          <ul className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-6">
            <li className="flex items-start gap-2 text-sm text-zinc-500 sm:items-center">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#4d7cff] sm:mt-0" strokeWidth={1.5} />
              {LANDING_FOOTER.contact.phone}
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-500 sm:items-center">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#4d7cff] sm:mt-0" strokeWidth={1.5} />
              <span className="break-all sm:break-normal">{LANDING_FOOTER.contact.email}</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-500 sm:items-center">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#4d7cff] sm:mt-0" strokeWidth={1.5} />
              <span>{LANDING_FOOTER.contact.address.join(", ")}</span>
            </li>
          </ul>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-zinc-600 sm:mt-8">
          &copy; {new Date().getFullYear()} Unique Gestor. Todos os direitos
          reservados. CNPJ: {LANDING_FOOTER.cnpj}
        </p>
      </div>
    </footer>
  );
}
