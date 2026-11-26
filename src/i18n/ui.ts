import type { Locale } from "./index";

/* Los textos de la interfaz (los que no son datos de un proyecto, un empleo o el stack: esos viven en src/data y su
   espejo en inglés en src/data/en). El español es la forma; el inglés tiene que tener las mismas claves. Una frase con
   un pedazo en negrita va como [antes, negrita, después]. */
const es = {
  meta: {
    title: "José Martin Flores | Software Engineer",
    description: "Software Engineer en Naranja X. Backend, integraciones y automatización con IA, con tres proyectos en detalle: Envo, Stockie y Club Zapateo.",
    caseTitle: (name: string) => `${name} | José Martin Flores`,
    ogAlt: "José Martin Flores, Software Engineer. Más de siete años en software. Desarrollo sistemas para empresas y productos propios.",
    knowsAbout: ["Backend", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Integraciones", "Automatización con IA"],
  },
  tagline: "Backend, integraciones y automatización. Más de siete años en software. Desarrollo sistemas para empresas y productos propios.",
  footerLede: "Backend, integraciones y automatización.",
  whatsappMessage: "Hola José, vi tu portafolio.",
  nav: {
    projects: "Proyectos", experience: "Experiencia", stack: "Stack", contact: "Contacto",
    skip: "Ir al contenido", main: "Principal", menu: "Abrir el menú",
    /** el link al otro idioma: lo que se ve en la barra, lo que se ve en el menú del teléfono y su nombre completo */
    langShort: "EN", langLong: "English", langCode: "en",
    themeToLight: "Modo claro", themeToDark: "Modo oscuro",
    themeToLightLabel: "Cambiar a modo claro", themeToDarkLabel: "Cambiar a modo oscuro",
  },
  cv: "Descargar el CV (PDF)",
  hero: {
    seeProjects: "Ver los proyectos",
    /** la frase junto al apellido (la primera oración de `tagline` ya está en "Trabajo en") */
    claim: "Más de siete años en software. Desarrollo sistemas para empresas y productos propios.",
    /** la fila de datos: el rótulo chico y su dato ("Hoy": el rol, sin el seniority, y la empresa de jobs[0]) */
    metas: {
      now: "Hoy", nowValue: (company: string) => `Software Engineer en ${company.replace(" ", "\u00a0")}, en automatización con IA`, build: "Trabajo en", buildValue: "Backend, integraciones y automatización",
      since: "Desde", sinceValue: "2019 en QA, 2020 en banca y fintech", write: "Escribime", email: "Email",
    },
    /** el rótulo de la captura de Envo que asoma al pie de la entrada */
    bandLabel: "Envo · panel de operación",
  },
  statement: {
    title: "Qué hago",
    line: "Soy Software Engineer en Naranja X. Antes trabajé siete años en QA, la mayor parte en banca y fintech.",
    proof: [
      ["Backend", "Servicios con TypeScript, Node.js y NestJS, sobre PostgreSQL y Kafka."],
      ["Integraciones", "APIs REST, webhooks y plataformas como Mercado Pago, Telegram y WhatsApp."],
      ["Automatización con IA", "Agentes y sistemas multiagente con n8n y LangGraph, y pipelines de RAG."],
      ["Calidad", "Pruebas end-to-end con Playwright, de API, de carga y de rendimiento."],
    ] as [string, string][],
  },
  projects: {
    title: "Proyectos",
    lead: "Dos productos propios, cuatro proyectos para clientes y uno personal.",
    seeCase: "Ver el detalle", seeCaseOf: (name: string) => ` de ${name}`,
    relatedCase: "Su sistema dio origen a",
  },
  tags: { client: "Cliente", product: "Producto propio", personal: "Personal" },
  experience: {
    title: "Experiencia", lead: "De QA a Software Engineer, en banca y fintech desde 2020.", education: "Formación",
    months: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"], present: "hoy",
  },
  stack: { title: "Stack", lead: "Tecnologías que uso en Naranja X y en estos proyectos." },
  contact: {
    title: "Contacto",
    lead: "Buenos Aires (GMT-3). Español nativo e inglés intermedio. Podés escribirme por email o LinkedIn.",
    caseLead: (name: string) => `Para conversar sobre ${name}, podés escribirme por email.`,
    home: "Inicio", contact: "Contacto", cases: "Otros proyectos", backHome: "Volver al inicio", next: (name: string) => `Siguiente proyecto: ${name}`,
    legal: "Los nombres y logos de productos son marcas de sus dueños.",
    copy: "Copiar el email", copied: "Copiado", copiedStatus: "Email copiado", copyFailed: "No se pudo copiar",
  },
  sheet: { architecture: "Arquitectura", stack: "Stack", practices: "Prácticas", patterns: "Patrones", parts: "Partes", focus: "Enfoque", role: "Mi rol", period: "Cuándo", standing: "Estado", result: "Resultado" },
  case: {
    nav: [["Problema", "#problema"], ["Pantallas", "#pantallas"], ["Arquitectura", "#arquitectura"], ["Decisiones", "#decisiones"], ["Ficha", "#ficha"]] as [string, string][],
    and: "y",
    parts: "Partes del sistema",
    openDemo: "Abrir la demo", seeArchitecture: "Ver la arquitectura",
    code: "El código es privado; lo muestro en una llamada.",
    collage: (name: string, roles: string) => `Pantallas de ${name} por rol: ${roles}`,
    problem: "El problema", screens: "Pantallas por rol", architecture: "Arquitectura", decisions: "Decisiones técnicas",
    quality: "Calidad y evidencia", sheet: "Ficha técnica",
    /** en un teléfono, el botón que abre una captura entera ("Ampliar: Alertas y salud") y el que la cierra */
    zoom: "Ampliar", zoomClose: "Cerrar la captura",
  },
  notFound: {
    title: "Página no encontrada | José Martin Flores",
    heading: "Página no encontrada",
    text: "La dirección no existe o cambió. En el inicio están todos los proyectos.",
    back: "Volver al inicio",
  },
};

export type Ui = typeof es;

const en: Ui = {
  meta: {
    title: "José Martin Flores | Software Engineer",
    description: "Software Engineer at Naranja X. Backend, integrations and AI automation, with three case studies: Envo, Stockie and Club Zapateo.",
    caseTitle: (name: string) => `${name}: case study | José Martin Flores`,
    ogAlt: "José Martin Flores, Software Engineer. More than seven years in software. I build systems for companies and products of my own.",
    knowsAbout: ["Backend", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Integrations", "AI automation"],
  },
  tagline: "Backend, integrations and automation. More than seven years in software. I build systems for companies and products of my own.",
  footerLede: "Backend, integrations and automation.",
  whatsappMessage: "Hi José, I saw your portfolio.",
  nav: {
    projects: "Projects", experience: "Experience", stack: "Stack", contact: "Contact",
    skip: "Skip to content", main: "Main", menu: "Open menu",
    langShort: "ES", langLong: "Español", langCode: "es",
    themeToLight: "Light mode", themeToDark: "Dark mode",
    themeToLightLabel: "Switch to light mode", themeToDarkLabel: "Switch to dark mode",
  },
  cv: "Download CV (PDF)",
  hero: {
    seeProjects: "View projects",
    claim: "More than seven years in software. I build systems for companies and products of my own.",
    metas: {
      now: "Now", nowValue: (company: string) => `Software Engineer at ${company.replace(" ", "\u00a0")}, in AI automation`, build: "I work on", buildValue: "Backend, integrations and automation",
      since: "Since", sinceValue: "2019 in QA, 2020 in banking and fintech", write: "Get in touch", email: "Email",
    },
    bandLabel: "Envo · operations dashboard",
  },
  statement: {
    title: "What I do",
    line: "I'm a software engineer at Naranja X. Before that, I worked in QA for seven years, mostly in banking and fintech.",
    proof: [
      ["Backend", "Services with TypeScript, Node.js and NestJS, on PostgreSQL and Kafka."],
      ["Integrations", "REST APIs, webhooks and platforms such as Mercado Pago, Telegram and WhatsApp."],
      ["AI automation", "Agents and multi-agent systems with n8n and LangGraph, and RAG pipelines."],
      ["Quality", "End-to-end testing with Playwright, plus API, load and performance testing."],
    ],
  },
  projects: {
    title: "Projects",
    lead: "Two products of my own, four client projects and one personal project. Screenshots are in Spanish.",
    seeCase: "Read the case study", seeCaseOf: (name: string) => ` on ${name}`,
    relatedCase: "Their inventory system led to",
  },
  tags: { client: "Client", product: "Own product", personal: "Personal" },
  experience: {
    title: "Experience", lead: "From QA to Software Engineer, in banking and fintech since 2020.", education: "Education",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], present: "present",
  },
  stack: { title: "Stack", lead: "Technologies I use at Naranja X and in these projects." },
  contact: {
    title: "Contact",
    lead: "Buenos Aires (GMT-3). Native Spanish and intermediate English. You can reach me by email or on LinkedIn.",
    caseLead: (name: string) => `To talk about ${name}, you can reach me by email.`,
    home: "Home", contact: "Contact", cases: "Case studies", backHome: "Back to home", next: (name: string) => `Next case study: ${name}`,
    legal: "Product names and logos are trademarks of their owners.",
    copy: "Copy email", copied: "Copied", copiedStatus: "Email copied", copyFailed: "Couldn't copy",
  },
  sheet: { architecture: "Architecture", stack: "Stack", practices: "Practices", patterns: "Patterns", parts: "Components", focus: "Focus areas", role: "My role", period: "When", standing: "Status", result: "Result" },
  case: {
    nav: [["Problem", "#problema"], ["Screens", "#pantallas"], ["Architecture", "#arquitectura"], ["Decisions", "#decisiones"], ["Summary", "#ficha"]],
    and: "and",
    parts: "System components",
    openDemo: "Open the demo", seeArchitecture: "See the architecture",
    code: "The code is private; I can walk you through it on a call.",
    collage: (name: string, roles: string) => `${name} screens by role: ${roles}`,
    problem: "The problem", screens: "Screens by role", architecture: "Architecture", decisions: "Technical decisions",
    quality: "Quality and evidence", sheet: "Tech summary",
    zoom: "Enlarge", zoomClose: "Close the screenshot",
  },
  notFound: {
    title: "Page not found | José Martin Flores",
    heading: "Page not found",
    text: "This page doesn't exist or has moved. The home page has the three case studies: Envo, Stockie and Club Zapateo.",
    back: "Back to home",
  },
};

export const ui: Record<Locale, Ui> = { es, en };
