import type { SiteProject } from "./types";

export const sites: SiteProject[] = [
  {
    slug: "repuestos",
    name: "GlobalFia y MonJeep",
    summary:
      "Dos comercios de repuestos, uno de Fiat y otro de Jeep, Dodge y Chrysler. Cada uno tiene una landing pública y un sistema de stock interno en su subdominio «stock», que después se convirtió en Stockie.",
    layers: [
      "Landing de GlobalFia: un cotizador que arma el mensaje de WhatsApp con modelo, año y repuesto",
      "Landing de MonJeep: formulario de contacto validado que envía por Resend",
      "Sistema de stock interno en el subdominio «stock» de cada sitio, aislado por middleware",
      "En MonJeep, búsqueda indexada con tsvector y pg_trgm, mantenida por triggers",
      "En MonJeep, Cashea como medio de pago con liquidación semanal, y marcas de producto para filtrar el catálogo",
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
    summary:
      "Tienda de objetos de diseño. El checkout arma el pedido y lo envía por WhatsApp, o por email si no hay un número configurado. No tiene pagos online.",
    layers: [
      "Catálogo con categorías",
      "Ficha con galería y variantes de color y tamaño",
      "Carrito persistente",
      "Checkout que arma el pedido y lo envía por WhatsApp o por email",
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
    summary:
      "Landing bilingüe, en español e inglés, para detailing de aeronaves. El formulario se valida en el servidor y envía el lead por Resend.",
    layers: [
      "Landing bilingüe ES/EN",
      "Formulario validado en el servidor que envía el lead por Resend, con reply-to al cliente",
      "Confirmación bilingüe al cliente, que no bloquea la respuesta",
      "Plantillas de email hechas a mano",
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
