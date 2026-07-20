import { useEffect, useState } from "react";

/**
 * Qual das seções está atravessando o meio da viewport. A faixa estreita
 * (-45%/-45%) faz a troca acontecer quando a seção cruza o centro da tela, e
 * não na borda — evita o marcador piscando entre duas seções.
 *
 * Quando nenhuma seção cruza a faixa (topo/rodapé da página) o último id ativo
 * é mantido, em vez de zerar.
 */
export function useActiveSection(ids: string[]): string | null {
  const key = ids.join("|");
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = key.split("|").filter(Boolean);
    if (sectionIds.length === 0 || typeof IntersectionObserver === "undefined") return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        const next = sectionIds.find((id) => visible.has(id));
        if (next) setActive(next);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
