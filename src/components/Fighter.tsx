import { forwardRef, useImperativeHandle, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { ELBOW, HIPS, POSES, SHOULDER } from "@/components/fighterGeometry";
import { cn } from "@/lib/utils";

// Corpo branco; o azul fica no uniforme (calção, botas e faixa das luvas).
const SKIN = "hsl(var(--foreground))";
const BACK_TONE = "hsl(187 10% 68%)";
const KIT = "hsl(var(--primary))";
const KIT_BACK = "hsl(187 30% 58%)";
const GLOVE_SHADE = "hsl(358 60% 40%)";

export type FighterHandle = {
  svg: SVGSVGElement;
  /** Corpo inteiro: gingado e avanço do jab. */
  body: SVGGElement;
  /** Tronco, cabeça e braços: giram em torno do quadril. */
  torso: SVGGElement;
  head: SVGGElement;
  upper: SVGGElement;
  fore: SVGGElement;
  /** Linhas de velocidade atrás da luva da frente. */
  trail: SVGGElement;
  /** Braço de trás em guarda (parte atrás e parte à frente do tronco). */
  rearGuard: SVGElement[];
  /** Braço de trás erguido: escondido até a comemoração. */
  rearRaised: SVGGElement;
  /** Cinturão de campeão: escondido até a comemoração. */
  belt: SVGGElement;
};

/** Ombro do braço de trás, eixo do braço erguido. */
const REAR_SHOULDER = "130 104";

type Props = {
  className?: string;
  pose?: "guard" | "ko";
};

/**
 * Boxeador em SVG usado no hero e na 404. Expõe os grupos animáveis via ref;
 * quem usa decide a animação. A pose inicial é aplicada antes do primeiro
 * paint para o braço não piscar esticado.
 */
export const Fighter = forwardRef<FighterHandle, Props>(function Fighter(
  { className, pose = "guard" },
  ref,
) {
  const svgRef = useRef<SVGSVGElement>(null);
  const bodyRef = useRef<SVGGElement>(null);
  const torsoRef = useRef<SVGGElement>(null);
  const headRef = useRef<SVGGElement>(null);
  const upperRef = useRef<SVGGElement>(null);
  const foreRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGGElement>(null);
  const rearBackRef = useRef<SVGPathElement>(null);
  const rearFrontRef = useRef<SVGGElement>(null);
  const rearRaisedRef = useRef<SVGGElement>(null);
  const beltRef = useRef<SVGGElement>(null);

  useImperativeHandle(ref, () => ({
    svg: svgRef.current!,
    body: bodyRef.current!,
    torso: torsoRef.current!,
    head: headRef.current!,
    upper: upperRef.current!,
    fore: foreRef.current!,
    trail: trailRef.current!,
    rearGuard: [rearBackRef.current!, rearFrontRef.current!],
    rearRaised: rearRaisedRef.current!,
    belt: beltRef.current!,
  }));

  useLayoutEffect(() => {
    const p = POSES[pose];
    gsap.set(upperRef.current, { rotation: p.upper, svgOrigin: SHOULDER });
    gsap.set(foreRef.current, { rotation: p.fore, svgOrigin: ELBOW });
    gsap.set(torsoRef.current, { svgOrigin: HIPS });
    gsap.set(trailRef.current, { scaleX: 0, opacity: 0, svgOrigin: "24 106" });
    gsap.set(rearRaisedRef.current, { opacity: 0, svgOrigin: REAR_SHOULDER });
    gsap.set(beltRef.current, { opacity: 0 });
  }, [pose]);

  const ko = pose === "ko";

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 300"
      className={cn("block h-auto overflow-visible", className)}
      aria-hidden
    >
      <g ref={bodyRef}>
        {/* Perna de trás: calcanhar levemente erguido, como na base de luta */}
        <path
          d="M130 192 L148 240 L160 268"
          fill="none"
          stroke={BACK_TONE}
          strokeWidth={20}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M151 262 H169 L174 284 Q175 292 167 292 H145 Q138 292 140 286 Q142 281 152 279 Z"
          fill={KIT_BACK}
        />
        {/* Perna da frente */}
        <path
          d="M104 192 L86 240 L81 268"
          fill="none"
          stroke={SKIN}
          strokeWidth={22}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Bota da frente, bico apontando para o nome */}
        <path
          d="M71 262 H91 L93 288 Q93 296 85 296 H61 Q54 296 56 290 Q58 284 70 282 Z"
          fill={KIT}
        />
        <path d="M70 268 H92" stroke={SKIN} strokeWidth={3} strokeLinecap="round" />
        <path d="M56 296 H93" stroke={KIT_BACK} strokeWidth={3} strokeLinecap="round" />
        {/* Calção */}
        <path d="M90 170 H144 L152 214 L126 218 L118 200 L110 218 L84 214 Z" fill={KIT} />
        <path d="M90 172 H144" stroke={SKIN} strokeWidth={4} />

        <g ref={torsoRef}>
          {/* Braço de trás (parte superior, atrás do tronco) */}
          <path ref={rearBackRef} d="M130 106 L124 146" stroke={BACK_TONE} strokeWidth={16} strokeLinecap="round" />
          {/* Braço de trás erguido, para a comemoração (atrás do tronco e da cabeça) */}
          <g ref={rearRaisedRef} opacity={0}>
            <path d="M130 104 L140 66 L146 34" fill="none" stroke={BACK_TONE} strokeWidth={15} strokeLinecap="round" strokeLinejoin="round" />
            <rect x={139} y={30} width={15} height={8} rx={2} fill={KIT} />
            <ellipse cx={147} cy={20} rx={13} ry={14} fill={GLOVE_SHADE} />
          </g>
          {/* Tronco */}
          <path
            d="M88 100 C84 130 90 156 94 172 H140 C146 148 148 124 138 98 C124 88 100 88 88 100 Z"
            fill={SKIN}
          />
          {/* Cinturão de campeão, só na comemoração */}
          <g ref={beltRef} opacity={0}>
            <rect x={88} y={163} width={58} height={13} rx={3} fill="#C9A646" />
            <ellipse cx={117} cy={169.5} rx={12} ry={10} fill="#F0D27A" stroke="#A98632" strokeWidth={2} />
            <circle cx={117} cy={169.5} r={3.5} fill="hsl(var(--poppy))" />
          </g>
          <rect x={102} y={76} width={16} height={22} rx={6} fill={SKIN} />
          <g ref={headRef}>
            <circle cx={108} cy={60} r={22} fill={SKIN} />
            <path d="M88 64 Q84 70 90 74" fill={SKIN} />
            {ko ? (
              // Olho em "x" de nocaute.
              <path
                d="M93 53 L100 60 M100 53 L93 60"
                stroke="hsl(var(--background))"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            ) : (
              <path d="M94 56 H100" stroke="hsl(var(--background))" strokeWidth={3} strokeLinecap="round" />
            )}
          </g>
          {/* Antebraço e luva de trás, protegendo o queixo */}
          <g ref={rearFrontRef}>
            <path d="M124 146 L104 100" stroke={BACK_TONE} strokeWidth={14} strokeLinecap="round" />
            <g transform="rotate(-70 98 90)">
              <rect x={106} y={82} width={8} height={16} rx={2} fill={KIT} />
              <ellipse cx={96} cy={90} rx={14} ry={12} fill={GLOVE_SHADE} />
            </g>
          </g>

          {/* Braço da frente */}
          <g ref={upperRef}>
            <path d="M94 106 L54 106" stroke={SKIN} strokeWidth={16} strokeLinecap="round" />
            <g ref={foreRef}>
              <path d="M54 106 L22 106" stroke={SKIN} strokeWidth={14} strokeLinecap="round" />
              <g ref={trailRef} stroke={SKIN} strokeWidth={2.5} strokeLinecap="round" opacity={0}>
                <path d="M26 90 H70" />
                <path d="M32 122 H62" />
                <path d="M40 84 H58" opacity={0.6} />
              </g>
              <rect x={18} y={97} width={9} height={18} rx={2} fill={KIT} />
              <ellipse cx={8} cy={106} rx={15} ry={13} fill="hsl(var(--poppy))" />
              <ellipse cx={11} cy={116} rx={7} ry={4} fill={GLOVE_SHADE} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
});
