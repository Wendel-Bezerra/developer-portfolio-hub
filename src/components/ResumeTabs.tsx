import { useRef, useState, type KeyboardEvent } from "react";

import { EXPERIENCE, PROFILE } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import type { Lang } from "@/i18n/translations";
import { cn } from "@/lib/utils";

const LOCALES: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };
const TABS = ["experience", "education"] as const;
type Tab = (typeof TABS)[number];

/** "2026-05" → "mai. 2026" / "May 2026", no idioma atual. */
function formatMonth(value: string, lang: Lang) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(LOCALES[lang], { month: "short", year: "numeric" }).format(
    new Date(year, month - 1),
  );
}

/**
 * Mini aba de currículo: Experiência | Formação. A troca de aba é instantânea
 * (é uma ação repetida); só o indicador desliza, para mostrar de onde veio.
 */
export function ResumeTabs() {
  const { lang, t } = useI18n();
  const [tab, setTab] = useState<Tab>("experience");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Setas esquerda/direita trocam de aba, como no padrão WAI-ARIA de tabs.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const next = (TABS.indexOf(tab) + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setTab(TABS[next]);
    tabRefs.current[next]?.focus();
  };

  const active = TABS.indexOf(tab);

  return (
    <div>
      <div role="tablist" aria-label={t("about.resumeTitle")} onKeyDown={onKeyDown} className="relative mb-6 inline-flex border-b border-border">
        {TABS.map((key, i) => (
          <button
            key={key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`resume-tab-${key}`}
            role="tab"
            type="button"
            aria-selected={tab === key}
            aria-controls={`resume-panel-${key}`}
            tabIndex={tab === key ? 0 : -1}
            onClick={() => setTab(key)}
            className={cn(
              "mono w-32 pb-2.5 text-left text-[13px] transition-colors duration-150 focus-visible:outline-none focus-visible:text-primary",
              tab === key ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t(`about.tabs.${key}`)}
          </button>
        ))}
        {/* Indicador da aba ativa: desliza com transform. */}
        <span
          aria-hidden
          className="absolute -bottom-px left-0 h-px w-32 bg-primary transition-transform duration-200 ease-out-strong"
          style={{ transform: `translateX(${active * 100}%)` }}
        />
      </div>

      {tab === "experience" ? (
        <ol id="resume-panel-experience" role="tabpanel" aria-labelledby="resume-tab-experience" className="flex flex-col gap-8">
          {EXPERIENCE.map((job) => (
            <li key={job.company}>
              <p className="mb-3 text-lg font-medium tracking-[-0.01em] text-foreground">{job.company}</p>
              {/* Trilha de cargos: na mesma empresa, a promoção aparece como subida. */}
              <ol className="flex flex-col gap-4 border-l border-border pl-5">
                {job.roles.map((role) => (
                  <li key={role.key} className="relative">
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -left-[23px] top-[7px] h-[5px] w-[5px] rounded-full",
                        role.end === null ? "bg-primary" : "bg-border",
                      )}
                    />
                    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px] text-body">
                      {t(`about.jobs.${role.key}`)}
                      {role.promoted && (
                        <span className="mono text-[11px] uppercase tracking-[0.12em] text-primary">
                          ↑ {t("about.promoted")}
                        </span>
                      )}
                    </p>
                    <p className="mono mt-1 text-xs text-dim">
                      {formatMonth(role.start, lang)} — {role.end ? formatMonth(role.end, lang) : t("about.present")}
                    </p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      ) : (
        <div id="resume-panel-education" role="tabpanel" aria-labelledby="resume-tab-education" className="flex flex-col gap-6">
          <div>
            <p className="mb-1 text-lg font-medium tracking-[-0.01em] text-foreground">{t("about.education.degree")}</p>
            <p className="text-[15px] text-body">{t("about.education.school")}</p>
            <p className="mono mt-1 text-xs text-dim">{t("about.education.status")}</p>
          </div>
          <div>
            <p className="mb-1 text-[15px] text-body">{t("about.education.certTitle")}</p>
            <p className="mono text-xs text-dim">{t("about.education.certMeta")}</p>
          </div>
        </div>
      )}

      <a
        href={PROFILE.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="link-line mono mt-8 inline-block text-[13px] text-muted-foreground"
      >
        {t("about.fullResume")} ↗
      </a>
    </div>
  );
}
