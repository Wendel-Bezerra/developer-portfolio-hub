import React from "react";
import { useLocation } from "react-router-dom";
import { translations, type Lang } from "./translations";

type I18nContextValue = {
  lang: Lang;
  t: (key: string, vars?: Record<string, string>) => string;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);

function resolveKey(obj: unknown, key: string): unknown {
  return key.split(".").reduce((acc: unknown, part) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, vars?: Record<string, string>) {
  if (!vars) return template;
  return Object.entries(vars).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, v), template);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [lang, setLang] = React.useState<Lang>(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "pt" || stored === "en" || stored === "es") return stored;
    if (window.location.pathname.startsWith("/en")) return "en";
    if (window.location.pathname.startsWith("/es")) return "es";
    return "pt";
  });

  React.useEffect(() => {
    const next: Lang = location.pathname.startsWith("/en")
      ? "en"
      : location.pathname.startsWith("/es")
        ? "es"
        : "pt";
    setLang(next);
  }, [location.pathname]);

  React.useEffect(() => {
    window.localStorage.setItem("lang", lang);
  }, [lang]);

  const t = React.useCallback(
    (key: string, vars?: Record<string, string>) => {
      const raw = resolveKey(translations[lang], key);
      const str = typeof raw === "string" ? raw : key;
      return interpolate(str, vars);
    },
    [lang],
  );

  return <I18nContext.Provider value={{ lang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

