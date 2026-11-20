import type { CaseSlug } from "@/data/types";
import type { Locale } from "./index";
import * as esCases from "@/data/cases";
import * as esSites from "@/data/sites";
import * as esTools from "@/data/tools";
import * as esProfile from "@/data/profile";
import * as enCases from "@/data/en/cases";
import * as enSites from "@/data/en/sites";
import * as enTools from "@/data/en/tools";
import * as enProfile from "@/data/en/profile";

/* Los datos del sitio en un idioma: los casos, los sitios, la herramienta y el perfil (src/data, y su espejo en
   src/data/en con las mismas formas). Lo que no es texto (slugs, capturas, íconos, fechas) sale igual en los dos. */
type Cases = Pick<typeof esCases, "cases" | "caseBySlug" | "envoHealthShot">;
type Profile = Pick<typeof esProfile, "currentFact" | "jobs" | "education" | "stackGroups">;
function bundle(c: Cases, s: Pick<typeof esSites, "sites">, t: Pick<typeof esTools, "tools">, p: Profile) {
  return {
    cases: c.cases,
    caseBySlug: (slug: CaseSlug) => c.caseBySlug(slug),
    envoHealthShot: c.envoHealthShot,
    sites: s.sites,
    tools: t.tools,
    currentFact: p.currentFact,
    jobs: p.jobs,
    education: p.education,
    stackGroups: p.stackGroups,
  };
}
const bundles = {
  es: bundle(esCases, esSites, esTools, esProfile),
  en: bundle(enCases, enSites, enTools, enProfile),
};
export type Content = ReturnType<typeof bundle>;
export const content = (locale: Locale): Content => bundles[locale];
