export const PROFILE = {
  name: "Wendel Campos Bezerra",
  handle: "wendel bezerra",
  email: "wendel.2929@gmail.com",
  github: "https://github.com/Wendel-Bezerra",
  linkedin: "https://www.linkedin.com/in/wendelcamposbezerra/",
  resume: "/curriculo.pdf",
} as const;

/** Rótulos i18n em about.stack.*; a lista de tecnologias é a mesma nos 3 idiomas. */
export const STACK = [
  { key: "backend", items: "Java · Spring Boot · Node.js · Express · Python · GraphQL" },
  { key: "frontend", items: "React · TypeScript · Next.js · TailwindCSS · HTML5 · CSS3 · JavaScript" },
  { key: "database", items: "PostgreSQL · MongoDB · MySQL · Prisma · TypeORM" },
  { key: "devops", items: "Git · Docker · AWS · CI/CD · Jest · Postman" },
] as const;
