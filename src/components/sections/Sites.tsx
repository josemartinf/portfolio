import type { SiteProject } from "@/data/types";
import { sites } from "@/data/sites";
import { BrowserFrame } from "@/components/Frame";
import { Focus, Parts, StatusText, TechSheet } from "@/components/TechSheet";

/* #sitios, una pantalla: el encabezado y GlobalFia con MonJeep (de donde salió Stockie), el texto a la izquierda y la
   captura entera a la derecha, en la misma línea de split que los casos. #sitios-mas: Moodi Home y Aether; desde 1280
   lado a lado en una pantalla, cada uno con su captura arriba; por debajo, una fila cada uno con una brecha real entre
   las dos (dos pantallas de teléfono). Sus capturas muestran la primera pantalla del sitio, recortada a 2:1.
   Cada sitio lleva el nombre con su estado, las capas, partes, enfoque y una línea de stack; cada captura lleva al
   sitio en vivo (zoom dentro del marco al pasar el puntero). */
const host = (url: string) => new URL(url).host.replace(/^www\./, "");

/** El estado con cada dominio convertido en su link al sitio en vivo. */
function Status({ s }: { s: SiteProject }) {
  return <p className="status site__status">
    <StatusText text={s.status} urls={[s.liveUrl, ...(s.moreLinks ?? []).map((l) => l.url)]} />
    {s.relatedCase && <>. El sistema de stock hoy es <a href={`/${s.relatedCase}`}>Stockie</a></>}
  </p>;
}

function SiteText({ s }: { s: SiteProject }) {
  return <div className="site__text">
    <div className="site__name"><h3>{s.name}</h3><Status s={s} /></div>
    <ul className="site__layers">{s.layers.map((l) => <li key={l}>{l}</li>)}</ul>
    <TechSheet sheet={s.sheet} compact only={["stack"]} rows={[{ label: "Partes", content: <Parts parts={s.parts} /> }, { label: "Enfoque", content: <Focus focus={s.focus} /> }]} />
  </div>;
}

function SiteShot({ s }: { s: SiteProject }) {
  return <a className="m-zoom site__shot span-6 start-7" href={s.liveUrl} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
    <BrowserFrame shot={s.shot} label={host(s.liveUrl)} sizes="(max-width: 1023px) 92vw, 628px" />
  </a>;
}

export function Sites() {
  const [repuestos, ...rest] = sites;
  const row = (s: SiteProject, lead = false) => <div key={s.slug} className={`grid site ${lead ? "site--lead" : "site--row"}`} data-project={s.slug}>
    <div className="span-5 site__col"><SiteText s={s} /></div>
    <SiteShot s={s} />
  </div>;
  return <>
    <section className="section sites" id="sitios" aria-labelledby="sitios-h"><div className="wrap">
      <div className="section-head"><h2 id="sitios-h">Sitios en producción</h2><p>Tres proyectos web: lo que se ve en cada uno y lo que corre detrás.</p></div>
      {row(repuestos, true)}
    </div></section>
    {/* Moodi Home y Aether siguen la lista de arriba (lado a lado desde 1280, una fila cada uno por debajo); el título
        es para un lector de pantalla, a la vista es la misma lista. Dos pantallas en el teléfono (.g2m). */}
    <section className="section g2m sites sites--more" id="sitios-mas" aria-labelledby="sitios-mas-h"><div className="wrap">
      <h2 id="sitios-mas-h" className="sr-only">Dos sitios más</h2>
      {rest.map((s) => row(s))}
    </div></section>
  </>;
}
