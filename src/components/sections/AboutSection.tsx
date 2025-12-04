import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    'Java / Spring Boot',
    'Node.js / Express',
    'React / Next.js',
    'Python / Django',
    'TypeScript',
    'PostgreSQL / MongoDB',
  ];

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
            <span className="mono text-primary text-sm">01.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Sobre Mim</h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Text Content */}
            <div className="md:col-span-2 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Sou um desenvolvedor Full Stack apaixonado por criar soluções digitais 
                que resolvem problemas reais. Minha jornada na programação começou há 
                alguns anos, e desde então venho construindo{' '}
                <span className="text-foreground">aplicações web escaláveis</span> e 
                APIs robustas.
              </p>
              <p className="leading-relaxed">
                Atualmente, estou focado em aprimorar minhas habilidades em arquitetura 
                de software e boas práticas de desenvolvimento. Acredito que{' '}
                <span className="text-foreground">código limpo</span> e{' '}
                <span className="text-foreground">documentação clara</span> são tão 
                importantes quanto a funcionalidade em si.
              </p>
              <p className="leading-relaxed">
                Quando não estou codando, você pode me encontrar explorando novas 
                tecnologias, contribuindo com projetos open source ou compartilhando 
                conhecimento com a comunidade dev.
              </p>

              {/* Technologies */}
              <div className="pt-4">
                <p className="text-foreground text-sm mb-4">
                  Tecnologias que trabalho frequentemente:
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {technologies.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary">▹</span>
                      <span className="mono text-xs">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="relative group">
              <div className="relative">
                {/* Image container */}
                <div className="relative rounded-lg overflow-hidden bg-secondary aspect-square">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground mono text-sm">
                    Sua Foto
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/20 opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                </div>
                {/* Border decoration */}
                <div className="absolute -inset-0 border-2 border-primary rounded-lg translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
