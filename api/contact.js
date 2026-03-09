import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().max(150).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
  formStartedAt: z.number().int().positive(),
});

const RATE_WINDOW_MS = Number(process.env.CONTACT_RATE_WINDOW_MS || "600000");
const RATE_MAX_REQUESTS = Number(process.env.CONTACT_RATE_MAX || "3");
const MIN_FILL_TIME_MS = Number(process.env.CONTACT_MIN_FILL_MS || "3000");
const MAX_FILL_TIME_MS = Number(process.env.CONTACT_MAX_FILL_MS || "7200000");
const requestsByIp = new Map();

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
  const host = requireEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || "587");
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
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

    const { name, email, subject, message, website, formStartedAt } = parsed.data;
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

