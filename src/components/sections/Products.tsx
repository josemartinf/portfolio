import { Shot } from "@/components/Shot";
import { projectsBy } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { whatsappHref } from "@/lib/site";
export function Products() { const products = projectsBy("producto"); const envo = products.find((p) => p.slug === "envo"); return <section className="section products-section" id="productos" style={{ "--h": 2 } as React.CSSProperties} aria-labelledby="productos-h"><div className="wrap">
  <div className="group"><div className="section-head"><h2 id="productos-h">Envo y Stockie, mis productos</h2><p>Dos sistemas que construí una vez y adapto a cada negocio.</p></div>
  {envo?.image && <figure className="develop product-capture" data-moment="picture-develops"><Shot src="/projects/envo-panel.webp" alt="Panel de Envo con los pedidos que necesitan una decisión y los pedidos en curso" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 1400px, 90vw" /></figure>}</div>
  <div className="group"><div className="product-grid">{products.map((project) => <ProjectCard key={project.slug} project={project} variant="feature" />)}</div>
  <div className="btn-row"><a className="btn btn--secondary" href={whatsappHref("Hola José, quiero ver una demo de Envo o Stockie.")}>Pedir una demo</a></div></div>
</div></section>; }
