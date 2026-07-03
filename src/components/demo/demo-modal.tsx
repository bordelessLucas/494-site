"use client";

import { MacPillButton } from "@/components/mac/mac-pill-button";
import { DEMO_SOLUTIONS, type DemoTimeSlot } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { formatPhone, validateDemoStep1 } from "@/lib/validation";
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
  solution: string;
  name: string;
  email: string;
  phone: string;
};

type DemoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ModalStep = "form" | "calendar" | "success";

const initialFormData: DemoFormData = {
  solution: "",
  name: "",
  email: "",
  phone: "",
};

const inputClass =
  "w-full rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none ring-1 ring-white/[0.08] transition-shadow focus:ring-[#4d7cff]/40";

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<ModalStep>("form");
  const [formData, setFormData] = useState<DemoFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [slots, setSlots] = useState<DemoTimeSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const selectedSlot = slots.find((slot) => slot.date === selectedDate);

  useEffect(() => {
    if (!isOpen) return;

    setStep("form");
    setFormData(initialFormData);
    setErrors({});
    setSelectedDate("");
    setSelectedTime("");
    setSubmitError("");
    setIsSubmitting(false);
    setSlots([]);
    setIsLoadingSlots(false);
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
          setSubmitError("Não foi possível carregar os horários. Tente novamente.");
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

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const stepErrors = validateDemoStep1(formData);
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
        setSubmitError(data.error ?? "Erro ao agendar. Tente novamente.");
        return;
      }

      setStep("success");
    } catch {
      setSubmitError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedSolutionLabel =
    DEMO_SOLUTIONS.find((item) => item.id === formData.solution)?.label ?? "";

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
            className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[28px] border border-white/[0.08] bg-[#0c0c14] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.8)] sm:rounded-[28px]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {step === "form" && "Passo 1 de 2"}
                  {step === "calendar" && "Passo 2 de 2"}
                  {step === "success" && "Concluído"}
                </p>
                <h2
                  id="demo-modal-title"
                  className="mt-1 font-display text-xl font-bold text-white"
                >
                  {step === "form" && "Solicitar demonstração"}
                  {step === "calendar" && "Escolha data e horário"}
                  {step === "success" && "Demonstração agendada!"}
                </h2>
                {step === "calendar" && (
                  <p className="mt-1 text-sm text-zinc-400">
                    Olá, {formData.name.split(" ")[0]} — escolha o melhor horário
                    para a demo.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              {step === "form" && (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium text-zinc-300">
                      Qual solução tem interesse?
                    </legend>
                    <div className="grid gap-2">
                      {DEMO_SOLUTIONS.map((solution) => {
                        const isSelected = formData.solution === solution.id;
                        return (
                          <label
                            key={solution.id}
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 text-sm transition-all",
                              isSelected
                                ? "bg-[#4d7cff]/15 ring-1 ring-[#4d7cff]/40 text-white"
                                : "bg-white/[0.03] ring-1 ring-white/[0.06] text-zinc-300 hover:bg-white/[0.05]",
                            )}
                          >
                            <span>{solution.label}</span>
                            <input
                              type="radio"
                              name="solution"
                              value={solution.id}
                              checked={isSelected}
                              onChange={() => updateField("solution", solution.id)}
                              className="sr-only"
                            />
                            {isSelected && (
                              <Check className="h-4 w-4 text-[#4d7cff]" strokeWidth={2} />
                            )}
                          </label>
                        );
                      })}
                    </div>
                    {errors.solution && (
                      <p className="text-xs text-red-400">{errors.solution}</p>
                    )}
                  </fieldset>

                  <div className="space-y-2">
                    <label htmlFor="demo-name" className="text-sm font-medium text-zinc-300">
                      Nome completo
                    </label>
                    <input
                      id="demo-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="demo-email" className="text-sm font-medium text-zinc-300">
                      E-mail
                    </label>
                    <input
                      id="demo-email"
                      type="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className={inputClass}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="demo-phone" className="text-sm font-medium text-zinc-300">
                      Telefone
                    </label>
                    <input
                      id="demo-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(11) 9 0000-0000"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", formatPhone(e.target.value))}
                      className={inputClass}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400">{errors.phone}</p>
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

              {step === "calendar" && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-zinc-400 ring-1 ring-white/[0.06]">
                    <Calendar className="h-4 w-4 shrink-0 text-[#4d7cff]" strokeWidth={1.75} />
                    <span>
                      {selectedSolutionLabel} · {formData.email}
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
                    <p className="text-sm font-medium text-zinc-300">Datas disponíveis</p>
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
                      <p className="text-sm font-medium text-zinc-300">Horários disponíveis</p>
                      <div className="grid grid-cols-3 gap-2">
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
                      onClick={() => setStep("form")}
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
                          Confirmar agendamento
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
                      onClick={() => setStep("form")}
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
                      Sua demonstração de{" "}
                      <span className="text-white">{selectedSolutionLabel}</span>{" "}
                      foi agendada para:
                    </p>
                    <p className="mt-3 font-display text-2xl font-bold text-white">
                      {selectedSlot.weekday}, {selectedSlot.dayLabel}
                    </p>
                    <p className="mt-1 text-lg text-[#4d7cff]">{selectedTime}</p>
                  </div>

                  <p className="text-sm text-zinc-500">
                    Enviaremos um e-mail de confirmação para{" "}
                    <span className="text-zinc-300">{formData.email}</span> com o
                    link da reunião.
                  </p>

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
