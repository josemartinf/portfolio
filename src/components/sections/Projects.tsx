import type { ReactNode } from "react";
import type { CaseStudy } from "@/data/types";
import { type Locale, localePath } from "@/i18n";
import { content } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { BrowserFrame, PhoneFrame } from "@/components/Frame";
import { Parts, StatusText } from "@/components/TechSheet";
import { Tag } from "@/components/Tag";

/* #proyectos: la única sección de proyectos de la portada. Abre con su título y sigue con los tres casos destacados, cada
   uno con su etiqueta (Cliente, Producto propio) sobre el nombre, en tres composiciones (brief-v2):
   Envo, el sistema: texto a la izquierda y el diagrama de un pedido a la derecha (lo que no se ve en una captura);
   Stockie, la pantalla: una fila corta de texto arriba y la captura a todo el ancho del bloque;
   Club Zapateo, los dos lados: el texto al costado y la ventana del panel al lado del teléfono de la puerta (ninguno
   tapa al otro). La ventana muestra solo una parte del dashboard (las cifras de entradas y recaudación y lo vendido
   contra la capacidad), más grande, en vez de la pantalla entera con su letra chica.
   En la portada cada caso muestra sus hechos, sus partes en una línea, su estado y el link al caso; el enfoque y la
   ficha técnica completa viven en su página. La imagen también lleva al caso (fuera del orden del teclado: el link
   "Ver el caso" es el mismo destino). Los demás proyectos siguen en #proyectos-mas (ProjectCards). */

/** El recorrido de un pedido en Envo, contado para quien no es técnico: los pedidos entran por Telegram, WhatsApp o la
 *  página web; Envo guarda cada pedido junto con su aviso, y de ahí salen los avisos (que se reintentan si un canal se
 *  cae) y el panel en vivo. Los íconos siguen siendo las piezas reales (n8n, PostgreSQL, Next.js). El recorrido con sus
 *  mecanismos (n8n, la outbox, NOTIFY y SSE) es el de la arquitectura de /envo. Sin `done`: en la portada el diagrama
 *  queda quieto y su anillo de estado nunca se llenaría. */
function envoFlow(locale: Locale) {
  const t = ui[locale].projects.envoFlow;
  return {
    layout: "bowtie",
    curve: "curve",
    alt: t.alt,
    sources: [
      { label: "Telegram", icon: "telegram", sub: t.chat, cap: true },
      { label: "WhatsApp", icon: "whatsapp", sub: t.chat, cap: true },
      { label: t.orderPage, icon: "ui:shopping-bag", sub: t.fromWeb, cap: true },
    ],
    core: { label: t.core, icon: "postgres" },
    targets: [
      { label: t.notices, icon: "n8n", sub: t.noticesSub, cap: true },
      { label: t.panel, icon: "nextjs", sub: t.panelSub, cap: true },
    ],
  };
}

function Facts({ c }: { c: CaseStudy }) {
  return <ul className="case__facts">{c.homeFacts.map((f) => <li key={f}>{f}</li>)}</ul>;
}
/** Las partes en una línea callada y el estado con su link en vivo. */
function Meta({ c }: { c: CaseStudy }) {
  return <div className="case__meta">
    <p className="case__parts"><Parts parts={c.parts} /></p>
    <p className="status case__status"><StatusText text={c.status} urls={c.liveUrl ? [c.liveUrl] : []} /></p>
  </div>;
}
function CaseLink({ c, locale }: { c: CaseStudy; locale: Locale }) {
  const t = ui[locale].projects;
  return <a className="btn btn--secondary case__link" href={localePath(locale, `/${c.slug}`)}>{t.seeCase}<span className="sr-only">{t.seeCaseOf(c.name)}</span></a>;
}
/** La imagen del caso como link al caso, para el puntero; el teclado y el lector usan "Ver el caso". */
function VisualLink({ c, locale, children }: { c: CaseStudy; locale: Locale; children: ReactNode }) {
  return <a className="case__visual-link" href={localePath(locale, `/${c.slug}`)} tabIndex={-1} aria-hidden="true">{children}</a>;
}
/** El nombre del caso es un h3: el h2 de la sección es "Proyectos". La etiqueta va arriba del nombre. */
function Head({ c, locale }: { c: CaseStudy; locale: Locale }) {
  return <div className="section-head case__head"><Tag tag={c.tag} locale={locale} /><h3 id={`${c.slug}-h`} className="case__name">{c.name}</h3><p>{c.lead}</p></div>;
}

