import type { CaseSlug, CaseStudy, Shot } from "./types";

/* Las capturas de cada caso, una vez. `focus` (en los roles) deja afuera la barra lateral, que se repite en todas las
   pantallas, para que lo que importa se lea más grande; el collage del hero usa recortes más chicos de las mismas. */
/* El collage del hero, en una sola escala (fix round 1, M4): toda ventana principal muestra el mismo ancho de captura y
   toda segunda ventana otro, así a sus anchos en el collage (80 % y 58 %) el texto de las capturas sale del mismo tamaño,
   unas 0,65 veces el real. Cada set elige solo desde dónde (x, y). */
export const HERO_MAIN_W = 0.54;
export const HERO_SIDE_W = 0.39;

const ENVO_SIDE = { x: 0.176, w: 0.824 };
const envoShots = {
  orders: { src: "/projects/envo-orders.webp", alt: "Pedido de Envo abierto con su comprobante de pago para revisar", frame: "browser", title: "Pedido con comprobante", focus: { x: 0.176, y: 0.07, w: 0.824 } },
  cash: { src: "/projects/envo-cash.webp", alt: "Caja de repartidores de Envo con sus liquidaciones", frame: "browser", title: "Caja de repartidores", focus: ENVO_SIDE },
  zones: { src: "/projects/envo-zones.webp", alt: "Zonas de entrega de Envo con sus recargos por lluvia, noche y feriado", frame: "browser", title: "Zonas y recargos", focus: { x: 0.1325, w: 0.8675 } },
  inventory: { src: "/projects/envo-inventory.webp", alt: "Inventario de Envo separado por ubicación", frame: "browser", title: "Inventario por ubicación", focus: ENVO_SIDE },
  alerts: { src: "/projects/envo-alerts.webp", alt: "Alertas y salud del sistema en el panel de Envo", frame: "browser", title: "Alertas y salud", focus: ENVO_SIDE },
  reports: { src: "/projects/envo-reports.webp", alt: "Resultados de Envo con la opción de exportar a CSV", frame: "browser", title: "Resultados", focus: ENVO_SIDE },
  permissions: { src: "/projects/envo-staff-permissions.webp", alt: "Permisos granulares de una persona del equipo en Envo", frame: "browser", title: "Permisos del personal", focus: ENVO_SIDE },
  courier: { src: "/projects/envo-courier-phone.webp", alt: "Mini App de Telegram de Envo con un pedido tomado por el repartidor", frame: "phone", title: "Mini App del repartidor" },
} satisfies Record<string, Shot>;

const STOCKIE_SIDE = { x: 0.116, w: 0.884 };
const stockieShots = {
  intake: { src: "/projects/stockie-intake.webp", alt: "Ingreso de mercadería en Stockie con la impresión de etiquetas", frame: "browser", title: "Ingreso de mercadería" },
  fiscal: { src: "/projects/stockie-fiscal.webp", alt: "Stock fiscal de Stockie por producto", frame: "browser", title: "Stock fiscal", focus: STOCKIE_SIDE },
  suppliers: { src: "/projects/stockie-suppliers.webp", alt: "Pedido sugerido de Stockie: los productos bajo el stock mínimo de un proveedor, cuánto pedir y el costo estimado", frame: "browser", title: "Pedido sugerido", focus: { x: 0.116, w: 0.7 } },
  credits: { src: "/projects/stockie-credits.webp", alt: "Créditos de Stockie para aprobar, cobrar o anular", frame: "browser", title: "Créditos", focus: { x: 0.116, w: 0.62 } },
  reports: { src: "/projects/stockie-reports.webp", alt: "Reportes de ventas de Stockie", frame: "browser", title: "Reportes", focus: { x: 0.116, w: 0.82 } },
  sale: { src: "/projects/stockie-sale.webp", alt: "Venta nueva en Stockie con la tasa BCV del día y un pago mixto", frame: "browser", title: "Venta con pago mixto", focus: STOCKIE_SIDE },
  seller: { src: "/projects/stockie-seller-dashboard.webp", alt: "Dashboard propio de un vendedor en Stockie", frame: "browser", title: "Dashboard del vendedor", focus: STOCKIE_SIDE },
} satisfies Record<string, Shot>;

