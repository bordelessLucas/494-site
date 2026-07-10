import { z } from "zod";

const phoneRegex = /^\d{10,11}$/;

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("Informe um e-mail válido"),
  phone: z
    .string()
    .min(10, "Informe um telefone válido")
    .refine((phone) => phoneRegex.test(normalizePhone(phone)), {
      message: "Formato esperado: (11) 99999-9999",
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

const phoneFieldSchema = z
  .string()
  .min(10, "Informe um telefone válido")
  .refine((phone) => phoneRegex.test(normalizePhone(phone)), {
    message: "Formato esperado: (11) 99999-9999",
  });

export const demoFormSchema = z.object({
  solutions: z.array(z.string()).min(1, "Selecione ao menos uma solução"),
  name: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("Por favor, insira um e-mail válido"),
  phone: phoneFieldSchema,
  company: z.string().min(2, "Informe o nome da empresa"),
  role: z.string().min(2, "Informe seu cargo"),
  companySize: z.string().min(1, "Selecione o porte da empresa"),
  message: z.string().optional(),
  scheduledDate: z.string().min(1, "Selecione uma data"),
  scheduledTime: z.string().min(1, "Selecione um horário"),
});

export type DemoFormInput = z.infer<typeof demoFormSchema>;

export function validateDemoStep1(
  data: Pick<DemoFormInput, "name" | "email" | "phone" | "company" | "role" | "companySize">,
) {
  const errors: Record<string, string> = {};

  const nameResult = demoFormSchema.shape.name.safeParse(data.name.trim());
  if (!nameResult.success) errors.name = "Este campo é obrigatório.";

  const emailResult = demoFormSchema.shape.email.safeParse(data.email.trim());
  if (!emailResult.success)
    errors.email = emailResult.error.errors[0]?.message ?? "Por favor, insira um e-mail válido.";

  const phoneResult = phoneFieldSchema.safeParse(data.phone.trim());
  if (!phoneResult.success)
    errors.phone = phoneResult.error.errors[0]?.message ?? "Formato esperado: (11) 99999-9999";

  const companyResult = demoFormSchema.shape.company.safeParse(data.company.trim());
  if (!companyResult.success) errors.company = "Este campo é obrigatório.";

  const roleResult = demoFormSchema.shape.role.safeParse(data.role.trim());
  if (!roleResult.success) errors.role = "Este campo é obrigatório.";

  const sizeResult = demoFormSchema.shape.companySize.safeParse(data.companySize);
  if (!sizeResult.success) errors.companySize = "Selecione o porte da empresa";

  return errors;
}

export function validateDemoStep2(
  data: Pick<DemoFormInput, "solutions">,
) {
  const errors: Record<string, string> = {};
  const solutionsResult = demoFormSchema.shape.solutions.safeParse(data.solutions);
  if (!solutionsResult.success) errors.solutions = "Selecione ao menos uma solução";
  return errors;
}

export const demoRequestStatusSchema = z.enum([
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

export const updateDemoRequestSchema = z.object({
  status: demoRequestStatusSchema.optional(),
  notes: z.string().max(2000).optional(),
});

export type UpdateDemoRequestInput = z.infer<typeof updateDemoRequestSchema>;

export const adminLoginSchema = z.object({
  password: z.string().min(1, "Informe a senha"),
});

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
