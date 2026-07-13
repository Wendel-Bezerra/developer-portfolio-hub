import { Link } from "react-router-dom";

import { useI18n } from "@/i18n/I18nProvider";
import { pathFor } from "@/i18n/routes";

export function BackLink() {
  const { lang, t } = useI18n();

  return (
    <Link
      to={pathFor(lang, "home")}
      className="mono mb-11 inline-block text-[13px] text-muted-foreground transition-colors duration-250 hover:text-foreground"
    >
      ← {t("nav.back")}
    </Link>
  );
}
