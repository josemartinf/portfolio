import { site, whatsappHref } from "@/lib/site";
import { EmailCopy } from "@/components/EmailCopy";
import { Logo } from "./Nav";

/* footer.closing: close-type (el h2, la dirección de email escrita con su botón para copiarla, y el CV) y footer-columns.
   Contacto neutro: el email es el principal; LinkedIn, GitHub y WhatsApp van como links de texto. La dirección se ve
   escrita porque un mailto no hace nada en una computadora sin cliente de correo. */
const external = [["LinkedIn", site.linkedin], ["GitHub", site.github], ["WhatsApp", whatsappHref()]];
const home = [["Proyectos", "#proyectos"], ["Sitios", "#sitios"], ["Experiencia", "#experiencia"], ["Stack", "#stack"], ["Proyecto personal", "#herramientas"]];

export function Contact() {
  return <footer className="footer closing closing--home" id="contacto" aria-labelledby="contacto-h"><div className="wrap">
    <div className="closing__cta close--type">
      <div className="section-head"><h2 id="contacto-h">Contacto</h2><p>Por email es lo más directo. También estoy en LinkedIn y GitHub.</p></div>
      <EmailCopy />
      <a className="btn btn--secondary" href={site.cv} download>Descargar el CV (PDF)</a>
    </div>
    <div className="closing__links">
      <div className="grid">
        <div className="span-4 stack-4"><Logo mark={false} /><p className="footer__lede">Backend, integraciones y automatización con IA.</p></div>
        <div className="span-2 start-9 footer__col"><h3>Portada</h3><ul>{home.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}</ul></div>
        <div className="span-2 start-11 footer__col"><h3>Contacto</h3><ul>{external.map(([l, h]) => <li key={l}><a href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul></div>
      </div>
      <div className="footer__legal"><span>© 2026 {site.name}</span><span>Los nombres y logos de productos son marcas de sus dueños.</span></div>
    </div>
  </div></footer>;
}
