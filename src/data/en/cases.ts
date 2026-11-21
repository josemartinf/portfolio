import type { CaseSlug, CaseStudy, Shot } from "../types";
import { HERO_MAIN_W, HERO_SIDE_W } from "../cases";

export { HERO_MAIN_W, HERO_SIDE_W };

/* Espejo en inglés de ../cases.ts: la misma forma, el mismo orden y los mismos datos (slugs, capturas, recortes, URLs,
   nodos y cifras); solo cambia el texto. Los recortes de la barra lateral se repiten acá porque ../cases.ts no los exporta. */

const ENVO_SIDE = { x: 0.176, w: 0.824 };
const envoShots = {
  orders: { src: "/projects/envo-orders.webp", alt: "An open Envo order with its payment receipt, ready for review", frame: "browser", title: "Order with receipt", focus: { x: 0.176, y: 0.07, w: 0.824 } },
  cash: { src: "/projects/envo-cash.webp", alt: "Envo's courier cash screen with each courier's settlements", frame: "browser", title: "Courier cash", focus: ENVO_SIDE },
  zones: { src: "/projects/envo-zones.webp", alt: "Envo delivery zones with their rain, night and holiday surcharges", frame: "browser", title: "Zones and surcharges", focus: { x: 0.1325, w: 0.8675 } },
  inventory: { src: "/projects/envo-inventory.webp", alt: "Envo inventory split by location", frame: "browser", title: "Inventory by location", focus: ENVO_SIDE },
  alerts: { src: "/projects/envo-alerts.webp", alt: "Alerts and system health in the Envo dashboard", frame: "browser", title: "Alerts and health", focus: ENVO_SIDE },
  reports: { src: "/projects/envo-reports.webp", alt: "Envo's results screen with the option to export to CSV", frame: "browser", title: "Results", focus: ENVO_SIDE },
  permissions: { src: "/projects/envo-staff-permissions.webp", alt: "Granular permissions for a team member in Envo", frame: "browser", title: "Staff permissions", focus: ENVO_SIDE },
  courier: { src: "/projects/envo-courier-phone.webp", alt: "Envo's Telegram Mini App with an order taken by the courier", frame: "phone", title: "Courier Mini App" },
} satisfies Record<string, Shot>;

const STOCKIE_SIDE = { x: 0.116, w: 0.884 };
const stockieShots = {
  intake: { src: "/projects/stockie-intake.webp", alt: "Stock intake in Stockie, with label printing", frame: "browser", title: "Stock intake" },
  fiscal: { src: "/projects/stockie-fiscal.webp", alt: "Stockie fiscal stock by product", frame: "browser", title: "Fiscal stock", focus: STOCKIE_SIDE },
  suppliers: { src: "/projects/stockie-suppliers.webp", alt: "Stockie suggested order: a supplier's products below minimum stock, how much to order and the estimated cost", frame: "browser", title: "Suggested order", focus: { x: 0.116, w: 0.7 } },
  credits: { src: "/projects/stockie-credits.webp", alt: "Stockie credit sales to approve, collect or void", frame: "browser", title: "Credit sales", focus: { x: 0.116, w: 0.62 } },
  reports: { src: "/projects/stockie-reports.webp", alt: "Stockie sales reports", frame: "browser", title: "Reports", focus: { x: 0.116, w: 0.82 } },
  sale: { src: "/projects/stockie-sale.webp", alt: "A new sale in Stockie with the day's BCV rate and a split payment", frame: "browser", title: "Sale with split payment", focus: STOCKIE_SIDE },
  seller: { src: "/projects/stockie-seller-dashboard.webp", alt: "A salesperson's own dashboard in Stockie", frame: "browser", title: "Salesperson dashboard", focus: STOCKIE_SIDE },
} satisfies Record<string, Shot>;