const zapateoShots = {
  home: { src: "/projects/club-zapateo-home.webp", alt: "Sitio público de Club Zapateo con los eventos a la venta", frame: "browser", title: "Sitio público" },
  door: { src: "/projects/club-zapateo-staff-phone.webp", alt: "Pantalla de la puerta de Club Zapateo en el teléfono, con un ingreso validado", frame: "phone", title: "Control en la puerta" },
  reconciliation: { src: "/projects/club-zapateo-admin-reconciliation.webp", alt: "Conciliación de Club Zapateo con Mercado Pago, con la simulación antes de aplicar", frame: "browser", title: "Conciliación con Mercado Pago", short: "Conciliación" },
  events: { src: "/projects/club-zapateo-admin-events.webp", alt: "Eventos de Club Zapateo en el panel, con su estado y su afiche", frame: "browser", title: "Eventos" },
  dashboard: { src: "/projects/club-zapateo-admin-dashboard.webp", alt: "Dashboard de administración de Club Zapateo con recaudación, entradas emitidas y usadas, y vendidas contra capacidad", frame: "browser", title: "Dashboard de administración", short: "Dashboard" },
} satisfies Record<string, Shot>;

const envo: CaseStudy = {
  slug: "envo",
  name: "Envo",
  tagline:
    "Plataforma de pedidos y entregas con varios repartidores: un panel de operación, una Mini App de Telegram para el repartidor y una página de pedidos para el cliente.",
  lead: "Pedidos y entregas con varios repartidores, por Telegram y WhatsApp.",
  moment: "counter-rolls",
  homeFacts: [
    "Ningún aviso se pierde aunque Telegram o WhatsApp estén caídos: outbox transaccional, circuit breaker y dead letter",
    "2938 tests, con integración contra PGlite y PostgreSQL real y 84 specs e2e con chequeos de accesibilidad (axe)",
    "150 rutas de API, 64 tablas y 86 migraciones SQL sin ORM",
  ],
  problem:
    "Una operación de entregas con varios repartidores recibe pedidos por Telegram y WhatsApp, cobra en pesos, dólares y euros, y avisa a cada parte en cada paso del pedido. Si un aviso se pierde, el pedido queda trabado; si un cobro se registra dos veces, la caja no cierra. Construí Envo para que ninguna de las dos cosas pase aunque un canal esté caído.",
  heroShot: {
    src: "/projects/envo-panel.webp",
    alt: "Resumen del panel de operación de Envo con la demo Almacén del Parque",
    frame: "browser",
    title: "Panel de operación",
    focus: ENVO_SIDE,
  },
  heroSets: [
    { label: "Operación", line: "Zonas con recargos, pedidos con comprobante e inventario por ubicación.", main: { ...envoShots.zones, focus: { x: 0.18, y: 0.04, w: HERO_MAIN_W } }, side: { ...envoShots.inventory, focus: { x: 0.17, y: 0.06, w: HERO_SIDE_W } } },
    { label: "Control", line: "Alertas y salud del sistema, resultados y permisos granulares.", main: { ...envoShots.alerts, focus: { x: 0.19, y: 0.06, w: HERO_MAIN_W } }, side: { ...envoShots.permissions, focus: { x: 0.2, y: 0.4, w: HERO_SIDE_W } } },
    { label: "Repartidor", line: "Mini App de Telegram: disponibilidad, pasos de la entrega y caja por moneda.", main: envoShots.courier, side: { ...envoShots.cash, focus: { x: 0.19, y: 0.06, w: HERO_SIDE_W } } },
  ],
  screens: "23 pantallas en tres lugares: el panel de operación, la Mini App del repartidor y la página de pedidos del cliente.",
  roles: [
    {
      role: "Operación, en el panel",
      summary:
        "El panel tiene 12 módulos. Para operar: pedidos con asignación de repartidor, revisión de comprobantes, edición e incidencias; clientes con saldo y referidos; productos; inventario por ubicación; zonas con recargos por lluvia, noche y feriado; y caja de repartidores con liquidaciones. En configuración se definen las ventanas de entrega, el envío prioritario, las cuentas de pago y la cotización, que sale de DolarApi con reglas de vigencia.",
      shots: [envoShots.orders, envoShots.cash, envoShots.zones, envoShots.inventory],
    },
    {
      role: "Control y seguridad, en el panel",
      summary:
        "Resumen, ayuda y soporte; alertas y salud del sistema; resultados con exportación CSV; personal con permisos granulares; y auditoría. La cuenta tiene TOTP, códigos de recuperación y manejo de sesiones.",
      shots: [envoShots.alerts, envoShots.reports, envoShots.permissions],
    },
    {
      role: "Repartidor",
      summary:
        "Una Mini App de Telegram. El repartidor marca su disponibilidad, toma pedidos, avanza por los pasos de la entrega, recibe avisos y lleva su propio stock y su caja por moneda.",
      shots: [envoShots.courier],
    },
    {
      role: "Cliente",
      summary:
        "En /pedido arma el carrito desde el catálogo, elige zona y ventana de entrega o envío prioritario, y paga en ARS, USD o EUR, con pagos mixtos o con saldo. Puede modificar o cancelar el pedido y reportar un problema con foto.",
      shots: [],
    },
  ],
  diagram: {
    preset: "free",
    nodes: [
      { id: "tg", label: "Telegram", icon: "telegram", sub: "cliente y repartidor", at: [0.08, 0.28], atCompact: [0.25, 0.08] },
      { id: "wa", label: "WhatsApp", icon: "whatsapp", sub: "cliente", at: [0.08, 0.72], atCompact: [0.75, 0.08] },
      { id: "n8n", label: "n8n", icon: "n8n", sub: "eventos con HMAC", at: [0.3, 0.5], atCompact: [0.5, 0.28] },
      { id: "api", label: "API", icon: "nextjs", sub: "Next.js, comandos idempotentes", at: [0.52, 0.24], atCompact: [0.25, 0.5] },
      { id: "pg", label: "PostgreSQL", icon: "postgres", sub: "outbox y NOTIFY", at: [0.74, 0.5], atCompact: [0.5, 0.72] },
      { id: "worker", label: "Worker", icon: "nodejs", sub: "vacía la outbox", at: [0.52, 0.76], atCompact: [0.75, 0.5] },
      { id: "panel", label: "Panel", sub: "en vivo por SSE", at: [0.9, 0.24], atCompact: [0.5, 0.92] },
    ],
    edges: [
      { from: "tg", to: "n8n" },
      { from: "wa", to: "n8n" },
      { from: "n8n", to: "api" },
      { from: "api", to: "pg" },
      { from: "pg", to: "worker" },
      { from: "worker", to: "n8n" },
      { from: "pg", to: "panel" },
      { from: "panel", to: "api" },
    ],
    shots: [["tg>n8n", "n8n>api", "api>pg"], ["pg>worker", "worker>n8n", ["n8n>tg", "n8n>wa"]], ["pg>panel"]],
    alt: "Un pedido entra por Telegram o WhatsApp, pasa por n8n a la API de Next.js y se guarda en PostgreSQL. El worker toma el aviso de la outbox y lo envía por n8n a Telegram o WhatsApp. PostgreSQL avisa con NOTIFY y el panel, que opera sobre la API, se actualiza por SSE.",
  },
  decisions: [
    {
      title: "Outbox transaccional con circuit breaker",
      why: "Cada aviso queda en una outbox que el worker reclama con FOR UPDATE SKIP LOCKED, con reintentos con backoff y una dead letter que dispara una alerta. Si un canal está caído, el circuit breaker pospone los envíos sin gastar reintentos. Ningún aviso se pierde.",
    },
    {
      title: "Comandos idempotentes con un orden único de bloqueos",
      why: "Repetir un comando no duplica su efecto, y todos toman los bloqueos en el mismo orden. Eso elimina los deadlocks entre operaciones que compiten por las mismas filas.",
    },
    {
      title: "Caja de repartidores append-only",
      why: "La caja solo suma movimientos, nunca los edita, y cada movimiento lleva una clave de deduplicación. Un reintento no duplica plata.",
    },
    {
      title: "Chequeos nocturnos de invariantes",
      why: "Cada noche se verifican stock, reservas y caja. Si algo no cuadra se abre una alerta crítica, y el mismo chequeo la cierra cuando vuelve a cuadrar.",
    },
    {
      title: "Migraciones SQL con checksum",
      why: "Las 86 migraciones están escritas en SQL, sin ORM, y cada una guarda su checksum: una migración ya aplicada no cambia sin que se note.",
    },
    {
      title: "Autenticación, firmas y límites",
      why: "Contraseñas con argon2id, TOTP con protección contra reutilización y reautenticación para acciones sensibles. Los eventos hacia n8n van firmados con HMAC y timestamp, el rate limiting corre en PostgreSQL y los archivos privados se recodifican a WebP.",
    },
  ],
  decisionsLead: "Lo que hace que un aviso no se pierda aunque un canal esté caído y que un cobro no se registre dos veces.",
  qualityLead: "Lo que corre en npm test y en las specs e2e, con las cifras del repositorio.",
  quality: [
    "Integración contra PGlite y contra PostgreSQL real, con contratos compartidos entre los dos motores.",
    "Las specs e2e incluyen chequeos de accesibilidad con axe.",
    "TypeScript estricto, también sobre los .mjs del worker.",
    "API documentada en OpenAPI, con 73 rutas.",
  ],
  figures: {
    in: "calidad",
    items: [
      { value: "2938", label: "tests pasando en npm test, el 17 de noviembre de 2026" },
      { value: "84", label: "specs e2e con axe" },
      { value: "150", label: "rutas de API" },
      { value: "86", label: "migraciones SQL, sin ORM" },
    ],
  },
  parts: ["Panel web de operación", "API", "Worker de la outbox", "Mini App de Telegram", "Página de pedidos"],
  focus: [
    "Alta disponibilidad: outbox transaccional y circuit breaker",
    "Autenticación: TOTP, reautenticación y permisos granulares",
    "Base de datos: 64 tablas y 86 migraciones SQL con checksum",
  ],
  status: "Demo en línea en envo-demo.tech",
  heroFact: "23 pantallas",
  /** La demo pública: abre el panel con datos demo, sin login. Nunca /admin ni /login. */
  liveUrl: "https://envo-demo.tech/demo",
  demoUrl: "https://envo-demo.tech/demo",
  sheet: {
    architecture:
      "API y panel en Next.js sobre PostgreSQL, un worker que vacía la outbox hacia n8n y el panel en vivo con NOTIFY y SSE.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "n8n", "Telegram Mini App", "WhatsApp", "DolarApi", "OpenAPI"],
    practices: [
      "Pirámide de tests: unitarios, integración contra PGlite y PostgreSQL real, contratos compartidos entre los dos motores y e2e con accesibilidad",
      "TypeScript estricto, también en el worker",
      "Migraciones SQL versionadas con checksum",
      "API documentada en OpenAPI",
    ],
    patterns: [
      "Transactional Outbox",
      "Circuit Breaker",
      "Dead Letter Queue",
      "Idempotencia",
      "Append-only ledger",
      "Pessimistic locking (FOR UPDATE SKIP LOCKED)",
      "HMAC con timestamp",
      "LISTEN/NOTIFY y SSE",
    ],
    short: {
      architecture: "Next.js y PostgreSQL, un worker de outbox, n8n y SSE",
      stack: "Next.js, TypeScript, PostgreSQL, n8n, Telegram",
      practices: "Pirámide de tests con axe, TS estricto, OpenAPI",
      patterns: "Outbox, Circuit Breaker, DLQ, idempotencia",
    },
  },
};

