import { cvHref, site, whatsappHref } from "@/lib/site";
import type { Locale } from "@/i18n";
import { ui } from "@/i18n/ui";
import { EmailCopy } from "@/components/EmailCopy";
import { Logo } from "./Nav";

/* footer.closing: close-type (el h2, la dirección de email escrita con su botón para copiarla, y el CV) y footer-columns.
   Contacto neutro: el email es el principal; LinkedIn, GitHub y WhatsApp van como links de texto. La dirección se ve
   escrita porque un mailto no hace nada en una computadora sin cliente de correo.
   La foto va después del título en el código (un lector de pantalla oye primero "Contacto") y el CSS la muestra arriba
   del título, o a la derecha del bloque en una pantalla ancha (public/site.css, "la foto del cierre"). */
export function Contact({ locale = "es" }: { locale?: Locale }) {
  const t = ui[locale];
  const external = [["LinkedIn", site.linkedin], ["GitHub", site.github], ["WhatsApp", whatsappHref(t.whatsappMessage)]];
  const home = [[t.nav.projects, "#proyectos"], [t.nav.experience, "#experiencia"], [t.nav.stack, "#stack"]];
  return <footer className="footer closing closing--home" id="contacto" aria-labelledby="contacto-h"><div className="wrap">
    <div className="closing__cta close--type">
      <div className="section-head"><h2 id="contacto-h">{t.contact.title}</h2><p>{t.contact.lead}</p></div>
      {/* eslint-disable-next-line @next/next/no-img-element -- export estático: next/image no optimiza (src/components/Shot.tsx) */}
      <img className="closing__photo" src={site.photo} alt={site.name} width={288} height={360} loading="lazy" decoding="async" />
      <EmailCopy locale={locale} />
      <a className="btn btn--secondary" href={cvHref(locale)} download>{t.cv}</a>
    </div>
    <div className="closing__links">
      <div className="grid">
        <div className="span-4 stack-4"><Logo /><p className="footer__lede">{t.footerLede}</p></div>
        <div className="span-2 start-9 footer__col"><h3>{t.contact.home}</h3><ul>{home.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}</ul></div>
        <div className="span-2 start-11 footer__col"><h3>{t.contact.contact}</h3><ul>{external.map(([l, h]) => <li key={l}><a href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul></div>
      </div>
      <div className="footer__legal"><span>© 2026 {site.name} · <span className="footer__domain">{site.domain}</span></span><span>{t.contact.legal}</span></div>
    </div>
  </div></footer>;
}
