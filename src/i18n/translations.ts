export type Lang = "pt" | "en" | "es";

export const translations = {
  pt: {
    meta: {
      role: "full stack developer",
      location: "BR · GMT-3",
    },
    nav: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
      resume: "Currículo",
      back: "Voltar",
      home: "Ir para o início",
      langAria: "Idioma atual: Português. Clique para trocar.",
    },
    about: {
      title: "Sobre",
      p1Prefix: "Sou um desenvolvedor Full Stack apaixonado por criar ",
      p1Highlight: "soluções digitais que resolvem problemas reais",
      p1Suffix:
        ". Minha jornada na programação começou há alguns anos, e desde então venho construindo aplicações web escaláveis e APIs robustas — além de automações e chatbots para otimizar processos e atendimento.",
      p2Prefix: "Atualmente, estou focado em aprimorar minhas habilidades em ",
      p2Highlight: "arquitetura de software",
      p2Suffix:
        " e boas práticas. Acredito que código limpo e documentação clara são tão importantes quanto a funcionalidade em si.",
      p3: "Fora do código: explorando novas tecnologias, contribuindo com open source e compartilhando conhecimento com a comunidade dev.",
      stackTitle: "Stack",
      contactTitle: "Contato",
      stack: {
        backend: "back-end",
        frontend: "front-end",
        database: "banco de dados",
        devops: "devops & ferramentas",
      },
    },
    projects: {
      title: "Projetos",
      moreOnGithub: "Ver mais no GitHub",
      kinds: {
        site: "Site",
        code: "Código",
      },
      items: {
        despesas: {
          title: "Saldo",
          description:
            "App de finanças pessoais: dashboard, despesas por categoria, controle de investimentos, relatórios em gráfico e exportação dos dados.",
        },
        facilize: {
          title: "Facilize",
          description:
            "Plataforma de gestão integrada que conecta prestadores de serviços a clientes: agendamentos, pagamentos e gestão financeira. +100 beta testers ativos.",
        },
        ajb: {
          title: "Advocacia AJB",
          description:
            "Site institucional para escritório de advocacia — serviços, áreas de atuação e contato, moderno e responsivo.",
        },
        travelTracker: {
          title: "Travel Tracker",
          description: "Rastreamento de viagens e locais visitados, com marcação de lugares no mapa.",
        },
        betTracker: {
          title: "Bet Tracker",
          description: "Acompanhamento de apostas esportivas, estatísticas e gestão de resultados.",
        },
      },
    },
    contactPage: {
      title: "Contato",
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
      captchaMissingKey: "Captcha não configurado. Defina VITE_TURNSTILE_SITE_KEY no ambiente.",
      captchaLoadError: "Não foi possível carregar o captcha. Verifique domínio permitido, rede e bloqueadores.",
      captchaPending: "Confirme o captcha antes de enviar.",
      captchaInlineError: "Erro ao carregar captcha. Confirme se o domínio atual foi adicionado no Turnstile.",
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
    notFound: {
      title: "Página não encontrada",
      description: "O endereço acessado não existe ou foi movido.",
      back: "Voltar ao início",
    },
    footer: {
      copyright: "© {year} wendel bezerra",
    },
  },
  en: {
    meta: {
      role: "full stack developer",
      location: "BR · GMT-3",
    },
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
      back: "Back",
      home: "Go to home",
      langAria: "Current language: English. Click to switch.",
    },
    about: {
      title: "About",
      p1Prefix: "I’m a Full Stack developer passionate about building ",
      p1Highlight: "digital solutions that solve real problems",
      p1Suffix:
        ". My programming journey started a few years ago, and since then I’ve been building scalable web apps and robust APIs — plus automations and chatbots to streamline processes and customer support.",
      p2Prefix: "Right now, I’m focused on sharpening my skills in ",
      p2Highlight: "software architecture",
      p2Suffix:
        " and best practices. I believe clean code and clear documentation matter as much as the functionality itself.",
      p3: "Outside the code: exploring new technologies, contributing to open source, and sharing knowledge with the dev community.",
      stackTitle: "Stack",
      contactTitle: "Contact",
      stack: {
        backend: "back-end",
        frontend: "front-end",
        database: "database",
        devops: "devops & tools",
      },
    },
    projects: {
      title: "Projects",
      moreOnGithub: "See more on GitHub",
      kinds: {
        site: "Site",
        code: "Code",
      },
      items: {
        despesas: {
          title: "Saldo",
          description:
            "Personal finance app: dashboard, expenses by category, investment tracking, chart-based reports, and data export.",
        },
        facilize: {
          title: "Facilize",
          description:
            "Integrated management platform connecting service providers to clients: scheduling, payments, and financial management. 100+ active beta testers.",
        },
        ajb: {
          title: "AJB Law Firm",
          description:
            "Institutional website for a law firm — services, practice areas, and contact, modern and responsive.",
        },
        travelTracker: {
          title: "Travel Tracker",
          description: "Tracks trips and visited places, pinning locations on a map.",
        },
        betTracker: {
          title: "Bet Tracker",
          description: "Tracks sports bets, statistics, and results management.",
        },
      },
    },
    contactPage: {
      title: "Contact",
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
      captchaMissingKey: "Captcha is not configured. Set VITE_TURNSTILE_SITE_KEY in the environment.",
      captchaLoadError: "Could not load the captcha. Check the allowed domain, your network, and blockers.",
      captchaPending: "Please complete the captcha before sending.",
      captchaInlineError: "Failed to load the captcha. Make sure this domain is allowed in Turnstile.",
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
    notFound: {
      title: "Page not found",
      description: "This address doesn’t exist or has been moved.",
      back: "Back to home",
    },
    footer: {
      copyright: "© {year} wendel bezerra",
    },
  },
  es: {
    meta: {
      role: "full stack developer",
      location: "BR · GMT-3",
    },
    nav: {
      about: "Sobre mí",
      projects: "Proyectos",
      contact: "Contacto",
      resume: "Currículum",
      back: "Volver",
      home: "Ir al inicio",
      langAria: "Idioma actual: Español. Haz clic para cambiar.",
    },
    about: {
      title: "Sobre mí",
      p1Prefix: "Soy un desarrollador Full Stack apasionado por crear ",
      p1Highlight: "soluciones digitales que resuelven problemas reales",
      p1Suffix:
        ". Mi camino en la programación comenzó hace algunos años y desde entonces construyo aplicaciones web escalables y APIs robustas — además de automatizaciones y chatbots para optimizar procesos y atención.",
      p2Prefix: "Actualmente estoy enfocado en mejorar mis habilidades en ",
      p2Highlight: "arquitectura de software",
      p2Suffix:
        " y buenas prácticas. Creo que el código limpio y la documentación clara son tan importantes como la funcionalidad.",
      p3: "Fuera del código: explorando nuevas tecnologías, contribuyendo al open source y compartiendo conocimiento con la comunidad dev.",
      stackTitle: "Stack",
      contactTitle: "Contacto",
      stack: {
        backend: "back-end",
        frontend: "front-end",
        database: "base de datos",
        devops: "devops & herramientas",
      },
    },
    projects: {
      title: "Proyectos",
      moreOnGithub: "Ver más en GitHub",
      kinds: {
        site: "Sitio",
        code: "Código",
      },
      items: {
        despesas: {
          title: "Saldo",
          description:
            "App de finanzas personales: dashboard, gastos por categoría, control de inversiones, informes con gráficos y exportación de datos.",
        },
        facilize: {
          title: "Facilize",
          description:
            "Plataforma de gestión integrada que conecta prestadores de servicios con clientes: reservas, pagos y gestión financiera. +100 beta testers activos.",
        },
        ajb: {
          title: "Abogacía AJB",
          description:
            "Sitio institucional para un estudio jurídico — servicios, áreas de práctica y contacto, moderno y adaptable.",
        },
        travelTracker: {
          title: "Travel Tracker",
          description: "Registro de viajes y lugares visitados, marcando puntos en el mapa.",
        },
        betTracker: {
          title: "Bet Tracker",
          description: "Seguimiento de apuestas deportivas, estadísticas y gestión de resultados.",
        },
      },
    },
    contactPage: {
      title: "Contacto",
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
      captchaMissingKey: "Captcha no configurado. Define VITE_TURNSTILE_SITE_KEY en el entorno.",
      captchaLoadError: "No se pudo cargar el captcha. Revisa el dominio permitido, la red y los bloqueadores.",
      captchaPending: "Completa el captcha antes de enviar.",
      captchaInlineError: "Error al cargar el captcha. Confirma que este dominio esté permitido en Turnstile.",
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
    notFound: {
      title: "Página no encontrada",
      description: "La dirección no existe o fue movida.",
      back: "Volver al inicio",
    },
    footer: {
      copyright: "© {year} wendel bezerra",
    },
  },
} as const;
