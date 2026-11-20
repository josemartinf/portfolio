import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/sections/Nav";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "No encontrada — José Martin Flores",
  robots: { index: false, follow: false },
};

/* 404: la misma barra y el mismo cierre que el resto del sitio; los links de la barra apuntan a la portada. */
export default function NotFound() {
  return <>
    <Nav logoHref="/" links={[["Proyectos", "/#proyectos"], ["Experiencia", "/#experiencia"], ["Stack", "/#stack"]]} />
    <main id="top"><section className="section"><div className="wrap">
      <div className="section-head"><h1>Página no encontrada</h1><p>La dirección no existe o cambió. La portada tiene los tres casos: Envo, Stockie y Club Zapateo.</p></div>
      <Link className="btn btn--primary" href="/">Volver a la portada</Link>
    </div></section></main>
    <Contact />
  </>;
}
