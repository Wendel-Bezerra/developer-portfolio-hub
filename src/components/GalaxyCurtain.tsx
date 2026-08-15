import { useEffect, useRef } from "react";
import gsap from "gsap";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Cortina em onda que cobre/descobre a tela a cada clique na galáxia (hero).
// Os três estados do path têm a mesma estrutura (M V Q V z), então o core do
// GSAP interpola o atributo `d` direto — sem precisar do plugin MorphSVG.
const CLOSED = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
const START = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
const END = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

export function GalaxyCurtain({
  triggerId,
  targetId,
}: {
  triggerId: string;
  /** Seção para onde a página navega enquanto a tela está coberta. */
  targetId: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    // Com movimento reduzido a navegação continua, só sem a cortina.
    if (reduced) {
      const onClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button")) return;
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "auto", block: "start" });
      };
      trigger.addEventListener("click", onClick);
      return () => trigger.removeEventListener("click", onClick);
    }

    const path = pathRef.current;
    if (!path) return;

    // Sobe cobrindo a tela, pula para a seção alvo enquanto está coberta
    // e desce revelando o destino — tudo num único clique.
    const tl = gsap
      .timeline({ paused: true })
      .to(path, { attr: { d: START }, ease: "sine.in", duration: 0.7 })
      .to(path, { attr: { d: END }, ease: "sine.out", duration: 0.7 })
      .call(() => {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "auto", block: "start" });
      })
      .to(path, { attr: { d: START }, ease: "sine.in", duration: 0.7 }, "+=0.3")
      .to(path, { attr: { d: CLOSED }, ease: "sine.out", duration: 0.7 });

    const onClick = (e: MouseEvent) => {
      // Cliques em links/botões do hero continuam com o comportamento normal.
      if ((e.target as HTMLElement).closest("a, button")) return;
      if (!tl.isActive()) tl.restart();
    };

    trigger.addEventListener("click", onClick);
    return () => {
      trigger.removeEventListener("click", onClick);
      tl.kill();
    };
  }, [triggerId, targetId, reduced]);

  if (reduced) return null;

  return (
    <svg
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="galaxy-curtain-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#101c34" />
          <stop offset="100%" stopColor="#1c2e50" />
        </linearGradient>
      </defs>
      <path ref={pathRef} fill="url(#galaxy-curtain-grad)" d={CLOSED} />
    </svg>
  );
}
