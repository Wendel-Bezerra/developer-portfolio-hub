import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { z } from "zod";
import { ArrowLeft, Mail, Send } from "lucide-react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useI18n } from "@/i18n/I18nProvider";

type ContactValues = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang, t } = useI18n();
  const homeBase = lang === "en" ? "/en" : lang === "es" ? "/es" : "/";
  const honeypotRef = useRef("");
  const formStartedAtRef = useRef(Date.now());

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

  async function onSubmit(values: ContactValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: honeypotRef.current,
          formStartedAt: formStartedAtRef.current,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { message?: string; details?: string } | null;
        const msg = [data?.message, data?.details].filter(Boolean).join(" — ");
        throw new Error(msg || "Não foi possível enviar sua mensagem.");
      }

      toast({
        title: t("contactPage.toastSentTitle"),
        description: t("contactPage.toastSentDesc"),
      });
      honeypotRef.current = "";
      formStartedAtRef.current = Date.now();
      form.reset();
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
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 md:pt-28 pb-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <Button variant="ghost" asChild className="px-0">
                <Link to={homeBase} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <ArrowLeft size={18} />
                  {t("contactPage.back")}
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <span className="mono text-primary text-base">{t("nav.contact")}</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
              {t("contactPage.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10">
              {t("contactPage.description")}
            </p>

            <div className="card-gradient rounded-lg p-6 md:p-8 shadow-lg">
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contactPage.name")}</FormLabel>
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
                          <FormLabel>{t("contactPage.email")}</FormLabel>
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
                        <FormLabel>{t("contactPage.subject")}</FormLabel>
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
                        <FormLabel>{t("contactPage.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("contactPage.placeholders.message")}
                            className="min-h-[140px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                    <a
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      href="mailto:Wendel.2929@gmail.com"
                    >
                      <Mail size={18} />
                      Wendel.2929@gmail.com
                    </a>

                    <Button type="submit" variant="hero" disabled={isSubmitting} className="sm:w-auto w-full">
                      <Send size={18} />
                      {isSubmitting ? t("contactPage.sending") : t("contactPage.send")}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

