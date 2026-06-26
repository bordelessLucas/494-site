import { SolutionPage, resolveSolution } from "@/components/solution/solution-page";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = resolveSolution(slug);
  return {
    title: `${solution.title} — Unique Gestor`,
    description: solution.description,
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
