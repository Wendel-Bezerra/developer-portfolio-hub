import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Fighter, type FighterHandle } from "@/components/Fighter";
import { POSES } from "@/components/fighterGeometry";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// Mini bonecos que substituem o cursor "_" nos títulos das seções. Ficam
// alinhados à linha de base do título e medem ~1em, então acompanham o
// tamanho da fonte. São decorativos: aria-hidden.

/** Sobre: o lutador do hero solta um jab quando o título aparece e no hover. */
export function TitleFighter({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const fighterRef = useRef<FighterHandle>(null);
  const reduced = usePrefersReducedMotion();

  const jab = () => {
    const f = fighterRef.current;
    if (!f || reduced || gsap.isTweening(f.upper)) return;
    gsap
      .timeline()
      .to([f.upper, f.fore], {
        rotation: (i) => (i === 0 ? POSES.jab.upper : POSES.jab.fore),
        duration: 0.14,
        ease: "expo.out",
      })
      .fromTo(f.trail, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.55, duration: 0.08 }, 0)
      .to(f.trail, { scaleX: 0.2, opacity: 0, duration: 0.14 }, 0.08)
      .to([f.upper, f.fore], {
        rotation: (i) => (i === 0 ? POSES.guard.upper : POSES.guard.fore),
        duration: 0.35,
        ease: "power2.inOut",
      }, 0.22);
  };

  useEffect(() => {
    // Pequena espera para o jab acontecer depois do fade de entrada do título.
    if (!inView) return;
    const id = window.setTimeout(jab, 350);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span
      ref={ref}
      aria-hidden
      onPointerEnter={(e) => e.pointerType === "mouse" && jab()}
      className={cn("ml-[0.12em] inline-block w-[0.62em] align-[-0.12em]", className)}
    >
      <Fighter ref={fighterRef} className="w-full" />
    </span>
  );
}

/**
 * Projetos: o Luffy, cachorro do Wendel. Vira-lata preto e caramelo com as
 * "sobrancelhas" caramelo, orelhas em pé de ponta dobrada e peito claro.
 * De tempos em tempos inclina a cabeça, curioso.
 */
export function LuffyDog({ className }: { className?: string }) {
  // Preto puro some no fundo do site: o pelo preto é um grafite com borda clara.
  const BLACK = "#2B2E33";
  const RIM = "#4A4F57";
  const TAN = "#C98A4B";
  const TAN_DARK = "#A86F3A";
  const CREAM = "#E6D3BC";
  const INK = "#0B0B0C";

  return (
    <span aria-hidden className={cn("ml-[0.12em] inline-block h-[1em] w-[1em] align-[-0.14em]", className)}>
      <svg viewBox="0 0 64 64" className="dog-tilt h-full w-full overflow-visible">
        {/* Peito claro aparecendo sob a cabeça */}
        <ellipse cx={32} cy={52} rx={10} ry={8} fill={CREAM} />
        {/* Orelhas em pé com a ponta dobrada para a frente */}
        <g stroke={RIM} strokeWidth={1.2} strokeLinejoin="round">
          <path d="M19 25 L11 6 Q15 4 19 7 L28 17 Z" fill={BLACK} />
          <path d="M45 25 L53 6 Q49 4 45 7 L36 17 Z" fill={BLACK} />
        </g>
        <path d="M11 6 Q15 4 19 7 L15 11 Z" fill={RIM} />
        <path d="M53 6 Q49 4 45 7 L49 11 Z" fill={RIM} />
        {/* Cabeça */}
        <ellipse cx={32} cy={32} rx={17} ry={16} fill={BLACK} stroke={RIM} strokeWidth={1.2} />
        {/* Bochechas e focinho caramelo */}
        <ellipse cx={22} cy={39} rx={6} ry={5} fill={TAN} />
        <ellipse cx={42} cy={39} rx={6} ry={5} fill={TAN} />
        <ellipse cx={32} cy={43} rx={10} ry={7} fill={TAN} />
        {/* Faixa preta descendo da testa até o nariz */}
        <path d="M28 22 Q32 20 36 22 L35 40 Q32 42 29 40 Z" fill={BLACK} />
        {/* Sobrancelhas caramelo */}
        <ellipse cx={24} cy={23} rx={3.2} ry={2.2} fill={TAN} />
        <ellipse cx={40} cy={23} rx={3.2} ry={2.2} fill={TAN} />
        {/* Olhos */}
        <circle cx={24.5} cy={29} r={3} fill={INK} />
        <circle cx={39.5} cy={29} r={3} fill={INK} />
        <circle cx={25.6} cy={27.9} r={0.9} fill="#FFFFFF" />
        <circle cx={40.6} cy={27.9} r={0.9} fill="#FFFFFF" />
        {/* Nariz */}
        <ellipse cx={32} cy={40} rx={4.4} ry={3.2} fill={INK} />
        <ellipse cx={30.8} cy={39} rx={1.2} ry={0.7} fill="#5A5F66" />
        {/* Sorriso de boca fechada */}
        <path d="M32 43 V45.5 M27 46 Q32 50 37 46" fill="none" stroke={TAN_DARK} strokeWidth={1.4} strokeLinecap="round" />
      </svg>
    </span>
  );
}

// Pixel art do Wendel, 18×27. Cada caractere é um pixel; "." é transparente.
const ME_PALETTE: Record<string, string> = {
  H: "#1F1612", // cabelo liso
  h: "#3A281E", // mechas (reflexo)
  S: "#D09A74", // pele
  s: "#B07B58", // sombra da pele
  d: "#8E5E42", // sombra funda (nariz, orelhas)
  G: "#2E3338", // armação dos óculos
  L: "#E1BFA2", // lente sobre a pele
  m: "#5A4030", // bigode fino
  M: "#B0595A", // lábios
  W: "#F7F4EE", // dentes
  J: "#1D2747", // jaqueta azul-marinho
  j: "#141B33", // sombra da jaqueta
  C: "#2B3964", // gola alta
  B: "#0B1022", // botão
};

// Cabelo liso com volume no topo: as mechas ("h") correm na diagonal. Rosto
// oval natural, sem contorno marcando o maxilar; bigode fino com o meio aberto.
const ME_ROWS = [
  ".....HHHHHHH......",
  "...HHHHHHHHHHH....",
  "..HHHHHhhHHHHHH...",
  "..HHHHHHHhhHHHHH..",
  "..HHHhhHHHHHhhHH..",
  "..HHHHHHHHHHHHHH..",
  "..HHSSSSSSSSSHHH..",
  "..HSSSSSSSSSSSSH..",
  "..HSSSSSSSSSSSSH..",
  "..sSHHHSSSSHHHSs..",
  ".sGGGGGGGGGGGGGGs.",
  ".sGLLLLGSSGLLLLGs.",
  ".sGLLLLGSSGLLLLGs.",
  "..GGGGGGSSGGGGGG..",
  "..SSSSSSSSSSSSSS..",
  "..SSSSSSdSSSSSSS..",
  "..SSSSmmSSmmSSSS..",
  "..sSSSMWWWWMSSSs..",
  "...SSSSMMMMSSSS...",
  "...sSSSSSSSSSSs...",
  "....sSSSSSSSSs....",
  ".....sSSSSSSs.....",
  "....JJCssssCJJ....",
  "..JJJJJCssCJJJJJ..",
  ".JJJJjJJCCJJjJJJJ.",
  "JJJJJjJJJBJJjJJJJJ",
  "JJJJJjJJJJJJjJJJJJ",
];

// Olhos castanhos por cima das lentes; somem por um instante para piscar.
const ME_EYES: [number, number][] = [
  [5, 12],
  [12, 12],
];

/** Contato: o Wendel em pixel art, piscando de vez em quando. */
export function PixelMe({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("ml-[0.14em] inline-block h-[1.05em] w-[0.7em] align-[-0.12em]", className)}>
      <svg viewBox="0 0 20 27"className="h-full w-full overflow-visible" shapeRendering="crispEdges">
        {ME_ROWS.flatMap((row, y) =>
          Array.from(row).map((c, x) =>
            c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={ME_PALETTE[c]} />,
          ),
        )}
        <g className="pixel-blink">
          {ME_EYES.map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#5A3A24" />
          ))}
        </g>
      </svg>
    </span>
  );
}
