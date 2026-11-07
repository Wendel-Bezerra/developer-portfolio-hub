import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const year = String(new Date().getFullYear());

  return (
    // A barra de início do iPhone fica embaixo: o rodapé afasta o texto dela.
    <footer className="flex items-center justify-between px-6 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-14">
      <span className="mono text-xs text-dim">{t("footer.copyright", { year })}</span>
      <span className="mono text-xs text-dim">{t("meta.location")}</span>
    </footer>
  );
}
