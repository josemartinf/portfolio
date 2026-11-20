import { site } from "@/lib/site";

/** nav-centre (repartido): las palabras en el medio, la marca initial a la izquierda, la acción principal a la derecha. */
export const navLinks: [string, string][] = [["Proyectos", "#proyectos"], ["Experiencia", "#experiencia"], ["Stack", "#stack"]];
/** La acción principal lleva al cierre, donde el email está escrito y se puede copiar (un mailto solo no alcanza:
 *  en una computadora sin cliente de correo el clic no hace nada). Toda página tiene su #contacto. */
export const mainAction = { label: "Contacto", href: "#contacto" };

/** La marca (el monograma JF de public/brand, el mismo del favicon y del sello para clientes) y el nombre. En la
 *  portada lleva a #top; en una página de caso, a la portada ("/"). */
export function Logo({ mark = true, href = "#top" }: { mark?: boolean; href?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <a className="nav__logo" href={href}>{mark && <img className="brand-mark" src="/brand/jf-mark.svg" alt="" width={26} height={26} />}<span className="nav__name">{site.name}</span></a>;
}

export function Nav({ links = navLinks, logoHref = "#top" }: { links?: [string, string][]; logoHref?: string }) {
  return <header className="nav nav--centre"><div className="wrap nav__bar">
    <a className="skip-link" href="#top">Ir al contenido</a>
    <Logo href={logoHref} />
    <nav className="nav__links" aria-label="Principal">{links.map(([label, href]) => <div className="nav__item" key={href}><a className="nav__link" href={href}>{label}</a></div>)}</nav>
    <div className="nav__actions"><a className="btn btn--primary" href={mainAction.href}>{mainAction.label}</a></div>
    <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Abrir el menú"><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
  </div></header>;
}
