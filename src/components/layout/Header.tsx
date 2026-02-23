import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, t } = useI18n();

  const homeBase = lang === 'en' ? '/en' : lang === 'es' ? '/es' : '/';
  const contactPath = lang === 'en' ? '/en/contact' : lang === 'es' ? '/es/contact' : '/contato';
  const isHome = location.pathname === homeBase;
  const currentLangLabel = lang === 'en' ? 'English (EN)' : lang === 'es' ? 'Español (ES)' : 'Português (PT)';
  const currentLangShort = lang === 'en' ? 'EN' : lang === 'es' ? 'ES' : 'PT';

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: contactPath },
  ];

  const handleLanguageToggle = () => {
    const targetLang = lang === 'pt' ? 'en' : lang === 'en' ? 'es' : 'pt';
    const hash = location.hash || '';
    const search = location.search || '';

    const isEnglishPath = location.pathname === '/en' || location.pathname.startsWith('/en/');
    const isSpanishPath = location.pathname === '/es' || location.pathname.startsWith('/es/');
    const isContactPt = location.pathname === '/contato';
    const isContactEn = location.pathname === '/en/contact';
    const isContactEs = location.pathname === '/es/contact';

    // Páginas especiais (contact)
    if (isContactPt || isContactEn || isContactEs) {
      if (targetLang === 'pt') return navigate(`/contato${hash}${search}`);
      if (targetLang === 'en') return navigate(`/en/contact${hash}${search}`);
      return navigate(`/es/contact${hash}${search}`);
    }

    // Home
    if (location.pathname === '/' || location.pathname === '/en' || location.pathname === '/es') {
      if (targetLang === 'pt') return navigate(`/${hash}${search}`);
      if (targetLang === 'en') return navigate(`/en${hash}${search}`);
      return navigate(`/es${hash}${search}`);
    }

    // Demais rotas: mantém path e troca prefixo
    const stripped = isEnglishPath
      ? location.pathname.replace(/^\/en/, '')
      : isSpanishPath
        ? location.pathname.replace(/^\/es/, '')
        : location.pathname;

    if (targetLang === 'pt') return navigate(`${stripped || '/'}${hash}${search}`);
    if (targetLang === 'en') return navigate(`/en${stripped}${hash}${search}`);
    return navigate(`/es${stripped}${hash}${search}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          {isHome ? (
            <a
              href="#hero"
              className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-gradient drop-shadow-[0_0_18px_hsl(var(--primary)/0.35)]"
              aria-label="Ir para o início"
            >
              WCB
            </a>
          ) : (
            <Link
              to={`${homeBase}#hero`}
              className="font-display text-xl md:text-2xl font-extrabold tracking-tight text-gradient drop-shadow-[0_0_18px_hsl(var(--primary)/0.35)]"
              aria-label="Ir para o início"
            >
              WCB
            </Link>
          )}

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <li key={item.label}>
                {item.href.startsWith('#') ? (
                  isHome ? (
                  <a
                    href={item.href}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    <span className="mono text-primary text-xs mr-1">0{index + 1}.</span>
                    {item.label}
                  </a>
                  ) : (
                    <Link
                      to={`${homeBase}${item.href}`}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                    >
                      <span className="mono text-primary text-xs mr-1">0{index + 1}.</span>
                      {item.label}
                    </Link>
                  )
                ) : (
                  <Link
                    to={item.href}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    <span className="mono text-primary text-xs mr-1">0{index + 1}.</span>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="ml-2">
              <Button variant="outline" size="sm" onClick={handleLanguageToggle} aria-label={`Idioma atual: ${currentLangLabel}`}>
                {currentLangShort}
              </Button>
            </li>
            <li className="ml-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/curriculo.pdf" target="_blank" rel="noopener noreferrer">
                  {t('nav.resume')}
                </a>
              </Button>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <Button
            variant="icon"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <ul className="flex flex-col py-4 px-6">
              {navItems.map((item, index) => (
                <li key={item.label}>
                  {item.href.startsWith('#') ? (
                    isHome ? (
                    <a
                      href={item.href}
                      className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mono text-primary text-xs mr-2">0{index + 1}.</span>
                      {item.label}
                    </a>
                    ) : (
                      <Link
                        to={`${homeBase}${item.href}`}
                        className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="mono text-primary text-xs mr-2">0{index + 1}.</span>
                        {item.label}
                      </Link>
                    )
                  ) : (
                    <Link
                      to={item.href}
                      className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mono text-primary text-xs mr-2">0{index + 1}.</span>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="mt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLanguageToggle();
                  }}
                >
                  {currentLangLabel}
                </Button>
              </li>
              <li className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/curriculo.pdf" target="_blank" rel="noopener noreferrer">
                    {t('nav.resume')}
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