const zapateoShots = {
  home: { src: "/projects/club-zapateo-home.webp", alt: "Club Zapateo's public site with events on sale", frame: "browser", title: "Public site" },
  door: { src: "/projects/club-zapateo-staff-phone.webp", alt: "Club Zapateo's door screen on a phone, showing a validated ticket", frame: "phone", title: "Door check-in" },
  reconciliation: { src: "/projects/club-zapateo-admin-reconciliation.webp", alt: "Club Zapateo's Mercado Pago reconciliation, with a dry run before changes are applied", frame: "browser", title: "Mercado Pago reconciliation", short: "Reconciliation" },
  events: { src: "/projects/club-zapateo-admin-events.webp", alt: "Club Zapateo events in the admin panel, with their status and poster", frame: "browser", title: "Events" },
  dashboard: { src: "/projects/club-zapateo-admin-dashboard.webp", alt: "Club Zapateo's admin dashboard with revenue, tickets issued and used, and tickets sold against capacity", frame: "browser", title: "Admin dashboard", short: "Dashboard" },
} satisfies Record<string, Shot>;

const envo: CaseStudy = {
  slug: "envo",
  name: "Envo",
  tag: "product",
  tagline:
    "An ordering and delivery platform for a team of couriers: an operations dashboard, a Telegram Mini App for couriers and an ordering page for customers.",
  lead: "Orders and deliveries with a team of couriers, over Telegram and WhatsApp.",
  moment: "counter-rolls",
  homeFacts: [
    "No notification gets lost, even when Telegram or WhatsApp is down: it's stored and sent once the channel is back up",
    "Payments in pesos, dollars and euros, with each courier's cash kept separate by currency",
    "2938 automated tests, including accessibility checks",
  ],
  problem:
    "A delivery operation with several couriers takes orders over Telegram and WhatsApp, gets paid in pesos, dollars and euros, and notifies every party at every step of an order. If a notification gets lost, the order gets stuck; if a payment is recorded twice, the cash doesn't balance. I built Envo so that neither happens, even when a channel is down.",
  heroShot: {
    src: "/projects/envo-panel.webp",
    alt: "Overview of the Envo operations dashboard, showing the Almacén del Parque demo",
    frame: "browser",
    title: "Operations dashboard",
    focus: ENVO_SIDE,
  },
  heroSets: [
    { label: "Operations", line: "Zones with surcharges, orders with receipts and inventory by location.", main: { ...envoShots.zones, focus: { x: 0.18, y: 0.04, w: HERO_MAIN_W } }, side: { ...envoShots.inventory, focus: { x: 0.17, y: 0.06, w: HERO_SIDE_W } } },
    { label: "Control", line: "Alerts and system health, results and granular permissions.", main: { ...envoShots.alerts, focus: { x: 0.19, y: 0.06, w: HERO_MAIN_W } }, side: { ...envoShots.permissions, focus: { x: 0.2, y: 0.4, w: HERO_SIDE_W } } },
    { label: "Courier", line: "Telegram Mini App: availability, delivery steps and cash by currency.", main: envoShots.courier, side: { ...envoShots.cash, focus: { x: 0.19, y: 0.06, w: HERO_SIDE_W } } },
  ],
  screens: "23 screens across three interfaces: the operations dashboard, the courier Mini App and the customer ordering page.",
  roles: [
    {
      role: "Operations, in the dashboard",
      summary:
        "The dashboard has 12 modules. For day-to-day operations: orders with courier assignment, receipt review, edits and incidents; customers with balances and referrals; products; inventory by location; zones with rain, night and holiday surcharges; and courier cash with settlements. Settings cover delivery windows, priority delivery, payment accounts and the exchange rate, which is pulled from DolarApi with validity rules.",
      shots: [envoShots.orders, envoShots.cash, envoShots.zones, envoShots.inventory],
    },
    {
      role: "Control and security, in the dashboard",
      summary:
        "Overview, help and support; alerts and system health; results with CSV export; staff with granular permissions; and an audit log. Accounts support TOTP, recovery codes and session management.",
      shots: [envoShots.alerts, envoShots.reports, envoShots.permissions],
    },
    {
      role: "Courier",
      summary:
        "A Telegram Mini App. The courier sets their availability, takes orders, moves through the delivery steps, gets notifications and keeps track of their own stock and cash by currency.",
      shots: [envoShots.courier],
    },
    {
      role: "Customer",
      summary:
        "On /pedido the customer builds a cart from the catalog, picks a zone and a delivery window or priority delivery, and pays in ARS, USD or EUR, with split payments or their account balance. They can change or cancel the order and report a problem with a photo.",
      shots: [],
    },
  ],
  diagram: {
    preset: "free",
    nodes: [
      { id: "tg", label: "Telegram", icon: "telegram", sub: "chat and Mini App", at: [0.08, 0.28], atCompact: [0.25, 0.08] },
      { id: "wa", label: "WhatsApp", icon: "whatsapp", sub: "customer chat", at: [0.08, 0.72], atCompact: [0.75, 0.08] },
      { id: "n8n", label: "n8n", icon: "n8n", sub: "HMAC-signed events", at: [0.3, 0.5], atCompact: [0.5, 0.28] },
      { id: "api", label: "API", icon: "nextjs", sub: "Next.js, idempotent commands", at: [0.52, 0.24], atCompact: [0.25, 0.5] },
      { id: "pg", label: "PostgreSQL", icon: "postgres", sub: "outbox and NOTIFY", at: [0.74, 0.5], atCompact: [0.5, 0.72] },
      { id: "worker", label: "Worker", icon: "nodejs", sub: "drains the outbox", at: [0.52, 0.76], atCompact: [0.75, 0.5] },
      { id: "panel", label: "Dashboard", sub: "live over SSE", at: [0.9, 0.24], atCompact: [0.5, 0.92] },
    ],
    edges: [
      { from: "tg", to: "n8n" },
      { from: "tg", to: "api" },
      { from: "wa", to: "n8n" },
      { from: "n8n", to: "api" },
      { from: "api", to: "pg" },
      { from: "pg", to: "worker" },
      { from: "worker", to: "n8n" },
      { from: "pg", to: "panel" },
      { from: "panel", to: "api" },
    ],
    shots: [["tg>n8n", "n8n>api", "api>pg"], ["tg>api", "api>pg"], ["pg>worker", "worker>n8n", ["n8n>tg", "n8n>wa"]], ["pg>panel"]],
    alt: "Telegram and WhatsApp messages go through n8n to the Next.js API, and the Telegram Mini App calls the API directly; everything is stored in PostgreSQL. The worker picks up each notification from the outbox and sends it through n8n to Telegram or WhatsApp. PostgreSQL signals with NOTIFY, and the dashboard, which works through the API, updates over SSE.",
  },
  decisions: [
    {
      title: "Transactional outbox with a circuit breaker",
      why: "Every notification goes into an outbox that the worker claims with FOR UPDATE SKIP LOCKED, with retries and backoff, and a dead letter queue that raises an alert. If a channel is down, the circuit breaker defers sending without burning retries. No notification is lost.",
    },
    {
      title: "Idempotent commands with a single lock order",
      why: "Repeating a command doesn't duplicate its effect, and every command takes its locks in the same order. That rules out deadlocks between operations competing for the same rows.",
    },
    {
      title: "Append-only courier cash ledger",
      why: "The cash ledger only adds entries, never edits them, and each entry carries a deduplication key. A retry never double-counts money.",
    },
    {
      title: "Nightly invariant checks",
      why: "Stock, reservations and cash are verified every night. If something doesn't add up, a critical alert opens, and the same check closes it once everything adds up again.",
    },
    {
      title: "SQL migrations with checksums",
      why: "All 86 migrations are written in SQL, with no ORM, and each one stores its checksum: a migration that has already been applied can't change unnoticed.",
    },
    {
      title: "Authentication, signatures and rate limiting",
      why: "Passwords hashed with argon2id, TOTP with replay protection and re-authentication for sensitive actions. Events sent to n8n are signed with HMAC and a timestamp, rate limiting runs in PostgreSQL and private files are re-encoded to WebP.",
    },
  ],
  decisionsLead: "What keeps a notification from getting lost when a channel is down, and a payment from being recorded twice.",
  qualityLead: "What runs in npm test and in the e2e specs, with the numbers from the repository.",
  quality: [
    "Integration tests against PGlite and against real PostgreSQL, with contracts shared between the two engines.",
    "The e2e specs include accessibility checks with axe.",
    "Strict TypeScript, including the worker's .mjs files.",
    "OpenAPI documents 73 of the 150 API routes.",
  ],
  figures: {
    in: "calidad",
    items: [
      { value: "2938", label: "tests passing in npm test as of Nov 17, 2026" },
      { value: "84", label: "e2e specs with axe" },
      { value: "150", label: "API routes" },
      { value: "86", label: "SQL migrations, no ORM" },
    ],
  },
  parts: ["Operations dashboard", "Courier app on Telegram", "Ordering page"],
  focus: [
    "Reliability: transactional outbox and circuit breaker",
    "Authentication: TOTP, re-authentication and granular permissions",
    "Database: 64 tables and 86 SQL migrations with checksums",
  ],
  status: "Live demo at envo-demo.tech",
  heroFact: "23 screens",
  /** La demo pública: abre el panel con datos demo, sin login. Nunca /admin ni /login. */
  liveUrl: "https://envo-demo.tech/demo",
  demoUrl: "https://envo-demo.tech/demo",
  sheet: {
    architecture:
      "Next.js API and dashboard on PostgreSQL, a worker that drains the outbox to n8n, and live dashboard updates through NOTIFY and SSE.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "n8n", "Telegram Mini App", "WhatsApp", "DolarApi", "OpenAPI"],
    practices: [
      "Test pyramid: unit tests, integration tests against PGlite and real PostgreSQL, contract tests shared by both engines, and e2e tests with accessibility checks",
      "Strict TypeScript, worker included",
      "Versioned SQL migrations with checksums",
      "API documented in OpenAPI",
    ],
    patterns: [
      "Transactional Outbox",
      "Circuit Breaker",
      "Dead Letter Queue",
      "Idempotency",
      "Append-only ledger",
      "Pessimistic locking (FOR UPDATE SKIP LOCKED)",
      "HMAC with timestamp",
      "LISTEN/NOTIFY and SSE",
    ],
    short: {
      architecture: "Next.js and PostgreSQL, an outbox worker, n8n and SSE",
      stack: "Next.js, TypeScript, PostgreSQL, n8n, Telegram",
      practices: "Test pyramid with axe, strict TS, OpenAPI",
      patterns: "Outbox, Circuit Breaker, DLQ, idempotency",
    },
  },
};

