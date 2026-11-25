import type { Job } from "@/data/types";
import type { Locale } from "@/i18n";
import { content } from "@/i18n/content";
import { ui } from "@/i18n/ui";

/* #experiencia, la línea de tiempo, en la banda .ground-surface (la única de la portada) que abre la moment
   iris-opens. Los cuatro empleos y, al pie, la formación. */
function dates(locale: Locale) {
  const t = ui[locale].experience;
  const month = (ym: string) => { const [y, m] = ym.split("-"); return `${t.months[Number(m) - 1]} ${y}`; };
  const span = (from: string, to: string | null) => `${month(from)} – ${to ? month(to) : t.present}`;
  return { span, range: (j: Job) => span(j.from, j.to) };
}

/** Los puestos agrupados por empresa, en orden: Naranja X junta sus dos roles. */
function byCompany(list: Job[]) {
  const out: { company: string; roles: Job[] }[] = [];
  for (const j of list) {
    const last = out[out.length - 1];
    if (last && last.company === j.company) last.roles.push(j); else out.push({ company: j.company, roles: [j] });
  }
  return out;
}

function Entry({ company, roles, locale }: { company: string; roles: Job[]; locale: Locale }) {
  const { span: spanOf, range } = dates(locale);
  const span = spanOf(roles[roles.length - 1].from, roles[0].to);
  return <li className="grid tl__item">
    <div className="tl__when span-5"><h3>{company}</h3><p className="tl__date">{span}</p></div>
    <div className="tl__roles span-6 start-7">{roles.map((r) => <div className="tl__role" key={r.role}>
      <p className="tl__title">{r.role}{roles.length > 1 && <span className="tl__range"><span className="tl__sep"> · </span>{range(r)}</span>}</p>
      <p>{r.summary}</p>
    </div>)}</div>
  </li>;
}

export function Experience({ locale = "es" }: { locale?: Locale }) {
  const t = ui[locale].experience, { jobs, education } = content(locale);
  return <section className="section ground-surface experience" id="experiencia" aria-labelledby="experiencia-h" data-moment="iris-opens" data-moment-opts='{"from": "base"}'><div className="wrap">
    <div className="section-head"><h2 id="experiencia-h">{t.title}</h2><p>{t.lead}</p></div>
    <ol className="tl">{byCompany(jobs).map((g) => <Entry key={g.company} {...g} locale={locale} />)}</ol>
    <div className="grid tl__study">
      <div className="span-5"><h3>{t.education}</h3><p className="tl__title">{education.degree}, {education.from} – {education.to}</p><p>{education.school}</p></div>
    </div>
  </div></section>;
}
