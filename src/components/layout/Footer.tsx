import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Links - Mobile */}
          <div className="flex items-center gap-4 md:hidden">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:email@example.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Credit */}
          <div className="text-center md:text-left">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors mono text-xs"
            >
              Desenvolvido por Seu Nome
            </a>
          </div>

          {/* Built with */}
          <p className="text-muted-foreground text-xs mono">
            Feito com React + TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
}
