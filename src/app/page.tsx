import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Statement } from "@/components/sections/Statement";
import { Sites } from "@/components/sections/Sites";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { Tools } from "@/components/sections/Tools";
import { Contact } from "@/components/sections/Contact";
import { jobs } from "@/data/profile";
import { site } from "@/lib/site";

/* Beats de la portada: hero con el efecto → statement (liquid-type: del testing al backend, lo que distingue el perfil)
   → los casos (calmos) → sitios → experiencia (iris-opens) → stack, proyecto personal y cierre, calmos.
   Cada sección tan alta como lo que tiene (main.home, site.css); el hero sigue siendo la primera pantalla. */

/** Datos estructurados de la persona (schema.org), para los buscadores. */
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Software Engineer",
  url: site.url,
  image: `${site.url}/og.jpg`,
  worksFor: { "@type": "Organization", name: jobs[0].company },
  address: { "@type": "PostalAddress", addressLocality: "Buenos Aires", addressCountry: "AR" },
  sameAs: [site.linkedin, site.github],
  knowsAbout: ["Backend", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Integraciones", "Automatización con IA"],
};

export default function Home() {
  return <>
    {/* las precargas de los dos momentos de la portada (moments.md); React las sube al <head> */}
    <link rel="modulepreload" href="/assets/moments/liquid-type/moment.js" />
    <link rel="modulepreload" href="/assets/moments/iris-opens/moment.js" />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    <Nav /><main id="top" className="home"><Hero /><Statement /><Projects /><Sites /><Experience /><Stack /><Tools /></main><Contact /></>;
}
