import {
  formatScheduledDate,
  getSolutionsLabel,
} from "@/lib/admin/demo-labels";
import type { DemoRequest } from "@/lib/demo-requests/types";
import { buildDemoIcs } from "@/lib/mail/ics";
import { getCommercialEmail, getMailFrom, isMailConfigured } from "@/lib/mail/config";
import { getMailTransporter } from "@/lib/mail/transporter";
import { COMPANY_SIZES } from "@/lib/landing-data";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PREP_TIPS: Record<string, string> = {
  societaria:
    "Tenha em mãos a estrutura societária atual, quadro de sócios e tipos de atos que vocês gerenciam.",
  sgc: "Pense no volume de contratos, fluxo de aprovação e como controlam CNDs, NFs e retenções hoje.",
  escalas:
    "Considere quantos profissionais participam das escalas e como as trocas de plantão são feitas atualmente.",
};

function getCompanySizeLabel(value: string | undefined): string {
  if (!value) return "—";
  return COMPANY_SIZES.find((size) => size.value === value)?.label ?? value;
}

function buildPreparationList(solutions: string[]): string {
  if (solutions.length === 0) {
    return "<li>Liste os principais desafios da sua operação que gostaria de resolver.</li>";
  }

  return solutions
    .map((solutionId) => {
      const tip = PREP_TIPS[solutionId];
      if (!tip) return "";
      return `<li>${tip}</li>`;
    })
    .filter(Boolean)
    .join("");
}

function emailLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:Arial,Helvetica,sans-serif;color:#e4e4e7;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0f;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#111118;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 28px 8px;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#4d7cff;">${SITE_NAME}</p>
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;">
                <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#71717a;">
                  Este e-mail foi enviado automaticamente. Em caso de dúvidas, responda este e-mail ou acesse
                  <a href="${SITE_URL}" style="color:#4d7cff;text-decoration:none;">${SITE_URL}</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendMail(options: {
  to: string;
  subject: string;
  html: string;
  icsContent?: string;
}): Promise<void> {
  const transporter = getMailTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: getMailFrom(),
    to: options.to,
    subject: options.subject,
    html: options.html,
    attachments: options.icsContent
      ? [
          {
            filename: "demonstracao-unique-gestor.ics",
            content: options.icsContent,
            contentType: "text/calendar; charset=utf-8; method=REQUEST",
          },
        ]
      : undefined,
  });
}

export async function sendDemoConfirmationToLead(
  request: DemoRequest,
): Promise<void> {
  const scheduledLabel = formatScheduledDate(
    request.scheduledDate,
    request.scheduledTime,
  );
  const solutionsLabel = getSolutionsLabel(request.solutions);
  const icsContent = buildDemoIcs(request);

  const html = emailLayout(`
    <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#ffffff;">Demonstração confirmada</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#d4d4d8;">
      Olá, <strong style="color:#ffffff;">${request.name}</strong>! Recebemos seu agendamento e nossa equipe comercial
      entrará em contato no horário abaixo.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
      <tr>
        <td style="padding:18px 20px;">
          <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;">Data e horário</p>
          <p style="margin:0 0 16px;font-size:18px;font-weight:700;color:#ffffff;">${scheduledLabel}</p>
          <p style="margin:0 0 8px;font-size:13px;color:#a1a1aa;">Módulos de interesse</p>
          <p style="margin:0;font-size:15px;color:#ffffff;">${solutionsLabel}</p>
        </td>
      </tr>
    </table>
    <p style="margin:20px 0 8px;font-size:15px;line-height:1.6;color:#d4d4d8;">
      Anexamos um convite de calendário (<strong>.ics</strong>) para você adicionar o compromisso ao Google Calendar ou Outlook.
    </p>
    <p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#d4d4d8;">Para aproveitar melhor a demonstração, prepare:</p>
    <ul style="margin:0;padding-left:20px;color:#d4d4d8;font-size:14px;line-height:1.7;">
      ${buildPreparationList(request.solutions)}
    </ul>
  `);

  await sendMail({
    to: request.email,
    subject: `Demonstração ${SITE_NAME} confirmada — ${scheduledLabel}`,
    html,
    icsContent,
  });
}

export async function sendDemoNotificationToSales(
  request: DemoRequest,
): Promise<void> {
  const scheduledLabel = formatScheduledDate(
    request.scheduledDate,
    request.scheduledTime,
  );
  const solutionsLabel = getSolutionsLabel(request.solutions);
  const companySizeLabel = getCompanySizeLabel(request.companySize);

  const html = emailLayout(`
    <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#ffffff;">Nova demonstração agendada</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#d4d4d8;">
      Um novo lead agendou demonstração pelo site.
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
      <tr>
        <td style="padding:18px 20px;font-size:14px;line-height:1.8;color:#d4d4d8;">
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">Nome:</strong> ${request.name}</p>
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">E-mail:</strong> ${request.email}</p>
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">Telefone:</strong> ${request.phone}</p>
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">Empresa:</strong> ${request.company || "—"}</p>
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">Cargo:</strong> ${request.role || "—"}</p>
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">Porte:</strong> ${companySizeLabel}</p>
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">Módulos:</strong> ${solutionsLabel}</p>
          <p style="margin:0 0 6px;"><strong style="color:#ffffff;">Agendamento:</strong> ${scheduledLabel}</p>
          ${
            request.message
              ? `<p style="margin:0;"><strong style="color:#ffffff;">Mensagem:</strong> ${request.message}</p>`
              : ""
          }
        </td>
      </tr>
    </table>
  `);

  await sendMail({
    to: getCommercialEmail(),
    subject: `[Demo] ${request.name} — ${request.company || request.email}`,
    html,
    icsContent: buildDemoIcs(request),
  });
}

export async function sendDemoBookingEmails(
  request: DemoRequest,
): Promise<{ sent: boolean; errors: string[] }> {
  if (!isMailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[mail] SMTP não configurado. Defina SMTP_USER e SMTP_PASS no .env para enviar e-mails.",
      );
    }
    return { sent: false, errors: [] };
  }

  const results = await Promise.allSettled([
    sendDemoConfirmationToLead(request),
    sendDemoNotificationToSales(request),
  ]);

  const errors = results
    .filter((result): result is PromiseRejectedResult => result.status === "rejected")
    .map((result) =>
      result.reason instanceof Error ? result.reason.message : "Erro ao enviar e-mail",
    );

  if (errors.length > 0 && process.env.NODE_ENV === "development") {
    console.error("[mail] Falha ao enviar e-mails da demo:", errors);
  }

  return {
    sent: results.some((result) => result.status === "fulfilled"),
    errors,
  };
}
