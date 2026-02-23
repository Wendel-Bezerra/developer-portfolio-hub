import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { IconType } from 'react-icons';
import { useI18n } from '@/i18n/I18nProvider';
import {
  SiCss3,
  SiDocker,
  SiExpress,
  SiGit,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypeorm,
  SiTypescript,
  SiAmazonwebservices,
} from 'react-icons/si';
import { FaGears } from 'react-icons/fa6';

interface SkillCategory {
  titleKey: 'backend' | 'frontend' | 'database' | 'devops';
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    titleKey: 'backend',
    skills: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Python', 'GraphQL'],
  },
  {
    titleKey: 'frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    titleKey: 'database',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'TypeORM'],
  },
  {
    titleKey: 'devops',
    skills: ['Git', 'Docker', 'AWS', 'CI/CD', 'Jest', 'Postman'],
  },
];

const skillIcons: Record<string, IconType | undefined> = {
  Java: SiOpenjdk,
  'Spring Boot': SiSpringboot,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  GraphQL: SiGraphql,
  React: SiReact,
  TypeScript: SiTypescript,
  'Next.js': SiNextdotjs,
  TailwindCSS: SiTailwindcss,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  JavaScript: SiJavascript,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Prisma: SiPrisma,
  TypeORM: SiTypeorm,
  Git: SiGit,
  Docker: SiDocker,
  AWS: SiAmazonwebservices,
  'CI/CD': FaGears,
  Jest: SiJest,
  Postman: SiPostman,
};

function SkillTag({ skill, index, icon: Icon }: { skill: string; index: number; icon?: IconType }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary text-muted-foreground rounded-md hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
    >
      {Icon ? <Icon size={14} className="text-primary shrink-0" aria-hidden /> : null}
      <span className="mono text-xs">{skill}</span>
    </motion.span>
  );
}

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  return (
    <section id="skills" className="py-24 md:py-32 bg-secondary/30">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="mono text-primary text-base">02.</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
            {t('skills.title')}
          </h2>
          <div className="h-px flex-1 bg-border max-w-xs" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                {t(`skills.categories.${category.titleKey}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillTag key={skill} skill={skill} index={skillIndex} icon={skillIcons[skill]} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
