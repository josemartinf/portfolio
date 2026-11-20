import type { ProjectTag, Shot, TechSheet as Sheet } from "@/data/types";
import { sites } from "@/data/sites";
import { tools } from "@/data/tools";
import { BrowserFrame } from "@/components/Frame";
import { StatusText, TechSheet } from "@/components/TechSheet";
import { Tag } from "@/components/Tag";

/* #proyectos-mas: sigue la lista de #proyectos (los tres casos) sin un título propio a la vista, así la portada tiene
   una sola sección de proyectos. Los sitios de clientes y el proyecto personal, en una grilla de tarjetas: la captura
   arriba (la primera pantalla del sitio, 2:1), la etiqueta, el nombre con su estado, el resumen, hasta tres líneas y
   el stack, la segunda capa para quien es técnico. La captura lleva al sitio en vivo; el driver no tiene sitio. */
const host = (url: string) => new URL(url).host.replace(/^www\./, "");
/** Un modelo con guion (SS-550) nunca se corta en el guion: el renglón lo lleva entero. */
const keep = (text: string) => text.split(/(\S+-\d\S*)/).map((t, i) => (i % 2 === 1 ? <span key={i} className="nowrap">{t}</span> : t));

type Card = { slug: string; name: string; tag: ProjectTag; summary: string; layers: string[]; sheet: Sheet; shot?: Shot; liveUrl?: string; urls: string[]; status?: string; relatedCase?: string };

const cards: Card[] = [
  ...sites.map((s) => ({ ...s, urls: [s.liveUrl, ...(s.moreLinks ?? []).map((l) => l.url)] })),
  ...tools.map((t) => ({ ...t, urls: [] })),
];

function CardShot({ c }: { c: Card }) {
  if (!c.shot) return null;
  const frame = <BrowserFrame shot={c.shot} label={c.liveUrl ? host(c.liveUrl) : c.shot.title} sizes="(max-width: 959px) 92vw, 628px" />;
  return c.liveUrl
    ? <a className="m-zoom pcard__shot" href={c.liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">{frame}</a>
    : <div className="pcard__shot">{frame}</div>;
}

export function ProjectCards() {
  return <section className="section projects-more" id="proyectos-mas" aria-labelledby="proyectos-mas-h"><div className="wrap">
    <h2 id="proyectos-mas-h" className="sr-only">Más proyectos</h2>
    <ul className="pcards">{cards.map((c) => <li key={c.slug} className="pcard" data-project={c.slug}>
      <CardShot c={c} />
      <div className="pcard__body">
        <div className="pcard__head">
          <Tag tag={c.tag} />
          <h3>{keep(c.name)}</h3>
          {c.status && <p className="status pcard__status">
            <StatusText text={c.status} urls={c.urls} />
            {c.relatedCase && <>. El sistema de stock hoy es <a href={`/${c.relatedCase}`}>Stockie</a></>}
          </p>}
        </div>
        <p className="pcard__summary">{keep(c.summary)}</p>
        <ul className="site__layers">{c.layers.map((l) => <li key={l}>{l}</li>)}</ul>
        <TechSheet sheet={c.sheet} compact only={["stack"]} />
      </div>
    </li>)}</ul>
  </div></section>;
}
