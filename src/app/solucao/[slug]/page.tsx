import { SolutionPage, resolveSolution } from "@/components/solution/solution-page";
import { getSolutionPageDetail } from "@/lib/solution-pages";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const META_TITLES: Record<string, string> = {
  societaria: "Gestão Societária — Unique Gestor",
  sgc: "SGC — Sistema de Gestão de Contratos — Unique Gestor",
  escalas: "Unique Escalas — Gestão de Escalas Médicas",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = resolveSolution(slug);
  const details = getSolutionPageDetail(slug);
  return {
    title: META_TITLES[slug] ?? `${solution.title} — Unique Gestor`,
    description: details?.metaDescription ?? solution.description,
  };
}

export async function generateStaticParams() {
  return [
    { slug: "societaria" },
    { slug: "sgc" },
    { slug: "escalas" },
  ];
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const solution = resolveSolution(slug);
  return <SolutionPage solution={solution} />;
}
