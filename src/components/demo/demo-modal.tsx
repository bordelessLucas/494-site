"use client";

import { MacPillButton } from "@/components/mac/mac-pill-button";
import { DEMO_SOLUTIONS } from "@/lib/demo-data";
import { COMPANY_SIZES } from "@/lib/landing-data";
import { cn } from "@/lib/utils";
import {
  formatPhone,
  validateDemoStep1,
  validateDemoStep2,
} from "@/lib/validation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

type DemoFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  companySize: string;
  solutions: string[];
  message: string;
};

type DemoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ModalStep = "personal" | "solutions" | "calendar" | "success";

const initialFormData: DemoFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  companySize: "",
  solutions: [],
  message: "",
};

const inputClass =
  "w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none ring-1 ring-white/[0.08] transition-shadow focus:ring-[#4d7cff]/40";

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<ModalStep>("personal");
  const [formData, setFormData] = useState<DemoFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [slots, setSlots] = useState<
    Array<{ date: string; dayLabel: string; weekday: string; times: string[] }>
  >([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const selectedSlot = slots.find((slot) => slot.date === selectedDate);

  useEffect(() => {
    if (!isOpen) return;

    setStep("personal");
    setFormData(initialFormData);
    setErrors({});
    setSelectedDate("");
    setSelectedTime("");
    setSubmitError("");
    setIsSubmitting(false);
    setSlots([]);
    setIsLoadingSlots(false);
    setEmailSent(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || step !== "calendar") return;

    let isCancelled = false;

    const loadSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const res = await fetch("/api/demo/slots");
        const data = await res.json();
        if (!isCancelled && res.ok) {
          setSlots(data.slots ?? []);
        }
      } catch {
        if (!isCancelled) {
          setSubmitError(
            "Não foi possível enviar. Tente novamente ou entre em contato pelo WhatsApp.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingSlots(false);
        }
      }
    };

    void loadSlots();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, step]);

  useEffect(() => {
    if (!selectedDate && slots.length > 0) {
      setSelectedDate(slots[0].date);
    }
  }, [selectedDate, slots]);

  const updateField = (field: keyof DemoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleSolution = (solutionId: string) => {
    setFormData((prev) => ({
      ...prev,
      solutions: prev.solutions.includes(solutionId)
        ? prev.solutions.filter((id) => id !== solutionId)
        : [...prev.solutions, solutionId],
    }));
    if (errors.solutions) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.solutions;
        return next;
      });
    }
  };

  const handlePersonalSubmit = (event: FormEvent) => {
    event.preventDefault();
    const stepErrors = validateDemoStep1(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep("solutions");
  };

  const handleSolutionsSubmit = (event: FormEvent) => {
    event.preventDefault();
    const stepErrors = validateDemoStep2(formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep("calendar");
  };

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) {
      setSubmitError("Selecione uma data e horário para continuar.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          scheduledDate: selectedDate,
          scheduledTime: selectedTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fields) {
          const flat: Record<string, string> = {};
          for (const [key, msgs] of Object.entries(data.fields)) {
            if (Array.isArray(msgs) && msgs[0]) flat[key] = msgs[0];
          }
          setErrors(flat);
        }
        setSubmitError(
          data.error ??
            "Não foi possível enviar. Tente novamente ou entre em contato pelo WhatsApp.",
        );
        return;
      }

      setEmailSent(Boolean(data.emailSent));
      setStep("success");
    } catch {
      setSubmitError(
        "Não foi possível enviar. Tente novamente ou entre em contato pelo WhatsApp.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSolutionsLabel = formData.solutions
    .map((id) => DEMO_SOLUTIONS.find((item) => item.id === id)?.label ?? id)
    .join(", ");

  const stepLabel =
    step === "personal"
      ? "Passo 1 de 3"
      : step === "solutions"
        ? "Passo 2 de 3"
        : step === "calendar"
          ? "Passo 3 de 3"
          : "Concluído";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label="Fechar modal"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="safe-bottom relative z-10 flex max-h-[min(92dvh,920px)] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] border border-white/[0.08] bg-[#0c0c14] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)] sm:rounded-[28px]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-4 sm:gap-4 sm:px-6 sm:py-5">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {stepLabel}
                </p>
                <h2
                  id="demo-modal-title"
                  className="mt-1 font-display text-lg font-bold text-white sm:text-xl"
                >
                  {step === "personal" && "Seus dados"}
                  {step === "solutions" && "Soluções de interesse"}
                  {step === "calendar" && "Agendamento"}
                  {step === "success" && "Demonstração agendada com sucesso!"}
                </h2>
                {step === "solutions" && (
                  <p className="mt-1 text-sm text-zinc-400">
                    Selecione as soluções que deseja conhecer na demonstração.
                  </p>
                )}
                {step === "calendar" && (
                  <p className="mt-1 text-sm text-zinc-400">
                    Escolha a melhor data e horário para a demonstração.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              {step === "personal" && (
                <form onSubmit={handlePersonalSubmit} className="space-y-4">
                  {(
                    [
                      { id: "demo-name", field: "name" as const, label: "Nome completo", placeholder: "Seu nome completo", type: "text" },
                      { id: "demo-email", field: "email" as const, label: "E-mail", placeholder: "seu@email.com", type: "email" },
                      { id: "demo-phone", field: "phone" as const, label: "Telefone / WhatsApp", placeholder: "(11) 99999-9999", type: "tel" },
                      { id: "demo-company", field: "company" as const, label: "Empresa", placeholder: "Nome da sua empresa", type: "text" },
                      { id: "demo-role", field: "role" as const, label: "Cargo", placeholder: "Seu cargo na empresa", type: "text" },
                    ] as const
                  ).map(({ id, field, label, placeholder, type }) => (
                    <div key={id} className="space-y-2">
                      <label htmlFor={id} className="text-sm font-medium text-zinc-300">
                        {label}
                      </label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={formData[field]}
                        onChange={(e) =>
                          updateField(
                            field,
                            field === "phone" ? formatPhone(e.target.value) : e.target.value,
                          )
                        }
                        className={inputClass}
                      />
                      {errors[field] && (
                        <p className="text-xs text-red-400">{errors[field]}</p>
                      )}
                    </div>
                  ))}

                  <div className="space-y-2">
                    <label htmlFor="demo-size" className="text-sm font-medium text-zinc-300">
                      Porte da empresa
                    </label>
                    <select
                      id="demo-size"
                      value={formData.companySize}
                      onChange={(e) => updateField("companySize", e.target.value)}
                      className={inputClass}
                    >
                      <option value="" className="bg-[#0c0c14]">
                        Selecione (MEI / Micro / Pequena / Média / Grande)
                      </option>
                      {COMPANY_SIZES.map((size) => (
                        <option key={size.value} value={size.value} className="bg-[#0c0c14]">
                          {size.label}
                        </option>
                      ))}
                    </select>
                    {errors.companySize && (
                      <p className="text-xs text-red-400">{errors.companySize}</p>
                    )}
                  </div>

                  <MacPillButton
                    type="submit"
                    variant="gradient"
                    className="mt-2 w-full gap-2"
                  >
                    Continuar
                    <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                  </MacPillButton>
                </form>
              )}

              {step === "solutions" && (
                <form onSubmit={handleSolutionsSubmit} className="space-y-5">
                  <div className="grid gap-2">
                    {DEMO_SOLUTIONS.map((solution) => {
                      const isSelected = formData.solutions.includes(solution.id);
                      return (
                        <label
                          key={solution.id}
                          className={cn(
                            "flex cursor-pointer items-start gap-3 rounded-xl px-4 py-3 transition-all",
                            isSelected
                              ? "bg-[#4d7cff]/15 ring-1 ring-[#4d7cff]/40 text-white"
                              : "bg-white/[0.03] ring-1 ring-white/[0.06] text-zinc-300 hover:bg-white/[0.05]",
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSolution(solution.id)}
                            className="mt-1"
                          />
                          <span>
                            <span className="block text-sm font-medium">{solution.label}</span>
                            <span className="mt-0.5 block text-xs text-zinc-500">
                              {solution.description}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.solutions && (
                    <p className="text-xs text-red-400">{errors.solutions}</p>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="demo-message" className="text-sm font-medium text-zinc-300">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      id="demo-message"
                      rows={3}
                      placeholder="Conte-nos mais sobre sua necessidade ou dúvida específica…"
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>

                  <div className="flex gap-3">
                    <MacPillButton
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() => setStep("personal")}
                    >
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                      Voltar
                    </MacPillButton>
                    <MacPillButton
                      type="submit"
                      variant="gradient"
                      className="flex-1 gap-2"
                    >
                      Continuar
                      <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                    </MacPillButton>
                  </div>
                </form>
              )}

              {step === "calendar" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-zinc-400 ring-1 ring-white/[0.06]">
                    <Calendar className="h-4 w-4 shrink-0 text-[#4d7cff]" strokeWidth={1.75} />
                    <span>
                      {selectedSolutionsLabel} · {formData.email}
                    </span>
                  </div>

                  {isLoadingSlots ? (
                    <div className="flex items-center justify-center gap-2 py-12 text-sm text-zinc-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Carregando horários...
                    </div>
                  ) : slots.length === 0 ? (
                    <p className="py-8 text-center text-sm text-zinc-400">
                      Nenhum horário disponível no momento. Tente novamente mais tarde.
                    </p>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-zinc-300">Data preferencial</p>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {slots.map((slot) => {
                            const isSelected = selectedDate === slot.date;
                            return (
                              <button
                                key={slot.date}
                                type="button"
                                onClick={() => {
                                  setSelectedDate(slot.date);
                                  setSelectedTime("");
                                  setSubmitError("");
                                }}
                                className={cn(
                                  "flex min-w-[88px] shrink-0 flex-col items-center rounded-xl px-3 py-3 text-center transition-all",
                                  isSelected
                                    ? "mac-gradient-bg text-white shadow-[0_4px_20px_-6px_rgba(77,124,255,0.6)]"
                                    : "bg-white/[0.03] text-zinc-400 ring-1 ring-white/[0.06] hover:bg-white/[0.05]",
                                )}
                              >
                                <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
                                  {slot.weekday.slice(0, 3)}
                                </span>
                                <span className="mt-0.5 font-display text-lg font-bold">
                                  {slot.dayLabel.split(" ")[0]}
                                </span>
                                <span className="text-[10px] opacity-70">
                                  {slot.dayLabel.split(" ")[1]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {selectedSlot && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-zinc-300">Horário</p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {selectedSlot.times.map((time) => {
                              const isSelected = selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  type="button"
                                  onClick={() => {
                                    setSelectedTime(time);
                                    setSubmitError("");
                                  }}
                                  className={cn(
                                    "rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                                    isSelected
                                      ? "bg-[#4d7cff]/20 text-white ring-1 ring-[#4d7cff]/50"
                                      : "bg-white/[0.03] text-zinc-300 ring-1 ring-white/[0.06] hover:bg-white/[0.05]",
                                  )}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {submitError && (
                        <p className="text-sm text-red-400">{submitError}</p>
                      )}

                      <div className="flex gap-3 pt-1">
                        <MacPillButton
                          type="button"
                          variant="outline"
                          className="gap-2"
                          onClick={() => setStep("solutions")}
                          disabled={isSubmitting}
                        >
                          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                          Voltar
                        </MacPillButton>
                        <MacPillButton
                          type="button"
                          variant="gradient"
                          className="flex-1 gap-2"
                          onClick={handleSchedule}
                          disabled={isSubmitting || !selectedTime || isLoadingSlots}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Agendando...
                            </>
                          ) : (
                            <>
                              Confirmar Agendamento
                              <Check className="h-4 w-4" strokeWidth={1.75} />
                            </>
                          )}
                        </MacPillButton>
                      </div>
                    </>
                  )}

                  {(isLoadingSlots || slots.length === 0) && (
                    <MacPillButton
                      type="button"
                      variant="outline"
                      className="gap-2"
                      onClick={() => setStep("solutions")}
                    >
                      <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                      Voltar
                    </MacPillButton>
                  )}
                </div>
              )}

              {step === "success" && selectedSlot && (
                <div className="space-y-6 py-2 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full mac-gradient-bg shadow-[0_8px_32px_-8px_rgba(77,124,255,0.55)]">
                    <Check className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>

                  <div>
                    <p className="text-base text-zinc-300">
                      {emailSent
                        ? "Enviamos um e-mail de confirmação com os detalhes e um convite de calendário (.ics) para adicionar ao Google Calendar ou Outlook."
                        : "Nossa equipe entrará em contato no dia e horário escolhidos."}
                      {" "}Enquanto isso, fique à vontade para explorar nosso site.
                    </p>
                    <p className="mt-4 font-display text-2xl font-bold text-white">
                      {selectedSlot.weekday}, {selectedSlot.dayLabel}
                    </p>
                    <p className="mt-1 text-lg text-[#4d7cff]">{selectedTime}</p>
                  </div>

                  <MacPillButton
                    type="button"
                    variant="gradient"
                    className="w-full"
                    onClick={onClose}
                  >
                    Fechar
                  </MacPillButton>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
