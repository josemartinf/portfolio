import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Statement } from "@/components/sections/Statement";
import { ProjectCards } from "@/components/sections/ProjectCards";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/site";
import { type Locale, localePath } from "@/i18n";
import { content } from "@/i18n/content";
import { ui } from "@/i18n/ui";

/* Beats de la portada: hero con el efecto → statement (liquid-type: del testing al backend, lo que distingue el perfil)
   → proyectos, una sola sección (los tres casos destacados y después las tarjetas de los demás, cada uno con su
   etiqueta) → experiencia (iris-opens) → stack y cierre, calmos.
   Cada sección tan alta como lo que tiene (main.home, site.css); el hero sigue siendo la primera pantalla.
   La misma portada en los dos idiomas (/ y /en): cambian los textos, nunca la composición. */

/** Datos estructurados de la persona (schema.org), para los buscadores. */
function person(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Software Engineer",
    url: `${site.url}${localePath(locale, "/") === "/" ? "" : localePath(locale, "/")}`,
    image: `${site.url}/og.jpg`,
    worksFor: { "@type": "Organization", name: content(locale).jobs[0].company },
    address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
    sameAs: [site.linkedin, site.github],
    knowsAbout: ui[locale].meta.knowsAbout,
  };
}

export function HomePage({ locale = "es" }: { locale?: Locale }) {
  return <>
    {/* las precargas de los dos momentos de la portada (moments.md); React las sube al <head> */}
    <link rel="modulepreload" href="/assets/moments/liquid-type/moment.js" />
    <link rel="modulepreload" href="/assets/moments/iris-opens/moment.js" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person(locale)) }} />
    <Nav locale={locale} path="/" />
    <main id="top" className="home"><Hero locale={locale} /><Statement locale={locale} /><Projects locale={locale} /><ProjectCards locale={locale} /><Experience locale={locale} /><Stack locale={locale} /></main>
    <Contact locale={locale} />
  </>;
}
