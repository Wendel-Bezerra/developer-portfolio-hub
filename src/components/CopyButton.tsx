import { useEffect, useRef, useState } from "react";

import { MorphLabel } from "@/components/MorphLabel";
import { useI18n } from "@/i18n/I18nProvider";
import { cn } from "@/lib/utils";

/**
 * Copia `text` para a área de transferência. O retorno aparece no próprio
 * botão ("copiado ✓"), onde a pessoa já está olhando, e some em 1,5s.
 */
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number>();

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={t("meta.copyAria")}
      className={cn(
        // -m-3 p-3: área de toque de ~44px sem mudar o tamanho visual do texto.
        "mono -m-3 rounded p-3 text-[11px] uppercase tracking-[0.12em] text-dim transition-[color,transform] duration-150 ease-out-strong hover:text-primary active:scale-[0.97]",
        copied && "text-primary",
        className,
      )}
    >
      <MorphLabel>{copied ? t("meta.copied") : t("meta.copy")}</MorphLabel>
      <span className="sr-only" aria-live="polite">
        {copied ? t("meta.copied") : ""}
      </span>
    </button>
  );
}
