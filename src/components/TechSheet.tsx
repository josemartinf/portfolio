import type { ReactNode } from "react";
import type { TechSheet as Sheet } from "@/data/types";

type Part = "architecture" | "stack" | "practices" | "patterns";

/**
 * La ficha técnica de un proyecto: arquitectura, stack, prácticas y patrones. Una parte vacía no se muestra
 * (ni su rótulo). `compact` (la portada) pone cada parte en una línea, con `sheet.short` cuando lo hay; sin él (la página de caso),
 * cada práctica y cada patrón van en su propia línea. Los patrones van en la letra del texto; en mono solo lo que sale
 * del código tal cual (`FOR UPDATE SKIP LOCKED`, `HMAC`).
 * `rows` antepone filas propias de la página (en la portada: partes, enfoque y estado) y `after` las agrega al final
 * (en el caso: el enfoque); `only` deja solo esas partes
 * de la ficha (la portada muestra el stack; la ficha completa vive en la página de caso).
 */
const IDENT = /((?:SELECT|FOR UPDATE|SKIP LOCKED|HMAC)(?:[ …]+(?:SELECT|FOR UPDATE|SKIP LOCKED))*)/;
function idents(text: string): ReactNode {
  const parts = text.split(IDENT);
  return parts.length === 1 ? text : parts.map((t, i) => (i % 2 === 1 ? <code key={i}>{t}</code> : t));
}
export type SheetRow = { label: string; content: ReactNode; className?: string };
export function TechSheet({ sheet, compact = false, rows = [], after = [], only, className }: { sheet: Sheet; compact?: boolean; rows?: SheetRow[]; after?: SheetRow[]; only?: Part[]; className?: string }) {
  const short = compact ? sheet.short ?? {} : {};
  const parts: { key: Part; label: string; items: string[]; short?: string; mono?: boolean; sentence?: boolean }[] = [
    { key: "architecture" as const, label: "Arquitectura", items: sheet.architecture.trim() ? [sheet.architecture] : [], short: short.architecture, sentence: true },
    { key: "stack" as const, label: "Stack", items: sheet.stack, short: short.stack },
    { key: "practices" as const, label: "Prácticas", items: sheet.practices, short: short.practices },
    { key: "patterns" as const, label: "Patrones", items: sheet.patterns, short: short.patterns, mono: true },
  ].filter((p) => p.items.length > 0 && (!only || only.includes(p.key)));
  return <dl className={`sheet${compact ? " sheet--compact" : ""}${className ? ` ${className}` : ""}`}>
    {rows.map((r) => <div className="sheet__row" key={r.label}><dt className="t-label">{r.label}</dt><dd className={r.className}>{r.content}</dd></div>)}
    {parts.map((p) => <div className="sheet__row" key={p.label}>
      <dt className="t-label">{p.label}</dt>
      {compact || p.sentence
        ? <dd>{(p.mono ? idents : (t: string) => t)(compact && p.short ? p.short : p.items.join(p.sentence ? " " : ", "))}</dd>
        : <dd><ul className="sheet__list">{p.items.map((i) => <li key={i}>{p.mono ? idents(i) : i}</li>)}</ul></dd>}
    </div>)}
    {after.map((r) => <div className="sheet__row" key={r.label}><dt className="t-label">{r.label}</dt><dd className={r.className}>{r.content}</dd></div>)}
  </dl>;
}

/** Las partes del sistema como una línea corrida, separadas por un punto medio. */
export function Parts({ parts }: { parts: string[] }) {
  return <span className="parts">{parts.join(" · ")}</span>;
}

/** Los puntos de enfoque, cortos: el tema de cada uno (lo que va antes de los dos puntos). */
export function Focus({ focus }: { focus: string[] }) {
  return <span className="focus">{focus.map((f) => f.split(":")[0].trim()).join(" · ")}</span>;
}

const hostOf = (url: string) => new URL(url).host.replace(/^www\./, "");

/** Un estado con cada dominio que nombra convertido en su link (externo) a esa URL. */
export function StatusText({ text, urls }: { text: string; urls: string[] }) {
  const pieces: (string | { host: string; url: string })[] = [text];
  for (const url of urls) {
    const h = hostOf(url);
    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i];
      if (typeof p !== "string" || !p.includes(h)) continue;
      const at = p.indexOf(h);
      pieces.splice(i, 1, p.slice(0, at), { host: h, url }, p.slice(at + h.length));
      break;
    }
  }
  return <>{pieces.map((p, i) => typeof p === "string" ? p : <a key={i} href={p.url} target="_blank" rel="noopener noreferrer">{p.host}</a>)}</>;
}
