export const PROFILE = {
  name: "Wendel Campos Bezerra",
  handle: "wendel bezerra",
  email: "wendel.29@hotmail.com",
  github: "https://github.com/Wendel-Bezerra",
  linkedin: "https://www.linkedin.com/in/wendelcamposbezerra/",
  resume: "/curriculo.pdf",
} as const;

/**
 * Experiência para a mini aba de currículo do Sobre, mais recente primeiro.
 * Cargos vêm do i18n (about.jobs.<key>); datas em "AAAA-MM", `end: null` = atual.
 * Cargos da mesma empresa ficam agrupados para a promoção aparecer como trajetória.
 */
export const EXPERIENCE = [
  {
    company: "GP Consultoria e Engenharia",
    roles: [
      { key: "gpEngineer", start: "2026-11", end: null, promoted: true },
      { key: "gpIntern", start: "2026-05", end: "2026-11", promoted: false },
    ],
  },
  {
    company: "Facilize",
    roles: [{ key: "facilize", start: "2025-06", end: "2026-01", promoted: false }],
  },
] as const;

/** Rótulos i18n em about.stack.*; a lista de tecnologias é a mesma nos 3 idiomas. */
export const STACK = [
  { key: "backend", items: "Java · Spring Boot · Node.js · Express · Python · GraphQL" },
  { key: "frontend", items: "React · TypeScript · Next.js · TailwindCSS · HTML5 · CSS3 · JavaScript" },
  { key: "database", items: "PostgreSQL · MongoDB · MySQL · Prisma · TypeORM" },
  { key: "devops", items: "Git · Docker · AWS · CI/CD · Jest · Postman" },
] as const;
