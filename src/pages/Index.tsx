import { Link } from "react-router-dom";

import { PageShell } from "@/components/layout/PageShell";
import { PROFILE } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import { pathFor, type RouteKey } from "@/i18n/routes";
import type { Lang } from "@/i18n/translations";

type MenuEntry = { index: string; key: Exclude<RouteKey, "home">; label: string };

function MenuLink({ entry, lang }: { entry: MenuEntry; lang: Lang }) {
  return (
    <Link
      to={pathFor(lang, entry.key)}
      className="group flex items-baseline gap-5 py-1.5 text-muted-foreground transition-all duration-250 hover:translate-x-3.5 hover:text-foreground md:gap-6"
    >
      <span className="mono text-xs text-dim transition-colors duration-250 group-hover:text-muted-foreground md:text-sm">
        {entry.index}
      </span>
      <span className="font-display text-[44px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl md:text-[76px]">
        {entry.label}
      </span>
    </Link>
  );
}

const Index = () => {
  const { lang, t } = useI18n();

  const entries: MenuEntry[] = [
    { index: "01", key: "about", label: t("nav.about") },
    { index: "02", key: "projects", label: t("nav.projects") },
    { index: "03", key: "contact", label: t("nav.contact") },
  ];

  return (
    <PageShell>
      <div className="flex flex-1 animate-fade-up flex-col justify-center px-6 pb-20 pt-8 md:px-14 md:pb-20">
        <p className="mono mb-8 text-sm text-muted-foreground md:mb-9">
          {PROFILE.name}
          <span className="animate-blink motion-reduce:animate-none">_</span>
        </p>

        <nav className="flex flex-col items-start gap-1 md:gap-2">
          {entries.map((entry) => (
            <MenuLink key={entry.key} entry={entry} lang={lang} />
          ))}
        </nav>
      </div>
    </PageShell>
  );
};

export default Index;
