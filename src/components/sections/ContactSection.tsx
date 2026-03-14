import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useI18n();
  const contactPath = lang === "en" ? "/en/contact" : lang === "es" ? "/es/contact" : "/contato";

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Section Header */}
          <span className="mono text-primary text-sm mb-4 block">04. {t('contactSection.kicker')}</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
            {t('contactSection.title')}
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            {t('contactSection.description')}
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="xl" asChild className="mb-12">
            <Link to={contactPath}>
              <Mail size={20} />
              {t('contactSection.cta')}
            </Link>
          </Button>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/Wendel-Bezerra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Github size={20} />
              <span className="text-sm link-underline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/wendelcamposbezerra/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Linkedin size={20} />
              <span className="text-sm link-underline">LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
