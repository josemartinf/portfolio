export type ProjectCategory = "producto" | "cliente" | "herramienta";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  image?: { src: string; alt: string };
  usedBy?: string[];
  visible: boolean;
}

export const projects: Project[] = [
  {
    slug: "envo",
    name: "Envo",
    category: "producto",
    summary: "Pedidos y delivery con varios repartidores. Recibe pedidos por WhatsApp y Telegram, asigna repartidores, cobra y suma recargos por zona y horario.",
    highlights: [
      "Gestión de pedidos y asignación de repartidores",
      "Integración con WhatsApp y bot de Telegram",
      "Configuración de medios de pago, recargos y horarios de envío",
      "Infraestructura propia con monitoreo y copias de seguridad",
    ],
    stack: ["Next.js", "PostgreSQL", "n8n", "Docker", "WhatsApp", "Telegram"],
    image: { src: "/projects/envo-panel.webp", alt: "Panel de Envo con los pedidos que necesitan una decisión y los pedidos en curso" },
    visible: true,
  },
  {
    slug: "stockie",
    name: "Stockie",
    category: "producto",
    summary: "Stock, depósito y ventas para comercios de repuestos. Lo usan MonJeep y GlobalFia, cada uno con sus vendedores y permisos.",
    highlights: [
      "Dashboard de productos, depósito y ventas",
      "Acceso con roles de administración y ventas",
      "Inicio de sesión para cada usuario",
      "En uso por MonJeep y GlobalFia",
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "Better Auth"],
    usedBy: ["MonJeep", "GlobalFia"],
    visible: true,
  },
  {
    slug: "zapateo-club",
    name: "Club Zapateo",
    category: "cliente",
    summary: "Venta de entradas con Mercado Pago y validación con QR en la puerta.",
    highlights: [
      "Checkout con Mercado Pago",
      "Emisión automática de tickets por webhook",
      "Envío de entradas por email con Resend",
      "Validación de acceso con QR y PIN",
    ],
    stack: ["Mercado Pago", "Resend", "QR"],
    liveUrl: "https://clubzapateo.com",
    image: { src: "/projects/zapateo-club.webp", alt: "Portada de Club Zapateo con su logo sobre una escultura 3D" },
    visible: true,
  },
  {
    slug: "moodi-home",
    name: "Moodi Home",
    category: "cliente",
    summary: "Tienda online con catálogo, categorías y carrito.",
    highlights: [
      "Tienda con categorías de productos",
      "Ficha de producto con detalle",
      "Carrito de compras",
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4"],
    liveUrl: "https://www.moodi-home.store",
    image: { src: "/projects/moodi-home.webp", alt: "Portada de Moodi Home con lámparas y macetas de colores" },
    visible: true,
  },
  {
    slug: "globalfia",
    name: "GlobalFia",
    category: "cliente",
    summary: "Repuestos Fiat: vitrina para clientes y sistema de stock para el mostrador.",
    highlights: [
      "Landing pública para repuestos Fiat",
      "Acceso a la información del negocio",
      "Integración con la gestión de stock y ventas de Stockie",
    ],
    stack: ["Stockie"],
    liveUrl: "https://www.globalfia.store",
    image: { src: "/projects/globalfia.webp", alt: "Portada de GlobalFia, repuestos Fiat, con el botón de WhatsApp" },
    visible: true,
  },
  {
    slug: "monjeep",
    name: "MonJeep",
    category: "cliente",
    summary: "Repuestos Jeep, Dodge y Chrysler, con consultas que llegan por email.",
    highlights: [
      "Landing de repuestos por marca",
      "Formulario de contacto por email con Resend",
      "Integración con la gestión de stock y ventas de Stockie",
    ],
    stack: ["Resend", "Stockie"],
    liveUrl: "https://www.monjeep.store",
    image: { src: "/projects/monjeep.webp", alt: "Portada de MonJeep con un Jeep azul y las marcas Mopar, Jeep, Chrysler y Dodge" },
    visible: true,
  },
  {
    slug: "aether-aerospace-care",
    name: "Aether Aerospace Care",
    category: "cliente",
    summary: "Sitio para especialistas certificados en mantenimiento de aviación.",
    highlights: [
      "Presentación de servicios de aviación",
      "Información profesional del equipo",
      "Vía de contacto para consultas",
    ],
    stack: [],
    liveUrl: "https://aether-aerospace.com",
    image: { src: "/projects/aether-aerospace-care.webp", alt: "Portada de Aether Aerospace Care con su logo dorado" },
    visible: true,
  },
  {
    slug: "postulator",
    name: "postulator",
    category: "herramienta",
    summary: "Busca ofertas de empleo, las puntúa contra mi perfil y arma CV y carta para cada una. Nada se envía sin mi aprobación.",
    highlights: [
      "Puntaje de afinidad para ofertas laborales",
      "Adaptación de CV y carta con DeepSeek",
      "Preparación de postulaciones para Greenhouse y Lever",
      "Aprobación humana obligatoria antes del envío",
    ],
    stack: ["DeepSeek", "Greenhouse", "Lever"],
    visible: true,
  },
  {
    slug: "rd550-mac",
    name: "Driver Redragon SS-550 para macOS",
    category: "herramienta",
    summary: "Hace andar el stream deck SS-550 en Mac sin el software oficial, con un panel web para configurar cada botón.",
    highlights: [
      "Comunicación HID nativa con el dispositivo",
      "Render de botones en memoria",
      "Inicio automático mediante LaunchAgent",
      "API para actualizar botones en vivo",
    ],
    stack: ["macOS", "HID", "LaunchAgent"],
    visible: true,
  },
  {
    slug: "trading-bot",
    name: "Bot de trading",
    category: "herramienta",
    summary: "Estrategias sobre Binance probadas en simulación con precios reales, sin dinero en juego.",
    highlights: [
      "Backtesting con Freqtrade",
      "Optimización de parámetros",
      "Validación fuera de muestra",
      "Simulación con Binance sin órdenes reales",
    ],
    stack: ["Freqtrade", "Binance"],
    visible: true,
  },
];

export function projectsBy(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category && project.visible);
}
