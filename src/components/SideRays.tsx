import { useEffect, useRef } from "react";

type SideRaysProps = {
  /** Multiplicador da velocidade da animação. */
  speed?: number;
  /** Opacidade global dos raios (0–1). */
  opacity?: number;
  className?: string;
};

const RAYS = 16;
/** Abertura total do leque, em radianos. */
const SPREAD = 0.62;

/**
 * Raios de luz monocromáticos partindo do canto superior direito.
 * Canvas 2D — porta do efeito usado no mockup do redesign v3.
 */
export default function SideRays({ speed = 2.5, opacity = 1, className }: SideRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      t += 0.006 * speed;
      ctx.clearRect(0, 0, width, height);

      // Origem fora da tela, no canto superior direito.
      const ox = width + 40;
      const oy = -40;
      const base = Math.atan2(height * 0.9, -(width * 0.9));
      const reach = Math.hypot(width, height) * 1.2;

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < RAYS; i += 1) {
        const seed = i * 12.9898;
        const angle = base + (i / (RAYS - 1) - 0.5) * SPREAD + Math.sin(t * 1.3 + seed) * 0.015;
        const half = 0.006 + 0.014 * (0.5 + 0.5 * Math.sin(seed * 3.7));
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + seed * 1.7);
        const alpha = (0.02 + 0.075 * pulse) * opacity;

        const x1 = ox + Math.cos(angle - half) * reach;
        const y1 = oy + Math.sin(angle - half) * reach;
        const x2 = ox + Math.cos(angle + half) * reach;
        const y2 = oy + Math.sin(angle + half) * reach;

        const gradient = ctx.createLinearGradient(
          ox,
          oy,
          ox + Math.cos(angle) * reach * 0.85,
          oy + Math.sin(angle) * reach * 0.85,
        );
        gradient.addColorStop(0, `rgba(255,255,255,${alpha.toFixed(3)})`);
        gradient.addColorStop(0.55, `rgba(255,255,255,${(alpha * 0.35).toFixed(3)})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.fill();
      }

      // Brilho suave no ponto de origem.
      const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, Math.min(width, height) * 0.5);
      glow.addColorStop(0, `rgba(255,255,255,${(0.1 * opacity).toFixed(3)})`);
      glow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "source-over";
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, [speed, opacity]);

  return <canvas ref={canvasRef} className={className} />;
}
