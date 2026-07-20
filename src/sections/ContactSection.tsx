import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROFILE } from "@/data/profile";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/i18n/I18nProvider";

type ContactValues = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
    },
  ) => string;
  reset: (widgetId?: string) => void;
};

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaLoadError, setCaptchaLoadError] = useState(false);
  const { t } = useI18n();
  const honeypotRef = useRef("");
  const formStartedAtRef = useRef(Date.now());
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const turnstileEnabled = String(import.meta.env.VITE_TURNSTILE_ENABLED ?? "true").toLowerCase() === "true";
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  const contactSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, t("contactPage.validation.nameMin"))
      .max(100, t("contactPage.validation.nameMax")),
    email: z
      .string()
      .trim()
      .email(t("contactPage.validation.emailInvalid"))
      .max(200, t("contactPage.validation.emailMax")),
    subject: z.string().trim().max(150, t("contactPage.validation.subjectMax")).optional(),
    message: z
      .string()
      .trim()
      .min(10, t("contactPage.validation.messageMin"))
      .max(5000, t("contactPage.validation.messageMax")),
  });

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!turnstileEnabled || !turnstileSiteKey || !turnstileContainerRef.current) return;

    const renderWidget = () => {
      const turnstile = (window as Window & { turnstile?: TurnstileApi }).turnstile;
      if (!turnstile || !turnstileContainerRef.current || turnstileWidgetIdRef.current) return;

      turnstileWidgetIdRef.current = turnstile.render(turnstileContainerRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setCaptchaLoadError(false);
          setCaptchaToken(token);
        },
        "expired-callback": () => {
          setCaptchaToken("");
        },
        "error-callback": () => {
          setCaptchaLoadError(true);
          setCaptchaToken("");
        },
        theme: "dark",
      });
    };

    const handleScriptError = () => {
      setCaptchaLoadError(true);
      setCaptchaToken("");
    };

    const scriptId = "cf-turnstile-script";
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      if ((window as Window & { turnstile?: TurnstileApi }).turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener("load", renderWidget, { once: true });
        existingScript.addEventListener("error", handleScriptError, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderWidget, { once: true });
    script.addEventListener("error", handleScriptError, { once: true });
    document.head.appendChild(script);
  }, [turnstileEnabled, turnstileSiteKey]);

  async function onSubmit(values: ContactValues) {
    if (turnstileEnabled && !turnstileSiteKey) {
      toast({
        variant: "destructive",
        title: t("contactPage.toastFailTitle"),
        description: t("contactPage.captchaMissingKey"),
      });
      return;
    }

    if (turnstileEnabled && captchaLoadError) {
      toast({
        variant: "destructive",
        title: t("contactPage.toastFailTitle"),
        description: t("contactPage.captchaLoadError"),
      });
      return;
    }

    if (turnstileEnabled && !captchaToken) {
      toast({
        variant: "destructive",
        title: t("contactPage.toastFailTitle"),
        description: t("contactPage.captchaPending"),
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypotRef.current,
          formStartedAt: formStartedAtRef.current,
          captchaToken: turnstileEnabled ? captchaToken : undefined,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string; details?: string } | null;
        const msg = [data?.message, data?.details].filter(Boolean).join(". ");
        throw new Error(msg || t("contactPage.toastFailDesc"));
      }

      toast({
        title: t("contactPage.toastSentTitle"),
        description: t("contactPage.toastSentDesc"),
      });
      honeypotRef.current = "";
      formStartedAtRef.current = Date.now();
      setCaptchaToken("");
      form.reset();
      const turnstile = (window as Window & { turnstile?: TurnstileApi }).turnstile;
      if (turnstile && turnstileWidgetIdRef.current) {
        turnstile.reset(turnstileWidgetIdRef.current);
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: t("contactPage.toastFailTitle"),
        description: err instanceof Error ? err.message : t("contactPage.toastFailDesc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl px-6 md:px-14">
      <Reveal>
        <h2 className="cursor mb-6 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px]">
          {t("contactPage.title")}
        </h2>

        <p className="mb-10 text-base leading-[1.8] text-body">{t("contactPage.description")}</p>
      </Reveal>

      <Reveal delay={80}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
              value={honeypotRef.current}
              onChange={(event) => {
                honeypotRef.current = event.target.value;
              }}
            />
            <input type="hidden" name="formStartedAt" value={formStartedAtRef.current} readOnly />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mono text-[13px] text-dim">{t("contactPage.name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("contactPage.placeholders.name")} autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mono text-[13px] text-dim">{t("contactPage.email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contactPage.placeholders.email")}
                        autoComplete="email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mono text-[13px] text-dim">{t("contactPage.subject")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("contactPage.placeholders.subject")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mono text-[13px] text-dim">{t("contactPage.message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("contactPage.placeholders.message")}
                      className="min-h-[160px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {turnstileEnabled && (
              <div className="flex flex-col gap-2">
                <div ref={turnstileContainerRef} />
                {captchaLoadError && (
                  <p className="text-xs text-destructive">{t("contactPage.captchaInlineError")}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`mailto:${PROFILE.email}`}
                className="mono text-[13px] text-muted-foreground transition-colors duration-250 hover:text-foreground"
              >
                {PROFILE.email}
              </a>

              <Button type="submit" variant="hero" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? t("contactPage.sending") : t("contactPage.send")}
              </Button>
            </div>
          </form>
        </Form>
      </Reveal>
    </div>
  );
}
