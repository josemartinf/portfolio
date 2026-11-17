import { projectsBy } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
export function Work() { return <section className="section" id="trabajos" style={{ "--h": 2 } as React.CSSProperties} aria-labelledby="trabajos-h"><div className="wrap">
  <div className="section-head"><h2 id="trabajos-h">Sitios de clientes, en línea hoy</h2><p>Cada uno está publicado y funcionando. Abrilos y probalos.</p></div>
  <div className="work-grid">{projectsBy("cliente").map((project) => <ProjectCard key={project.slug} project={project} variant="site" />)}</div>
</div></section>; }
