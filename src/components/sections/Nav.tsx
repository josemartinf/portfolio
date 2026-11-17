import { site, whatsappHref } from "@/lib/site";
const links = [["Servicios", "#servicios"], ["Trabajos", "#trabajos"], ["Productos", "#productos"], ["Sobre mí", "#sobre-mi"]];
export function Nav() {
  return <header className="nav nav--centre"><div className="wrap nav__bar">
    <a className="skip-link" href="#top">Ir al contenido</a>
    <a className="nav__logo" href="#top"><span className="mark" data-mark="dots" aria-hidden="true" /><span className="nav__name">{site.name}</span></a>
    <nav className="nav__links" aria-label="Principal">{links.map(([label, href]) => <div className="nav__item" key={href}><a className="nav__link" href={href}>{label}</a></div>)}</nav>
    <div className="nav__actions"><a className="btn btn--primary" href={whatsappHref()}>Escribir por WhatsApp</a></div>
    <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Abrir menú"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
  </div></header>;
}
