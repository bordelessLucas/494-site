"use client";

import { Button } from "@/components/ui/button";
import { ContactInfoCards } from "@/components/landing/contact-info-cards";
import { AnimateOnScroll, SectionHeader } from "@/components/landing/motion";
import { FORM_STEPS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { formatPhone, validateStep1 } from "@/lib/validation";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  employees: string;
  modules: string[];
  message: string;
  lgpdConsent: boolean;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  employees: "",
  modules: [],
  message: "",
  lgpdConsent: false,
};

const MODULES = [
  "Gestão Societária",
  "SGC — Contratos",
  "Unique Escalas",
] as const;

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all";

export function ContactSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (typeof value === "string" && errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleModule = (module: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter((m) => m !== module)
        : [...prev.modules, module],
    }));
    if (errors.modules) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.modules;
        return next;
      });
    }
  };

  const isStep2Valid = formData.modules.length > 0;

  const handleNext = () => {
    if (step === 1) {
      const stepErrors = validateStep1(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    if (step === 2 && !isStep2Valid) {
      setErrors({ modules: "Selecione ao menos um módulo" });
      return;
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) return;

    if (!formData.lgpdConsent) {
      setErrors({ lgpdConsent: "É necessário aceitar a política de privacidade" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lgpdConsent: true,
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
        setSubmitError(data.error ?? "Erro ao enviar. Tente novamente.");
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Contato"
          title={
            <>
              Agende sua{" "}
              <span className="gradient-text-animated">demonstração</span>
            </>
          }
          description="Preencha o formulário abaixo e nossa equipe entrará em contato para uma apresentação personalizada."
          className="mb-12"
        />

        <AnimateOnScroll direction="scale" duration={800}>
        <div className="max-w-4xl mx-auto">
          <div
            className="flex items-center justify-center gap-1 sm:gap-2 mb-10"
            role="list"
            aria-label={`Etapa ${step} de 3: ${FORM_STEPS[step - 1]?.label}`}
          >
            {FORM_STEPS.map((formStep, i) => (
              <div key={formStep.number} className="flex items-center" role="listitem">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-300",
                      step >= formStep.number
                        ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-110"
                        : "bg-white/5 border border-white/10 text-gray-500",
                    )}
                    aria-current={step === formStep.number ? "step" : undefined}
                  >
                    {formStep.number}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs mt-1.5 hidden sm:block",
                      step >= formStep.number ? "text-gray-300" : "text-gray-600",
                    )}
                  >
                    {formStep.label}
                  </span>
                </div>
                {i < FORM_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-8 sm:w-16 md:w-24 h-0.5 mx-1 sm:mx-2 mb-4 sm:mb-0 transition-colors duration-300",
                      step > formStep.number ? "bg-blue-500/50" : "bg-white/10",
                    )}
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-10">
            {isSubmitted ? (
              <div className="text-center py-12">
                <h3 className="font-display font-semibold text-2xl mb-2">
                  Solicitação enviada!
                </h3>
                <p className="text-gray-400">
                  Nossa equipe entrará em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {step === 1 && (
                  <div className="space-y-5 animate-fade-up">
                    <div className="mb-6">
                      <h3 className="font-display font-semibold text-xl mb-1">
                        Seus dados
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Informe seus dados de contato para agendarmos a
                        demonstração.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-sm text-gray-400 mb-1.5 block">
                          Nome completo *
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          className={cn(inputClass, errors.name ? "border-red-500/50" : "border-white/10")}
                          placeholder="Seu nome completo"
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="text-sm text-gray-400 mb-1.5 block">
                          E-mail corporativo *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className={cn(inputClass, errors.email ? "border-red-500/50" : "border-white/10")}
                          placeholder="email@empresa.com.br"
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="text-sm text-gray-400 mb-1.5 block">
                          Telefone / WhatsApp *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", formatPhone(e.target.value))}
                          className={cn(inputClass, errors.phone ? "border-red-500/50" : "border-white/10")}
                          placeholder="(11) 9 0000-0000"
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="company" className="text-sm text-gray-400 mb-1.5 block">
                          Empresa
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => updateField("company", e.target.value)}
                          className={cn(inputClass, "border-white/10")}
                          placeholder="Nome da empresa"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="role" className="text-sm text-gray-400 mb-1.5 block">
                          Cargo
                        </label>
                        <input
                          id="role"
                          type="text"
                          value={formData.role}
                          onChange={(e) => updateField("role", e.target.value)}
                          className={cn(inputClass, "border-white/10")}
                          placeholder="Seu cargo"
                        />
                      </div>
                      <div>
                        <label htmlFor="employees" className="text-sm text-gray-400 mb-1.5 block">
                          N° de funcionários
                        </label>
                        <select
                          id="employees"
                          value={formData.employees}
                          onChange={(e) => updateField("employees", e.target.value)}
                          className={cn(inputClass, "border-white/10")}
                        >
                          <option value="" className="bg-gray-900">Selecione</option>
                          <option value="1-10" className="bg-gray-900">1 a 10</option>
                          <option value="11-50" className="bg-gray-900">11 a 50</option>
                          <option value="51-200" className="bg-gray-900">51 a 200</option>
                          <option value="201-500" className="bg-gray-900">201 a 500</option>
                          <option value="500+" className="bg-gray-900">Mais de 500</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5 animate-fade-up">
                    <div className="mb-6">
                      <h3 className="font-display font-semibold text-xl mb-1">
                        Módulos de interesse
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Selecione quais soluções você gostaria de conhecer.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {MODULES.map((module) => (
                        <button
                          key={module}
                          type="button"
                          onClick={() => toggleModule(module)}
                          className={cn(
                            "p-4 rounded-xl border text-sm text-left transition-all",
                            formData.modules.includes(module)
                              ? "border-blue-500/50 bg-blue-500/10 text-white"
                              : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20",
                          )}
                        >
                          {module}
                        </button>
                      ))}
                    </div>
                    {errors.modules && (
                      <p className="text-red-400 text-xs">{errors.modules}</p>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5 animate-fade-up">
                    <div className="mb-6">
                      <h3 className="font-display font-semibold text-xl mb-1">
                        Mensagem adicional
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Conte-nos mais sobre suas necessidades (opcional).
                      </p>
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={cn(inputClass, "border-white/10 resize-none")}
                      placeholder="Descreva seus desafios ou dúvidas..."
                    />
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.lgpdConsent}
                        onChange={(e) => updateField("lgpdConsent", e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500/50"
                      />
                      <span className="text-sm text-gray-400 group-hover:text-gray-300">
                        Li e concordo com a{" "}
                        <Link href="/privacidade" className="text-blue-400 hover:underline">
                          Política de Privacidade
                        </Link>{" "}
                        e autorizo o tratamento dos meus dados conforme a LGPD. *
                      </span>
                    </label>
                    {errors.lgpdConsent && (
                      <p className="text-red-400 text-xs">{errors.lgpdConsent}</p>
                    )}
                  </div>
                )}

                {submitError && (
                  <p className="text-red-400 text-sm mt-4 text-center">{submitError}</p>
                )}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep((s) => s - 1)}
                      disabled={isSubmitting}
                    >
                      Voltar
                    </Button>
                  ) : (
                    <div />
                  )}
                  {step < 3 ? (
                    <Button
                      type="button"
                      variant="gradient"
                      className="px-6"
                      onClick={handleNext}
                    >
                      Próximo
                      <ArrowRight className="ml-2 w-4 h-4" aria-hidden />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="gradient"
                      className="px-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                          Enviando...
                        </>
                      ) : (
                        "Enviar solicitação"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </div>

          <ContactInfoCards className="mt-12" />
        </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
