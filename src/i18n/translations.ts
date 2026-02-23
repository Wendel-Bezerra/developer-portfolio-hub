export type Lang = "pt" | "en" | "es";

export const translations = {
  pt: {
    nav: {
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      contact: "Contato",
      resume: "Currículo",
    },
    hero: {
      hello: "Olá, meu nome é",
      taglinePrefix: "Transformo ideias em",
      taglineHighlight: "código funcional.",
      desc1:
        "Desenvolvedor Full Stack com experiência em construir aplicações web escaláveis. Também crio automações e chatbots para otimizar processos e acelerar resultados.",
      desc2Prefix: "Atualmente focado em criar experiências digitais que combinam",
      perf: "performance",
      ux: "usabilidade",
      clean: "código limpo",
      ctaProjects: "Ver Projetos",
      ctaContact: "Entre em Contato",
    },
    about: {
      title: "Sobre Mim",
      p1:
        "Sou um desenvolvedor Full Stack apaixonado por criar soluções digitais que resolvem problemas reais. Minha jornada na programação começou há alguns anos, e desde então venho construindo aplicações web escaláveis e APIs robustas. Também desenvolvo automações e chatbots para otimizar processos e atendimento.",
      p2:
        "Atualmente, estou focado em aprimorar minhas habilidades em arquitetura de software e boas práticas de desenvolvimento. Acredito que código limpo e documentação clara são tão importantes quanto a funcionalidade em si.",
      p3:
        "Quando não estou codando, você pode me encontrar explorando novas tecnologias, contribuindo com projetos open source ou compartilhando conhecimento com a comunidade dev.",
      photoAlt: "Foto de Wendel Campos Bezerra",
    },
    skills: {
      title: "Skills & Tecnologias",
      categories: {
        backend: "Back-end",
        frontend: "Front-end",
        database: "Banco de Dados",
        devops: "DevOps & Ferramentas",
      },
    },
    projects: {
      title: "Projetos Recentes",
      featured: "Projeto em Destaque",
      role: "Meu papel:",
      preview: "Preview do Projeto",
      clickToVisit: "Clique para visitar o site",
      visitSite: "Visitar Site",
      ariaViewCode: "Ver código no GitHub",
      ariaViewLive: "Ver demo ao vivo",
      ariaViewCodeShort: "Ver código",
      ariaViewDemoShort: "Ver demo",
      otherTitle: "Outros Projetos Relevantes",
      moreOnGithub: "Ver mais no GitHub",
      items: {
        ajb: {
          title: "Site de Advocacia AJB",
          description:
            "Portfólio profissional desenvolvido para escritório de advocacia, apresentando serviços jurídicos, área de atuação e informações de contato de forma moderna e responsiva.",
          impact: "Aumentou a presença digital e facilitou o contato de clientes",
          role:
            "Desenvolvimento full stack, criação da interface responsiva e implementação do backend para gerenciamento de conteúdo.",
        },
        facilize: {
          title: "Facilize - Plataforma de Gestão de Negócios",
          description:
            "Plataforma completa de gestão integrada que conecta prestadores de serviços aos seus clientes, oferecendo agendamentos, pagamentos e gestão financeira. Sistema completo para contadores, fisioterapeutas, médicos, psicólogos e outros profissionais autônomos.",
          impact: "Conectando prestadores a clientes com tecnologia de ponta, já com +100 beta testers ativos",
          role:
            "Desenvolvimento de funcionalidades de criação de produtos e integração financeira, incluindo controle de estoque, gestão de receitas e despesas.",
        },
        travelTracker: {
          title: "Travel Tracker",
          description:
            "Aplicação para rastreamento de viagens e locais visitados, permitindo marcar lugares no mapa e criar memórias das suas aventuras.",
        },
        betTracker: {
          title: "Bet Tracker",
          description:
            "Sistema para acompanhamento de apostas esportivas, análise de estatísticas e gestão de resultados.",
        },
      },
    },
    contactSection: {
      kicker: "E agora?",
      title: "Vamos Conversar?",
      description:
        "Estou sempre aberto a novas oportunidades, projetos interessantes ou simplesmente trocar uma ideia sobre tecnologia. Minha inbox está sempre aberta — seja para uma proposta de trabalho ou apenas para dizer \"oi\"!",
      cta: "Enviar Email",
    },
    contactPage: {
      back: "Voltar",
      title: "Vamos conversar?",
      description:
        "Envie uma mensagem por aqui e eu retorno o quanto antes. Se preferir, você também pode mandar direto pelo email.",
      name: "Nome",
      email: "Email",
      subject: "Assunto (opcional)",
      message: "Mensagem",
      placeholders: {
        name: "Seu nome",
        email: "seuemail@exemplo.com",
        subject: "Ex: Orçamento / Proposta / Parceria",
        message: "Escreva sua mensagem...",
      },
      send: "Enviar mensagem",
      sending: "Enviando...",
      toastSentTitle: "Mensagem enviada",
      toastSentDesc: "Obrigado! Vou te responder o mais rápido possível.",
      toastFailTitle: "Falha ao enviar",
      toastFailDesc: "Tente novamente em instantes.",
      validation: {
        nameMin: "Informe seu nome.",
        nameMax: "Nome muito longo.",
        emailInvalid: "Email inválido.",
        emailMax: "Email muito longo.",
        subjectMax: "Assunto muito longo.",
        messageMin: "Escreva uma mensagem um pouco maior.",
        messageMax: "Mensagem muito longa.",
      },
    },
    footer: {
      rights: "Todos os direitos reservados.",
      builtWith: "Feito com React + TailwindCSS",
      developedBy: "Desenvolvido por Wendel Campos Bezerra",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      hello: "Hi, my name is",
      taglinePrefix: "I turn ideas into",
      taglineHighlight: "working code.",
      desc1:
        "Full Stack developer with experience building scalable web applications. I also build automations and chatbots to streamline processes and speed up results.",
      desc2Prefix: "Currently focused on crafting digital experiences that combine",
      perf: "performance",
      ux: "usability",
      clean: "clean code",
      ctaProjects: "View Projects",
      ctaContact: "Get in Touch",
    },
    about: {
      title: "About Me",
      p1:
        "I’m a Full Stack developer passionate about creating digital solutions that solve real problems. My programming journey started a few years ago, and since then I’ve been building scalable web apps and robust APIs. I also develop automations and chatbots to optimize processes and customer support.",
      p2:
        "Right now, I’m focused on improving my software architecture skills and development best practices. I believe clean code and clear documentation are just as important as functionality.",
      p3:
        "When I’m not coding, you’ll find me exploring new technologies, contributing to open source projects, or sharing knowledge with the dev community.",
      photoAlt: "Photo of Wendel Campos Bezerra",
    },
    skills: {
      title: "Skills & Technologies",
      categories: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Database",
        devops: "DevOps & Tools",
      },
    },
    projects: {
      title: "Recent Projects",
      featured: "Featured Project",
      role: "My role:",
      preview: "Project preview",
      clickToVisit: "Click to visit the website",
      visitSite: "Visit site",
      ariaViewCode: "View code on GitHub",
      ariaViewLive: "View live demo",
      ariaViewCodeShort: "View code",
      ariaViewDemoShort: "View demo",
      otherTitle: "Other Relevant Projects",
      moreOnGithub: "See more on GitHub",
      items: {
        ajb: {
          title: "AJB Law Firm Website",
          description:
            "A professional website built for a law firm, showcasing legal services, practice areas, and contact information in a modern, responsive layout.",
          impact: "Improved online presence and made it easier for clients to get in touch",
          role:
            "Full-stack development, responsive UI implementation, and backend setup for content management.",
        },
        facilize: {
          title: "Facilize — Business Management Platform",
          description:
            "An integrated management platform connecting service providers and clients, offering scheduling, payments, and financial management. Built for accountants, physiotherapists, doctors, psychologists, and other independent professionals.",
          impact: "Connecting providers and clients with cutting-edge tech, with 100+ active beta testers",
          role:
            "Built product creation features and financial integrations, including inventory control and income/expense management.",
        },
        travelTracker: {
          title: "Travel Tracker",
          description:
            "An app to track trips and visited places, letting users pin locations on a map and create memories of their adventures.",
        },
        betTracker: {
          title: "Bet Tracker",
          description:
            "A system to track sports bets, analyze statistics, and manage results.",
        },
      },
    },
    contactSection: {
      kicker: "What’s next?",
      title: "Let’s talk",
      description:
        "I’m always open to new opportunities, interesting projects, or just chatting about tech. My inbox is always open — whether it’s a job offer or just to say hi!",
      cta: "Send Email",
    },
    contactPage: {
      back: "Back",
      title: "Let’s talk",
      description: "Send a message here and I’ll get back to you soon. If you prefer, you can email me directly.",
      name: "Name",
      email: "Email",
      subject: "Subject (optional)",
      message: "Message",
      placeholders: {
        name: "Your name",
        email: "you@example.com",
        subject: "E.g. Quote / Proposal / Partnership",
        message: "Write your message...",
      },
      send: "Send message",
      sending: "Sending...",
      toastSentTitle: "Message sent",
      toastSentDesc: "Thanks! I’ll reply as soon as possible.",
      toastFailTitle: "Send failed",
      toastFailDesc: "Please try again in a moment.",
      validation: {
        nameMin: "Please enter your name.",
        nameMax: "Name is too long.",
        emailInvalid: "Invalid email.",
        emailMax: "Email is too long.",
        subjectMax: "Subject is too long.",
        messageMin: "Please write a slightly longer message.",
        messageMax: "Message is too long.",
      },
    },
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with React + TailwindCSS",
      developedBy: "Developed by Wendel Campos Bezerra",
    },
  },
  es: {
    nav: {
      about: "Sobre mí",
      skills: "Habilidades",
      projects: "Proyectos",
      contact: "Contacto",
      resume: "Currículum",
    },
    hero: {
      hello: "Hola, mi nombre es",
      taglinePrefix: "Convierto ideas en",
      taglineHighlight: "código funcional.",
      desc1:
        "Desarrollador Full Stack con experiencia construyendo aplicaciones web escalables. También creo automatizaciones y chatbots para optimizar procesos y acelerar resultados.",
      desc2Prefix: "Actualmente enfocado en crear experiencias digitales que combinan",
      perf: "rendimiento",
      ux: "usabilidad",
      clean: "código limpio",
      ctaProjects: "Ver Proyectos",
      ctaContact: "Contactar",
    },
    about: {
      title: "Sobre mí",
      p1:
        "Soy un desarrollador Full Stack apasionado por crear soluciones digitales que resuelven problemas reales. Mi camino en la programación comenzó hace algunos años y desde entonces he construido aplicaciones web escalables y APIs robustas. También desarrollo automatizaciones y chatbots para optimizar procesos y atención.",
      p2:
        "Ahora mismo estoy enfocado en mejorar mis habilidades de arquitectura de software y buenas prácticas de desarrollo. Creo que el código limpio y una documentación clara son tan importantes como la funcionalidad.",
      p3:
        "Cuando no estoy programando, me encontrarás explorando nuevas tecnologías, contribuyendo a proyectos open source o compartiendo conocimiento con la comunidad dev.",
      photoAlt: "Foto de Wendel Campos Bezerra",
    },
    skills: {
      title: "Habilidades & Tecnologías",
      categories: {
        backend: "Back-end",
        frontend: "Front-end",
        database: "Base de datos",
        devops: "DevOps & Herramientas",
      },
    },
    projects: {
      title: "Proyectos Recientes",
      featured: "Proyecto Destacado",
      role: "Mi rol:",
      preview: "Vista previa del proyecto",
      clickToVisit: "Haz clic para visitar el sitio",
      visitSite: "Visitar sitio",
      ariaViewCode: "Ver código en GitHub",
      ariaViewLive: "Ver demo en vivo",
      ariaViewCodeShort: "Ver código",
      ariaViewDemoShort: "Ver demo",
      otherTitle: "Otros Proyectos Relevantes",
      moreOnGithub: "Ver más en GitHub",
      items: {
        ajb: {
          title: "Sitio web del Estudio Jurídico AJB",
          description:
            "Sitio profesional para un estudio jurídico, presentando servicios legales, áreas de práctica e información de contacto en un diseño moderno y adaptable.",
          impact: "Mejoró la presencia digital y facilitó el contacto de clientes",
          role:
            "Desarrollo full stack, implementación de UI responsive y backend para gestión de contenido.",
        },
        facilize: {
          title: "Facilize — Plataforma de Gestión de Negocios",
          description:
            "Plataforma de gestión integrada que conecta prestadores de servicios con sus clientes, ofreciendo reservas, pagos y gestión financiera. Hecha para contadores, fisioterapeutas, médicos, psicólogos y otros profesionales independientes.",
          impact: "Conectando profesionales y clientes con tecnología de punta, con +100 beta testers activos",
          role:
            "Desarrollo de funcionalidades de creación de productos e integraciones financieras, incluyendo control de stock y gestión de ingresos/gastos.",
        },
        travelTracker: {
          title: "Travel Tracker",
          description:
            "Aplicación para registrar viajes y lugares visitados, permitiendo marcar puntos en el mapa y guardar recuerdos de tus aventuras.",
        },
        betTracker: {
          title: "Bet Tracker",
          description:
            "Sistema para seguimiento de apuestas deportivas, análisis de estadísticas y gestión de resultados.",
        },
      },
    },
    contactSection: {
      kicker: "¿Y ahora?",
      title: "¿Hablamos?",
      description:
        "Siempre estoy abierto a nuevas oportunidades, proyectos interesantes o simplemente charlar sobre tecnología. Mi bandeja de entrada está abierta — ya sea para una propuesta de trabajo o solo para decir “hola”.",
      cta: "Enviar email",
    },
    contactPage: {
      back: "Volver",
      title: "Hablemos",
      description:
        "Envíame un mensaje por aquí y te responderé lo antes posible. Si lo prefieres, también puedes escribirme directamente por email.",
      name: "Nombre",
      email: "Email",
      subject: "Asunto (opcional)",
      message: "Mensaje",
      placeholders: {
        name: "Tu nombre",
        email: "tuemail@ejemplo.com",
        subject: "Ej: Presupuesto / Propuesta / Colaboración",
        message: "Escribe tu mensaje...",
      },
      send: "Enviar mensaje",
      sending: "Enviando...",
      toastSentTitle: "Mensaje enviado",
      toastSentDesc: "¡Gracias! Te responderé lo antes posible.",
      toastFailTitle: "Error al enviar",
      toastFailDesc: "Inténtalo de nuevo en un momento.",
      validation: {
        nameMin: "Por favor, ingresa tu nombre.",
        nameMax: "El nombre es demasiado largo.",
        emailInvalid: "Email inválido.",
        emailMax: "El email es demasiado largo.",
        subjectMax: "El asunto es demasiado largo.",
        messageMin: "Por favor, escribe un mensaje un poco más largo.",
        messageMax: "El mensaje es demasiado largo.",
      },
    },
    footer: {
      rights: "Todos los derechos reservados.",
      builtWith: "Hecho con React + TailwindCSS",
      developedBy: "Desarrollado por Wendel Campos Bezerra",
    },
  },
} as const;

