import { Link, useLocation, useNavigate } from "react-router-dom";

import { LogoMark } from "@/components/LogoMark";
import { PROFILE } from "@/data/profile";
import { useI18n } from "@/i18n/I18nProvider";
import { nextLang, pathFor, routeKeyFor } from "@/i18n/routes";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  const langLabel = lang.toUpperCase();

  const handleLanguageToggle = () => {
    const target = nextLang(lang);
    // Mantém a tela atual ao trocar de idioma; rota desconhecida cai na home.
    // O hash é descartado de propósito: preservá-lo faria o ScrollToHash rolar
    // até uma âncora antiga em vez de manter a posição atual.
    const key = routeKeyFor(location.pathname) ?? "home";
    navigate(`${pathFor(target, key)}${location.search}`);
  };

  return (
    <header className="flex items-center justify-between px-6 py-8 md:px-14 md:py-10">
      <Link
        to={pathFor(lang, "home")}
        aria-label={t("nav.home")}
        className="flex items-center gap-3 text-muted-foreground transition-colors duration-250 hover:text-foreground"
      >
        <LogoMark className="h-[26px] w-[26px] md:h-[30px] md:w-[30px]" />
        <span className="mono text-xs md:text-[13px]">{PROFILE.handle}</span>
      </Link>

      <div className="flex items-center gap-5">
        <span className="mono hidden text-[13px] text-dim sm:inline">{t("meta.role")}</span>
        <button
          type="button"
          onClick={handleLanguageToggle}
          aria-label={t("nav.langAria")}
          className="mono border-b border-border pb-0.5 text-xs text-muted-foreground transition-colors duration-250 hover:border-foreground hover:text-foreground md:text-[13px]"
        >
          {langLabel}
        </button>
      </div>
    </header>
  );
}
