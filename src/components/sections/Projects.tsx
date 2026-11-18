import type { CaseStudy } from "@/data/types";
import { caseBySlug } from "@/data/cases";
import { BrowserFrame, PhoneFrame } from "@/components/Frame";
import { Focus, Parts, StatusText, TechSheet } from "@/components/TechSheet";

/* #proyectos: los tres casos, una pantalla cada uno, en tres composiciones (brief-v2):
   Envo, el sistema: texto a la izquierda y el diagrama de un pedido a la derecha (lo que no se ve en una captura);
   Stockie, la pantalla: una fila corta de texto arriba y la captura a todo el ancho del bloque;
   Club Zapateo, los dos lados: el texto al costado y la ventana del panel con el teléfono de la puerta sobre su esquina.
   En la portada cada caso muestra sus partes, su enfoque y su estado; la ficha técnica completa vive en su página. */

/** El recorrido de un pedido en Envo: entra por n8n a la API y PostgreSQL, y sale por la outbox y el worker a cada canal. */
const envoFlow = {
  layout: "lanes",
  curve: "curve",
  alt: "Un pedido entra por Telegram o WhatsApp y n8n a la API de Next.js, que lo guarda en PostgreSQL. De ahí salen los avisos por la outbox y el worker hacia Telegram y WhatsApp, y el panel se actualiza en vivo con NOTIFY y SSE.",
  input: { label: "Pedido", icon: "n8n", sub: "llega por n8n" },
  core: { label: "API y PostgreSQL", icon: "postgres" },
  lanes: [
    { label: "Telegram", icon: "telegram", sub: "outbox y worker", done: true },
    { label: "WhatsApp", icon: "whatsapp", sub: "outbox y worker", done: true },
    { label: "Panel en vivo", icon: "nextjs", sub: "NOTIFY y SSE", done: true },
  ],
};

const meta = (c: CaseStudy) => [
  { label: "Partes", content: <Parts parts={c.parts} /> },
  { label: "Enfoque", content: <Focus focus={c.focus} /> },
  { label: "Estado", content: <StatusText text={c.status} urls={c.liveUrl ? [c.liveUrl] : []} />, className: "status" },
];

function Facts({ c }: { c: CaseStudy }) {
  return <ul className="case__facts">{c.homeFacts.map((f) => <li key={f}>{f}</li>)}</ul>;
}
function CaseLink({ c }: { c: CaseStudy }) {
  return <a className="link case__link" href={`/${c.slug}`}>Ver el caso<span className="sr-only"> de {c.name}</span></a>;
}
function Head({ c, id }: { c: CaseStudy; id: string }) {
  return <div className="section-head"><h2 id={`${id}-h`}>{c.name}</h2><p>{c.lead}</p></div>;
}

/** Texto al costado (Envo y Club Zapateo): hechos, partes, enfoque, estado y el link. */
function SideText({ c }: { c: CaseStudy }) {
  return <div className="case__text span-5">
    <Facts c={c} />
    <TechSheet sheet={c.sheet} compact rows={meta(c)} only={[]} className="case__meta" />
    <CaseLink c={c} />
  </div>;
}

export function Projects() {
  const envo = caseBySlug("envo"), stockie = caseBySlug("stockie"), zapateo = caseBySlug("club-zapateo");
  const door = zapateo.roles.flatMap((r) => r.shots).find((s) => s.frame === "phone")!;
  const reconciliation = zapateo.roles.flatMap((r) => r.shots).find((s) => s.src.includes("reconciliation"))!;
  return <>
    <section className="section case case--envo" id="proyectos" aria-labelledby="proyectos-h" data-project="envo"><div className="wrap">
      <Head c={envo} id="proyectos" />
      <div className="grid case__grid fill">
        <SideText c={envo} />
        <div className="case__visual span-6 start-7"><div className="frame frame--lit case__diagram"><div className="dg" data-dg-still="" data-diagram={JSON.stringify(envoFlow)} /></div></div>
      </div>
    </div></section>

    <section className="section case case--stockie" id="stockie" aria-labelledby="stockie-h" data-project="stockie"><div className="wrap">
      <div className="grid case__top">
        <div className="span-5"><Head c={stockie} id="stockie" /></div>
        <div className="span-6 start-7 case__text"><Facts c={stockie} /><CaseLink c={stockie} /></div>
      </div>
      <dl className="grid case__strip">{meta(stockie).map((r, i) => <div key={r.label} className={["span-5", "span-3 start-7", "span-3 start-10"][i]}><dt className="t-label">{r.label}</dt><dd className={r.className}>{r.content}</dd></div>)}</dl>
      <div className="case__wide fill">
        {/* recortada en el borde limpio bajo la tarjeta "Ventas · últimos 14 días" (y 655 de 1000, entre esa tarjeta y la fila
            de abajo): se ve entera, nunca cortada por la mitad */}
        <BrowserFrame shot={stockie.heroShot} label="Stockie · Dashboard" sizes="(max-width: 1023px) 92vw, 1280px" crop={2.44} zoom />
      </div>
    </div></section>

    <section className="section case case--zapateo" id="club-zapateo" aria-labelledby="club-zapateo-h" data-project="club-zapateo"><div className="wrap">
      <Head c={zapateo} id="club-zapateo" />
      <div className="grid case__grid fill">
        <SideText c={zapateo} />
        <div className="case__visual span-6 start-7"><div className="case__pair">
          <BrowserFrame shot={reconciliation} label="Club Zapateo · Conciliación" sizes="(max-width: 1023px) 92vw, 628px" zoom />
          <PhoneFrame shot={door} />
        </div></div>
      </div>
    </div></section>
  </>;
}
