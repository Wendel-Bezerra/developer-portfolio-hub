import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();

app.use(express.json({ limit: "100kb" }));

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  email: z.string().trim().email("Email inválido.").max(200, "Email muito longo."),
  subject: z.string().trim().max(150, "Assunto muito longo.").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Escreva uma mensagem um pouco maior.").max(5000, "Mensagem muito longa."),
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
  if (!value) throw new Error(`Variável de ambiente ausente: ${name}`);
  return value;
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

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string") return forwardedFor.split(",")[0]?.trim() || "unknown";
  return req.ip || "unknown";
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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        message: "Dados inválidos.",
        issues: parsed.error.issues,
      });
    }

    const { name, email, subject, message, website, formStartedAt } = parsed.data;
    const clientIp = getClientIp(req);

    if (website?.trim()) {
      return res.json({ ok: true });
    }

    const fillTimeMs = Date.now() - formStartedAt;
    if (fillTimeMs < MIN_FILL_TIME_MS || fillTimeMs > MAX_FILL_TIME_MS) {
      return res.status(400).json({
        ok: false,
        message: "Envio inválido. Atualize a página e tente novamente.",
      });
    }

    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        ok: false,
        message: "Muitas tentativas. Aguarde um pouco antes de enviar novamente.",
      });
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

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    const details =
      process.env.NODE_ENV !== "production"
        ? err instanceof Error
          ? err.message
          : String(err)
        : undefined;
    return res.status(500).json({ ok: false, message: "Falha ao enviar email.", details });
  }
});

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const port = Number(process.env.PORT || "3001");
app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});

