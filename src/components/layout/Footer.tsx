import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

export function Footer() {
  const { lang, t } = useI18n();
  const year = new Date().getFullYear();
  const contactPath = lang === 'en' ? '/en/contact' : '/contato';

  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links - Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <a
              href="https://github.com/Wendel-Bezerra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/wendelcamposbezerra/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <Link
              to={contactPath}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </Link>
          </div>

          {/* Credit */}
          <div className="text-center md:text-left">
            <a
              href="https://github.com/Wendel-Bezerra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors mono text-xs"
            >
              {t('footer.developedBy')}
            </a>
          </div>

          {/* Rights */}
          <p className="text-muted-foreground text-xs mono text-center">
            © {year} {t('footer.rights')}
          </p>

          {/* Built with */}
          <p className="text-muted-foreground text-xs mono">
            {t('footer.builtWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
