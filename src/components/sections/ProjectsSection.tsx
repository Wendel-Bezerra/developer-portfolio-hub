import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/I18nProvider';

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

type OtherProject = Omit<Project, 'impact' | 'role' | 'featured'>;

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const { t } = useI18n();

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
      <a
        href={project.liveUrl || project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`md:col-span-7 relative aspect-video rounded-lg overflow-hidden bg-secondary group block ${
          isEven ? 'md:col-start-1' : 'md:col-start-6'
        }`}
      >
        {project.liveUrl ? (
          <>
            <img
              src={`https://image.thum.io/get/width/1280/crop/720/${project.liveUrl}`}
              alt={`Preview de ${project.title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex flex-col items-center justify-center p-6 text-center hidden group-hover:bg-primary/30 transition-colors duration-300">
              <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center gap-2 text-primary font-medium">
                <ExternalLink size={18} />
                <span>{t('projects.clickToVisit')}</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-center pb-4">
              <div className="bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium text-foreground flex items-center gap-2">
                <ExternalLink size={16} />
                {t('projects.visitSite')}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground mono text-sm">
              {t('projects.preview')}
            </div>
          </>
        )}
      </a>

      {/* Project Content */}
      <div
        className={`md:col-span-6 md:row-start-1 relative z-10 ${
          isEven ? 'md:col-start-6 md:text-right' : 'md:col-start-1'
        }`}
      >
        <p className="mono text-primary text-sm mb-3">{t('projects.featured')}</p>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
          {project.title}
        </h3>

        {/* Description Card */}
        <div className="card-gradient p-6 rounded-lg shadow-lg mb-4">
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            {project.description}
          </p>
          <p className="text-foreground text-sm font-medium">
            {project.impact}
          </p>
          <p className="text-muted-foreground text-xs mt-2 italic">
            {t('projects.role')} {project.role}
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
            aria-label={t('projects.ariaViewCode')}
          >
            <Github size={20} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={t('projects.ariaViewLive')}
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
  const { t } = useI18n();

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
            aria-label={t('projects.ariaViewCodeShort')}
          >
            <Github size={18} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={t('projects.ariaViewDemoShort')}
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
  const { t } = useI18n();

  const projects: Project[] = [
    {
      title: t('projects.items.ajb.title'),
      description: t('projects.items.ajb.description'),
      impact: t('projects.items.ajb.impact'),
      role: t('projects.items.ajb.role'),
      technologies: ['React', 'Node.js'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://www.ajbadvocacia.com.br/',
      featured: true,
    },
    {
      title: t('projects.items.facilize.title'),
      description: t('projects.items.facilize.description'),
      impact: t('projects.items.facilize.impact'),
      role: t('projects.items.facilize.role'),
      technologies: ['React', 'Node.js'],
      githubUrl: 'https://github.com',
      liveUrl: 'https://www.facilize.com.br/',
      featured: true,
    },
  ];

  const otherProjects: OtherProject[] = [
    {
      title: t('projects.items.travelTracker.title'),
      description: t('projects.items.travelTracker.description'),
      technologies: ['React', 'Node.js', 'Map APIs'],
      githubUrl: 'https://github.com/Wendel-Bezerra/wanderlust-map',
    },
    {
      title: t('projects.items.betTracker.title'),
      description: t('projects.items.betTracker.description'),
      technologies: ['React', 'Node.js', 'TypeScript'],
      githubUrl: 'https://github.com/Wendel-Bezerra/bet-tracker',
    },
  ];

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
          <span className="mono text-primary text-base">03.</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
            {t('projects.title')}
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
            {t('projects.otherTitle')}
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
            <a href="https://github.com/Wendel-Bezerra" target="_blank" rel="noopener noreferrer">
              {t('projects.moreOnGithub')}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
