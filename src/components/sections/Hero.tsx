import { caseBySlug } from "@/data/cases";
import { currentFact } from "@/data/profile";
import { site } from "@/lib/site";
import { BrowserFrame } from "@/components/Frame";

/* hero collage (repartido): el texto en span-5; a la derecha el marco con el efecto painterly-landscape
   (system.js lo monta con assets/effects/fx.js), la ventana del panel de Envo que sale por los bordes derecho e
   inferior del marco (muestra la columna de pedidos entera; la barra lateral queda fuera, como pide layout.css)
   y una sola tarjeta que repite el viaje de un aviso: API → outbox → Telegram. El botón lleno del hero es
   "Ver los proyectos"; el secundario descarga el CV (el email está escrito en el cierre, #contacto). */
const fxPalette = JSON.stringify({ bg: "#4f5b61", accent: "#7f8f86" });
const fxParams = JSON.stringify({ blur: 1, brush: 0.35, slope: 0, hillY: 0.3, horizon: 0.62, calmX: 0.3, calmY: 0.35 });

export function Hero() {
  const envo = caseBySlug("envo");
  return <section className="hero hero--collage" data-enter aria-labelledby="hero-h"><div className="wrap"><div className="hero-text grid hero__grid">
    <div className="hero__text span-5">
      <h1 id="hero-h">{site.name.replace(/ (\S+)$/, "\u00a0$1")}, Software Engineer</h1>
      <p className="hero__lead">{site.tagline}</p>
      <div className="btn-row"><a className="btn btn--primary" href="#proyectos">Ver los proyectos</a><a className="btn btn--secondary" href={site.cv} download>Descargar el CV (PDF)</a></div>
      <p className="hero__proof">{currentFact}</p>
    </div>
    <div className="hero__art span-6 start-7" data-fx="painterly-landscape" data-fx-seed="4867" data-fx-palette={fxPalette} data-fx-params={fxParams}>
      <BrowserFrame shot={envo.heroShot} label="Envo · Panel de operación" className="ly-piece ly-piece--main" sizes="(max-width: 639px) 600px, 1200px" eager />
      <div className="ly-piece ly-piece--note hero-note" role="img" aria-label="Un aviso de Envo que pasa por la API, la outbox y llega por Telegram" data-ly-steps="700">
        <div className="hero-note__row" aria-hidden="true"><b>Pedido DEMO-0001</b><span className="hero-note__chip" data-step data-step-at="4">Avisado</span></div>
        <p className="hero-note__line" aria-hidden="true" data-step><i>1</i><span><b>API</b> guarda el pedido y su aviso</span></p>
        <p className="hero-note__line" aria-hidden="true" data-step><i>2</i><span><b>Outbox</b>: el worker lo reclama</span></p>
        <p className="hero-note__line" aria-hidden="true" data-step><i>3</i><span><b>Telegram</b> avisa al repartidor</span></p>
      </div>
    </div>
  </div></div></section>;
}
