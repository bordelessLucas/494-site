import { z } from "zod";

const phoneRegex = /^\d{10,11}$/;

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  email: z
    .string()
    .email("Informe um e-mail válido")
    .refine(
      (email) => !/@(gmail|hotmail|outlook|yahoo|live)\./i.test(email),
      "Use um e-mail corporativo",
    ),
  phone: z
    .string()
    .min(10, "Informe um telefone válido")
    .refine((phone) => phoneRegex.test(normalizePhone(phone)), {
      message: "Formato: (11) 9 0000-0000",
    }),
  company: z.string().optional(),
  role: z.string().optional(),
  employees: z.string().optional(),
  modules: z.array(z.string()).min(1, "Selecione ao menos um módulo"),
  message: z.string().optional(),
  lgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "É necessário aceitar a política de privacidade" }),
  }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateStep1(data: Pick<ContactFormInput, "name" | "email" | "phone">) {
  const errors: Record<string, string> = {};
  const nameResult = z.string().min(2).safeParse(data.name.trim());
  if (!nameResult.success) errors.name = "Informe seu nome completo";

  const emailResult = contactFormSchema.shape.email.safeParse(data.email.trim());
  if (!emailResult.success)
    errors.email = emailResult.error.errors[0]?.message ?? "E-mail inválido";

  const phoneResult = contactFormSchema.shape.phone.safeParse(data.phone.trim());
  if (!phoneResult.success)
    errors.phone = phoneResult.error.errors[0]?.message ?? "Telefone inválido";

  return errors;
}
