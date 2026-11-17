import { projectsBy } from "@/data/projects";
import { Shot } from "@/components/Shot";
export function Work() { return <section className="section" id="trabajos" aria-labelledby="trabajos-h"><div className="wrap">
  <div className="section-head"><h2 id="trabajos-h">Sitios de clientes, en línea hoy</h2><p>Cada uno está publicado y funcionando. Abrilos y probalos.</p></div>
  <div className="work-grid">{projectsBy("cliente").map((project) => <a className="work-item" key={project.slug} href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}: Ver sitio`}><div className="work-item__frame">{project.image && <Shot src={project.image.src} alt={project.image.alt} sizes="(max-width: 1023px) 100vw, 33vw" />}<div className="work-item__label"><h3>{project.name}</h3><p>{project.summary}</p></div></div></a>)}</div>
</div></section>; }
