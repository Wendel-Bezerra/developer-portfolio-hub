import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          <span className="mono text-primary text-sm mb-4 block">04. E agora?</span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Vamos Conversar?
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Estou sempre aberto a novas oportunidades, projetos interessantes ou 
            simplesmente trocar uma ideia sobre tecnologia. Minha inbox está sempre 
            aberta — seja para uma proposta de trabalho ou apenas para dizer "oi"!
          </p>

          {/* CTA Button */}
          <Button variant="hero" size="xl" asChild className="mb-12">
            <a href="mailto:seuemail@example.com">
              <Mail size={20} />
              Enviar Email
            </a>
          </Button>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            >
              <Github size={20} />
              <span className="text-sm link-underline">GitHub</span>
            </a>
            <a
              href="https://linkedin.com"
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
