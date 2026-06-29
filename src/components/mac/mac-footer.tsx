import { UniqueLogo } from "@/components/mac/mac-logo";
import { LANDING_FOOTER } from "@/lib/landing-data";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";

const SOCIAL = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
] as const;

export function MacFooter() {
  return (
    <footer id="contato" className="border-t border-white/[0.06] pb-12 pt-16 md:pt-20">
      <div className="mac-container">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <UniqueLogo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-500">
              {LANDING_FOOTER.description}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base font-bold text-white">
              Navegação
            </h3>
            <ul className="mt-5 space-y-3">
              {LANDING_FOOTER.navigation.map((link) => (
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

          <div>
            <h3 className="font-display text-base font-bold text-white">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              {LANDING_FOOTER.licence.map((link) => (
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

          <div>
            <h3 className="font-display text-base font-bold text-white">
              Contato
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <Phone
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4d7cff]"
                  strokeWidth={1.5}
                />
                {LANDING_FOOTER.contact.phone}
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <Mail
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4d7cff]"
                  strokeWidth={1.5}
                />
                {LANDING_FOOTER.contact.email}
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#4d7cff]"
                  strokeWidth={1.5}
                />
                <span>
                  {LANDING_FOOTER.contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-14 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} Unique Gestor. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
