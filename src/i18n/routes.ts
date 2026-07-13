import type { Lang } from "./translations";

export type RouteKey = "home" | "about" | "projects" | "contact";

/**
 * Caminho canônico de cada tela por idioma. O prefixo (/en, /es) é o que o
 * I18nProvider usa para derivar o idioma atual, então toda rota nova precisa
 * existir aqui nos três idiomas.
 */
export const ROUTES: Record<Lang, Record<RouteKey, string>> = {
  pt: { home: "/", about: "/sobre", projects: "/projetos", contact: "/contato" },
  en: { home: "/en", about: "/en/about", projects: "/en/projects", contact: "/en/contact" },
  es: { home: "/es", about: "/es/sobre", projects: "/es/proyectos", contact: "/es/contact" },
};

export const LANGS: Lang[] = ["pt", "en", "es"];

export function pathFor(lang: Lang, key: RouteKey): string {
  return ROUTES[lang][key];
}

/** Descobre qual tela um pathname representa, independente do idioma. */
export function routeKeyFor(pathname: string): RouteKey | null {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  for (const lang of LANGS) {
    for (const [key, path] of Object.entries(ROUTES[lang]) as [RouteKey, string][]) {
      if (path === normalized) return key;
    }
  }
  return null;
}

/** Próximo idioma no ciclo PT → EN → ES → PT. */
export function nextLang(lang: Lang): Lang {
  return lang === "pt" ? "en" : lang === "en" ? "es" : "pt";
}
