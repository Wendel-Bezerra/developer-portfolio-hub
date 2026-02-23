import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useI18n } from '@/i18n/I18nProvider';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="mono text-primary text-base">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('about.title')}</h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Text Content */}
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">{t('about.p1')}</p>
              <p className="leading-relaxed">{t('about.p2')}</p>
              <p className="leading-relaxed">{t('about.p3')}</p>
            </div>

            {/* Profile Image */}
            <div className="relative group">
              <div className="relative">
                {/* Image container */}
                <div className="relative rounded-lg overflow-hidden bg-secondary aspect-square">
                  <img
                    src="/profile.png"
                    alt={t('about.photoAlt')}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