const stockie: CaseStudy = {
  slug: "stockie",
  name: "Stockie",
  tagline:
    "Stock, depósitos y ventas para comercios de repuestos en Venezuela, con costo por lote FIFO y cobros en bolívares y dólares. Nació en MonJeep y GlobalFia, que lo usan.",
  lead: "Stock, depósitos y ventas para comercios de repuestos en Venezuela, en bolívares y dólares.",
  moment: "counter-rolls",
  homeFacts: [
    "Margen real por venta: cada línea sabe de qué lote salió y a qué proveedor se compró (costo FIFO)",
    "Dos vendedores no pueden vender la última unidad a la vez: el stock se bloquea antes de descontar (SELECT … FOR UPDATE)",
    "Cada venta guarda el monto en dólares, en bolívares y la tasa oficial del día (BCV)",
  ],
  problem:
    "Un comercio de repuestos en Venezuela vende en mostrador, por WhatsApp y a crédito, cobra con Pago Móvil, POS, efectivo, Zelle o USDT, y le debe a proveedores en dólares y en bolívares. Con una tasa que cambia todos los días, saber cuánto stock queda y cuánto costó lo vendido exige que cada movimiento guarde su lote, su costo y su tasa. Stockie nació adentro de MonJeep y GlobalFia para resolver eso.",
  heroShot: {
    src: "/projects/stockie-dashboard.webp",
    alt: "Dashboard de Stockie con las ventas y el stock de la demo de ferretería",
    frame: "browser",
    title: "Dashboard",
    focus: STOCKIE_SIDE,
  },
  heroSets: [
    { label: "Depósito", line: "Ingreso de mercadería con etiquetas y stock fiscal por depósito.", main: { ...stockieShots.intake, focus: { x: 0.12, y: 0.095, w: HERO_MAIN_W } }, side: { ...stockieShots.fiscal, focus: { x: 0.12, y: 0.06, w: HERO_SIDE_W } } },
    { label: "Administración", line: "Pedido sugerido a cada proveedor según el stock mínimo, y créditos para aprobar, cobrar o anular.", main: { ...stockieShots.suppliers, focus: { x: 0.12, y: 0.02, w: HERO_MAIN_W } }, side: { ...stockieShots.credits, focus: { x: 0.12, y: 0.025, w: HERO_SIDE_W } } },
    { label: "Venta", line: "Punto de venta con la tasa oficial del día (BCV) y pagos mixtos.", main: { ...stockieShots.sale, focus: { x: 0.12, y: 0.07, w: HERO_MAIN_W } }, side: { ...stockieShots.seller, focus: { x: 0.12, y: 0.04, w: HERO_SIDE_W } } },
  ],
  screens: "Un solo panel con dos roles: el administrador ve todo; el vendedor, su punto de venta y lo que el administrador le habilita.",
  roles: [
    {
      role: "Administración",
      summary:
        "Productos con dos precios más uno manual, historial de precios, modelos compatibles y búsqueda por SKU con acentos; solo el administrador puede vender bajo costo, y queda auditado. Depósitos, ingreso de mercadería con etiquetas TSPL por WebUSB o USB, escáner de códigos con la cámara, transferencias y ajustes. Proveedores con deudas en dólares y bolívares, pagos parciales y pedido sugerido por stock mínimo; créditos para aprobar, cobrar y anular; devoluciones, donde los defectuosos quedan fuera de stock; anulaciones con límite diario; stock fiscal, reportes y usuarios.",
      shots: [stockieShots.intake, stockieShots.fiscal, stockieShots.suppliers, stockieShots.credits, stockieShots.reports],
    },
    {
      role: "Venta",
      summary:
        "Punto de venta para mostrador, WhatsApp o crédito, con cobro en Pago Móvil, POS, efectivo en bolívares o dólares, Zelle o USDT, y pagos mixtos. El vendedor ve sus ventas y su dashboard, más los paneles que el administrador le habilita.",
      shots: [stockieShots.sale, stockieShots.seller],
    },
  ],
  diagram: {
    preset: "free",
    nodes: [
      { id: "nav", label: "Navegador", sub: "administrador o vendedor", at: [0.07, 0.34], atCompact: [0.3, 0.07] },
      { id: "proxy", label: "Proxy de sesión", icon: "nextjs", sub: "antes de cada página", at: [0.28, 0.34], atCompact: [0.3, 0.25] },
      { id: "api", label: "API", sub: "guardas por rol", at: [0.49, 0.34], atCompact: [0.3, 0.43] },
      { id: "core", label: "stock-core", icon: "prisma", sub: "transacciones", at: [0.69, 0.34], atCompact: [0.3, 0.61] },
      { id: "pg", label: "PostgreSQL", icon: "postgres", sub: "lotes FIFO", at: [0.89, 0.34], atCompact: [0.3, 0.82] },
      { id: "bcv", label: "Tasa del BCV", sub: "una vez por día o a mano", at: [0.69, 0.74], atCompact: [0.72, 0.82] },
      { id: "printer", label: "Impresora de etiquetas", sub: "TSPL", at: [0.49, 0.74], atCompact: [0.72, 0.43] },
    ],
    edges: [
      { from: "nav", to: "proxy" },
      { from: "proxy", to: "api" },
      { from: "api", to: "core" },
      { from: "core", to: "pg" },
      { from: "bcv", to: "pg", curve: "elbow" },
      { from: "api", to: "printer" },
    ],
    shots: [["nav>proxy", "proxy>api", "api>core", "core>pg"], ["bcv>pg"], ["api>printer"]],
    alt: "El navegador pasa por el proxy de sesión a la API, que aplica las guardas por rol y escribe en PostgreSQL a través de las transacciones de stock-core. La tasa del BCV entra por su propia API a PostgreSQL, y la API envía las etiquetas a la impresora.",
  },
  decisions: [
    {
      title: "Costo por lote FIFO",
      why: "La venta consume los lotes en orden de ingreso, y cada línea guarda de qué lote salió y a qué proveedor se le compró. Un endpoint de integridad compara el stock contra los lotes.",
    },
    {
      title: "Stock bloqueado antes de descontar",
      why: "La venta toma el stock con SELECT … FOR UPDATE dentro de la transacción. Si dos vendedores venden la última unidad al mismo tiempo, el segundo espera y ve el stock real: no hay sobreventa.",
    },
    {
      title: "Una sola conversión a USD",
      why: "Cliente y servidor usan la misma función de conversión a USD, con tolerancia de redondeo, así el total que ve el vendedor es el que valida la API. Cada venta guarda el monto en dólares, en bolívares y la tasa BCV del día.",
    },
    {
      title: "Tasa BCV diaria, con carga manual",
      why: "La tasa oficial se toma del sitio del Banco Central de Venezuela (BCV) una vez por día y también se puede cargar a mano. La carga automática nunca pisa una tasa manual.",
    },
    {
      title: "Paneles por vendedor, en páginas y en API",
      why: "El administrador habilita paneles a cada vendedor, y el permiso se aplica en la página y en la API: un vendedor no llega a un dato por una URL directa.",
    },
  ],
  decisionsLead: "Lo que mantiene exactos el stock y el costo de lo vendido, con dos monedas y una tasa que cambia cada día.",
  // Casi no hay tests (spec): la sección de calidad se omite. TypeScript estricto va en las prácticas y el endpoint de
  // integridad, en la decisión del costo FIFO.
  quality: [],
  figures: {
    in: "ficha",
    items: [
      { value: "26", label: "pantallas" },
      { value: "59", label: "rutas de API" },
      { value: "31", label: "modelos" },
    ],
  },
  parts: ["Panel web", "API con guardas por rol", "Etiquetas TSPL"],
  focus: ["Base de datos: costo FIFO por lote y stock bloqueado con SELECT … FOR UPDATE"],
  status: "En uso en MonJeep y GlobalFia · demo en stockie.envo-demo.tech",
  heroFact: "26 pantallas",
  /** La demo pública: entra al panel con datos demo, sin login. Nunca /admin ni /login. */
  liveUrl: "https://stockie.envo-demo.tech/demo",
  demoUrl: "https://stockie.envo-demo.tech/demo",
  sheet: {
    architecture:
      "Next.js con proxy de sesión y API con guardas por rol; las transacciones de stock-core escriben en PostgreSQL y la tasa del BCV entra por su propia API.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth", "Zod", "WebUSB"],
    practices: [
      "Lógica de negocio concentrada en las transacciones de stock-core",
      "Guardas por rol en páginas y API",
      "Migraciones de Prisma",
      "TypeScript estricto",
    ],
    patterns: ["Costeo FIFO", "Pessimistic locking (SELECT … FOR UPDATE)"],
    short: {
      architecture: "Next.js con guardas por rol y transacciones de stock",
      stack: "Next.js, TypeScript, Prisma, PostgreSQL, Zod",
      practices: "Transacciones, guardas por rol, migraciones",
      patterns: "Costeo FIFO, SELECT … FOR UPDATE",
    },
  },
};

