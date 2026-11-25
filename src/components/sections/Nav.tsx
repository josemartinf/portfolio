import { site } from "@/lib/site";
import { type Locale, localePath, otherLocale } from "@/i18n";
import { ui } from "@/i18n/ui";

/** nav-centre (repartido): las palabras en el medio, la marca initial a la izquierda, la acción principal a la derecha. */
export const navLinks = (locale: Locale = "es"): [string, string][] => {
  const t = ui[locale].nav;
  return [[t.projects, "#proyectos"], [t.experience, "#experiencia"], [t.stack, "#stack"]];
};
/** La acción principal lleva al cierre, donde el email está escrito y se puede copiar (un mailto solo no alcanza:
 *  en una computadora sin cliente de correo el clic no hace nada). Toda página tiene su #contacto. */
export const mainAction = (locale: Locale = "es") => ({ label: ui[locale].nav.contact, href: "#contacto" });

/** La marca (el monograma JF de public/brand, el mismo del favicon y del sello para clientes) y el nombre. En la
 *  portada lleva a #top; en una página de caso, a la portada de su idioma. El nombre va en el aria-label: en un teléfono
 *  .nav__name no se ve y el link quedaba sin nombre. */
export function Logo({ mark = true, href = "#top" }: { mark?: boolean; href?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <a className="nav__logo" href={href} aria-label={site.name}>{mark && <img className="brand-mark" src="/brand/jf-mark.svg" alt="" width={26} height={26} />}<span className="nav__name">{site.name}</span></a>;
}

/** El idioma y el tema, antes de la acción principal. En la barra de escritorio, "EN" y el ícono; en el menú del
 *  teléfono, las palabras enteras ("English", "Modo claro"). El link lleva a la misma página en el otro idioma.
 *  El botón del tema nace oculto y lo muestra public/site.js (sin script no puede cambiar nada); el script también le
 *  pone su nombre según el tema que se ve. */
function Prefs({ locale, path }: { locale: Locale; path: string }) {
  const t = ui[locale].nav;
  return <div className="nav__prefs">
    <a className="nav__pref nav__lang" href={localePath(otherLocale(locale), path)} hrefLang={t.langCode} lang={t.langCode} aria-label={t.langLong}>
      <span className="nav__pref-short" aria-hidden="true">{t.langShort}</span><span className="nav__pref-long" aria-hidden="true">{t.langLong}</span>
    </a>
    <button className="nav__pref nav__theme" type="button" data-theme-toggle="" hidden
      data-to-light={t.themeToLight} data-to-dark={t.themeToDark} data-to-light-label={t.themeToLightLabel} data-to-dark-label={t.themeToDarkLabel} aria-label={t.themeToLightLabel}>
      <svg className="nav__theme-sun" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.55 1.55M17.15 17.15l1.55 1.55M5.3 18.7l1.55-1.55M17.15 6.85l1.55-1.55" /></svg>
      <svg className="nav__theme-moon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8Z" /></svg>
      <span className="nav__pref-long" data-theme-text="">{t.themeToLight}</span>
    </button>
  </div>;
}

/** `path` es la página en la que está la barra, sin el idioma ("/", "/envo"): de ahí sale el link al otro idioma. */
export function Nav({ locale = "es", path = "/", links, logoHref = "#top" }: { locale?: Locale; path?: string; links?: [string, string][]; logoHref?: string }) {
  const t = ui[locale].nav;
  const action = mainAction(locale);
  return <header className="nav nav--centre"><div className="wrap nav__bar">
    <a className="skip-link" href="#top">{t.skip}</a>
    <Logo href={logoHref} />
    <nav className="nav__links" aria-label={t.main}>{(links ?? navLinks(locale)).map(([label, href]) => <div className="nav__item" key={href}><a className="nav__link" href={href}>{label}</a></div>)}</nav>
    <div className="nav__actions"><Prefs locale={locale} path={path} /><a className="btn btn--primary" href={action.href}>{action.label}</a></div>
    <button className="nav__toggle" type="button" aria-expanded="false" aria-label={t.menu}><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button>
  </div></header>;
}
