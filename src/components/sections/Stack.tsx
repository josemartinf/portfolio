/* eslint-disable @next/next/no-img-element */
import { stackIcons } from "@/data/profile";

/* #stack: un muro de íconos reales, en sus colores (public/assets/icons, de icons.mjs), en baldosas blancas a todo el
   ancho del bloque, cada una con su nombre debajo, alineados a la izquierda (sobre las líneas del contenedor).
   El muro es una sola imagen para un lector de pantalla: su nombre lista las dieciséis herramientas. */
export function Stack() {
  const names = stackIcons.map((t) => t.name).join(", ");
  return <section className="section stack" id="stack" aria-labelledby="stack-h"><div className="wrap">
    <div className="section-head"><h2 id="stack-h">Stack</h2><p>Lo que uso en Naranja X y en estos proyectos.</p></div>
    <ul className="stack__wall" role="img" aria-label={`Stack: ${names}`}>{stackIcons.map((t) => {
      const id = t.icon.replace(/^.*\/(.+)\.svg$/, "$1");
      return <li key={t.name} className="stack__item"><span className="ic-tile stack__tile"><img className="ic" data-icon={id} src={t.icon} alt="" width={48} height={48} loading="lazy" /></span><span className="stack__name">{t.name}</span></li>;
    })}</ul>
  </div></section>;
}
