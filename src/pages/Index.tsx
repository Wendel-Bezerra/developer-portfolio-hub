import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

import { BoxingTitle } from "@/components/BoxingTitle";
import { ScrollProgressLine } from "@/components/ScrollProgressLine";
import { PageShell } from "@/components/layout/PageShell";
import { PROFILE } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useI18n } from "@/i18n/I18nProvider";
import { pathFor } from "@/i18n/routes";
import type { Lang } from "@/i18n/translations";
import { AboutSection } from "@/sections/AboutSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { SECTION_IDS, SECTION_ORDER, type SectionKey } from "@/sections/anchors";

// O formulário carrega react-hook-form + zod; fica fora do bundle inicial já que
// vive no fim do scroll. O placeholder segura a altura para o deep-link #contact
// não aterrissar no lugar errado.
const ContactSection = lazy(() =>
  import("@/sections/ContactSection").then((m) => ({ default: m.ContactSection })),
);

const HERO_ENTER = "animate-fade-up [animation-fill-mode:both] motion-reduce:animate-fade-in";

type MenuEntry ={ index: string; key: SectionKey; label: string };

function MenuLink({ entry, lang }: { entry: MenuEntry; lang: Lang }) {
  return (
    <Link
      to={`${pathFor(lang, "home")}#${SECTION_IDS[entry.key]}`}
      className="group flex items-baseline gap-5 py-1.5 text-muted-foreground transition-[transform,color] duration-250 ease-out-strong hover:translate-x-3.5 hover:text-primary md:gap-6"
    >
      <span className="mono text-xs text-dim transition-colors duration-250 group-hover:text-muted-foreground md:text-sm">
        {entry.index}
      </span>
      {/* Menor que o <h1> do nome de propósito: o nome é o topo da hierarquia. */}
      <span className="font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[42px] md:text-[54px]">
        {entry.label}
      </span>
    </Link>
  );
}

const Index = () => {
  const { lang, t } = useI18n();

  const entries: MenuEntry[] = SECTION_ORDER.map((key, i) => ({
    index: String(i + 1).padStart(2, "0"),
    key,
    label: t(`nav.${key}`),
  }));

  const activeId = useActiveSection(SECTION_ORDER.map((key) => SECTION_IDS[key]));

  return (
    <PageShell>
<ScrollProgressLine
        sections={entries.map((entry) => ({
          id: SECTION_IDS[entry.key],
          index: entry.index,
          label: entry.label,
        }))}
        activeId={activeId}
      />

      <section
        id="home"
        className="relative flex min-h-[72svh] flex-col justify-center px-6 pb-20 pt-8 md:px-14 md:pb-20"
      >
        {/* A entrada do hero é coreografada: o nome e o lutador entram pelo
            BoxingTitle; cargo e menu vêm logo depois, em cascata. */}
        <BoxingTitle
          name={PROFILE.name}
          targetId={SECTION_IDS.about}
          hint={t("meta.punchHint")}
          fighterLabel={t("meta.fighterLabel")}
        />

        <p
          className={`mono mb-12 mt-4 text-base uppercase tracking-[0.16em] text-primary md:mb-14 md:mt-5 md:text-lg ${HERO_ENTER}`}
          style={{ animationDelay: "450ms" }}
        >
          {t("meta.role")}
        </p>

        <nav className="flex flex-col items-start gap-1 md:gap-2">
          {entries.map((entry, i) => (
            // A animação fica no wrapper: com fill-mode o keyframe travaria o
            // transform do link e anularia o deslize do hover.
            <div key={entry.key} className={HERO_ENTER} style={{ animationDelay: `${520 + i * 60}ms` }}>
              <MenuLink entry={entry} lang={lang} />
            </div>
          ))}
        </nav>
      </section>

      <section id={SECTION_IDS.about} className="scroll-mt-8 py-16 sm:py-24 md:py-32">
        <AboutSection />
      </section>

      <section id={SECTION_IDS.projects} className="scroll-mt-8 py-16 sm:py-24 md:py-32">
        <ProjectsSection />
      </section>

      <section id={SECTION_IDS.contact} className="scroll-mt-8 py-16 sm:py-24 md:py-32">
        <Suspense fallback={<div className="min-h-[720px]" />}>
          <ContactSection />
        </Suspense>
      </section>
    </PageShell>
  );
};

export default Index;
