import type { Job } from "@/data/types";
import { education, jobs } from "@/data/profile";

/* #experiencia, la línea de tiempo, en la banda .ground-surface (la única de la portada) que abre la moment
   iris-opens. Los cuatro empleos y, al pie, la formación. */
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const month = (ym: string) => { const [y, m] = ym.split("-"); return `${MONTHS[Number(m) - 1]} ${y}`; };
const range = (j: Job) => `${month(j.from)} – ${j.to ? month(j.to) : "hoy"}`;

/** Los puestos agrupados por empresa, en orden: Naranja X junta sus dos roles. */
function byCompany(list: Job[]) {
  const out: { company: string; roles: Job[] }[] = [];
  for (const j of list) {
    const last = out[out.length - 1];
    if (last && last.company === j.company) last.roles.push(j); else out.push({ company: j.company, roles: [j] });
  }
  return out;
}

function Entry({ company, roles }: { company: string; roles: Job[] }) {
  const span = `${month(roles[roles.length - 1].from)} – ${roles[0].to ? month(roles[0].to) : "hoy"}`;
  return <li className="grid tl__item">
    <div className="tl__when span-5"><h3>{company}</h3><p className="tl__date">{span}</p></div>
    <div className="tl__roles span-6 start-7">{roles.map((r) => <div className="tl__role" key={r.role}>
      <p className="tl__title">{r.role}{roles.length > 1 && <span className="tl__range"> · {range(r)}</span>}</p>
      <p>{r.summary}</p>
    </div>)}</div>
  </li>;
}

export function Experience() {
  return <section className="section ground-surface experience" id="experiencia" aria-labelledby="experiencia-h" data-moment="iris-opens" data-moment-opts='{"from": "base"}'><div className="wrap">
    <div className="section-head"><h2 id="experiencia-h">Experiencia</h2><p>De QA a Software Engineer, siempre en banca y fintech.</p></div>
    <ol className="tl">{byCompany(jobs).map((g) => <Entry key={g.company} {...g} />)}</ol>
    <div className="grid tl__study">
      <div className="span-5"><h3>Formación</h3><p className="tl__title">{education.degree}, {education.from} – {education.to}</p><p>{education.school}</p></div>
    </div>
  </div></section>;
}
