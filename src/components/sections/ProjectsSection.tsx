import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  impact: string;
  role: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'Plataforma completa de e-commerce com sistema de pagamentos integrado, gestão de estoque e dashboard administrativo.',
    impact: 'Reduziu em 40% o tempo de processamento de pedidos',
    role: 'Desenvolvimento full stack, arquitetura do banco de dados e integração com gateway de pagamento.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    title: 'API de Gestão Financeira',
    description: 'API RESTful para gerenciamento de finanças pessoais com autenticação JWT, relatórios automatizados e notificações.',
    impact: 'Processando +10.000 transações diárias',
    role: 'Arquitetura de microserviços, implementação de testes e CI/CD.',
    technologies: ['Java', 'Spring Boot', 'MongoDB', 'Redis', 'AWS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para visualização de dados em tempo real com gráficos dinâmicos e filtros avançados.',
    impact: 'Melhorou tomada de decisão em 60%',
    role: 'Frontend development, integração com WebSockets e otimização de performance.',
    technologies: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'TailwindCSS'],
    githubUrl: 'https://github.com',
    featured: true,
  },
];

const otherProjects: Omit<Project, 'impact' | 'role' | 'featured'>[] = [
  {
    title: 'CLI Task Manager',
    description: 'Ferramenta de linha de comando para gerenciamento de tarefas com sincronização cloud.',
    technologies: ['Python', 'Click', 'SQLite'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'Weather App',
    description: 'Aplicação de previsão do tempo com geolocalização e notificações.',
    technologies: ['React Native', 'TypeScript', 'API REST'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    title: 'Blog Platform',
    description: 'Plataforma de blog com editor markdown e sistema de comentários.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
];

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative grid md:grid-cols-12 gap-4 items-center ${
        isEven ? '' : 'md:text-right'
      }`}
    >
      {/* Project Image/Preview */}
      <div
        className={`md:col-span-7 relative aspect-video rounded-lg overflow-hidden bg-secondary group ${
          isEven ? 'md:col-start-1' : 'md:col-start-6'
        }`}
      >
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground mono text-sm">
          Preview do Projeto
        </div>
      </div>

      {/* Project Content */}
      <div
        className={`md:col-span-6 md:row-start-1 relative z-10 ${
          isEven ? 'md:col-start-6 md:text-right' : 'md:col-start-1'
        }`}
      >
        <p className="mono text-primary text-xs mb-2">Projeto em Destaque</p>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
          {project.title}
        </h3>

        {/* Description Card */}
        <div className="card-gradient p-6 rounded-lg shadow-lg mb-4">
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            {project.description}
          </p>
          <p className="text-primary text-sm font-medium mono">
            ⚡ {project.impact}
          </p>
          <p className="text-muted-foreground text-xs mt-2 italic">
            Meu papel: {project.role}
          </p>
        </div>

        {/* Technologies */}
        <ul className={`flex flex-wrap gap-3 mb-4 ${isEven ? 'md:justify-end' : ''}`}>
          {project.technologies.map((tech) => (
            <li key={tech} className="mono text-xs text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>

        {/* Links */}
        <div className={`flex gap-4 ${isEven ? 'md:justify-end' : ''}`}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Ver código no GitHub"
          >
            <Github size={20} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Ver demo ao vivo"
            >
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function OtherProjectCard({ project, index }: { project: typeof otherProjects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="card-gradient rounded-lg p-6 hover-lift group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Folder className="text-primary" size={40} strokeWidth={1} />
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Ver código"
          >
            <Github size={18} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Ver demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {project.title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {project.description}
      </p>

      {/* Technologies */}
      <ul className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li key={tech} className="mono text-xs text-muted-foreground">
            {tech}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="mono text-primary text-sm">02.</span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            Projetos Recentes
          </h2>
          <div className="h-px flex-1 bg-border max-w-xs" />
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {projects.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        <div className="text-center mb-12">
          <h3 className="text-xl font-semibold text-foreground">
            Outros Projetos Relevantes
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherProjects.map((project, index) => (
            <OtherProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              Ver mais no GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
