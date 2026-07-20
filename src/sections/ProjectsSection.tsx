import { Reveal } from "@/components/Reveal";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";

export function ProjectsSection() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl px-6 md:px-14">
      <Reveal>
        <h2 className="cursor mb-4 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px]">
          {t("projects.title")}
        </h2>
      </Reveal>

      <ul className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <li key={project.key}>
            <Reveal delay={i * 70}>
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
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line mono mt-7 inline-block text-[13px] text-muted-foreground"
        >
          {t("projects.moreOnGithub")} ↗
        </a>
      </Reveal>
    </div>
  );
}
