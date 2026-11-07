import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { Fighter, type FighterHandle } from "@/components/Fighter";
import { POSES } from "@/components/fighterGeometry";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

/** Pose do mascote em cada round (índice da seção ativa). */
const ROUND_POSES = ["guard", "jab", "victory"] as const;

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
  const mascotRef = useRef<HTMLDivElement>(null);
  const fighterRef = useRef<FighterHandle>(null);
  const railHeightRef = useRef(0);
  const [railHeight, setRailHeight] = useState(0);
  const [offsets, setOffsets] = useState<number[]>([]);

  // Só aparece depois que o usuário começa a rolar; na tela inicial fica oculto.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // Escrita direta no style: o traço e o mascote acompanham o scroll sem
  // re-render do React.
  useScrollProgress((progress) => {
    const line = progressRef.current;
    if (line) line.style.strokeDashoffset = String(railHeightRef.current * (1 - progress));
    const mascot = mascotRef.current;
    if (mascot) mascot.style.transform = `translate3d(0, ${railHeightRef.current * progress}px, 0)`;
  });

  // A cada round o mascote muda de pose: guarda no Sobre, jab nos Projetos e
  // vitória no Contato. Pose muda só na troca de seção, então é rara e pode
  // ter um pouco de charme.
  const round = sections.findIndex((section) => section.id === activeId);
  useEffect(() => {
    const fighter = fighterRef.current;
    if (!fighter || reducedMotion) return;
    const { upper, fore, body, trail, rearGuard, rearRaised, belt } = fighter;
    const poseKey = ROUND_POSES[round] ?? "guard";
    const pose = POSES[poseKey];
    const champion = poseKey === "victory";

    const tl = gsap.timeline();

    // Fora do R3 o braço de trás volta à guarda e o cinturão some.
    if (!champion) {
      tl.set(rearRaised, { opacity: 0 }, 0)
        .set(rearGuard, { opacity: 1 }, 0)
        .to(belt, { opacity: 0, duration: 0.15 }, 0);
    }

    if (champion) {
      // Campeão: os dois braços sobem em "V", o cinturão aparece e ele
      // comemora com três pulinhos.
      tl.set(rearGuard, { opacity: 0 }, 0)
        .fromTo(rearRaised, { opacity: 1, rotation: -70 }, { rotation: 0, duration: 0.3, ease: "back.out(1.6)" }, 0)
        .to([upper, fore], {
          rotation: (i) => (i === 0 ? pose.upper : pose.fore),
          duration: 0.3,
          ease: "back.out(1.6)",
        }, 0)
        .fromTo(belt, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.1)
        .to(body, { y: -14, duration: 0.15, ease: "power2.out", yoyo: true, repeat: 5 }, 0.15);
    } else if (poseKey === "jab") {
      tl.to([upper, fore], { rotation: (i) => (i === 0 ? pose.upper : pose.fore), duration: 0.18, ease: "expo.out" })
        .fromTo(trail, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.55, duration: 0.08, ease: "power2.out" }, 0)
        .to(trail, { scaleX: 0.2, opacity: 0, duration: 0.14, ease: "power2.out" }, 0.08);
    } else {
      tl.to([upper, fore], {
        rotation: (i) => (i === 0 ? pose.upper : pose.fore),
        duration: 0.3,
        ease: "power3.out",
      });
    }
    return () => {
      tl.kill();
      gsap.set(body, { y: 0 });
    };
  }, [round, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed bottom-[22vh] right-16 top-[22vh] z-10 hidden w-px transition-opacity duration-500 lg:block",
        scrolled ? "opacity-100" : "opacity-0",
      )}
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
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray={railHeight || undefined}
          strokeDashoffset={railHeight || undefined}
        />
      </svg>

      {/* Mascote: o lutador do hero em miniatura, de pé na ponta do traço,
          virado para o conteúdo. O translate vem do callback de scroll. */}
      {/* O trilho fica a 64px da borda para caber o lutador de 40px à direita. */}
      <div ref={mascotRef} className="absolute left-[6px] top-0 will-change-transform">
        <div className="-translate-y-full">
          <Fighter ref={fighterRef} className="w-[40px]" />
        </div>
      </div>

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
                isActive ? "text-primary" : "text-dim",
              )}
            >
              {/* Seções como rounds de uma luta: R1 · Sobre. */}
              R{Number(section.index)} · {section.label}
            </span>
            <span
              className={cn(
                "block h-[5px] w-[5px] rounded-full transition-colors duration-250",
                // A classe entra só quando a seção vira ativa, então o pulso
                // roda uma vez a cada troca de round.
                isActive ? "animate-marker-pulse bg-primary" : "bg-border",
              )}
            />
          </div>
        );
      })}
    </div>
  );
}
