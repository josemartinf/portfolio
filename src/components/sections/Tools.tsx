import { projectsBy } from "@/data/projects";
const diagram = { layout: "timeline", alt: "Postulator: Buscar, Puntuar, Generar CV y carta, Revisar, Aprobar y Postular.", steps: ["Buscar", "Puntuar", "Generar CV y carta", "Revisar", "Aprobar", "Postular"].map(label => ({ label })) };
export function Tools() { return <section className="section" id="herramientas" aria-labelledby="herramientas-h"><div className="wrap">
  <div className="section-head"><h2 id="herramientas-h">Herramientas que armé para mí</h2></div>
  <div className="grid tools-grid"><div className="span-6"><ul className="rows">{projectsBy("herramienta").map(project => <li key={project.slug}><span className="rows__name">{project.name}<small>{project.summary}</small></span></li>)}</ul></div><div className="span-6 start-7"><div className="panel diagram-panel"><div className="dg" data-diagram={JSON.stringify(diagram)} /></div></div></div>
</div></section>; }
