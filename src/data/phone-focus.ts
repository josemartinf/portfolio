import type { Focus } from "./types";

/* El encuadre de cada captura de escritorio en un teléfono. Entera, una pantalla de 1600 px en 342 deja su texto en
   unos 3 px: no se lee. Acá cada una elige la parte que cuenta algo (desde `x`, `y`, `w` del ancho) y la ventana del
   teléfono muestra solo eso, más grande; en los casos, un toque abre la captura entera (public/site.js).
   Va por archivo y no por proyecto: la misma captura se encuadra igual en la portada y en su caso, en los dos idiomas.
   Una captura sin entrada se ve como en escritorio (envo-health ya es un bloque recortado; la tienda de Moodi y el sitio de Club Zapateo se leen). */
export const PHONE_FOCUS: Record<string, Focus> = {
  "/projects/envo-panel.webp": { x: 0.185, w: 0.5 },
  "/projects/envo-orders.webp": { x: 0.615, y: 0.02, w: 0.385 },
  "/projects/envo-cash.webp": { x: 0.19, y: 0.06, w: 0.5 },
  "/projects/envo-zones.webp": { x: 0.195, y: 0.05, w: 0.43 },
  "/projects/envo-inventory.webp": { x: 0.185, y: 0.02, w: 0.5 },
  "/projects/envo-alerts.webp": { x: 0.19, y: 0.06, w: 0.5 },
  "/projects/envo-reports.webp": { x: 0.19, w: 0.4 },
  "/projects/envo-staff-permissions.webp": { x: 0.19, y: 0.06, w: 0.52 },
  "/projects/stockie-dashboard.webp": { x: 0.122, y: 0.02, w: 0.445 },
  "/projects/stockie-intake.webp": { x: 0.12, w: 0.46 },
  "/projects/stockie-fiscal.webp": { x: 0.12, w: 0.5 },
  "/projects/stockie-suppliers.webp": { x: 0.12, w: 0.56 },
  "/projects/stockie-credits.webp": { x: 0.12, w: 0.42 },
  "/projects/stockie-reports.webp": { x: 0.12, w: 0.57 },
  "/projects/stockie-sale.webp": { x: 0.12, w: 0.5 },
  "/projects/stockie-seller-dashboard.webp": { x: 0.12, w: 0.5 },
  "/projects/club-zapateo-admin-dashboard.webp": { x: 0.185, y: 0.07, w: 0.415 },
  "/projects/club-zapateo-admin-reconciliation.webp": { x: 0.185, y: 0.125, w: 0.46 },
  "/projects/repuestos-globalfia.webp": { x: 0.04, y: 0.12, w: 0.52 },
  "/projects/aether-aerospace-care.webp": { x: 0.14, y: 0.09, w: 0.79 },
  "/projects/rd550-panel.webp": { x: 0.18, y: 0.06, w: 0.56 },
};
