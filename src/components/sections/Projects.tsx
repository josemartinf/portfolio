import type { CaseSlug, ProjectTag, Shot, TechSheet } from "@/data/types";
import { type Locale, localePath } from "@/i18n";
import { content } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { BrowserFrame, PhoneFrame } from "@/components/Frame";
import { StatusText } from "@/components/TechSheet";
import { Tag } from "@/components/Tag";

/* #proyectos (spec 2026-11-20-portada-editorial): la única sección de proyectos de la portada, una grilla de siete
   bloques rectos numerados. Primero los tres casos, más grandes (Envo y Stockie, Club Zapateo y GlobalFia: 7 y 5
   columnas), después los sitios y la herramienta (4, 4 y 4). Cada bloque: el número y la etiqueta en mono, la captura
   arriba (se funde con el bloque antes del texto: el texto nunca va encima de la imagen), el nombre y su línea; los
   casos suman sus tres hechos, su estado y "Ver el detalle", los sitios su estado y la línea de stack.
   La captura lleva al caso o al sitio en vivo, fuera del orden del teclado (el link de texto es el mismo destino).
   Lo que salió de la portada (las partes, el diagrama de Envo, las viñetas de los sitios) sigue en cada caso. */

type Tile = {
  n: string; slug: string; name: string; tag: ProjectTag; size: "l" | "m" | "s"; lead: string;
  facts?: string[]; status?: string; urls: string[]; stack?: string;
  caseHref?: string; liveUrl?: string; relatedCase?: CaseSlug; shot?: Shot; phone?: Shot;
};

/** El orden fija la grilla del spec: 7/5, 7/5 y 4/4/4. */
const SIZES: Tile["size"][] = ["l", "m", "l", "m", "s", "s", "s"];

/** La línea de stack de la portada: la ficha corta cuando la hay (la misma que mostraban las tarjetas: sin nombres de
 *  mecanismos, HOME_JARGON), si no la lista entera, con puntos medios pegados a la palabra de antes (un renglón
 *  nunca empieza con un punto). */
const stackLine = (sheet: TechSheet) => (sheet.short?.stack?.split(", ") ?? sheet.stack).join("\u00a0· ");

/** Un nombre con guion y número ("SS-550") no se corta en el guion: va en un span sin cortes. */
const keep = (text: string) => text.split(/(\S+-\d\S*)/).map((t, i) => (i % 2 === 1 ? <span key={i} className="nowrap">{t}</span> : t));

function tilesOf(locale: Locale): Tile[] {
  const { cases, envoHealthShot, sites, tools } = content(locale);
  const all: Omit<Tile, "n" | "size">[] = [
    ...cases.map((c) => ({
      slug: c.slug, name: c.name, tag: c.tag, lead: c.lead, facts: c.homeFacts, status: c.status,
      urls: c.liveUrl ? [c.liveUrl] : [], caseHref: localePath(locale, `/${c.slug}`),
      shot: c.slug === "envo" ? envoHealthShot : c.heroShot,
      phone: c.roles.flatMap((r) => r.shots).find((s) => s.frame === "phone"),
    })),
    ...sites.map((s) => ({
      slug: s.slug, name: s.name, tag: s.tag, lead: s.summary, status: s.status,
      urls: [s.liveUrl, ...(s.moreLinks ?? []).map((l) => l.url)], stack: stackLine(s.sheet),
      liveUrl: s.liveUrl, relatedCase: s.relatedCase, shot: s.shot,
    })),
    ...tools.map((t) => ({ slug: t.slug, name: t.name, tag: t.tag, lead: t.summary, urls: [], stack: stackLine(t.sheet), shot: t.shot })),
  ];
  return all.map((t, i) => ({ ...t, n: String(i + 1).padStart(2, "0"), size: SIZES[i] ?? "s" }));
}

function Media({ t }: { t: Tile }) {
  if (!t.shot) return null;
  const frame = <>
    <BrowserFrame shot={t.shot} sizes={t.size === "s" ? "(max-width: 639px) 92vw, 480px" : "(max-width: 639px) 92vw, 760px"} />
    {t.phone && <PhoneFrame shot={t.phone} className="ptile__phone" />}
  </>;
  const href = t.caseHref ?? t.liveUrl;
  return <div className="ptile__media">{href
    ? <a className="ptile__media-link" href={href} tabIndex={-1} aria-hidden="true" {...(t.caseHref ? {} : { target: "_blank", rel: "noopener noreferrer" })}>{frame}</a>
    : <div className="ptile__media-link">{frame}</div>}</div>;
}

export function Projects({ locale = "es" }: { locale?: Locale }) {
  const t = ui[locale].projects, tiles = tilesOf(locale);
  return <section className="section projects" id="proyectos" aria-labelledby="proyectos-h"><div className="wrap">
    <div className="projects__head">
      <h2 id="proyectos-h">{t.title}<sup className="projects__count" aria-hidden="true">({String(tiles.length).padStart(2, "0")})</sup></h2>
      <p>{t.lead}</p>
    </div>
    <ul className="pgrid">{tiles.map((p) => <li key={p.slug} className={`ptile ptile--${p.size}${p.caseHref ? " ptile--case" : ""}`} data-project={p.slug}>
      <p className="ptile__top"><span className="ptile__n">{p.n}</span> · <Tag tag={p.tag} locale={locale} /></p>
      <Media t={p} />
      <div className="ptile__body">
        <h3 id={`${p.slug}-h`}>{keep(p.name)}</h3>
        <p className="ptile__lead">{keep(p.lead)}</p>
        {p.facts && <ul className="ptile__facts">{p.facts.map((f) => <li key={f}>{f}</li>)}</ul>}
        {p.status && <p className="status ptile__status">
          <StatusText text={p.status} urls={p.urls} />
          {p.relatedCase && <>. {t.relatedCase} <a href={localePath(locale, `/${p.relatedCase}`)}>Stockie</a></>}
        </p>}
        {p.stack && <p className="ptile__stack">{p.stack}</p>}
        {p.caseHref && <a className="btn btn--secondary ptile__link" href={p.caseHref}>{t.seeCase}<span className="sr-only">{t.seeCaseOf(p.name)}</span></a>}
      </div>
    </li>)}</ul>
  </div></section>;
}