const stockie: CaseStudy = {
  slug: "stockie",
  name: "Stockie",
  tag: "product",
  tagline:
    "Inventory, warehouses and sales for auto parts stores in Venezuela, with FIFO lot costing and payments in bolívares and dollars. It started at MonJeep and GlobalFia, and both use it today.",
  lead: "Inventory, warehouses and sales for auto parts stores in Venezuela, in bolívares and dollars.",
  moment: "counter-rolls",
  homeFacts: [
    "The real margin on every sale: it knows which purchase each product came from and what was paid for it",
    "It never sells what isn't in stock: if two salespeople go for the last unit, only one of them sells it",
    "Every sale is recorded in dollars and in bolívares, at the day's official rate",
  ],
  problem:
    "An auto parts store in Venezuela sells over the counter, over WhatsApp and on credit, accepts Pago Móvil, POS terminals, cash, Zelle or USDT, and owes suppliers in both dollars and bolívares. With an exchange rate that changes every day, knowing how much stock is left and what the goods sold actually cost requires every movement to store its lot, its cost and its rate. Stockie was born inside MonJeep and GlobalFia to solve that.",
  heroShot: {
    src: "/projects/stockie-dashboard.webp",
    alt: "Stockie dashboard with sales and stock from the hardware store demo",
    frame: "browser",
    title: "Dashboard",
    focus: STOCKIE_SIDE,
  },
  heroSets: [
    { label: "Warehouse", line: "Stock intake with labels, and fiscal stock per warehouse.", main: { ...stockieShots.intake, focus: { x: 0.12, y: 0.095, w: HERO_MAIN_W } }, side: { ...stockieShots.fiscal, focus: { x: 0.12, y: 0.06, w: HERO_SIDE_W } } },
    { label: "Administration", line: "A suggested order for each supplier based on minimum stock, and credit sales to approve, collect or void.", main: { ...stockieShots.suppliers, focus: { x: 0.12, y: 0.02, w: HERO_MAIN_W } }, side: { ...stockieShots.credits, focus: { x: 0.12, y: 0.025, w: HERO_SIDE_W } } },
    { label: "Sales", line: "Point of sale with the day's official rate (BCV) and split payments.", main: { ...stockieShots.sale, focus: { x: 0.12, y: 0.07, w: HERO_MAIN_W } }, side: { ...stockieShots.seller, focus: { x: 0.12, y: 0.04, w: HERO_SIDE_W } } },
  ],
  screens: "A single panel with two roles: the admin sees everything; the salesperson sees their point of sale and whatever the admin enables for them.",
  roles: [
    {
      role: "Administration",
      summary:
        "Products with two prices plus a manual one, price history, compatible models and accent-insensitive SKU search; only the admin can sell below cost, and it's audited. Warehouses, stock intake with TSPL labels over WebUSB or USB, barcode scanning with the camera, transfers and adjustments. Suppliers with debts in dollars and bolívares, partial payments and suggested orders by minimum stock; credit sales to approve, collect and void; returns, where defective items are kept out of stock; voids with a daily limit; fiscal stock, reports and users.",
      shots: [stockieShots.intake, stockieShots.fiscal, stockieShots.suppliers, stockieShots.credits, stockieShots.reports],
    },
    {
      role: "Sales",
      summary:
        "A point of sale for counter, WhatsApp or credit sales, accepting Pago Móvil, POS terminals, cash in bolívares or dollars, Zelle or USDT, and split payments. Salespeople see their own sales and dashboard, plus the panels the admin enables for them.",
      shots: [stockieShots.sale, stockieShots.seller],
    },
  ],
  diagram: {
    preset: "free",
    nodes: [
      { id: "nav", label: "Browser", sub: "admin or salesperson", at: [0.07, 0.34], atCompact: [0.3, 0.07] },
      { id: "mw", label: "Session middleware", icon: "nextjs", sub: "before every page", at: [0.28, 0.34], atCompact: [0.3, 0.25] },
      { id: "api", label: "API", sub: "role guards", at: [0.49, 0.34], atCompact: [0.3, 0.43] },
      { id: "core", label: "stock-core", icon: "prisma", sub: "transactions", at: [0.69, 0.34], atCompact: [0.3, 0.61] },
      { id: "pg", label: "PostgreSQL", icon: "postgres", sub: "FIFO lots", at: [0.89, 0.34], atCompact: [0.3, 0.82] },
      { id: "bcv", label: "BCV rate", sub: "once a day or by hand", at: [0.38, 0.74], atCompact: [0.72, 0.61] },
      { id: "printer", label: "Label printer", sub: "TSPL over USB or to a file", at: [0.6, 0.74], atCompact: [0.7, 0.43] },
    ],
    edges: [
      { from: "nav", to: "mw" },
      { from: "mw", to: "api" },
      { from: "api", to: "core" },
      { from: "core", to: "pg" },
      { from: "bcv", to: "api" },
      { from: "api", to: "printer" },
    ],
    shots: [["nav>mw", "mw>api", "api>core", "core>pg"], ["bcv>api"], ["api>printer"]],
    alt: "The browser goes through the session middleware to the API, which applies the role guards and writes to PostgreSQL through stock-core transactions. The API fetches the BCV rate from the bank's website once a day (or uses one entered manually), and it sends labels to the printer in TSPL, over USB or as a file.",
  },
  decisions: [
    {
      title: "FIFO lot costing",
      why: "A sale consumes lots in the order they were received, and each sale line records which lot it came from and which supplier it was bought from. An integrity endpoint checks stock against the lots.",
    },
    {
      title: "Stock locked before it's deducted",
      why: "A sale locks the stock with SELECT … FOR UPDATE inside the transaction. If two salespeople sell the last unit at the same time, the second one waits and then sees the actual stock: no overselling.",
    },
    {
      title: "A single USD conversion",
      why: "Client and server use the same USD conversion function, with a rounding tolerance, so the total the salesperson sees is the one the API validates. Each sale stores the amount in dollars and in bolívares, along with the day's BCV rate.",
    },
    {
      title: "Daily BCV rate, with manual entry",
      why: "The official rate is fetched from the Central Bank of Venezuela (BCV) website once a day, and it can also be entered manually. The automatic fetch never overwrites a manually entered rate.",
    },
    {
      title: "Per-salesperson panels, enforced on pages and in the API",
      why: "The admin enables panels for each salesperson, and the permission is enforced on the page and in the API: a salesperson can't reach data through a direct URL.",
    },
  ],
  decisionsLead: "What keeps stock and the cost of goods sold accurate, with two currencies and an exchange rate that changes every day.",
  // Los tests de integración de stock-core (npm run test:db, desde el 18 de noviembre de 2026): lo que se prueba contra
  // PostgreSQL real. Las 26 pantallas siguen en el hero (heroFact).
  qualityLead: "What runs in npm run test:db against real PostgreSQL: FIFO costing and stock locking in every operation that touches them.",
  quality: [
    "Two sales of the last unit at the same time: the second waits for the lock and is rejected for insufficient stock.",
    "Ten sales against five units: five go through, in FIFO order, and no lot goes negative.",
    "Without the SELECT … FOR UPDATE, both concurrent-sale tests fail.",
    "Transferring, adjusting, voiding a sale, or closing and voiding a purchase while a sale is in progress: each warehouse's stock still equals the sum of its lots, and no lot goes negative.",
    "Each run uses its own PostgreSQL database: it creates it, applies the migrations and empties it before every test.",
  ],
  figures: {
    in: "calidad",
    items: [
      { value: "16", label: "integration tests against real PostgreSQL" },
      { value: "12", label: "unit tests for search" },
      { value: "59", label: "API routes" },
      { value: "31", label: "data models" },
    ],
  },
  parts: ["Admin panel", "Point of sale", "Label printing"],
  focus: ["Database: FIFO lot costing and stock locked with SELECT … FOR UPDATE"],
  status: "In use at MonJeep and GlobalFia · demo at stockie.envo-demo.tech",
  heroFact: "26 screens",
  /** La demo pública: entra al panel con datos demo, sin login. Nunca /admin ni /login. */
  liveUrl: "https://stockie.envo-demo.tech/demo",
  demoUrl: "https://stockie.envo-demo.tech/demo",
  sheet: {
    architecture:
      "Next.js with session middleware and an API with role guards; stock-core transactions write to PostgreSQL, and the API fetches the BCV rate from the bank's website once a day.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Better Auth", "Zod", "WebUSB"],
    practices: [
      "Business logic centralized in stock-core transactions",
      "Role guards on pages and in the API",
      "Prisma migrations",
      "Integration tests against real PostgreSQL",
      "Strict TypeScript",
    ],
    patterns: ["FIFO costing", "Pessimistic locking (SELECT … FOR UPDATE)"],
    short: {
      architecture: "Next.js with role guards and stock transactions",
      stack: "Next.js, TypeScript, Prisma, PostgreSQL, Zod",
      practices: "Transactions, tests against PostgreSQL, role guards",
      patterns: "FIFO costing, SELECT … FOR UPDATE",
    },
  },
};

