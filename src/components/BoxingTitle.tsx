import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { Fighter, type FighterHandle } from "@/components/Fighter";
import { FIGHTER_VIEWBOX_W, GLOVE_TIP, POSES } from "@/components/fighterGeometry";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type State = "idle" | "punching" | "done";

/** Giro máximo do tronco ao acompanhar o cursor, em graus. */
const LEAN_MAX = 4;

/**
 * Título do hero com um boxeador ao lado. Rolar para baixo no topo da página
 * (ou clicar no lutador) dispara um jab no nome: as letras caem e a página
 * segue para `targetId`. Quando o nome sai da tela ele é remontado sem animação e
 * volta com uma entrada curta ao reaparecer.
 */
export function BoxingTitle({
  name,
  targetId,
  hint,
  fighterLabel,
}: {
  name: string;
  targetId: string;
  hint: string;
  fighterLabel: string;
}) {
  const reduced = usePrefersReducedMotion();

  const wrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cornerRef = useRef<HTMLDivElement>(null);
  const fighterRef = useRef<FighterHandle>(null);
  const burstRef = useRef<SVGSVGElement>(null);
  const stateRef = useRef<State>("idle");
  const punchRef = useRef<() => void>(() => {});
  const enteredRef = useRef(false);

  const goToTarget = () =>
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });

  // Estado inicial da entrada antes do primeiro paint, para não piscar o nome.
  useLayoutEffect(() => {
    if (reduced || enteredRef.current) return;
    const letters = titleRef.current?.querySelectorAll("[data-letter]");
    if (letters) gsap.set(letters, { y: 16, opacity: 0 });
    gsap.set(cornerRef.current, { x: 24, opacity: 0 });
  }, [reduced]);

  useEffect(() => {
    const title = titleRef.current;
    const wrap = wrapRef.current;
    const corner = cornerRef.current;
    const fighter = fighterRef.current;
    const burst = burstRef.current;
    if (!title || !wrap || !corner || !fighter || !burst) return;
    const { svg, body, torso, head, upper, fore, trail } = fighter;

    if (reduced) {
      punchRef.current = goToTarget;
      return;
    }

    const letters = Array.from(title.querySelectorAll<HTMLElement>("[data-letter]"));
    let punchTl: gsap.core.Timeline | null = null;

    // Entrada do primeiro carregamento: o lutador entra no canto e o nome sobe
    // em cascata. Só uma vez por carregamento.
    // fromTo + marcação no fim: se o efeito for desmontado no meio, a próxima
    // montagem refaz a entrada do zero em vez de deixar o nome escondido.
    if (!enteredRef.current) {
      gsap.fromTo(
        letters,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.025 },
      );
      gsap.fromTo(
        corner,
        { x: 24, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.15,
          onComplete: () => {
            enteredRef.current = true;
          },
        },
      );
    }

    // Gingado de base: o lutador nunca fica completamente parado.
    const bob = gsap.to(body, {
      y: -3,
      duration: 0.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // O tronco acompanha o cursor (só com mouse, e só com o hero visível).
    // quickTo dá a sensação de mola sem recriar tweens a cada movimento.
    const canTrack = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const leanTo = gsap.quickTo(torso, "rotation", { duration: 0.5, ease: "power3.out" });
    const lookTo = gsap.quickTo(head, "x", { duration: 0.5, ease: "power3.out" });
    let heroVisible = true;

    const onPointerMove = (e: PointerEvent) => {
      if (!heroVisible || stateRef.current !== "idle") return;
      const r = svg.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const lean = gsap.utils.clamp(-1, 1, dx);
      // Rotação positiva inclina para trás; cursor à esquerda (no nome) = avança.
      leanTo(lean * LEAN_MAX);
      lookTo(lean * 2);
    };

    const punch = () => {
      if (stateRef.current !== "idle") return;
      stateRef.current = "punching";
      bob.pause();
      // Se a entrada ainda estiver rodando, termina ela antes de medir.
      gsap.killTweensOf(letters);
      gsap.set(letters, { y: 0, opacity: 1 });

      // Onde a luva vai estar com o braço esticado, sem avanço do corpo.
      const svgRect = svg.getBoundingClientRect();
      const scale = svgRect.width / FIGHTER_VIEWBOX_W;
      const tipX = svgRect.left + GLOVE_TIP.x * scale;
      const tipY = svgRect.top + GLOVE_TIP.y * scale;

      // Alvo: a letra mais à direita da linha mais próxima da altura da luva.
      // O cursor "_" fica de fora: ele pisca e o soco acertaria o vazio.
      const rects = letters.map((l) => l.getBoundingClientRect());
      const solid = rects.filter((_, i) => !("cursor" in letters[i].dataset));
      const lineDist = (r: DOMRect) => Math.abs(r.top + r.height / 2 - tipY);
      const closest = Math.min(...solid.map(lineDist));
      const target = solid
        .filter((r) => lineDist(r) - closest < 4)
        .reduce((a, b) => (b.right > a.right ? b : a));

      const lunge = Math.min(0, target.right - tipX + 4) / scale;
      const impact = { x: target.right, y: target.top + target.height / 2 };

      const wrapRect = wrap.getBoundingClientRect();
      gsap.set(burst, {
        left: impact.x - wrapRect.left,
        top: impact.y - wrapRect.top,
        xPercent: -50,
        yPercent: -50,
      });

      const tl = gsap.timeline();
      punchTl = tl;

      // Preparação curta: o braço recolhe, o corpo pesa para trás e o tronco
      // volta ao centro (ele pode estar inclinado acompanhando o cursor).
      tl.to(body, { y: 0, x: 6, duration: 0.12, ease: "power2.out" }, 0)
        .to(torso, { rotation: 0, duration: 0.12, ease: "power2.out" }, 0)
        .to(head, { x: 0, duration: 0.12, ease: "power2.out" }, 0)
        .to(upper, { rotation: POSES.windUp.upper, duration: 0.12, ease: "power2.out" }, 0)
        .to(fore, { rotation: POSES.windUp.fore, duration: 0.12, ease: "power2.out" }, 0);

      // O jab: rápido e seco. expo.out entrega a velocidade logo no início.
      tl.addLabel("jab", 0.13)
        .to(body, { x: lunge, rotation: -4, svgOrigin: "120 290", duration: 0.16, ease: "expo.out" }, "jab")
        .to(upper, { rotation: 0, duration: 0.14, ease: "expo.out" }, "jab")
        .to(fore, { rotation: 0, duration: 0.14, ease: "expo.out" }, "jab")
        // Rastro de velocidade: estica atrás da luva e some logo depois.
        .fromTo(trail, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.55, duration: 0.08, ease: "power2.out" }, "jab")
        .to(trail, { scaleX: 0.2, opacity: 0, duration: 0.14, ease: "power2.out" }, "jab+=0.08");

      // Impacto ~60ms depois: o expo.out já cobriu quase toda a distância.
      tl.addLabel("hit", "jab+=0.06")
        .call(() => navigator.vibrate?.(12), [], "hit")
        .fromTo(
          burst,
          { scale: 0.6, opacity: 1 },
          { scale: 1.25, opacity: 0, duration: 0.32, ease: "power2.out" },
          "hit",
        );

      // As letras caem a partir do ponto de impacto, as mais próximas primeiro.
      const fallDistance = window.innerHeight;
      letters.forEach((letter, i) => {
        const r = rects[i];
        const dist = Math.hypot(r.left + r.width / 2 - impact.x, r.top + r.height / 2 - impact.y);
        const force = Math.max(0.35, 1 - dist / 900);
        const delay = Math.min(dist / 2400, 0.35);
        const spin = gsap.utils.random(-70, 20);

        tl.to(
          letter,
          {
            x: -gsap.utils.random(14, 36) * force,
            y: -gsap.utils.random(8, 22) * force,
            rotation: spin * 0.3,
            duration: 0.16,
            ease: "power2.out",
          },
          `hit+=${delay}`,
        )
          // Queda é gravidade: aqui o ease-in é o movimento físico correto.
          .to(
            letter,
            {
              y: fallDistance,
              rotation: spin,
              duration: 0.8,
              ease: "power2.in",
            },
            `hit+=${delay + 0.16}`,
          )
          .to(letter, { opacity: 0, duration: 0.25, ease: "linear" }, `hit+=${delay + 0.7}`);
      });

      // Recolhe o braço enquanto as letras ainda caem.
      tl.to(body, { x: 0, rotation: 0, duration: 0.4, ease: "power2.inOut" }, "hit+=0.25")
        .to(upper, { rotation: POSES.guard.upper, duration: 0.4, ease: "power2.inOut" }, "hit+=0.25")
        .to(fore, { rotation: POSES.guard.fore, duration: 0.4, ease: "power2.inOut" }, "hit+=0.25")
        .call(() => bob.restart(), [], "hit+=0.65")
        .call(
          () => {
            stateRef.current = "done";
            goToTarget();
          },
          [],
          "hit+=0.7",
        );
    };
    punchRef.current = punch;

    // Rolar para baixo estando no topo vira o soco. Durante o soco o scroll
    // fica travado para a queda das letras ser vista.
    const atTop = () => window.scrollY <= 4;

    const onWheel = (e: WheelEvent) => {
      if (stateRef.current === "punching") return e.preventDefault();
      if (stateRef.current !== "idle" || !atTop() || e.deltaY <= 0) return;
      e.preventDefault();
      punch();
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (stateRef.current === "punching") return e.preventDefault();
      if (stateRef.current !== "idle" || !atTop()) return;
      if (touchY - e.touches[0].clientY < 8) return;
      e.preventDefault();
      punch();
    };

    // Rearma o lutador depois de um soco: remonta o nome (escondido) e volta
    // ao estado inicial. As letras mais distantes podem ainda estar caindo, por
    // isso a timeline inteira é morta; tirar só as quedas de dentro dela a faz
    // re-renderizar e repetir o callback final, que marcaria "done" de novo.
    const rearm = () => {
      punchTl?.kill();
      punchTl = null;
      bob.play();
      gsap.set(letters, { x: 0, rotation: 0, y: -24, opacity: 0 });
      stateRef.current = "idle";
    };

    const enterLetters = () =>
      gsap.to(letters, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", stagger: 0.025 });

    // Caso 1: o nome saiu da tela. Remonta escondido e entra quando voltar.
    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        if (!entry.isIntersecting && stateRef.current === "done") {
          rearm();
          title.dataset.pendingEntrance = "true";
        } else if (entry.isIntersecting && title.dataset.pendingEntrance) {
          delete title.dataset.pendingEntrance;
          enterLetters();
        }
      },
      { threshold: 0 },
    );
    observer.observe(title);

    // Caso 2: a pessoa interrompeu a descida automática e voltou ao topo sem o
    // nome ter saído da tela; o caso 1 nunca dispararia e o lutador ficaria
    // travado. Exige ter se afastado do topo antes, senão o primeiro quadro da
    // própria descida (ainda perto de 0) rearmaria na hora.
    let leftTop = false;
    const onScroll = () => {
      if (stateRef.current !== "done") {
        leftTop = false;
        return;
      }
      if (window.scrollY > 40) leftTop = true;
      else if (leftTop && atTop()) {
        leftTop = false;
        rearm();
        enterLetters();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    if (canTrack) window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      punchTl?.kill();
      bob.kill();
      gsap.killTweensOf([body, torso, head, upper, fore, trail, burst, corner, ...letters]);
      gsap.set(letters, { clearProps: "transform,opacity" });
      gsap.set(corner, { clearProps: "transform,opacity" });
      gsap.set([body, torso, head], { x: 0, y: 0, rotation: 0 });
      stateRef.current = "idle";
    };
    // goToTarget só depende de targetId.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetId, reduced, name]);

  // Finta no hover (só com mouse): a luva da frente ameaça sair.
  const onPointerEnter = (e: React.PointerEvent) => {
    const fore = fighterRef.current?.fore;
    if (!fore || reduced || e.pointerType !== "mouse" || stateRef.current !== "idle") return;
    gsap.to(fore, {
      rotation: POSES.guard.fore - 14,
      duration: 0.12,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    });
  };

  const words = name.split(" ");

  return (
    <div ref={wrapRef} className="relative flex items-center gap-2 sm:gap-4">
      <h1
        ref={titleRef}
        aria-label={name}
        className="min-w-0 font-display text-[46px] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl md:text-[86px]"
      >
        {words.map((word, w) => (
          <Fragment key={w}>
            {/* O espaço fica fora do inline-block, senão ele colapsa. */}
            {w > 0 ? " " : null}
            <span aria-hidden className="inline-block whitespace-nowrap">
              {Array.from(word).map((char, c) => (
                <span key={c} data-letter className="inline-block will-change-transform">
                  {char}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
        <span
          aria-hidden
          data-letter
          data-cursor
          className="inline-block animate-blink font-normal text-poppy motion-reduce:animate-none"
        >
          _
        </span>
      </h1>

      <div ref={cornerRef} className="relative shrink-0">
        <button
          type="button"
          aria-label={fighterLabel}
          onClick={() => punchRef.current()}
          onPointerEnter={onPointerEnter}
          className="cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Fighter ref={fighterRef} className="w-[104px] sm:w-[130px] md:w-[180px]" />
        </button>
        {/* Absoluta para a legenda não alargar a coluna e afastar o lutador. */}
        <span className="mono absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.14em] text-dim md:block">
          ↓ {hint}
        </span>
      </div>

      {/* Estrela de impacto no ponto do soco */}
      <svg
        ref={burstRef}
        viewBox="-30 -30 60 60"
        className="pointer-events-none absolute left-0 top-0 h-20 w-20 opacity-0"
        aria-hidden
      >
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={i}
            x1={0}
            y1={-12}
            x2={0}
            y2={-26}
            stroke="hsl(var(--poppy))"
            strokeWidth={4}
            strokeLinecap="round"
            transform={`rotate(${i * 45})`}
          />
        ))}
      </svg>
    </div>
  );
}
