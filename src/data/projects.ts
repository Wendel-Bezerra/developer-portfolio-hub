/** Título e descrição vêm do i18n (projects.items.<key>); o resto é igual nos 3 idiomas. */
/** "oss" é contribuição open source em projeto de terceiros; o link leva ao PR. */
export type ProjectKind = "site" | "code" | "oss";

export type Project = {
  key: "botCrossing" | "imperio" | "despesas" | "facilize" | "ajb" | "travelTracker" | "betTracker";
  year: string;
  tech: string;
  kind: ProjectKind;
  url: string;
};

export const PROJECTS: Project[] = [
  {
    key: "botCrossing",
    year: "2026",
    tech: "JavaScript · Node.js · PowerShell · Windows",
    kind: "oss",
    url: "https://github.com/Station-Sciences/bot-crossing/pull/48",
  },
  {
    key: "imperio",
    year: "2026",
    tech: "Next.js · React · TypeScript · Tailwind",
    kind: "site",
    url: "https://www.imperiodosamba.com.br/",
  },
  {
    key: "despesas",
    year: "2026",
    tech: "React · TypeScript · Vite · Tailwind",
    kind: "site",
    url: "https://despesas-alpha-seven.vercel.app/",
  },
  {
    key: "facilize",
    year: "2025",
    tech: "React · Node.js · Full Stack",
    kind: "site",
    url: "https://www.facilize.com.br/",
  },
  {
    key: "ajb",
    year: "2024",
    tech: "React · Node.js · Full Stack",
    kind: "site",
    url: "https://www.ajbadvocacia.com.br/",
  },
  {
    key: "travelTracker",
    year: "2024",
    tech: "React · Node.js · Map APIs",
    kind: "code",
    url: "https://github.com/Wendel-Bezerra/wanderlust-map",
  },
  {
    key: "betTracker",
    year: "2023",
    tech: "React · Node.js · TypeScript",
    kind: "code",
    url: "https://github.com/Wendel-Bezerra/bet-tracker",
  },
];
