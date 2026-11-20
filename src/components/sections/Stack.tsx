/* eslint-disable @next/next/no-img-element */
import { stackGroups } from "@/data/profile";

/* #stack: las herramientas por área, en columnas cortas: cada una con su ícono real (public/assets/icons) en una
   baldosa chica y su nombre al lado. Una lista de verdad para un lector de pantalla, nombrada por el rótulo de su área
   (un rótulo chico, no un título: los h3 de la portada son los nombres de los proyectos). */
export function Stack() {
  return <section className="section stack" id="stack" aria-labelledby="stack-h"><div className="wrap">
    <div className="section-head"><h2 id="stack-h">Stack</h2><p>Lo que uso en Naranja X y en estos proyectos.</p></div>
    <div className="stack__groups">{stackGroups.map((g, i) => <div key={g.label} className="stack__group">
      <p className="t-label stack__label" id={`stack-area-${i + 1}`}>{g.label}</p>
      <ul className="stack__list" aria-labelledby={`stack-area-${i + 1}`}>{g.items.map((t) => {
        const id = t.icon.replace(/^.*\/(.+)\.svg$/, "$1");
        return <li key={t.name} className="stack__item"><span className="stack__tile"><img className="ic" data-icon={id} src={t.icon} alt="" width={20} height={20} loading="lazy" /></span>{t.name}</li>;
      })}</ul>
    </div>)}</div>
  </div></section>;
}
