import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import { Fighter } from "@/components/Fighter";
import { PageShell } from "@/components/layout/PageShell";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useI18n } from "@/i18n/I18nProvider";
import { pathFor } from "@/i18n/routes";

const CONTENT_ENTER = "animate-fade-up [animation-fill-mode:both] motion-reduce:animate-fade-in";

/**
 * 404 como nocaute: o lutador cambaleia, cai na lona e o juiz conta até o
 * código do erro. Com movimento reduzido ele já aparece deitado e o "404"
 * aparece direto.
 */
const NotFound = () => {
  const { lang, t } = useI18n();
  const reduced = usePrefersReducedMotion();

  const fallRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  // Cai de costas girando em torno do calcanhar de trás: deitado, ele fica
  // inteiro acima da lona, na mesma altura em que os pés estavam.
  useLayoutEffect(() => {
    gsap.set(fallRef.current, { transformOrigin: "90% 100%", rotation: reduced ? 90 : 0 });
  }, [reduced]);

  useEffect(() => {
    const fall = fallRef.current;
    const count = countRef.current;
    if (!fall || !count || reduced) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Cambaleia: ainda de pé, mas já sem guarda.
    tl.to(fall, { rotation: -6, duration: 0.18, ease: "sine.inOut" })
      .to(fall, { rotation: 5, duration: 0.2, ease: "sine.inOut" })
      // Queda é gravidade: ease-in.
      .to(fall, { rotation: 90, duration: 0.42, ease: "power2.in" })
      .addLabel("floor")
      // Quique curto ao bater na lona.
      .to(fall, { y: -6, duration: 0.1, ease: "power2.out" }, "floor")
      .to(fall, { y: 0, duration: 0.14, ease: "power2.in" }, "floor+=0.1");

    // Contagem do juiz: 1, 2, 3… e o código do erro fica.
    ["1", "2", "3", "404"].forEach((value, i) => {
      const at = `floor+=${0.15 + i * 0.32}`;
      tl.call(() => (count.textContent = value), [], at).fromTo(
        count,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.16, ease: "power3.out" },
        at,
      );
    });

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <PageShell>
      <div className="flex flex-1 flex-col justify-center px-6 pb-24 md:px-14">
        <div className="mb-10 flex items-end gap-8" aria-hidden>
          {/* Caixa no tamanho do lutador deitado; ele começa de pé e cai. */}
          <div className="relative h-[110px] w-[200px]">
            <div ref={fallRef} className="absolute bottom-0 left-[-40px] w-[100px]">
              <Fighter pose="ko" className="w-[100px]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
          </div>
          <span
            ref={countRef}
            className="mono mb-1 text-4xl font-medium tabular-nums text-primary md:text-5xl"
          >
            {reduced ? "404" : ""}
          </span>
        </div>

        <h1
          className={`cursor mb-5 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px] ${CONTENT_ENTER}`}
          style={{ animationDelay: "500ms" }}
        >
          {t("notFound.title")}
        </h1>

        <p
          className={`mb-8 max-w-md text-base leading-[1.8] text-body ${CONTENT_ENTER}`}
          style={{ animationDelay: "580ms" }}
        >
          {t("notFound.description")}
        </p>

        <Link
          to={pathFor(lang, "home")}
          className={`link-line mono inline-block w-fit text-[13px] text-muted-foreground ${CONTENT_ENTER}`}
          style={{ animationDelay: "660ms" }}
        >
          ← {t("notFound.back")}
        </Link>
      </div>
    </PageShell>
  );
};

export default NotFound;
