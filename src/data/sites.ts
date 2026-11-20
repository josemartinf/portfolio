import type { SiteProject } from "./types";

export const sites: SiteProject[] = [
  {
    slug: "repuestos",
    name: "GlobalFia y MonJeep",
    tag: "client",
    summary:
      "Dos casas de repuestos en Venezuela, una de Fiat y otra de Jeep, Dodge y Chrysler. Cada una tiene su sitio público y su sistema de stock, que después se convirtió en Stockie.",
    // La búsqueda de MonJeep es de texto en español (plurales, sin acentos) sobre nombre, marca y modelos, más números de
    // pieza parciales: no es semántica ni corrige errores de tipeo (monjeep/lib/productos/producto-search.ts).
    layers: [
      "GlobalFia: un cotizador que arma el pedido por WhatsApp con modelo, año y repuesto",
      "MonJeep: un buscador por nombre, marca o modelo de auto desde un solo campo, sin importar acentos ni plurales",
      "MonJeep: pago en cuotas con Cashea y catálogo filtrable por marca",
    ],
    parts: ["Landing de GlobalFia", "Landing de MonJeep", "Sistema de stock"],
    focus: [
      "Base de datos: búsqueda con tsvector y pg_trgm mantenida por triggers",
      "Control de usuarios: guardas por rol en páginas y API",
    ],
    status: "En línea: globalfia.store y monjeep.store",
    sheet: {
      architecture: "Landing y sistema de stock en una sola app, separados por subdominio.",
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth", "Resend"],
      practices: [
        "Lógica de negocio concentrada en transacciones",
        "Guardas por rol en páginas y API",
        "Migraciones de Prisma",
      ],
      patterns: [],
      short: {
        architecture: "Landing y stock en una app, separados por subdominio",
        stack: "Next.js, TypeScript, Prisma, PostgreSQL, Resend",
        practices: "Transacciones, guardas por rol, migraciones",
      },
    },
    liveUrl: "https://www.globalfia.store",
    moreLinks: [{ name: "MonJeep", url: "https://www.monjeep.store" }],
    shot: {
      src: "/projects/repuestos-globalfia.webp",
      alt: "Landing de GlobalFia, repuestos Fiat, con el cotizador por WhatsApp",
      frame: "browser",
      title: "Landing de GlobalFia",
    },
    relatedCase: "stockie",
  },
  {
    slug: "moodi-home",
    name: "Moodi Home",
    tag: "client",
    summary:
      "Tienda online de objetos de diseño. El cliente arma su carrito y el pedido llega listo por WhatsApp o por email.",
    layers: [
      "Catálogo por categorías y fichas con galería",
      "Variantes de color y tamaño en cada producto",
      "Un carrito que se guarda entre visitas",
    ],
    parts: ["Catálogo", "Ficha de producto", "Carrito", "Checkout por WhatsApp o email"],
    focus: ["UX/UI: galería, variantes de color y tamaño, y carrito persistente"],
    status: "En línea: moodi-home.store",
    sheet: {
      architecture: "Next.js con catálogo, ficha y carrito persistente; el checkout deriva el pedido armado a WhatsApp o email.",
      stack: ["Next.js 16", "React 19", "Framer Motion", "TypeScript", "Tailwind CSS"],
      practices: [],
      patterns: [],
      short: {
        architecture: "Catálogo y carrito en Next.js; el pedido sale por WhatsApp",
        stack: "Next.js 16, React 19, Framer Motion, Tailwind",
      },
    },
    liveUrl: "https://www.moodi-home.store",
    shot: {
      src: "/projects/moodi-home.webp",
      alt: "Portada de Moodi Home con su catálogo de objetos de diseño",
      frame: "browser",
      title: "Tienda",
    },
  },
  {
    slug: "aether-aerospace-care",
    name: "Aether Aerospace Care",
    tag: "client",
    summary:
      "Sitio bilingüe, en español e inglés, para una empresa de detailing de aeronaves.",
    layers: [
      "Las consultas del formulario llegan por email al equipo, listas para responderle al cliente",
      "Una confirmación automática y bilingüe para el cliente",
      "Emails con diseño propio",
    ],
    parts: ["Landing bilingüe", "Formulario validado", "Emails por Resend"],
    focus: ["Formularios: validación en el servidor y una confirmación al cliente que no bloquea la respuesta"],
    status: "En línea: aether-aerospace.com",
    sheet: {
      architecture: "Landing en Next.js con validación en el servidor y dos emails por Resend: el lead y la confirmación al cliente.",
      stack: ["Next.js", "React", "TypeScript", "Resend", "Tailwind CSS"],
      practices: [],
      patterns: [],
      short: {
        architecture: "Next.js, validación en el servidor y dos emails",
        stack: "Next.js, React, TypeScript, Resend, Tailwind",
      },
    },
    liveUrl: "https://aether-aerospace.com",
    shot: {
      src: "/projects/aether-aerospace-care.webp",
      alt: "Portada de Aether Aerospace Care, detailing de aeronaves",
      frame: "browser",
      title: "Landing bilingüe",
    },
  },
];
