import { site } from "@/lib/site";
const tech = [["Next.js","nextjs"],["React","react"],["TypeScript","typescript"],["Tailwind CSS","tailwindcss"],["Prisma","prisma"],["PostgreSQL","postgres"],["Mercado Pago","mercadopago"],["Vercel","vercel"],["Docker","docker"],["n8n","n8n"],["Python","python"]];
export function About() { return <section className="section" id="sobre-mi" aria-labelledby="sobre-mi-h"><div className="wrap">
  <div className="section-head"><h2 id="sobre-mi-h">José Martin Flores, QA en Naranja X</h2></div>
  <div className="grid about-grid"><div className="span-6"><p className="t-lead">Trabajo en el equipo de QA de Naranja X y, por mi cuenta, hago sitios y sistemas para negocios. Estudié en la UGMA, en Venezuela, y vivo en Buenos Aires. Me certifiqué en Claude Code con Platzi en 2026.</p><div className="about-links"><a className="link" href={site.linkedin} target="_blank" rel="noopener noreferrer">Ver mi LinkedIn ↗</a><a className="link" href={site.github} target="_blank" rel="noopener noreferrer">Ver mi GitHub ↗</a></div></div>
  <div className="span-6 start-7"><h3>Tecnologías</h3><ul className="tech-grid">{tech.map(([name, icon]) => <li className="ic-chip" key={name}><span className="ic-tile"><img data-icon={icon} src={`/assets/icons/${icon}.svg`} alt="" width="28" height="28" /></span><span>{name}</span></li>)}</ul></div></div>
</div></section>; }
