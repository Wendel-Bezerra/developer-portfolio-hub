import { CopyButton } from "@/components/CopyButton";
import { ResumeTabs } from "@/components/ResumeTabs";
import { Reveal } from "@/components/Reveal";
import { LuffyDog, TitleFighter } from "@/components/SectionMascots";
import { PROFILE, STACK } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";

const SERVICES = ["sites", "chatbots", "rag"] as const;

export function AboutSection() {
  const { t } = useI18n();

  return (
    <div className="max-w-3xl px-6 md:px-14">
      <Reveal>
        <h2 className="mb-8 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px]">
          {t("about.title")}
          <TitleFighter />
        </h2>
      </Reveal>

      <Reveal delay={80}>
        <p className="mb-14 text-base leading-[1.8] text-body">
          {t("about.p1Prefix")}
          <span className="text-primary">{t("about.p1Highlight")}</span>
          {t("about.p1Suffix")}
        </p>
      </Reveal>

      {/* O que eu faço: os três serviços em destaque. */}
      <Reveal>
        <h3 className="mono mb-4 text-[13px] text-dim">{t("about.servicesTitle")}</h3>
      </Reveal>
      <ul className="mb-16 grid gap-3 sm:grid-cols-3">
        {SERVICES.map((key, i) => (
          <li key={key}>
            <Reveal delay={i * 70} className="h-full">
              {/* No celular o número fica ao lado do título para o cartão ser
                  compacto; a partir de sm ele volta para cima, em coluna. */}
              <div className="group h-full rounded-lg border border-border p-4 transition-[border-color,transform] duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-primary/50 sm:p-5">
                <div className="mb-1.5 flex items-baseline gap-3 sm:mb-2 sm:flex-col sm:gap-3">
                  <span className="mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-primary sm:text-xl">
                    {t(`about.services.${key}.title`)}
                  </p>
                </div>
                <p className="text-sm leading-[1.65] text-body">{t(`about.services.${key}.desc`)}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Fora do código: a parte pessoal, em tom descontraído. */}
      <Reveal>
        <h3 className="mono mb-4 text-[13px] text-dim">{t("about.personalTitle")}</h3>
        <div className="mb-16 flex flex-col gap-3 text-base leading-[1.8] text-body">
          <p>
            {t("about.personal.agePre")}
            <span className="text-foreground">{t("about.personal.ageHl")}</span>
            {t("about.personal.agePost")}
          </p>
          <p>
            {t("about.personal.dogPre")}
            <span className="text-foreground">{t("about.personal.dogHl")}</span>
            {/* Fim da frase e o cachorro juntos: ele nunca quebra sozinho de linha. */}
            <span className="whitespace-nowrap">
              {t("about.personal.dogPost")}
              <LuffyDog className="text-[1.6em]" />
            </span>
          </p>
          <p>
            {t("about.personal.boxPre")}
            <span className="text-poppy">{t("about.personal.boxHl")}</span>
            {t("about.personal.boxPost")}
          </p>
        </div>
      </Reveal>

      {/* Mini aba de currículo */}
      <Reveal>
        <h3 className="mono mb-4 text-[13px] text-dim">{t("about.resumeTitle")}</h3>
        <div className="mb-16">
          <ResumeTabs />
        </div>
      </Reveal>

      <Reveal>
        <h3 className="mono mb-2 text-[13px] text-dim">{t("about.stackTitle")}</h3>
      </Reveal>

      <dl className="mb-14 flex flex-col">
        {STACK.map((group, i) => (
          <Reveal key={group.key} delay={i * 60}>
            <div className="grid gap-2 border-b border-border py-4 sm:grid-cols-[190px_1fr] sm:gap-6">
              <dt className="mono text-[13px] text-muted-foreground">
                {t(`about.stack.${group.key}`)}
              </dt>
              <dd className="mono text-[13px] leading-[1.9] text-body">{group.items}</dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal>
        <h3 className="mono mb-4 text-[13px] text-dim">{t("about.contactTitle")}</h3>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <a
            href={`mailto:${PROFILE.email}`}
            className="link-line inline-block text-xl font-medium tracking-[-0.01em] text-foreground md:text-2xl"
          >
            {PROFILE.email}
          </a>
          <CopyButton text={PROFILE.email} />
        </div>

        <div className="mt-6 flex flex-wrap gap-5">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[13px] text-muted-foreground transition-colors duration-250 hover:text-foreground"
          >
            GitHub ↗
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[13px] text-muted-foreground transition-colors duration-250 hover:text-foreground"
          >
            LinkedIn ↗
          </a>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[13px] text-muted-foreground transition-colors duration-250 hover:text-foreground"
          >
            {t("nav.resume")} ↗
          </a>
        </div>
      </Reveal>
    </div>
  );
}
