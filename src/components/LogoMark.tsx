import { cn } from "@/lib/utils";

/**
 * Símbolo da marca: o "W" como zigue-zague de código, fechado pelo cursor
 * de terminal. Inline (e não <img>) para herdar a cor do contexto.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={cn("h-[30px] w-[30px]", className)}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M92 176 L154 336 L216 176 L278 336 L340 176"
        stroke="currentColor"
        strokeWidth={42}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
      <rect x={368} y={308} width={56} height={28} rx={6} fill="currentColor" />
    </svg>
  );
}
