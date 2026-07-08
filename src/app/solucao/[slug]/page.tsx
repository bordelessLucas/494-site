import { SolutionPage, resolveSolution } from "@/components/solution/solution-page";
import { getSolutionPageDetail } from "@/lib/solution-pages";
import { SITE_NAME, SITE_OG_IMAGE, absoluteUrl } from "@/lib/site";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

const META_TITLES: Record<string, string> = {
  societaria: "Gestão Societária",
  sgc: "SGC — Sistema de Gestão de Contratos",
  escalas: "Unique Escalas — Gestão de Escalas Médicas",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = resolveSolution(slug);
  const details = getSolutionPageDetail(slug);
  const title = META_TITLES[slug] ?? solution.title;
  const description = details?.metaDescription ?? solution.description;
  const path = `/solucao/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: absoluteUrl(path),
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NAME,
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
      images: [SITE_OG_IMAGE],
    },
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
