import { lazy, Suspense, useEffect, useState } from "react";

const Aurora = lazy(() => import("@/components/Aurora"));

export function AuroraBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    // Evita trabalho extra em dispositivos/usuários que pedem menos animação.
    if (reduceMotion) return;

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
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {enabled ? (
        <Suspense fallback={null}>
          <Aurora
            className="absolute inset-0"
            colorStops={["#04010e", "#3919a4", "#5227FF"]}
            blend={0.5}
            amplitude={1.0}
            speed={1}
          />
        </Suspense>
      ) : null}
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
}

