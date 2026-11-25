import type { SiteProject } from "../types";

/* Espejo en inglés de ../sites.ts: la misma forma, el mismo orden y los mismos datos; solo cambia el texto. */
export const sites: SiteProject[] = [
  {
    slug: "repuestos",
    name: "GlobalFia and MonJeep",
    tag: "client",
    summary:
      "Two auto parts stores in Venezuela, one for Fiat and one for Jeep, Dodge and Chrysler. Each has its own public site and inventory system, which later became Stockie.",
    // La búsqueda de MonJeep es de texto en español (plurales, sin acentos) sobre nombre, marca y modelos, más números de
    // pieza parciales: no es semántica ni corrige errores de tipeo (monjeep/lib/productos/producto-search.ts).
    parts: ["GlobalFia landing page", "MonJeep landing page", "Inventory system"],
    focus: [
      "Database: search with tsvector and pg_trgm, kept up to date by triggers",
      "Access control: role guards on pages and API",
    ],
    status: "Live: globalfia.store and monjeep.store",
    sheet: {
      architecture: "Landing page and inventory system in a single app, split by subdomain.",
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth", "Resend"],
      practices: [
        "Business logic centralized in transactions",
        "Role guards on pages and in the API",
        "Prisma migrations",
      ],
      patterns: [],
      short: {
        architecture: "Landing page and inventory in one app, split by subdomain",
        stack: "Next.js, TypeScript, Prisma, PostgreSQL, Resend",
        practices: "Transactions, role guards, migrations",
      },
    },
    liveUrl: "https://www.globalfia.store",
    moreLinks: [{ name: "MonJeep", url: "https://www.monjeep.store" }],
    shot: {
      src: "/projects/repuestos-globalfia.webp",
      alt: "GlobalFia's landing page for Fiat parts, with the WhatsApp quote builder",
      frame: "browser",
      title: "GlobalFia landing page",
    },
    relatedCase: "stockie",
  },
  {
    slug: "moodi-home",
    name: "Moodi Home",
    tag: "client",
    summary:
      "An online store for design objects. Customers build their cart, and the finished order reaches the store over WhatsApp or email.",
    parts: ["Catalog", "Product page", "Cart", "Checkout via WhatsApp or email"],
    focus: ["UX/UI: gallery, color and size variants, and a persistent cart"],
    status: "Live: moodi-home.store",
    sheet: {
      architecture: "Next.js with catalog, product page and a persistent cart; checkout hands the finished order off to WhatsApp or email.",
      stack: ["Next.js 16", "React 19", "Framer Motion", "TypeScript", "Tailwind CSS"],
      practices: [],
      patterns: [],
      short: {
        architecture: "Catalog and cart in Next.js; the order goes out over WhatsApp",
        stack: "Next.js 16, React 19, Framer Motion, Tailwind",
      },
    },
    liveUrl: "https://www.moodi-home.store",
    shot: {
      src: "/projects/moodi-home.webp",
      alt: "Moodi Home's home page with its catalog of design objects",
      frame: "browser",
      title: "Store",
    },
  },
  {
    slug: "aether-aerospace-care",
    name: "Aether Aerospace Care",
    tag: "client",
    summary:
      "A bilingual site, in Spanish and English, for an aircraft detailing company.",
    parts: ["Bilingual landing page", "Validated form", "Emails via Resend"],
    focus: ["Forms: server-side validation and a client confirmation that doesn't block the response"],
    status: "Live: aether-aerospace.com",
    sheet: {
      architecture: "Next.js landing page with server-side validation and two emails via Resend: the lead and the client confirmation.",
      stack: ["Next.js", "React", "TypeScript", "Resend", "Tailwind CSS"],
      practices: [],
      patterns: [],
      short: {
        architecture: "Next.js, server-side validation and two emails",
        stack: "Next.js, React, TypeScript, Resend, Tailwind",
      },
    },
    liveUrl: "https://aether-aerospace.com",
    shot: {
      src: "/projects/aether-aerospace-care.webp",
      alt: "Aether Aerospace Care's home page, for an aircraft detailing company",
      frame: "browser",
      title: "Bilingual landing page",
    },
  },
];
