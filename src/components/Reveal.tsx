import type { ReactNode } from "react";

import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Revela o bloco com o keyframe `fade-up` quando ele entra na viewport.
 * O atraso escalonado (`delay`) serve para cascatear itens de uma mesma lista.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  // Movimento reduzido: só opacidade, sem o deslocamento vertical.
  const reduced = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      className={cn(
        // fill-mode `both` é necessário por causa do delay: sem ele o bloco
        // apareceria opaco antes da animação começar.
        inView
          ? `${reduced ? "animate-fade-in" : "animate-fade-up"} [animation-fill-mode:both]`
          : "opacity-0",
        className,
      )}
      style={inView && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
