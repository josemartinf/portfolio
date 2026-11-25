/* Qué hago (sección propia, justo después del hero): la moment liquid-type en el titular, que ondula bajo el puntero y
   vuelve a quedar nítido; en touch y con movimiento reducido queda quieto. A la derecha, las cuatro áreas de trabajo con
   lo que uso en cada una; el detalle vive en Experiencia y en la página de cada caso. */
import type { Locale } from "@/i18n";
import { ui } from "@/i18n/ui";

export function Statement({ locale = "es" }: { locale?: Locale }) {
  const t = ui[locale].statement;
  return <section className="section statement" id="como-trabajo" aria-labelledby="como-trabajo-h"><div className="wrap">
    <div className="grid statement__grid fill">
      <div className="span-5 statement__body" data-moment="liquid-type" data-moment-opts='{"strength": 0.8}'>
        <h2 id="como-trabajo-h" className="mo-lt__type">{t.title}</h2>
        <p className="statement__line">{t.line}</p>
      </div>
      <dl className="span-6 start-7 statement__proof">{t.proof.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </div>
  </div></section>;
}
