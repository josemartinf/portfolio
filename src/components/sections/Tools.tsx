import { projectsBy } from "@/data/projects";

// Diagrama quieto (página de servicio: sin pulsos ni fondo), armado sobre el preset timeline-onboarding del kit.
const diagram = {
  layout: "timeline",
  orient: "h",
  ground: "none",
  motion: { pulse: "none" },
  alt: "postulator busca ofertas, las puntúa, arma el CV y la carta, espera mi aprobación y postula.",
  steps: [
    { label: "Ofertas", icon: "ui:search" },
    { label: "Puntaje", icon: "ui:gauge" },
    { label: "CV y carta", icon: "ui:file-text" },
    { label: "Aprobación", icon: "ui:user-check" },
    { label: "Postulación", icon: "ui:send" },
  ],
};

export function Tools() {
  return <section className="section" id="herramientas" aria-labelledby="herramientas-h"><div className="wrap">
    <div className="section-head"><h2 id="herramientas-h">Herramientas que armé para mí</h2></div>
    <div className="grid tools-grid">
      <div className="span-6"><ul className="rows">{projectsBy("herramienta").map(project => <li key={project.slug}><span className="rows__name">{project.name}<small>{project.summary}</small></span></li>)}</ul></div>
      <div className="span-6 start-7 tools-visual"><div className="panel diagram-panel"><div className="dg" data-diagram={JSON.stringify(diagram)} /></div></div>
    </div>
  </div></section>;
}
