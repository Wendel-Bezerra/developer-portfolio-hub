import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  const year = String(new Date().getFullYear());

  return (
    <footer className="flex items-center justify-between px-6 pb-8 md:px-14">
      <span className="mono text-xs text-dim">{t("footer.copyright", { year })}</span>
      <span className="mono text-xs text-dim">{t("meta.location")}</span>
    </footer>
  );
}
