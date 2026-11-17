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
    summary: "Organiza pedidos y repartidores para operar entregas desde un solo sistema.",
    highlights: [
      "Gestión de pedidos y asignación de repartidores",
      "Integración con WhatsApp y bot de Telegram",
      "Configuración de medios de pago, recargos y horarios de envío",
      "Infraestructura propia con monitoreo y copias de seguridad",
    ],
    stack: ["Docker", "n8n", "VPS", "Telegram"],
    visible: true,
  },
  {
    slug: "stokie",
    name: "Stokie",
    category: "producto",
    summary: "Controla stock y ventas de dos negocios desde un mismo producto.",
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
    name: "Zapateo Club",
    category: "cliente",
    summary: "Permite vender entradas online y validarlas en la puerta del evento.",
    highlights: [
      "Checkout con Mercado Pago",
      "Emisión automática de tickets por webhook",
      "Envío de entradas por email con Resend",
      "Validación de acceso con QR y PIN",
    ],
    stack: ["Mercado Pago", "Resend", "QR"],
    liveUrl: "https://zapateo-club.vercel.app",
    visible: true,
  },
  {
    slug: "moodi-home",
    name: "Moodi Home",
    category: "cliente",
    summary: "Ofrece un catálogo de productos para explorar y agregar al carrito.",
    highlights: [
      "Tienda con categorías de productos",
      "Ficha de producto con detalle",
      "Carrito de compras",
    ],
    stack: ["Next.js 16", "React 19", "Tailwind CSS 4"],
    liveUrl: "https://moodi-home.vercel.app",
    visible: true,
  },
  {
    slug: "globalfia",
    name: "GlobalFia",
    category: "cliente",
    summary: "Presenta el negocio de repuestos Fiat y conecta su operación con Stokie.",
    highlights: [
      "Landing pública para repuestos Fiat",
      "Acceso a la información del negocio",
      "Integración con la gestión de stock y ventas de Stokie",
    ],
    stack: ["Stokie"],
    liveUrl: "https://global-fia.vercel.app",
    visible: true,
  },
  {
    slug: "monjeep",
    name: "MonJeep",
    category: "cliente",
    summary: "Muestra el catálogo de repuestos Jeep, Dodge y Chrysler y facilita las consultas por email.",
    highlights: [
      "Landing de repuestos por marca",
      "Formulario de contacto por email con Resend",
      "Integración con la gestión de stock y ventas de Stokie",
    ],
    stack: ["Resend", "Stokie"],
    liveUrl: "https://monjeep.vercel.app",
    visible: true,
  },
  {
    slug: "aether-aerospace-care",
    name: "Aether Aerospace Care",
    category: "cliente",
    summary: "Presenta los servicios de especialistas en aviación y ofrece una vía de contacto.",
    highlights: [
      "Presentación de servicios de aviación",
      "Información profesional del equipo",
      "Vía de contacto para consultas",
    ],
    stack: [],
    liveUrl: "https://aether-aerospace-care.vercel.app",
    visible: true,
  },
  {
    slug: "postulator",
    name: "postulator",
    category: "herramienta",
    summary: "Ayuda a buscar empleos y preparar postulaciones adaptadas a cada oferta.",
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
    summary: "Permite controlar un stream deck Redragon SS-550 desde macOS sin el software oficial.",
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
    name: "Trading bot",
    category: "herramienta",
    summary: "Evalúa estrategias de trading con datos históricos en modo simulación.",
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
