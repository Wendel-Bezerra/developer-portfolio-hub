import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Progresso do scroll do documento (0..1) entregue via callback — de propósito
 * não é estado, para que o consumidor escreva direto no style do elemento e não
 * dispare re-render do React a cada frame.
 *
 * Sob prefers-reduced-motion emite 1 uma única vez (traço já completo) e não
 * assina nenhum listener.
 */
export function useScrollProgress(onChange: (progress: number) => void) {
  const reducedMotion = usePrefersReducedMotion();
  const callbackRef = useRef(onChange);
  callbackRef.current = onChange;

  useEffect(() => {
    if (reducedMotion) {
      callbackRef.current(1);
      return;
    }

    let frame: number | null = null;

    const measure = () => {
      frame = null;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      callbackRef.current(Math.min(1, Math.max(0, progress)));
    };

    const schedule = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reducedMotion]);
}
