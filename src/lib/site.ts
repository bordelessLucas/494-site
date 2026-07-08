import { ASSETS } from "@/lib/assets";

export const SITE_NAME = "Unique Gestor";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.uniquegestor.com.br";

export const SITE_DESCRIPTION =
  "Gestão Societária, Contratos e Escalas Médicas em uma única plataforma. Controle total, workflow inteligente e conformidade com a LGPD. Teste grátis por 14 dias.";

export const SITE_OG_IMAGE = ASSETS.dashboard;

export const SITE_CONTACT = {
  email: "contato@uniquegestor.com.br",
  phone: "+55-11-99999-9999",
  phoneDisplay: "(11) 99999-9999",
  addressLocality: "São Paulo",
  addressRegion: "SP",
  addressCountry: "BR",
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
