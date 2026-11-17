import Image from "next/image";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, variant }: { project: Project; variant: "feature" | "site" | "compact" }) {
  const body = <>
    <div className="project-card__media">
      {project.image ? <Image src={project.image.src} alt={project.image.alt} width={800} height={540} sizes="(max-width: 640px) 100vw, 50vw" /> :
        <div className="project-card__fallback" aria-hidden="true"><span>{project.name}</span><span className="fallback-grid" /></div>}
    </div>
    <div className="project-card__body">
      <h3>{project.name}</h3>
      <p>{project.summary}</p>
      {variant === "feature" && <ul className="chips" aria-label={`Tecnologías de ${project.name}`}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>}
      {project.liveUrl && <span className="link project-card__link">Ver sitio <span aria-hidden="true">↗</span></span>}
    </div>
  </>;
  const className = `project-card panel project-card--${variant}`;
  return project.liveUrl ? <a className={className} href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}: Ver sitio`}>{body}</a> : <article className={className}>{body}</article>;
}
