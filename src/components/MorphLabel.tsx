import { cn } from "@/lib/utils";

/**
 * Rótulo que troca com um fade curto com blur sempre que o texto muda.
 * O `key` remonta o span a cada troca, o que reinicia a animação de entrada.
 * O blur funde o texto novo com o antigo em vez de mostrar dois estados.
 */
export function MorphLabel({ children, className }: { children: string; className?: string }) {
  return (
    <span key={children} className={cn("inline-block animate-label-in motion-reduce:animate-fade-in", className)}>
      {children}
    </span>
  );
}
