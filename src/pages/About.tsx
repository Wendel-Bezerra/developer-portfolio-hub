import { BackLink } from "@/components/BackLink";
import { PageShell } from "@/components/layout/PageShell";
import { PROFILE, STACK } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";

export default function About() {
  const { t } = useI18n();

  return (
    <PageShell>
      <div className="max-w-3xl flex-1 animate-fade-up px-6 pb-24 pt-6 md:px-14">
        <BackLink />

        <h1 className="cursor mb-8 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px]">
          {t("about.title")}
        </h1>

        <div className="mb-14 flex flex-col gap-[18px] text-base leading-[1.8] text-body">
          <p>
            {t("about.p1Prefix")}
            <span className="text-foreground">{t("about.p1Highlight")}</span>
            {t("about.p1Suffix")}
          </p>
          <p>
            {t("about.p2Prefix")}
            <span className="text-foreground">{t("about.p2Highlight")}</span>
            {t("about.p2Suffix")}
          </p>
          <p>{t("about.p3")}</p>
        </div>

        <h2 className="mono mb-2 text-[13px] text-dim">{t("about.stackTitle")}</h2>
        <dl className="mb-14 flex flex-col">
          {STACK.map((group) => (
            <div
              key={group.key}
              className="grid gap-2 border-b border-border py-4 sm:grid-cols-[190px_1fr] sm:gap-6"
            >
              <dt className="mono text-[13px] text-muted-foreground">{t(`about.stack.${group.key}`)}</dt>
              <dd className="mono text-[13px] leading-[1.9] text-body">{group.items}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mono mb-4 text-[13px] text-dim">{t("about.contactTitle")}</h2>
        <a
          href={`mailto:${PROFILE.email}`}
          className="link-line inline-block text-xl font-medium tracking-[-0.01em] text-foreground md:text-2xl"
        >
          {PROFILE.email}
        </a>

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
      </div>
    </PageShell>
  );
}
