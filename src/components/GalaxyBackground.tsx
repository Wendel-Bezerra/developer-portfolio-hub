import { lazy, Suspense, useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TwinGalaxyRings = lazy(() => import("@/components/TwinGalaxyRings"));

/**
 * Fundo de galáxia do hero. Segue o mesmo padrão do antigo RaysBackground:
 * só monta o canvas WebGL depois de um idle callback e nunca quando o usuário
 * pede movimento reduzido.
 */
export function GalaxyBackground() {
  const [enabled, setEnabled] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let timeoutId: number | undefined;
    let idleId: number | undefined;

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setEnabled(true), { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(() => setEnabled(true), 250);
    }

    return () => {
      if (idleId != null && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {enabled ? (
        <Suspense fallback={null}>
          <TwinGalaxyRings background="transparent" style={{ position: "absolute", inset: 0 }} />
        </Suspense>
      ) : null}
    </div>
  );
}
