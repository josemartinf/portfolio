// Genera public/cv-jose-martin-flores.pdf (y su versión en inglés, -en.pdf) con los mismos datos del sitio (src/data y src/lib/site), así el CV y la
// portada nunca se contradicen. Correr después de cambiar un empleo, un caso o el stack: `npm run cv`.
// Usa el Chromium de Playwright para imprimir el HTML a PDF (A4, con los links activos).
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import type { Job } from "../src/data/types";
import { cvHref, site } from "../src/lib/site";
import { content } from "../src/i18n/content";
import type { Locale } from "../src/i18n";
import { ui } from "../src/i18n/ui";

/* Los textos propios del CV (los títulos y el perfil); los datos salen de src/data por idioma, como en el sitio. */
const T = {
  es: {
    role: site.role, profile: "Desarrollo servicios backend, integraciones y automatización con IA, con pruebas automáticas, alertas y monitoreo. Antes trabajé siete años en QA.",
    h: { profile: "Perfil", experience: "Experiencia", projects: "Proyectos", sites: "Sitios en producción", personal: "Proyecto personal", stack: "Stack", education: "Formación", languages: "Idiomas" },
  },
  en: {
    role: "Software Engineer · Backend, integrations and automation", profile: "I build backend services, integrations and AI automation, with automated tests, alerts and monitoring. Before that, I worked in QA for seven years.",
    h: { profile: "Profile", experience: "Experience", projects: "Projects", sites: "Sites in production", personal: "Personal project", stack: "Stack", education: "Education", languages: "Languages" },
  },
};

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const host = (url: string) => new URL(url).host.replace(/^www\./, "") + new URL(url).pathname.replace(/\/$/, "");
const link = (url: string, text = host(url)) => `<a href="${esc(url)}">${esc(text)}</a>`;

/** Los puestos agrupados por empresa, en orden (Naranja X junta sus dos roles), como en la portada. */
function byCompany(list: Job[]) {
  const groups: { company: string; roles: Job[] }[] = [];
  for (const j of list) {
    const last = groups[groups.length - 1];
    if (last && last.company === j.company) last.roles.push(j); else groups.push({ company: j.company, roles: [j] });
  }
  return groups;
}

function render(locale: Locale): string {
const t = T[locale], { cases, sites, tools, currentFact, education, jobs, languages, stackGroups } = content(locale);
const months = ui[locale].experience.months;
const month = (ym: string) => { const [y, m] = ym.split("-"); return `${months[Number(m) - 1]} ${y}`; };
const range = (from: string, to: string | null) => `${month(from)} – ${to ? month(to) : ui[locale].experience.present}`;
const pageUrl = (slug: string) => `${site.url}${locale === "en" ? "/en" : ""}/${slug}`;

const experience = byCompany(jobs).map(({ company, roles }) => `
  <div class="item">
    <div class="item__head"><h3>${esc(company)}</h3><span class="when">${range(roles[roles.length - 1].from, roles[0].to)}</span></div>
    ${roles.map((r) => `<p class="role">${esc(r.role)}${roles.length > 1 ? ` <span class="when">· ${range(r.from, r.to)}</span>` : ""}</p><p>${esc(r.summary)}</p>`).join("")}
  </div>`).join("");

const projects = cases.map((c) => `
  <div class="item">
    <div class="item__head"><h3>${esc(c.name)}</h3><span class="when">${link(pageUrl(c.slug), `joseflores.codes${locale === "en" ? "/en" : ""}/${c.slug}`)}</span></div>
    <p>${esc(c.lead)} ${c.liveUrl ? esc(c.status).replace(host(c.liveUrl).replace(/\/.*$/, ""), link(c.liveUrl, host(c.liveUrl).replace(/\/.*$/, ""))) : esc(c.status)}.</p>
    <ul>${c.homeFacts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
  </div>`).join("");

const siteLinks = sites.map((s) => `${esc(s.name)} (${[s.liveUrl, ...(s.moreLinks ?? []).map((l) => l.url)].map((u) => link(u)).join(", ")})`).join(" · ");
const driver = tools[0];
const homeUrl = `${site.url}${locale === "en" ? "/en" : ""}`;

return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><title>CV | ${esc(site.name)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400..700&display=swap">
<style>
  @page { size: A4; margin: 15mm 16mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 400 9.6pt/1.42 "Familjen Grotesk", system-ui, sans-serif; color: #161616; }
  a { color: inherit; white-space: nowrap; text-decoration: underline; text-decoration-color: #b5b5b5; text-underline-offset: 2px; }
  h1 { font-size: 24pt; font-weight: 500; letter-spacing: -0.02em; margin: 0; line-height: 1.05; }
  .role-line { font-size: 11pt; margin: 4px 0 0; }
  .contact { margin: 8px 0 0; color: #3d3d3d; font-size: 9pt; }
  .contact--links { margin-top: 2px; }
  .contact span + span::before { content: " · "; color: #9a9a9a; }
  section { margin-top: 16px; }
  h2 { font-size: 8.4pt; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #6a6a6a; margin: 0 0 6px; padding-bottom: 4px; border-bottom: 1px solid #dcdcdc; }
  h3 { font-size: 10.4pt; font-weight: 600; margin: 0; }
  p { margin: 2px 0 0; }
  .item { margin-top: 9px; break-inside: avoid; }
  .item__head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .when { color: #6a6a6a; font-size: 8.8pt; font-weight: 400; white-space: nowrap; }
  .role { font-weight: 500; margin-top: 4px; }
  ul { margin: 3px 0 0; padding-left: 14px; }
  li { margin: 1px 0; }
  .stack { display: grid; grid-template-columns: max-content 1fr; gap: 3px 14px; }
  .stack dt { color: #6a6a6a; }
  .stack dd { margin: 0; }
</style></head><body>
<header>
  <h1>${esc(site.name)}</h1>
  <p class="role-line">${esc(t.role)}</p>
  <p class="contact"><span>${esc(site.location)}</span><span>${link(`mailto:${site.email}`, site.email)}</span><span>${esc(site.whatsapp.display)}</span></p>
  <p class="contact contact--links"><span>${link(site.linkedin)}</span><span>${link(site.github)}</span><span>${link(homeUrl)}</span></p>
</header>
<section><h2>${t.h.profile}</h2>
  <p>${esc(currentFact)}. ${esc(t.profile)}</p>
</section>
<section><h2>${t.h.experience}</h2>${experience}</section>
<section><h2>${t.h.projects}</h2>${projects}
  <div class="item"><h3>${t.h.sites}</h3><p>${siteLinks}</p></div>
  <div class="item"><h3>${t.h.personal}: ${esc(driver.name)}</h3><p>${esc(driver.summary)}</p></div>
</section>
<section><h2>${t.h.stack}</h2><dl class="stack">${stackGroups.map((g) => `<dt>${esc(g.label)}</dt><dd>${g.items.map((i) => esc(i.name)).join(", ")}</dd>`).join("")}</dl></section>
<section><h2>${t.h.education}</h2><div class="item"><div class="item__head"><h3>${esc(education.degree)}</h3><span class="when">${esc(education.from)} – ${esc(education.to)}</span></div><p>${esc(education.school)}</p></div></section>
<section><h2>${t.h.languages}</h2><p>${esc(languages)}</p></section>
</body></html>`;
}

const browser = await chromium.launch();
for (const locale of ["es", "en"] as const) {
  const out = fileURLToPath(new URL(`../public${cvHref(locale)}`, import.meta.url));
  const page = await browser.newPage();
  await page.setContent(render(locale), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log(`CV (${locale}): ${out}`);
}
await browser.close();
