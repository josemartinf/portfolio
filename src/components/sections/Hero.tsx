import { cvHref, site } from "@/lib/site";
import type { Locale } from "@/i18n";
import { content } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { BrowserFrame } from "@/components/Frame";

/* hero collage (repartido): el texto en span-5; a la derecha el marco con el efecto painterly-landscape
   (system.js lo monta con assets/effects/fx.js), una ventana de Envo con su bloque "Salud del sistema" (lo que
   comprueba solo: la API, la base, el worker, los avisos y Telegram), que sale por el borde derecho del marco,
   y una sola tarjeta bajo su esquina inferior izquierda que repite el viaje de un pedido, en palabras de negocio:
   entra, se guarda junto con su aviso y el repartidor lo recibe por Telegram.
   El botón lleno del hero es "Ver los proyectos"; el secundario descarga el CV (el email está en el cierre). */
// el fondo: un atardecer en pizarra con colinas salvia, enfocado lo justo para leerse como paisaje y no como una mancha
// gris; el horizonte baja por debajo de la ventana y la colina sube hacia la derecha, donde queda el disco de pausa
const fxPalette = JSON.stringify({ bg: "#2b3a45", accent: "#a3bf8c" });
const fxParams = JSON.stringify({ blur: 0.4, brush: 0.7, slope: 14, side: 1, hillY: 0.1, horizon: 0.66, calm: 0.15, calmX: 0.2, calmY: 0.85 });
// el h1: la entrada (motion.js) pone cada palabra de cada nodo de texto en su propia caja, y entre dos cajas el renglón
// puede cortar. Con la coma en otro nodo (lo que deja React con {nombre}, …) o un espacio duro entre los apellidos (la
// entrada lo parte como cualquier espacio), corta distinto que el texto quieto y la coma salta al terminar. Por eso la
// coma va en el mismo texto que el apellido y los dos apellidos en un span sin corte, que vale igual en las dos formas.
const nameStart = site.name.split(" ").slice(0, -2).join(" ");
const nameEnd = site.name.split(" ").slice(-2).join(" ");

export function Hero({ locale = "es" }: { locale?: Locale }) {
  const t = ui[locale], { envoHealthShot, currentFact } = content(locale);
  return <section className="hero hero--collage" data-enter aria-labelledby="hero-h"><div className="wrap"><div className="hero-text grid hero__grid">
    <div className="hero__text span-5">
      <h1 id="hero-h">{`${nameStart} `}<span className="hero__name-end">{`${nameEnd},`}</span>{" Software Engineer"}</h1>
      <p className="hero__lead">{t.tagline}</p>
      <div className="btn-row"><a className="btn btn--primary" href="#proyectos">{t.hero.seeProjects}</a><a className="btn btn--secondary" href={cvHref(locale)} download>{t.cv}</a></div>
      <p className="hero__proof">{currentFact}</p>
    </div>
    <div className="hero__art span-6 start-7" data-fx="painterly-landscape" data-fx-seed="4867" data-fx-palette={fxPalette} data-fx-params={fxParams}>
      <BrowserFrame shot={envoHealthShot} label={`Envo · ${envoHealthShot.title}`} className="ly-piece ly-piece--main" sizes="(max-width: 639px) 360px, 600px" eager />
      <div className="ly-piece ly-piece--note hero-note" role="img" aria-label={t.hero.noteLabel} data-ly-steps="700">
        <div className="hero-note__row" aria-hidden="true"><b>{t.hero.noteOrder}</b><span className="hero-note__chip" data-step data-step-at="4">{t.hero.noteChip}</span></div>
        {t.hero.noteSteps.map(([before, bold, after], i) => <p key={bold} className="hero-note__line" aria-hidden="true" data-step><i>{i + 1}</i><span>{before}<b>{bold}</b>{after}</span></p>)}
      </div>
    </div>
  </div></div></section>;
}
