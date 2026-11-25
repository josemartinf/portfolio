import { existsSync, readFileSync } from "node:fs";
import { cases } from "./cases";
import { sites } from "./sites";
import { tools } from "./tools";
import { currentFact, education, jobs, languages, stackIcons } from "./profile";
import { cases as casesEn } from "./en/cases";
import { sites as sitesEn } from "./en/sites";
import { tools as toolsEn } from "./en/tools";
import { currentFact as currentFactEn, education as educationEn, jobs as jobsEn, languages as languagesEn } from "./en/profile";
import { site } from "../lib/site";
import { ui } from "../i18n/ui";

/** Frases de venta o de búsqueda laboral, y adjetivos sobre sí mismo, en los dos idiomas. */
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
  // las mismas en inglés
  /hire me/i,
  /looking for (a )?(job|work|team|company|role)/i,
  /available for/i,
  /your business/i,
  /solutions/i,
  /passionate/i,
  /cutting[- ]edge/i,
  /seamless/i,
];

/**
 * Cadenas privadas que nunca van al sitio. No viven en el repo (es público): se leen de .copy-guard.local.json, una lista
 * de expresiones que git ignora. Sin ese archivo (en CI o en un clon nuevo) la lista queda vacía.
 */
export function privatePatterns(json: string | null): RegExp[] {
  return json === null ? [] : (JSON.parse(json) as string[]).map((p) => new RegExp(p, "i"));
}
const LOCAL = ".copy-guard.local.json";
export const FORBIDDEN_ORIGIN: RegExp[] = privatePatterns(existsSync(LOCAL) ? readFileSync(LOCAL, "utf8") : null);

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

/** Todo el texto de los módulos de datos (en los dos idiomas), de `site` y de la interfaz, concatenado. */
export function allCopy(): string {
  return JSON.stringify([cases, sites, tools, jobs, education, stackIcons, currentFact, languages, site,
    casesEn, sitesEn, toolsEn, jobsEn, educationEn, currentFactEn, languagesEn, ui]);
}
