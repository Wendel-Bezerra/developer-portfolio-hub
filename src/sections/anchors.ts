import type { RouteKey } from "@/i18n/routes";

export type SectionKey = Exclude<RouteKey, "home">;

/**
 * Âncoras das seções da home. Os ids são fixos em inglês nos três idiomas de
 * propósito: o Header preserva `location.hash` ao trocar de idioma, então um id
 * traduzido quebraria o toggle PT → EN → ES no meio da página.
 */
export const SECTION_IDS: Record<SectionKey, string> = {
  about: "about",
  projects: "projects",
  contact: "contact",
};

export const SECTION_ORDER: SectionKey[] = ["about", "projects", "contact"];
