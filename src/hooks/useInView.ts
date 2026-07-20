import { useEffect, useRef, useState, type RefObject } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Options = {
  /** Fração do elemento visível para disparar. */
  threshold?: number;
  /** Antecipa/atrasa o disparo em relação à viewport. */
  rootMargin?: string;
};

/**
 * Dispara uma única vez quando o elemento entra na viewport e desconecta.
 * Sob prefers-reduced-motion devolve `true` de saída — o conteúdo nunca pode
 * depender da animação para ficar visível.
 */
export function useInView<T extends Element>(
  options: Options = {},
): [RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = options;
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, threshold, rootMargin]);

  return [ref, inView];
}
