export type Lang = "pt" | "en" | "es";

export const translations = {
  pt: {
    meta: {
      role: "full stack developer",
      location: "BR · GMT-3",
      punchHint: "role ou clique no lutador",
      fighterLabel: "Lutador: dar um jab no nome e ir para a próxima seção",
      copy: "copiar",
      copied: "copiado ✓",
      copyAria: "Copiar e-mail",
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
      p1Prefix: "Sou desenvolvedor Full Stack e engenheiro de automação, apaixonado por criar ",
      p1Highlight: "soluções digitais que resolvem problemas reais",
      p1Suffix:
        ". Gosto de entender o problema de ponta a ponta, do banco de dados à interface, sempre com foco em arquitetura de software e código limpo.",
      servicesTitle: "O que eu faço",
      services: {
        sites: {
          title: "Criação de sites",
          desc: "Landing pages, sites institucionais e sistemas web rápidos, responsivos e feitos para converter.",
        },
        chatbots: {
          title: "Chatbots",
          desc: "Atendimento automatizado no WhatsApp e na web, integrado aos sistemas da empresa e funcionando 24h.",
        },
        rag: {
          title: "RAG aplicado",
          desc: "IA que responde com base nos documentos e dados da sua empresa, com respostas confiáveis e fontes citadas.",
        },
      },
      personalTitle: "Fora do código",
      personal: {
        agePre: "Tenho ",
        ageHl: "22 anos",
        agePost: " e estou no último semestre de Engenharia de Software.",
        dogPre: "Meu maior amor é o ",
        dogHl: "Luffy",
        dogPost: ", meu cachorro.",
        boxPre: "E o ",
        boxHl: "boxe mudou a minha vida",
        boxPost:
          ": me ensinou disciplina, constância e a levantar depois de cada queda. É dele que vem o lutador que você viu lá em cima.",
      },
      resumeTitle: "Currículo",
      tabs: {
        experience: "Experiência",
        education: "Formação",
      },
      present: "atual",
      promoted: "promovido",
      fullResume: "Currículo completo",
      jobs: {
        gpEngineer: "Engenheiro II · Automação de Projetos",
        gpIntern: "Estagiário de Desenvolvimento",
        facilize: "Desenvolvedor Full Stack · Freelancer",
      },
      education: {
        degree: "Engenharia de Software",
        status: "Bacharelado · jul. 2022 — dez. 2026 (previsão)",
        school: "Universidade Católica do Salvador (UCSAL)",
        certTitle: "Residência em Software: Cloud Computing (AWS + Azure)",
        certMeta: "CEPEDI · 300h · jul. — dez. 2024",
      },
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
        oss: "Contribuição",
      },
      items: {
        botCrossing: {
          title: "Bot Crossing",
          description:
            "Contribuição open source num jogo para agentes de IA: fiz a parte de Windows de abrir uma conversa no lugar certo. Se ela já está num terminal, a janela é trazida para a frente, subindo pela árvore de processos; se não, abre um terminal novo (Windows Terminal, com cmd.exe de reserva). Tudo via PowerShell codificado e argv validado, sem nenhuma string de shell.",
        },
        imperio: {
          title: "Império do Samba",
          description:
            "Landing page do Império do Samba, bar de pagode em Salvador: programação do Soft Open, contagem regressiva para a abertura e confirmação de presença direto pelo WhatsApp.",
        },
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
            "Site institucional para escritório de advocacia: serviços, áreas de atuação e contato, moderno e responsivo.",
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
      sent: "Enviado ✓",
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
      punchHint: "scroll or click the fighter",
      fighterLabel: "Fighter: throw a jab at the name and go to the next section",
      copy: "copy",
      copied: "copied ✓",
      copyAria: "Copy email",
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
      p1Prefix: "I’m a Full Stack developer and automation engineer, passionate about building ",
      p1Highlight: "digital solutions that solve real problems",
      p1Suffix:
        ". I like understanding a problem end to end, from the database to the interface, always focused on software architecture and clean code.",
      servicesTitle: "What I do",
      services: {
        sites: {
          title: "Websites",
          desc: "Landing pages, company websites and web systems that are fast, responsive and built to convert.",
        },
        chatbots: {
          title: "Chatbots",
          desc: "Automated support on WhatsApp and the web, integrated with the company’s systems and running 24/7.",
        },
        rag: {
          title: "Applied RAG",
          desc: "AI that answers from your company’s own documents and data, with reliable answers and cited sources.",
        },
      },
      personalTitle: "Outside the code",
      personal: {
        agePre: "I’m ",
        ageHl: "22 years old",
        agePost: " and in the final semester of my Software Engineering degree.",
        dogPre: "My greatest love is ",
        dogHl: "Luffy",
        dogPost: ", my dog.",
        boxPre: "And ",
        boxHl: "boxing changed my life",
        boxPost:
          ": it taught me discipline, consistency and how to get back up after every fall. That’s where the fighter you saw up top comes from.",
      },
      resumeTitle: "Résumé",
      tabs: {
        experience: "Experience",
        education: "Education",
      },
      present: "present",
      promoted: "promoted",
      fullResume: "Full résumé",
      jobs: {
        gpEngineer: "Engineer II · Project Automation",
        gpIntern: "Development Intern",
        facilize: "Full Stack Developer · Freelance",
      },
      education: {
        degree: "Software Engineering",
        status: "Bachelor’s · Jul 2022 — Dec 2026 (expected)",
        school: "Catholic University of Salvador (UCSAL)",
        certTitle: "Software Residency: Cloud Computing (AWS + Azure)",
        certMeta: "CEPEDI · 300h · Jul — Dec 2024",
      },
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
        oss: "Contribution",
      },
      items: {
        botCrossing: {
          title: "Bot Crossing",
          description:
            "Open source contribution to a video game for AI agents: I built the Windows side of opening a thread in the right place. If it already lives in a terminal, its window is brought to the front by walking up the process tree; if not, a new terminal opens (Windows Terminal, with cmd.exe as fallback). All through encoded PowerShell and a validated argv, with no shell string parsed anywhere.",
        },
        imperio: {
          title: "Império do Samba",
          description:
            "Landing page for Império do Samba, a pagode bar in Salvador: Soft Open lineup, opening countdown and RSVP straight through WhatsApp.",
        },
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
            "Institutional website for a law firm: services, practice areas, and contact, modern and responsive.",
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
      sent: "Sent ✓",
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
      punchHint: "desplázate o haz clic en el boxeador",
      fighterLabel: "Boxeador: lanzar un jab al nombre e ir a la siguiente sección",
      copy: "copiar",
      copied: "copiado ✓",
      copyAria: "Copiar correo",
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
      p1Prefix: "Soy desarrollador Full Stack e ingeniero de automatización, apasionado por crear ",
      p1Highlight: "soluciones digitales que resuelven problemas reales",
      p1Suffix:
        ". Me gusta entender el problema de punta a punta, de la base de datos a la interfaz, siempre con foco en arquitectura de software y código limpio.",
      servicesTitle: "Lo que hago",
      services: {
        sites: {
          title: "Creación de sitios web",
          desc: "Landing pages, sitios institucionales y sistemas web rápidos, responsivos y pensados para convertir.",
        },
        chatbots: {
          title: "Chatbots",
          desc: "Atención automatizada en WhatsApp y en la web, integrada a los sistemas de la empresa y funcionando 24h.",
        },
        rag: {
          title: "RAG aplicado",
          desc: "IA que responde con base en los documentos y datos de tu empresa, con respuestas confiables y fuentes citadas.",
        },
      },
      personalTitle: "Fuera del código",
      personal: {
        agePre: "Tengo ",
        ageHl: "22 años",
        agePost: " y estoy en el último semestre de Ingeniería de Software.",
        dogPre: "Mi mayor amor es ",
        dogHl: "Luffy",
        dogPost: ", mi perro.",
        boxPre: "Y el ",
        boxHl: "boxeo cambió mi vida",
        boxPost:
          ": me enseñó disciplina, constancia y a levantarme después de cada caída. De ahí viene el boxeador que viste allá arriba.",
      },
      resumeTitle: "Currículum",
      tabs: {
        experience: "Experiencia",
        education: "Formación",
      },
      present: "actual",
      promoted: "ascendido",
      fullResume: "Currículum completo",
      jobs: {
        gpEngineer: "Ingeniero II · Automatización de Proyectos",
        gpIntern: "Pasante de Desarrollo",
        facilize: "Desarrollador Full Stack · Freelance",
      },
      education: {
        degree: "Ingeniería de Software",
        status: "Grado · jul. 2022 — dic. 2026 (previsto)",
        school: "Universidad Católica de Salvador (UCSAL)",
        certTitle: "Residencia en Software: Cloud Computing (AWS + Azure)",
        certMeta: "CEPEDI · 300h · jul. — dic. 2024",
      },
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
        oss: "Contribución",
      },
      items: {
        botCrossing: {
          title: "Bot Crossing",
          description:
            "Contribución open source a un videojuego para agentes de IA: hice la parte de Windows de abrir una conversación en el lugar correcto. Si ya está en una terminal, su ventana pasa al frente recorriendo el árbol de procesos; si no, se abre una terminal nueva (Windows Terminal, con cmd.exe de respaldo). Todo vía PowerShell codificado y argv validado, sin interpretar ningún string de shell.",
        },
        imperio: {
          title: "Império do Samba",
          description:
            "Landing page de Império do Samba, bar de pagode en Salvador: programación del Soft Open, cuenta regresiva para la apertura y confirmación de asistencia directo por WhatsApp.",
        },
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
            "Sitio institucional para un estudio jurídico: servicios, áreas de práctica y contacto, moderno y adaptable.",
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
      sent: "Enviado ✓",
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