const clubZapateo: CaseStudy = {
  slug: "club-zapateo",
  name: "Club Zapateo",
  tag: "client",
  tagline:
    "Ticket sales in production at clubzapateo.com, with an admin panel, Mercado Pago reconciliation and access control at the door.",
  lead: "Ticket sales with Mercado Pago and access control at the door.",
  moment: "pinned-chapters",
  homeFacts: [
    "It never sells more tickets than an event's capacity, even when many purchases come in at once",
    "Everyone who pays gets their ticket, even if Mercado Pago's payment notification never arrives: the admin panel finds those payments and issues the missing tickets",
    "252 automated tests that run on their own with every code change",
  ],
  problem:
    "Club Zapateo sells tickets through Mercado Pago and checks them at the door with a QR code. If a payment notification doesn't arrive, someone has paid and has no ticket. If two purchases arrive at the same time, the event can sell past capacity. If a QR code works at another event, the door lets in someone who shouldn't be there.",
  heroShot: { ...zapateoShots.dashboard, focus: { x: 0.18, y: 0.08, w: 0.64 } },
  heroSets: [
    { label: "Public site", line: "Events come from the database; payment goes through Mercado Pago and each ticket arrives by email with its QR code.", main: { ...zapateoShots.home, focus: { x: 0.04, y: 0.075, w: HERO_MAIN_W } }, side: zapateoShots.door },
    { label: "Administration", line: "Mercado Pago reconciliation, with a dry run before changes are applied, and events with posters.", main: { ...zapateoShots.reconciliation, focus: { x: 0.185, y: 0.125, w: HERO_MAIN_W } }, side: { ...zapateoShots.events, focus: { x: 0.5, y: 0.2, w: HERO_SIDE_W } } },
    { label: "Door", line: "PIN, active event, QR scan or typed code, and live counters.", main: zapateoShots.door, side: { ...zapateoShots.dashboard, focus: { x: 0.18, y: 0.08, w: HERO_SIDE_W } } },
  ],
  screens: "Three interfaces on the same database: the public site with its checkout, the admin panel and the door app.",
  roles: [
    {
      role: "Visitors and buyers",
      summary:
        "Events come from the database. Buyers pay through Mercado Pago checkout, get an email with one QR code per ticket and can check their ticket's status on a public page. The 3D animation on the home page, made with Spline, has a lightweight mode for slow devices and for visitors who prefer reduced motion.",
      shots: [zapateoShots.home],
    },
    {
      role: "Administration",
      summary:
        "It runs on its own subdomain, isolated by middleware. It has a dashboard with revenue, tickets issued and used, payments without a ticket and tickets sold against capacity; events with posters that can be created, published, paused and archived; Mercado Pago reconciliation, order search and manual ticket issuing.",
      shots: [zapateoShots.reconciliation, zapateoShots.events],
    },
    {
      role: "Door staff",
      summary:
        "They sign in with a PIN and pick the active event, so a ticket can't be used at a different one. They scan the QR code with the camera or type in the code, and see live counters.",
      shots: [zapateoShots.door],
    },
  ],
  diagram: {
    preset: "free",
    nodes: [
      { id: "buyer", label: "Buyer", at: [0.07, 0.3], atCompact: [0.3, 0.06] },
      { id: "mp", label: "Mercado Pago", icon: "mercadopago", sub: "idempotent preference", at: [0.26, 0.3], atCompact: [0.3, 0.22] },
      { id: "webhook", label: "Webhook", sub: "constant-time HMAC", at: [0.46, 0.3], atCompact: [0.3, 0.38] },
      { id: "emit", label: "Ticket issuing", icon: "prisma", sub: "Serializable transaction", at: [0.66, 0.3], atCompact: [0.3, 0.54] },
      { id: "mail", label: "Email with QR", icon: "resend", sub: "one ticket, one QR", at: [0.86, 0.3], atCompact: [0.72, 0.54] },
      { id: "pg", label: "PostgreSQL on Neon", icon: "postgres", at: [0.66, 0.76], atCompact: [0.3, 0.72] },
      { id: "admin", label: "Admin and door", sub: "reconciles with Mercado Pago", at: [0.38, 0.76], atCompact: [0.5, 0.92] },
    ],
    edges: [
      { from: "buyer", to: "mp" },
      { from: "mp", to: "webhook" },
      { from: "webhook", to: "emit" },
      { from: "emit", to: "pg" },
      { from: "emit", to: "mail" },
      { from: "admin", to: "pg" },
    ],
    shots: [["buyer>mp", "mp>webhook", "webhook>emit", ["emit>pg", "emit>mail"]], ["admin>pg"]],
    alt: "The buyer pays through Mercado Pago, which sends a notification to a webhook verified with HMAC. The ticket is issued in a Serializable transaction against PostgreSQL on Neon, and Resend sends the email with the QR code. The admin panel and the door app read the same database, and the admin panel reconciles against Mercado Pago.",
  },
  decisions: [
    {
      title: "Ticket issuing in a Serializable transaction",
      why: "Each ticket is issued in a Serializable transaction, with retries, that checks the event's capacity. A unique key on order plus ticket index means a duplicate notification never issues an extra ticket.",
    },
    {
      title: "Verified webhook and idempotent payment preference",
      why: "Mercado Pago's notification is verified with HMAC and a constant-time comparison. The payment preference is created with an idempotency key, so a retry doesn't create a duplicate preference.",
    },
    {
      title: "Reconciliation with a dry run first",
      why: "The admin panel matches orders against Mercado Pago and finds approved payments without a ticket, webhooks that never arrived, stuck payments and unsent emails. It shows what it's going to fix first, then applies the fixes.",
    },
    {
      title: "Credentials, sessions and validation",
      why: "Passwords hashed with scrypt, sessions in signed httpOnly cookies with sameSite strict, and the door PIN compared in constant time. Input is validated with Zod.",
    },
  ],
  decisionsLead: "What prevents selling past capacity, issuing an extra ticket or leaving someone who paid without a ticket.",
  qualityLead: "What the repository shows: the tests and the CI that runs them.",
  /* evidencia, no la lista de prácticas de la ficha: la cifra de tests, su cobertura y el CI como visual */
  quality: ["Test coverage is measured in CI, in the same step that runs the tests."],
  qualityPanel: {
    title: "CI on GitHub Actions",
    alt: "Club Zapateo's GitHub Actions CI runs lint, type checks, the tests with coverage and the build.",
    steps: [
      { label: "Lint", icon: "ui-file-text" },
      { label: "Type check", icon: "typescript", note: "TypeScript" },
      { label: "Tests with coverage", icon: "vitest", note: "Vitest" },
      { label: "Build", icon: "nextjs", note: "Next.js 14" },
    ],
  },
  figures: { in: "calidad", items: [{ value: "252", label: "tests with Vitest" }] },
  parts: ["Online sales with Mercado Pago", "Admin panel", "QR access control"],
  focus: ["Payments: HMAC-verified webhook and reconciliation", "Concurrency: Serializable, idempotent ticket issuing"],
  status: "Live at clubzapateo.com",
  heroFact: "252 tests",
  sheet: {
    architecture:
      "Next.js 14 with Prisma on PostgreSQL (Neon); Mercado Pago notifies via webhook, ticket issuing runs in a transaction and Resend emails the tickets. The admin panel runs on a separate subdomain.",
    stack: ["Next.js 14", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Mercado Pago", "Resend", "Vercel Blob", "Spline", "Zod", "Vitest"],
    practices: [
      "CI on GitHub Actions: lint, type check, tests with coverage and build",
      "Pre-commit hook",
      "Validation with Zod",
    ],
    patterns: [
      "Idempotency (unique key on order and ticket index)",
      "Serializable transaction with retries",
      "HMAC with constant-time comparison",
    ],
    short: {
      architecture: "Next.js 14, Prisma and Neon, with a Mercado Pago webhook",
      stack: "Next.js 14, Prisma, PostgreSQL, Mercado Pago, Resend",
      practices: "CI on GitHub Actions, pre-commit and Zod",
    },
  },
  liveUrl: "https://clubzapateo.com",
};

/** La ventana del hero de la home: el bloque "Salud del sistema" de la pantalla de Alertas de Envo, solo
 *  (scripts/capture.mjs envo envo-health, contra la demo pública). */
export const envoHealthShot: Shot = {
  src: "/projects/envo-health.webp",
  alt: "System health in the Envo dashboard: the dashboard and API, the database, the task processor, notifications, automations and the Telegram channel, all operational",
  frame: "browser",
  title: "System health",
  height: 850,
};

export const cases: CaseStudy[] = [envo, stockie, clubZapateo];

export function caseBySlug(slug: CaseSlug): CaseStudy {
  const found = cases.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown case: ${slug}`);
  return found;
}
