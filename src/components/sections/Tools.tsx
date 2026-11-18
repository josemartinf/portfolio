import { tools } from "@/data/tools";
import { BrowserFrame } from "@/components/Frame";
import { TechSheet } from "@/components/TechSheet";

/* #herramientas: el driver SS-550, con la captura de su panel web al lado (nunca debajo) del texto. */
export function Tools() {
  const driver = tools[0];
  return <section className="section tools" id="herramientas" aria-labelledby="herramientas-h" data-project={driver.slug}><div className="wrap">
    <div className="section-head"><h2 id="herramientas-h">{driver.name}</h2><p>{driver.summary}</p></div>
    <div className="grid tools__grid fill">
      <div className="span-5 tools__text">
        <ul className="site__layers">{driver.layers.map((l) => <li key={l}>{l}</li>)}</ul>
        <TechSheet sheet={driver.sheet} compact />
      </div>
      {driver.shot && <div className="span-6 start-7"><BrowserFrame shot={driver.shot} label="Panel del driver SS-550" sizes="(max-width: 1023px) 92vw, 628px" /></div>}
    </div>
  </div></section>;
}
