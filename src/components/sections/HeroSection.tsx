import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';
import ShinyText from '@/components/ui/ShinyText';

export function HeroSection() {
  const { lang, t } = useI18n();
  const contactPath = lang === "en" ? "/en/contact" : lang === "es" ? "/es/contact" : "/contato";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient effect */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      <div className="section-container relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mono text-primary text-sm md:text-base mb-6"
          >
            {t('hero.hello')}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-foreground mb-4 tracking-tight"
          >
            <ShinyText
              text="Wendel Campos Bezerra."
              color="#cfcfcf"
              shineColor="#ffffff"
              speed={2}
              spread={120}
              className="text-foreground"
            />
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-muted-foreground mb-6"
          >
            {t('hero.taglinePrefix')}{' '}
            <span className="text-gradient">{t('hero.taglineHighlight')}</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            {t('hero.desc1')}{' '}
            {t('hero.desc2Prefix')}{' '}
            <span className="text-foreground">{t('hero.perf')}</span>,{' '}
            <span className="text-foreground">{t('hero.ux')}</span>{' '}
            {lang === 'en' ? 'and' : 'e'} <span className="text-foreground">{t('hero.clean')}</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                {t('hero.ctaProjects')}
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <Link to={contactPath}>
                {t('hero.ctaContact')}
              </Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/Wendel-Bezerra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/wendelcamposbezerra/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:Wendel.2929@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
            <div className="h-px w-24 bg-border ml-4" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown size={24} className="animate-float" />
        </a>
      </motion.div>
    </section>
  );
}
