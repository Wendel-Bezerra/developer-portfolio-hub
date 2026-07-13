import { lazy, Suspense, useEffect, useState } from "react";

const SideRays = lazy(() => import("@/components/SideRays"));

export function RaysBackground() {
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
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {enabled ? (
        <Suspense fallback={null}>
          <SideRays className="absolute inset-0 h-full w-full" speed={2.5} opacity={1} />
        </Suspense>
      ) : null}
    </div>
  );
}
