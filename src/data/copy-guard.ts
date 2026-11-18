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
 * Cadenas privadas que nunca van al sitio. Se arman concatenando
 * partes para que ninguna de esas cadenas aparezca literal en src/.
 */
export const FORBIDDEN_ORIGIN: RegExp[] = [
  new RegExp("origen" + "-a", "i"),
  new RegExp("origen" + "-b", "i"),
  new RegExp("origen" + "-c", "i"),
];

/** Formas de secretos que aparecieron en los repos: Mercado Pago, Resend y URLs de Postgres con credenciales. */
export const SECRET_PATTERNS: RegExp[] = [
  /APP_USR-/,
  /\bre_[A-Za-z0-9]{20,}/,
  /postgres(ql)?:\/\/[^ "]*:[^ "]*@/,
];

/** Todo el texto de los módulos de datos y de `site`, concatenado. */
export function allCopy(): string {
  return JSON.stringify([cases, sites, tools, jobs, education, stackIcons, currentFact, site]);
}
