import { SITE_CONTACT, SITE_NAME } from "@/lib/site";

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim());
}

export function getMailFrom(): string {
  const user = process.env.SMTP_USER?.trim() ?? "";
  const name = process.env.MAIL_FROM_NAME?.trim() || SITE_NAME;
  return `${name} <${user}>`;
}

export function getCommercialEmail(): string {
  return process.env.MAIL_COMMERCIAL?.trim() || SITE_CONTACT.email;
}