const clubZapateo: CaseStudy = {
  slug: "club-zapateo",
  name: "Club Zapateo",
  tagline:
    "Venta de entradas en producción en clubzapateo.com, con panel de administración, conciliación con Mercado Pago y control de acceso en la puerta.",
  lead: "Venta de entradas con Mercado Pago y control de acceso en la puerta.",
  moment: "pinned-chapters",
  homeFacts: [
    "Nunca se vende por encima de la capacidad ni se emite una entrada de más: transacción Serializable e idempotente",
    "Si Mercado Pago no avisa un pago, la conciliación lo detecta y lo corrige",
    "252 tests con Vitest y CI con lint, tipos, cobertura y build",
  ],
  problem:
    "Club Zapateo vende entradas con Mercado Pago y las controla en la puerta con un QR. Si el aviso de un pago no llega, alguien pagó y no tiene entrada. Si dos compras llegan juntas, se puede vender por encima de la capacidad. Si un QR sirve en otro evento, la puerta deja pasar a quien no corresponde.",
  heroShot: { ...zapateoShots.dashboard, focus: { x: 0.18, y: 0.08, w: 0.64 } },
  heroSets: [
    { label: "Sitio público", line: "Los eventos salen de la base; se paga con Mercado Pago y cada entrada llega por email con su QR.", main: { ...zapateoShots.home, focus: { x: 0.04, y: 0.075, w: HERO_MAIN_W } }, side: zapateoShots.door },
    { label: "Administración", line: "Conciliación con Mercado Pago, con simulación antes de aplicar, y eventos con afiche.", main: { ...zapateoShots.reconciliation, focus: { x: 0.185, y: 0.125, w: HERO_MAIN_W } }, side: { ...zapateoShots.events, focus: { x: 0.5, y: 0.2, w: HERO_SIDE_W } } },
    { label: "Puerta", line: "PIN, evento activo, QR o código y contadores en vivo.", main: zapateoShots.door, side: { ...zapateoShots.dashboard, focus: { x: 0.18, y: 0.08, w: HERO_SIDE_W } } },
  ],
  screens: "Tres lugares sobre la misma base: el sitio con su checkout, el panel de administración y la app de la puerta.",
  roles: [
    {
      role: "Público y comprador",
      summary:
        "Los eventos salen de la base de datos. El comprador paga con el checkout de Mercado Pago, recibe un email con un QR por entrada y puede verificar el estado de su entrada en una página pública. La animación 3D de la portada, hecha con Spline, tiene un modo liviano para equipos lentos y para quien pide reducir movimiento.",
      shots: [zapateoShots.home],
    },
    {
      role: "Administración",
      summary:
        "Vive en un subdominio propio, aislado por middleware. Tiene el dashboard con recaudación, entradas emitidas y usadas, pagos sin entrada y vendidas contra capacidad; eventos con afiches que se crean, publican, pausan y archivan; conciliación con Mercado Pago, búsqueda de órdenes y emisión manual.",
      shots: [zapateoShots.reconciliation, zapateoShots.events],
    },
    {
      role: "Staff de puerta",
      summary:
        "Entra con un PIN y elige el evento activo, para que una entrada no sirva en otro. Escanea el QR con la cámara o tipea el código, y ve los contadores en vivo.",
      shots: [zapateoShots.door],
    },
  ],
  diagram: {
    preset: "free",
    nodes: [
      { id: "buyer", label: "Comprador", at: [0.07, 0.3], atCompact: [0.3, 0.07] },
      { id: "mp", label: "Mercado Pago", icon: "mercadopago", sub: "preferencia idempotente", at: [0.26, 0.3], atCompact: [0.3, 0.25] },
      { id: "webhook", label: "Webhook", sub: "HMAC en tiempo constante", at: [0.46, 0.3], atCompact: [0.3, 0.43] },
      { id: "emit", label: "Emisión", icon: "prisma", sub: "transacción Serializable", at: [0.66, 0.3], atCompact: [0.3, 0.61] },
      { id: "mail", label: "Email con QR", icon: "resend", sub: "una entrada, un QR", at: [0.86, 0.3], atCompact: [0.78, 0.61] },
      { id: "pg", label: "PostgreSQL en Neon", icon: "postgres", at: [0.66, 0.76], atCompact: [0.25, 0.82] },
      { id: "admin", label: "Administración y puerta", sub: "concilia y controla", at: [0.38, 0.76], atCompact: [0.72, 0.82] },
    ],
    edges: [
      { from: "buyer", to: "mp" },
      { from: "mp", to: "webhook" },
      { from: "webhook", to: "emit" },
      { from: "emit", to: "pg" },
      { from: "emit", to: "mail" },
      { from: "admin", to: "pg" },
      { from: "admin", to: "mp", curve: "elbow" },
    ],
    shots: [["buyer>mp", "mp>webhook", "webhook>emit", ["emit>pg", "emit>mail"]], ["admin>pg", "admin>mp"]],
    alt: "El comprador paga en Mercado Pago, que avisa por un webhook verificado con HMAC. La entrada se emite en una transacción Serializable sobre PostgreSQL en Neon y Resend envía el email con el QR. La administración y la puerta leen la misma base, y la administración concilia contra Mercado Pago.",
  },
  decisions: [
    {
      title: "Emisión en transacción Serializable",
      why: "Cada entrada se emite en una transacción Serializable con reintentos que controla la capacidad del evento. La clave única de orden más índice de entrada hace que un aviso repetido no emita una entrada de más.",
    },
    {
      title: "Webhook verificado y preferencia idempotente",
      why: "El aviso de Mercado Pago se verifica con HMAC y comparación en tiempo constante. La preferencia de pago se crea con clave de idempotencia, así un reintento no genera una preferencia duplicada.",
    },
    {
      title: "Conciliación con simulación previa",
      why: "El panel cruza las órdenes con Mercado Pago y encuentra pagos aprobados sin entrada, webhooks que nunca llegaron, pagos trabados y emails sin enviar. Primero muestra qué va a corregir y después lo aplica.",
    },
    {
      title: "Credenciales, sesiones y validación",
      why: "Contraseñas con scrypt, sesiones en cookies firmadas httpOnly con sameSite strict y el PIN de la puerta comparado en tiempo constante. Los datos se validan con Zod.",
    },
  ],
  decisionsLead: "Lo que impide vender por encima de la capacidad, emitir una entrada de más o dejar sin entrada a quien pagó.",
  qualityLead: "Lo que consta en el repositorio: los tests y el CI que los corre.",
  /* evidencia, no la lista de prácticas de la ficha: la cifra de tests, su cobertura y el CI como visual */
  quality: ["La cobertura de los tests se mide en el CI, en el mismo paso que los corre."],
  qualityPanel: {
    title: "CI en GitHub Actions",
    alt: "El CI de GitHub Actions de Club Zapateo corre lint, tipos, los tests con cobertura y el build.",
    steps: [
      { label: "Lint", icon: "ui-file-text" },
      { label: "Tipos", icon: "typescript", note: "TypeScript" },
      { label: "Tests con cobertura", icon: "vitest", note: "Vitest" },
      { label: "Build", icon: "nextjs", note: "Next.js 14" },
    ],
  },
  figures: { in: "calidad", items: [{ value: "252", label: "tests con Vitest" }] },
  parts: ["Sitio público", "Checkout con Mercado Pago", "Panel de administración", "App de puerta"],
  focus: ["Pagos: webhook verificado con HMAC y conciliación", "Concurrencia: emisión Serializable e idempotente"],
  status: "En producción en clubzapateo.com",
  heroFact: "252 tests",
  sheet: {
    architecture:
      "Next.js 14 con Prisma sobre PostgreSQL en Neon; Mercado Pago avisa por webhook, la emisión corre en una transacción y Resend envía las entradas. La administración vive en un subdominio aparte.",
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Mercado Pago", "Resend", "Vercel Blob", "Spline", "Zod", "Vitest"],
    practices: [
      "CI en GitHub Actions: lint, tipos, tests con cobertura y build",
      "Hook de pre-commit",
      "Validación con Zod",
    ],
    patterns: [
      "Idempotencia (clave única de orden e índice de entrada)",
      "Transacción Serializable con reintentos",
      "HMAC con comparación en tiempo constante",
    ],
    short: {
      architecture: "Next.js 14, Prisma y Neon, con webhook de Mercado Pago",
      stack: "Next.js 14, Prisma, PostgreSQL, Mercado Pago, Resend",
      practices: "CI en GitHub Actions, pre-commit y Zod",
    },
  },
  liveUrl: "https://clubzapateo.com",
};

export const cases: CaseStudy[] = [envo, stockie, clubZapateo];

export function caseBySlug(slug: CaseSlug): CaseStudy {
  const found = cases.find((c) => c.slug === slug);
  if (!found) throw new Error(`Caso desconocido: ${slug}`);
  return found;
}
