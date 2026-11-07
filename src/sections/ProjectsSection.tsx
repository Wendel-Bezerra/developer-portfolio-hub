import { Reveal } from "@/components/Reveal";
import { LuffyDog } from "@/components/SectionMascots";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { useI18n } from "@/i18n/I18nProvider";

export function ProjectsSection() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl px-6 md:px-14">
      <Reveal>
        <h2 className="mb-4 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px]">
          {t("projects.title")}
          <LuffyDog />
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
                // Celular: uma coluna só, com o ano como rótulo acima do título,
                // para o texto usar a largura inteira. A partir de sm: 3 colunas.
                className="row-slide group grid grid-cols-1 gap-2 border-b border-border py-6 text-muted-foreground sm:grid-cols-[56px_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="mono text-xs text-dim">{project.year}</span>

                <span className="flex flex-col gap-1.5">
                  <span className="text-xl font-medium tracking-[-0.01em] text-foreground transition-colors duration-250 group-hover:text-primary md:text-2xl">
                    {t(`projects.items.${project.key}.title`)}
                  </span>
                  <span className="max-w-[540px] text-sm leading-[1.65]">
                    {t(`projects.items.${project.key}.description`)}
                  </span>
                  <span className="mono text-xs text-dim">{project.tech}</span>
                </span>

                <span className="mono mt-1 text-[13px] sm:col-start-3 sm:mt-0">
                  {t(`projects.kinds.${project.kind}`)}{" "}
                  {/* A seta dá um "jab" curto na diagonal no hover da linha. */}
                  <span className="inline-block transition-transform duration-150 ease-out-strong group-hover:-translate-y-[3px] group-hover:translate-x-[3px]">
                    ↗
                  </span>
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