/** Texto al costado (Envo y Club Zapateo): hechos, partes, estado y el link. */
function SideText({ c, locale }: { c: CaseStudy; locale: Locale }) {
  return <div className="case__text span-5">
    <Facts c={c} />
    <Meta c={c} />
    <CaseLink c={c} locale={locale} />
  </div>;
}

export function Projects({ locale = "es" }: { locale?: Locale }) {
  const t = ui[locale].projects, { caseBySlug } = content(locale);
  const envo = caseBySlug("envo"), stockie = caseBySlug("stockie"), zapateo = caseBySlug("club-zapateo");
  const door = zapateo.roles.flatMap((r) => r.shots).find((s) => s.frame === "phone")!;
  return <>
    <section className="section case case--envo" id="proyectos" aria-labelledby="proyectos-h" data-project="envo"><div className="wrap">
      <div className="section-head projects__head"><h2 id="proyectos-h">{t.title}</h2><p>{t.lead}</p></div>
      <Head c={envo} locale={locale} />
      <div className="grid case__grid">
        <SideText c={envo} locale={locale} />
        <div className="case__visual span-6 start-7"><VisualLink c={envo} locale={locale}><div className="frame frame--lit case__diagram"><div className="dg" data-dg-still="" data-diagram={JSON.stringify(envoFlow(locale))} /></div></VisualLink></div>
      </div>
    </div></section>

    <section className="section case case--stockie" id="stockie" aria-labelledby="stockie-h" data-project="stockie"><div className="wrap">
      <div className="grid case__top">
        <div className="span-5"><Head c={stockie} locale={locale} /></div>
        <div className="span-6 start-7 case__text"><Facts c={stockie} /><Meta c={stockie} /><CaseLink c={stockie} locale={locale} /></div>
      </div>
      <div className="case__wide">
        {/* recortada en el borde limpio bajo la tarjeta "Ventas · últimos 14 días" (y 655 de 1000, entre esa tarjeta y la fila
            de abajo): se ve entera, nunca cortada por la mitad */}
        <VisualLink c={stockie} locale={locale}><BrowserFrame shot={stockie.heroShot} label="Stockie · Dashboard" sizes="(max-width: 1023px) 92vw, 1280px" crop={2.44} zoom /></VisualLink>
      </div>
    </div></section>

    <section className="section case case--zapateo" id="club-zapateo" aria-labelledby="club-zapateo-h" data-project="club-zapateo"><div className="wrap">
      <Head c={zapateo} locale={locale} />
      <div className="grid case__grid">
        <SideText c={zapateo} locale={locale} />
        <div className="case__visual span-6 start-7"><VisualLink c={zapateo} locale={locale}><div className="case__pair">
          {/* de la captura de 1600×1000: las dos primeras columnas de cifras (eventos, entradas emitidas, pagos y
              recaudación; x 0,195–0,59) y las barras de lo vendido contra la capacidad, hasta y 0,65, con un margen parejo
              arriba y abajo. Así la captura se ve al 70 % de su tamaño en vez del 39 %: las cifras y los nombres se leen */}
          <BrowserFrame shot={zapateo.heroShot} label={t.zapateoLabel} labelShort={t.zapateoLabelShort} sizes="(max-width: 639px) 92vw, 480px" focus={{ x: 0.18, y: 0.135, w: 0.42 }} crop={1.27} zoom />
          <PhoneFrame shot={door} />
        </div></VisualLink></div>
      </div>
    </div></section>
  </>;
}
