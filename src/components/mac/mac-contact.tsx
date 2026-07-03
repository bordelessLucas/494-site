"use client";

import { OpenDemoButton } from "@/components/demo/open-demo-button";
import { LANDING_CONTACT } from "@/lib/landing-data";
import { Calendar, MessageSquare, User } from "lucide-react";

const STEPS = [
  {
    icon: User,
    title: "Seus dados",
    description: "Nome, e-mail, telefone, empresa e cargo",
  },
  {
    icon: MessageSquare,
    title: "Soluções de interesse",
    description: "Selecione os módulos que deseja conhecer",
  },
  {
    icon: Calendar,
    title: "Agendamento",
    description: "Escolha a melhor data e horário",
  },
] as const;

export function MacContact() {
  return (
    <section id="contato" className="mac-section">
      <div className="mac-container">
        <div className="mac-card grid grid-cols-1 gap-12 p-8 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div>
            <h2 className="mac-heading-lg text-white">
              {LANDING_CONTACT.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              {LANDING_CONTACT.description}
            </p>

            <div className="mt-10 space-y-6">
              {STEPS.map((step, index) => (
                <div key={step.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4d7cff]/15 text-[#4d7cff]">
                    <step.icon className="h-4 w-4" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Etapa {index + 1}
                    </p>
                    <p className="mt-0.5 font-display font-semibold text-white">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="rounded-[28px] border border-white/[0.08] bg-[#0a0a10] p-8 text-center">
              <p className="text-sm text-zinc-400">
                Preencha o formulário de agendamento e nossa equipe entrará em
                contato no dia e horário escolhidos.
              </p>
              <OpenDemoButton variant="gradient" className="mt-6 w-full gap-2">
                Confirmar Agendamento
              </OpenDemoButton>
              <p className="mt-4 text-xs text-zinc-600">
                Horários disponíveis no fuso de Brasília (GMT-3)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
