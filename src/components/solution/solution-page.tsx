import { Button } from "@/components/ui/button";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { WhatsAppButton } from "@/components/landing/whatsapp-button";
import { getSolutionBySlug, type SOLUTIONS } from "@/lib/data";
import { ArrowRight, CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Solution = (typeof SOLUTIONS)[number];

const colorMap = {
  amber: "from-amber-500/20 to-amber-600/5 border-amber-500/20",
  blue: "from-blue-500/20 to-blue-600/5 border-blue-500/20",
  green: "from-green-500/20 to-green-600/5 border-green-500/20",
} as const;

export function SolutionPage({ solution }: { solution: Solution }) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <section className="pt-28 pb-16 relative">
          <div className="container mx-auto px-4">
            <Link
              href="/#solucoes"
              className="text-sm text-gray-400 hover:text-white transition-colors mb-8 inline-block"
            >
              ← Voltar para soluções
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="heading-hero mb-6">
                  {solution.title}
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  {solution.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="/#contato">
                  <Button variant="gradient" className="px-8 py-6 text-base">
                    Solicitar demonstração
                    <ArrowRight className="ml-2 w-5 h-5" aria-hidden />
                  </Button>
                </a>
              </div>

              <div
                className={`relative rounded-2xl border bg-gradient-to-b p-1 ${colorMap[solution.color]}`}
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0A0A0F]/90">
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="heading-section text-2xl md:text-3xl mb-8">
              Principais benefícios
            </h2>
            <ul className="space-y-4">
              {solution.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <CircleCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-section text-2xl md:text-3xl mb-4">
              Pronto para conhecer o {solution.title}?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Agende uma demonstração gratuita com nossa equipe e veja como a
              plataforma pode transformar sua operação.
            </p>
            <a href="/#contato">
              <Button variant="gradient" className="px-8">
                Agendar demonstração gratuita
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function resolveSolution(slug: string) {
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return solution;
}
