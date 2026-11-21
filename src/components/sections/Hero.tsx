import { cvHref, site } from "@/lib/site";
import { type Locale, localePath } from "@/i18n";
import { content } from "@/i18n/content";
import { ui } from "@/i18n/ui";
import { BrowserFrame } from "@/components/Frame";

/* La entrada editorial (spec 2026-11-20-portada-editorial): el nombre enorme en dos renglones, la frase y las dos
   acciones junto al apellido, la fila de datos (dónde trabaja hoy, qué hace, desde cuándo, por dónde escribirle) y,
   al pie, la captura del panel de Envo que asoma y pide bajar. En el DOM el h1 va primero (la lectura empieza por el
   nombre); en escritorio la fila de datos se dibuja arriba (site.css, filas de la grilla de .hero__top).
   El botón lleno es "Ver los proyectos"; el secundario descarga el CV (el email está en el cierre). */
// el nombre en dos renglones: todo menos el apellido, y el apellido. Cada renglón es un span propio: la entrada
// (motion.js) pone cada palabra en su caja, y los renglones cortan igual durante la entrada y al terminar. El rol va
// en el aria-label del h1 (motion.js lo respeta y no lo saca al terminar): un span sr-only, de bloque, dejaba
// "Flores , Software" en el nombre accesible.
const words = site.name.split(" ");
const h1Label = `${site.name}, Software Engineer`;
const nameStart = words.slice(0, -1).join(" ");
const nameEnd = words.at(-1);

export function Hero({ locale = "es" }: { locale?: Locale }) {
  const t = ui[locale], m = t.hero.metas, { jobs, caseBySlug } = content(locale);
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return <section className="hero hero--editorial" data-enter aria-labelledby="hero-h"><div className="wrap hero__grid"><div className="hero__top">
    <h1 id="hero-h" className="hero__name" aria-label={h1Label}><span className="hero__line">{nameStart}</span> <span className="hero__line">{nameEnd}</span></h1>
    <div className="hero__side">
      <p className="hero__claim">{t.hero.claim}</p>
      <div className="btn-row"><a className="btn btn--primary" href="#proyectos">{t.hero.seeProjects}</a><a className="btn btn--secondary" href={cvHref(locale)} download>{t.cv}</a></div>
    </div>
    <dl className="hero__metas">
      <div><dt>{m.now}</dt><dd>{m.nowValue(jobs[0].company)}</dd></div>
      <div><dt>{m.build}</dt><dd>{m.buildValue}</dd></div>
      <div><dt>{m.since}</dt><dd>{m.sinceValue}</dd></div>
      <div><dt>{m.write}</dt><dd className="hero__links"><a href="#contacto">{m.email}</a><a href={site.linkedin} {...ext}>LinkedIn</a><a href={site.github} {...ext}>GitHub</a></dd></div>
    </dl>
    </div>
    <figure className="hero__band" data-enter-media>
      <figcaption className="hero__band-label">{t.hero.bandLabel}</figcaption>
      <a className="hero__band-link" href={localePath(locale, "/envo")} tabIndex={-1} aria-hidden="true">
        <BrowserFrame shot={caseBySlug("envo").heroShot} sizes="(max-width: 639px) 92vw, 1280px" crop={2.6} />
      </a>
    </figure>
  </div></section>;
}
