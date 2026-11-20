import { cases } from "./cases";
import { sites } from "./sites";
import { tools } from "./tools";
import { currentFact, education, jobs, stackIcons } from "./profile";
import { site } from "../lib/site";

/** Frases de venta o de búsqueda laboral, y adjetivos sobre sí mismo. */
export const FORBIDDEN_COPY: RegExp[] = [
  /contrat(a|á)me/i,
  /busco (trabajo|equipo|empresa)/i,
  /disponible para/i,
  /presupuesto/i,
  /tu negocio/i,
  /soluciones/i,
  // Con \b: "potenciar" sí, "idempotencia" no.
  /\bpotenci/i,
  /apasionad/i,
];

/**
 * Rastros del origen de Envo y la dirección postal del PDF. Se arman concatenando
 * partes para que ninguna de esas cadenas aparezca literal en src/.
 */
export const FORBIDDEN_ORIGIN: RegExp[] = [
  new RegExp("good[\\s-]?" + "trip", "i"),
  new RegExp("multi" + "-?rider", "i"),
  new RegExp("Pedro " + "Rivera", "i"),
];

/** Formas de secretos que aparecieron en los repos: Mercado Pago, Resend y URLs de Postgres con credenciales. */
export const SECRET_PATTERNS: RegExp[] = [
  /APP_USR-/,
  /\bre_[A-Za-z0-9]{20,}/,
  /postgres(ql)?:\/\/[^ "]*:[^ "]*@/,
];

/**
 * Nombres de mecanismos que no van en la portada: ahí se cuenta el resultado en lenguaje de negocio, y el cómo vive en
 * la página de cada caso (y en Experiencia y Stack, que son el CV). Los nombres de tecnologías (Next.js, PostgreSQL)
 * sí van, en la línea de stack de cada proyecto.
 */
export const HOME_JARGON =
  /tsvector|pg_trgm|trigger|FOR UPDATE|SKIP LOCKED|PGlite|outbox|worker|middleware|idempoten|Serializable|circuit breaker|dead letter|backoff|HIDAPI|libusb|\bLRU\b|reply-to|\bSSE\b|NOTIFY|\bCI\b|\blint\b|FIFO|TSPL|\baxe\b|\be2e\b|\bspecs?\b/i;

/** Todo el texto de los módulos de datos y de `site`, concatenado. */
export function allCopy(): string {
  return JSON.stringify([cases, sites, tools, jobs, education, stackIcons, currentFact, site]);
}
