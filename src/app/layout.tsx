import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unique Gestor — Plataforma de Gestão Integrada",
  description:
    "Gestão Societária, Contratos (SGC) e Escalas Médicas em uma única plataforma. Automatize processos, garanta conformidade LGPD e escale sua operação.",
  keywords: [
    "gestão societária",
    "gestão de contratos",
    "escalas médicas",
    "SGC",
    "LGPD",
    "SaaS",
  ],
  openGraph: {
    title: "Unique Gestor — Plataforma de Gestão Integrada",
    description:
      "Três soluções poderosas em uma única plataforma para simplificar sua operação.",
    type: "website",
    locale: "pt_BR",
    siteName: "Unique Gestor",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-blue-600 focus:text-white focus:outline-none"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
