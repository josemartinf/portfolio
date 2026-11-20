import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Contact } from "@/components/sections/Contact";
import { RootShell } from "@/components/RootShell";
import { rootMetadata, viewport as shared } from "@/lib/metadata";
import { ui } from "@/i18n/ui";

/* 404 (global-not-found: el sitio tiene dos layouts raíz, uno por idioma, y ninguno arriba de los dos). La misma barra
   y el mismo cierre que el resto del sitio, en español, con un link a la portada en inglés para quien llegó desde
   una dirección en inglés. Los links de la barra apuntan a la portada. */
const t = ui.es.notFound, en = ui.en.notFound;
export const metadata: Metadata = { ...rootMetadata("es"), title: t.title, robots: { index: false, follow: false } };
export const viewport = shared;

export default function GlobalNotFound() {
  const nav = ui.es.nav;
  return <RootShell locale="es">
    <Nav logoHref="/" links={[[nav.projects, "/#proyectos"], [nav.experience, "/#experiencia"], [nav.stack, "/#stack"]]} />
    <main id="top"><section className="section"><div className="wrap">
      <div className="section-head"><h1>{t.heading}</h1><p>{t.text}</p></div>
      <div className="btn-row"><Link className="btn btn--primary" href="/">{t.back}</Link><Link className="btn btn--secondary" href="/en" hrefLang="en" lang="en">{en.heading}: {en.back.toLowerCase()}</Link></div>
    </div></section></main>
    <Contact />
  </RootShell>;
}
