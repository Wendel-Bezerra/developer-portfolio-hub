import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/layout/PageShell";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";

export default function Projects() {
  const { t } = useI18n();

  return (
    <PageShell>
      <div className="max-w-4xl flex-1 animate-fade-up px-6 pb-24 pt-6 md:px-14">
        <BackLink />

        <h1 className="cursor mb-4 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px]">
          {t("projects.title")}
        </h1>

        <ul className="flex flex-col">
          {PROJECTS.map((project) => (
            <li key={project.key}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="row-slide grid grid-cols-[44px_1fr] items-baseline gap-4 border-b border-border py-6 text-muted-foreground sm:grid-cols-[56px_1fr_auto] sm:gap-6"
              >
                <span className="mono text-xs text-dim">{project.year}</span>

                <span className="flex flex-col gap-1.5">
                  <span className="text-xl font-medium tracking-[-0.01em] text-foreground md:text-2xl">
                    {t(`projects.items.${project.key}.title`)}
                  </span>
                  <span className="max-w-[540px] text-sm leading-[1.65]">
                    {t(`projects.items.${project.key}.description`)}
                  </span>
                  <span className="mono text-xs text-dim">{project.tech}</span>
                </span>

                <span className="mono col-start-2 text-[13px] sm:col-start-3">
                  {t(`projects.kinds.${project.kind}`)} ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line mono mt-7 inline-block text-[13px] text-muted-foreground"
        >
          {t("projects.moreOnGithub")} ↗
        </a>
      </div>
    </PageShell>
  );
}
