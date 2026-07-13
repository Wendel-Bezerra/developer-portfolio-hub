import { Link } from "react-router-dom";

import { PageShell } from "@/components/layout/PageShell";
import { useI18n } from "@/i18n/I18nProvider";
import { pathFor } from "@/i18n/routes";

const NotFound = () => {
  const { lang, t } = useI18n();

  return (
    <PageShell>
      <div className="flex flex-1 animate-fade-up flex-col justify-center px-6 pb-24 md:px-14">
        <p className="mono mb-6 text-[13px] text-dim">404</p>

        <h1 className="cursor mb-5 font-display text-4xl font-semibold tracking-[-0.03em] md:text-[52px]">
          {t("notFound.title")}
        </h1>

        <p className="mb-8 max-w-md text-base leading-[1.8] text-body">{t("notFound.description")}</p>

        <Link
          to={pathFor(lang, "home")}
          className="link-line mono inline-block w-fit text-[13px] text-muted-foreground"
        >
          ← {t("notFound.back")}
        </Link>
      </div>
    </PageShell>
  );
};

export default NotFound;
