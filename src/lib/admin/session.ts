const COOKIE_NAME = "admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    process.env.ADMIN_PASSWORD ??
    "dev-insecure-secret"
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

async function hmacSign(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message),
  );
  return toBase64Url(new Uint8Array(signature));
}

async function hmacVerify(message: string, signature: string): Promise<boolean> {
  const expected = await hmacSign(message);
  return expected === signature;
}

export const ADMIN_SESSION_COOKIE = COOKIE_NAME;
export const ADMIN_SESSION_MAX_AGE = Math.floor(SESSION_DURATION_MS / 1000);

export async function createSessionToken(): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_DURATION_MS });
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload));
  const signature = await hmacSign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return false;

  const isValidSignature = await hmacVerify(payloadB64, signature);
  if (!isValidSignature) return false;

  try {
    const payload = JSON.parse(fromBase64Url(payloadB64)) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function getAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (password) return password;
  if (process.env.NODE_ENV === "development") return "admin";
  throw new Error("ADMIN_PASSWORD is not configured");
}
