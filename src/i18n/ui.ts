import type { Locale } from "./index";

/* Los textos de la interfaz (los que no son datos de un proyecto, un empleo o el stack: esos viven en src/data y su
   espejo en inglés en src/data/en). El español es la forma; el inglés tiene que tener las mismas claves. Una frase con
   un pedazo en negrita va como [antes, negrita, después]. */
const es = {
  meta: {
    title: "José Martin Flores | Software Engineer",
    description: "Software Engineer en Naranja X. Sistemas de pedidos, stock y pagos, con tres casos por dentro: Envo, Stockie y Club Zapateo.",
    caseTitle: (name: string) => `${name}: caso de estudio | José Martin Flores`,
    ogAlt: "José Martin Flores, Software Engineer. Hago sistemas de pedidos, stock y pagos que siguen funcionando cuando algo falla.",
    knowsAbout: ["Backend", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Integraciones", "Automatización con IA"],
  },
  tagline: "Backend, integraciones y automatización. Hago sistemas de pedidos, stock y pagos que siguen funcionando cuando algo falla.",
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
    claim: "Hago sistemas de pedidos, stock y pagos que siguen funcionando cuando algo falla.",
    /** la fila de datos: el rótulo chico y su dato ("Hoy": el rol, sin el seniority, y la empresa de jobs[0]) */
    metas: {
      now: "Hoy", nowValue: (company: string) => `Software Engineer en ${company.replace(" ", "\u00a0")}, en automatización con IA`, build: "Trabajo en", buildValue: "Backend, integraciones y automatización",
      since: "Desde", sinceValue: "2019 en QA, 2020 en banca y fintech", write: "Escribime", email: "Email",
    },
    /** el rótulo de la captura de Envo que asoma al pie de la entrada */
    bandLabel: "Envo · panel de operación",
  },
  statement: {
    title: "Empiezo por lo que puede fallar",
    line: "Empecé en QA en 2019 y hoy soy Software Engineer en Naranja X. Antes de construir algo, defino qué pasa si un mensaje no llega, si un pago entra dos veces o si un servicio se cae.",
    proof: [
      ["Ningún aviso falla en silencio", "Si Telegram no responde, Envo guarda el aviso y reintenta; si no logra entregarlo, abre una alerta."],
      ["Ninguna entrada duplicada", "En Club Zapateo, si Mercado Pago repite el aviso de un pago, la entrada se emite una sola vez."],
      ["Controles cada noche", "Envo revisa que el stock, las reservas y la caja cuadren; si algo no cierra, abre una alerta y la cierra cuando vuelve a cuadrar."],
      ["Probado con PostgreSQL real", "Las pruebas de Envo corren también contra un PostgreSQL real, no solo contra una base embebida."],
    ] as [string, string][],
  },
  projects: {
    title: "Proyectos",
    lead: "Dos productos míos, cuatro trabajos para clientes y uno que hice para mí.",
    seeCase: "Ver el caso", seeCaseOf: (name: string) => ` de ${name}`,
    relatedCase: "De su sistema de stock salió",
  },
  tags: { client: "Cliente", product: "Producto propio", personal: "Personal" },
  experience: {
    title: "Experiencia", lead: "De QA a Software Engineer, en banca y fintech desde 2020.", education: "Formación",
    months: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"], present: "hoy",
  },
  stack: { title: "Stack", lead: "Lo que uso en Naranja X y en estos proyectos." },
  contact: {
    title: "Contacto",
    lead: "Buenos Aires (GMT-3), español nativo e inglés intermedio. Lo más directo es el email, ya sea por un equipo o por un proyecto.",
    caseLead: (name: string) => `Si querés hablar de ${name} o de cómo está hecho, por email es lo más directo.`,
    home: "Inicio", contact: "Contacto", cases: "Casos", backHome: "Volver al inicio", next: (name: string) => `Siguiente caso: ${name}`,
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
  },
  notFound: {
    title: "Página no encontrada | José Martin Flores",
    heading: "Página no encontrada",
    text: "La dirección no existe o cambió. En el inicio están los tres casos: Envo, Stockie y Club Zapateo.",
    back: "Volver al inicio",
  },
};

export type Ui = typeof es;

const en: Ui = {
  meta: {
    title: "José Martin Flores | Software Engineer",
    description: "Software Engineer at Naranja X. Order, inventory and payment systems, with three case studies: Envo, Stockie and Club Zapateo.",
    caseTitle: (name: string) => `${name}: case study | José Martin Flores`,
    ogAlt: "José Martin Flores, Software Engineer. I build order, inventory and payment systems that keep working when something fails.",
    knowsAbout: ["Backend", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Integrations", "AI automation"],
  },
  tagline: "Backend, integrations and automation. I build order, inventory and payment systems that keep working when something fails.",
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
    claim: "I build order, inventory and payment systems that keep working when something fails.",
    metas: {
      now: "Now", nowValue: (company: string) => `Software Engineer at ${company.replace(" ", "\u00a0")}, in AI automation`, build: "I work on", buildValue: "Backend, integrations and automation",
      since: "Since", sinceValue: "2019 in QA, 2020 in banking and fintech", write: "Get in touch", email: "Email",
    },
    bandLabel: "Envo · operations dashboard",
  },
  statement: {
    title: "I start with what can fail",
    line: "I started in QA in 2019, and today I'm a software engineer at Naranja X. Before I build anything, I work out what happens if a message never arrives, if a payment comes in twice or if a service goes down.",
    proof: [
      ["No notification fails silently", "If Telegram doesn't respond, Envo stores the notification and retries; if it can't be delivered, it opens an alert."],
      ["No duplicate tickets", "In Club Zapateo, if Mercado Pago repeats a payment notification, the ticket is issued only once."],
      ["Nightly checks", "Envo verifies that stock, reservations and cash add up; if something is off, it opens an alert and closes it once everything adds up again."],
      ["Tested with real PostgreSQL", "Envo's tests also run against a real PostgreSQL server, not just an embedded database."],
    ],
  },
  projects: {
    title: "Projects",
    lead: "Two products of my own, four client projects and one I built for myself. Screenshots are in Spanish.",
    seeCase: "Read the case study", seeCaseOf: (name: string) => ` on ${name}`,
    relatedCase: "Their inventory system led to",
  },
  tags: { client: "Client", product: "Own product", personal: "Personal" },
  experience: {
    title: "Experience", lead: "From QA to Software Engineer, in banking and fintech since 2020.", education: "Education",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], present: "present",
  },
  stack: { title: "Stack", lead: "What I use at Naranja X and in these projects." },
  contact: {
    title: "Contact",
    lead: "Buenos Aires (GMT-3), native Spanish and intermediate English. Email is the most direct way to reach me, whether it's about a team or a project.",
    caseLead: (name: string) => `If you'd like to talk about ${name} or how it's built, email is the most direct way to reach me.`,
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
  },
  notFound: {
    title: "Page not found | José Martin Flores",
    heading: "Page not found",
    text: "This page doesn't exist or has moved. The home page has the three case studies: Envo, Stockie and Club Zapateo.",
    back: "Back to home",
  },
};

export const ui: Record<Locale, Ui> = { es, en };
