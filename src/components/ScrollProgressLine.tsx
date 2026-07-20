import { useCallback, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

export type ProgressSection = {
  /** id da <section> correspondente no documento. */
  id: string;
  /** Numeração exibida ao lado do marcador (01, 02, 03). */
  index: string;
  label: string;
};

/**
 * Traço vertical que se desenha conforme o scroll, funcionando como um minimapa
 * do documento: cada marcador fica na fração em que a seção correspondente
 * atinge o centro da viewport — o mesmo critério do useActiveSection, então o
 * traço alcança o marcador exatamente quando a seção vira a ativa.
 *
 * Decorativo: aria-hidden e ausente sob prefers-reduced-motion.
 */
export function ScrollProgressLine({
  sections,
  activeId,
}: {
  sections: ProgressSection[];
  activeId: string | null;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGLineElement>(null);
  const railHeightRef = useRef(0);
  const [railHeight, setRailHeight] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);

  const sectionKey = sections.map((section) => section.id).join("|");

  const measure = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const height = rail.getBoundingClientRect().height;
    railHeightRef.current = height;
    setRailHeight(height);

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ids = sectionKey.split("|").filter(Boolean);

    setOffsets(
      ids.map((id) => {
        const el = document.getElementById(id);
        if (!el || scrollable <= 0) return 0;
        // Ponto de scroll em que o centro da seção encosta no centro da tela.
        const center = el.offsetTop + el.offsetHeight / 2 - window.innerHeight / 2;
        return Math.min(1, Math.max(0, center / scrollable));
      }),
    );
  }, [sectionKey]);

  useEffect(() => {
    if (reducedMotion) return;

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, reducedMotion]);

  // Escrita direta no style: o traço acompanha o scroll sem re-render do React.
  useScrollProgress((progress) => {
    const line = progressRef.current;
    if (!line) return;
    line.style.strokeDashoffset = String(railHeightRef.current * (1 - progress));
  });

  if (reducedMotion) return null;

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-[22vh] right-8 top-[22vh] z-10 hidden w-px lg:block"
    >
      <svg className="h-full w-px" width="1" height="100%">
        <line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          stroke="hsl(var(--border))"
          strokeWidth="1"
        />
        <line
          ref={progressRef}
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
          strokeDasharray={railHeight || undefined}
          strokeDashoffset={railHeight || undefined}
        />
      </svg>

      {sections.map((section, i) => {
        const isActive = section.id === activeId;

        return (
          <div
            key={section.id}
            className="absolute right-0 flex -translate-y-1/2 translate-x-[2px] items-center gap-3"
            style={{ top: `${(offsets[i] ?? 0) * 100}%` }}
          >
            <span
              className={cn(
                "mono whitespace-nowrap text-[10px] uppercase tracking-[0.18em] transition-colors duration-250",
                isActive ? "text-foreground" : "text-dim",
              )}
            >
              {section.index} {section.label}
            </span>
            <span
              className={cn(
                "block h-[5px] w-[5px] rounded-full transition-colors duration-250",
                isActive ? "bg-foreground" : "bg-border",
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
