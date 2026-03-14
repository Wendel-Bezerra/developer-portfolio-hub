import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number().int().positive(),
  captchaToken: z.string().trim().min(10).optional(),
});

const RATE_WINDOW_MS = Number(process.env.CONTACT_RATE_WINDOW_MS || "600000");
const RATE_MAX_REQUESTS = Number(process.env.CONTACT_RATE_MAX || "3");
const MIN_FILL_TIME_MS = Number(process.env.CONTACT_MIN_FILL_MS || "3000");
const MAX_FILL_TIME_MS = Number(process.env.CONTACT_MAX_FILL_MS || "7200000");
const TURNSTILE_ENABLED = String(process.env.TURNSTILE_ENABLED ?? "true").toLowerCase() === "true";
const requestsByIp = new Map();
let smtpTransporter;

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildTransporter() {
  if (smtpTransporter) return smtpTransporter;

  const host = requireEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || "587");
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;

  smtpTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    pool: true,
    maxConnections: 1,
    maxMessages: 20,
  });
  return smtpTransporter;
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entries = requestsByIp.get(ip) ?? [];
  const recentEntries = entries.filter((time) => now - time < RATE_WINDOW_MS);

  if (recentEntries.length >= RATE_MAX_REQUESTS) {
    requestsByIp.set(ip, recentEntries);
    return true;
  }

  recentEntries.push(now);
  requestsByIp.set(ip, recentEntries);
  return false;
}

async function verifyTurnstileToken(token, clientIp) {
  const secret = requireEnv("TURNSTILE_SECRET_KEY");
  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: clientIp,
  });

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) return "unavailable";
    const result = await response.json();
    return result?.success ? "valid" : "invalid";
  } catch {
    return "unavailable";
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { ok: false, message: "Dados inválidos.", issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { name, email, subject, message, website, formStartedAt, captchaToken } = parsed.data;
    const clientIp = getClientIp(request);

    if (website?.trim()) {
      return Response.json({ ok: true });
    }

    const fillTimeMs = Date.now() - formStartedAt;
    if (fillTimeMs < MIN_FILL_TIME_MS || fillTimeMs > MAX_FILL_TIME_MS) {
      return Response.json(
        { ok: false, message: "Envio inválido. Atualize a página e tente novamente." },
        { status: 400 },
      );
    }

    if (isRateLimited(clientIp)) {
      return Response.json(
        { ok: false, message: "Muitas tentativas. Aguarde um pouco antes de enviar novamente." },
        { status: 429 },
      );
    }

    if (TURNSTILE_ENABLED) {
      if (!captchaToken) {
        return Response.json({ ok: false, message: "Captcha obrigatório. Tente novamente." }, { status: 400 });
      }

      const captchaStatus = await verifyTurnstileToken(captchaToken, clientIp);
      if (captchaStatus === "unavailable") {
        return Response.json(
          { ok: false, message: "Serviço de captcha indisponível no momento. Tente novamente em instantes." },
          { status: 503 },
        );
      }

      if (captchaStatus !== "valid") {
        return Response.json({ ok: false, message: "Falha na validação do captcha. Tente novamente." }, { status: 400 });
      }
    }

    const to = requireEnv("MAIL_TO");
    const from = process.env.MAIL_FROM || `Portfólio <${requireEnv("SMTP_USER")}>`;

    const transporter = buildTransporter();

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[Portfólio] ${subject?.trim() ? subject.trim() : "Novo contato"}`,
      text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Novo contato pelo portfólio</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Assunto:</strong> ${escapeHtml(subject?.trim() || "Novo contato")}</p>
          <hr />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    const isAuthRateLimit =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === "EAUTH" &&
      "responseCode" in err &&
      err.responseCode === 454;

    if (isAuthRateLimit) {
      return Response.json(
        {
          ok: false,
          message: "Serviço de email temporariamente indisponível. Tente novamente em alguns minutos.",
        },
        { status: 503 },
      );
    }

    const details =
      process.env.NODE_ENV !== "production"
        ? err instanceof Error
          ? err.message
          : String(err)
        : undefined;
    return Response.json({ ok: false, message: "Falha ao enviar email.", details }, { status: 500 });
  }
}

export function GET() {
  return Response.json({ ok: false, message: "Method not allowed" }, { status: 405 });
}

