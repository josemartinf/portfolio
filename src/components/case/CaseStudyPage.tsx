/* eslint-disable @next/next/no-img-element */
import type { CSSProperties, ReactNode } from "react";
import type { CaseStudy, HeroSet, RoleView, Shot } from "@/data/types";
import { cases } from "@/data/cases";
import { site, whatsappHref } from "@/lib/site";
import { BrowserFrame, PhoneFrame } from "@/components/Frame";
import { Parts, StatusText, TechSheet } from "@/components/TechSheet";
import { Logo, mainAction, Nav } from "@/components/sections/Nav";

/* Página de caso (spec "Páginas de caso", brief-v2 "Composición de la página de caso"):
   hero triptych (el nombre, la línea corta, el estado y las partes; el collage por rol; "Ver la arquitectura") →
   #problema (texto | la captura principal) → #pantallas por rol (texto y lista de pantallas al lado de la ventana) →
   #arquitectura (el diagrama con pulsos a todo el ancho) → #decisiones (filas qué | por qué) → #calidad (lo que consta)
   → #ficha (la ficha técnica completa) → footer.closing (contacto neutro y los otros dos casos).
   Momento repartido: counter-rolls en Envo (#calidad) y Stockie (#ficha); pinned-chapters en Club Zapateo (#pantallas).
   Toda captura va en su marco (BrowserFrame o PhoneFrame) y su nombre va al lado, nunca debajo. */

const sectionNav: [string, string][] = [["Problema", "#problema"], ["Pantallas", "#pantallas"], ["Arquitectura", "#arquitectura"], ["Decisiones", "#decisiones"], ["Ficha", "#ficha"]];

/** Lo que sale del código va en mono: cláusulas SQL, rutas, módulos y algoritmos. */
const CODE = /(SELECT … FOR UPDATE|FOR UPDATE SKIP LOCKED|LISTEN\/NOTIFY|NOTIFY|npm test|\.mjs|\/pedido|stock-core|httpOnly|sameSite strict|argon2id|scrypt|HMAC|Serializable)/g;
function withCode(text: string): ReactNode {
  return text.split(CODE).map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}

const shotKey = (s: Shot) => s.src.replace(/^.*\/(.+)\.webp$/, "$1");
const ICONS: Record<string, string> = {
  "Next.js": "nextjs", "Next.js 14": "nextjs", TypeScript: "typescript", PostgreSQL: "postgres", "PostgreSQL (Neon)": "postgres",
  n8n: "n8n", "Telegram Mini App": "telegram", WhatsApp: "whatsapp", OpenAPI: "openapi", Prisma: "prisma", Zod: "zod",
  "Mercado Pago": "mercadopago", Resend: "resend", "Vercel Blob": "vercel", Vitest: "vitest",
  "Better Auth": "betterauth", WebUSB: "ui-usb", DolarApi: "ui-circle-dollar-sign", Spline: "ui-box",
};
/** Las marcas de un solo tono sobre la baldosa oscura (#1a1a1a, M7): una negra o de trazo se dibuja clara; la blanca
 *  (Better Auth) queda como está y, apaisada, se ensancha. */
const ICON_CLASS: Record<string, string> = {
  betterauth: "ic-land", prisma: "ic-light", vercel: "ic-light", resend: "ic-light",
  "ui-usb": "ic-light", "ui-circle-dollar-sign": "ic-light", "ui-box": "ic-light",
};

function Icon({ id, size = 48 }: { id: string; size?: number }) {
  return <img className={`ic${ICON_CLASS[id] ? ` ${ICON_CLASS[id]}` : ""}`} data-icon={id} src={`/assets/icons/${id}.svg`} alt="" width={size} height={size} loading="lazy" />;
}

/* ---------------------------------------------------------------- hero (triptych) */

/** El ancho de cada ventana del collage en la página (la principal, 80% del collage: 35vw en escritorio y casi todo el
 *  ancho en un teléfono; la segunda, 58%, solo en escritorio); BrowserFrame lo agranda por su `focus`. */
const HERO_MAIN_SIZES = "(max-width: 1023px) 86vw, 36vw";
const HERO_SIDE_SIZES = "(max-width: 1023px) 1px, 26vw";
/** Un set del collage: la ventana principal, una segunda pieza (ventana o teléfono) y la nota del rol, sobre la
 *  esquina inferior izquierda de la principal. Todas las ventanas van en una sola escala (HERO_MAIN_W, HERO_SIDE_W). */
function Set({ set, index }: { set: HeroSet; index: number }) {
  const phone = set.main.frame === "phone";
  const sidePhone = set.side?.frame === "phone";
  const eager = index === 0;
  return <div className={`ly-collage__set case-set ${phone ? "case-set--phone" : "case-set--browser"}${sidePhone ? " case-set--side-phone" : ""}${index === 0 ? " is-on" : ""}`} aria-hidden={index === 0 ? undefined : true}>
    {phone
      ? <PhoneFrame shot={set.main} className="ly-piece case-piece case-piece--main" />
      : <BrowserFrame shot={set.main} focus={set.main.focus} crop={sidePhone ? HERO_MAIN_CROP_LOW : HERO_MAIN_CROP} className="ly-piece case-piece case-piece--main" sizes={HERO_MAIN_SIZES} eager={eager} />}
    {set.side && (sidePhone
      ? <PhoneFrame shot={set.side} className="ly-piece case-piece case-piece--side" />
      : <BrowserFrame shot={set.side} focus={set.side.focus} crop={HERO_SIDE_CROP} className="ly-piece case-piece case-piece--side" sizes={HERO_SIDE_SIZES} />)}
    <div className="ly-piece case-piece case-note"><b>{set.label}</b><span>{set.line}</span></div>
  </div>;
}
/** Las proporciones de las ventanas del collage (ancho / alto de la vista); site.css ubica la nota con la misma cuenta. */
const HERO_MAIN_CROP = 1.15;
const HERO_SIDE_CROP = 1.3;
/** Con un teléfono como segunda pieza la principal es más baja, así el teléfono no tapa sus renglones. */
const HERO_MAIN_CROP_LOW = 1.6;

function Hero({ study }: { study: CaseStudy }) {
  const roles = study.heroSets.map((s) => s.label.toLowerCase()).join(", ").replace(/, ([^,]+)$/, " y $1");
  return <section className="hero hero--triptych case-hero" data-enter aria-labelledby="hero-h"><div className="wrap"><div className="hero-text grid hero__grid">
    <div className="span-3 case-hero__text">
      <h1 id="hero-h">{study.name}</h1>
      <p className="hero__lead">{study.lead}</p>
      <p className="case-hero__status status"><StatusText text={study.status} urls={study.liveUrl ? [study.liveUrl] : []} /> · {study.heroFact}</p>
      <ul className="case-hero__parts" aria-label="Partes del sistema">{study.parts.map((p) => <li key={p}>{p}</li>)}</ul>
    </div>
    <div className="ly-collage span-6 start-4" role="img" aria-label={`Pantallas de ${study.name} por rol: ${roles}`}>
      {study.heroSets.map((s, i) => <Set key={s.label} set={s} index={i} />)}
    </div>
    <div className="span-3 start-10 hero__cta">
      <a className="btn btn--primary" href="#arquitectura">Ver la arquitectura</a>
      {study.demoUrl && <a className="btn btn--secondary" href={study.demoUrl} target="_blank" rel="noopener noreferrer">Abrir la demo</a>}
    </div>
  </div></div></section>;
}

/* ---------------------------------------------------------------- #problema */

function Problem({ study }: { study: CaseStudy }) {
  return <section className="section case-problem" id="problema" aria-labelledby="problema-h"><div className="wrap">
    <div className="section-head"><h2 id="problema-h">El problema</h2></div>
    <div className="grid case-split fill">
      <div className="span-5 case-split__text"><p className="case-lede">{withCode(study.problem)}</p></div>
      <div className="span-6 start-7 case-split__visual">
        <BrowserFrame shot={study.heroShot} focus={study.heroShot.focus} label={`${study.name} · ${study.heroShot.title}`} labelShort={study.heroShot.short ?? study.heroShot.title} sizes="(max-width: 1023px) 92vw, 1200px" />
      </div>
    </div>
  </div></section>;
}

/* ---------------------------------------------------------------- #pantallas */

/** Un rol: su texto y la lista de sus pantallas a la izquierda, la ventana a la derecha. La lista cambia la ventana
 *  (peek de system.js: puntero, foco o toque); sin script se ve la primera. */
function Role({ role, h3 = true }: { role: RoleView; h3?: boolean }) {
  const browser = role.shots.filter((s) => s.frame === "browser");
  const phone = role.shots.find((s) => s.frame === "phone");
  const peek = browser.length > 1;
  return <div className="grid case-role" data-peek={peek ? "" : undefined}>
    <div className="span-5 case-role__text">
      {h3 ? <h3>{role.role}</h3> : null}
      <p>{withCode(role.summary)}</p>
      {peek && <ul className="rows case-role__list">{browser.map((s) => <li key={s.src} data-peek-to={shotKey(s)} tabIndex={0}><span className="rows__name">{s.title}</span></li>)}</ul>}
    </div>
    <div className="span-6 start-7 case-role__visual">
      {browser.map((s, i) => <BrowserFrame key={s.src} shot={s} focus={s.focus} label={s.title} sizes="(max-width: 1023px) 92vw, 1200px" dataPeekFor={peek ? shotKey(s) : undefined} hidden={i > 0 ? true : undefined} />)}
      {phone && browser.length === 0 && <div className="frame frame--lit case-role__phone"><PhoneFrame shot={phone} /></div>}
    </div>
  </div>;
}

function Screens({ study }: { study: CaseStudy }) {
  const [first, second, ...rest] = study.roles;
  return <>
    <section className="section g2 case-screens" id="pantallas" aria-labelledby="pantallas-h"><div className="wrap">
      <div className="group">
        <div className="section-head"><h2 id="pantallas-h">Pantallas por rol</h2><p>{study.screens}</p></div>
        <Role role={first} />
      </div>
      <div className="group">{second && <Role role={second} />}</div>
    </div></section>
    {rest.length > 0 && <MoreRoles roles={rest} />}
  </>;
}

/** Los roles que quedan (en Envo, el repartidor y el cliente): su texto y la captura de teléfono en un panel. */
function MoreRoles({ roles }: { roles: RoleView[] }) {
  const phone = roles.flatMap((r) => r.shots).find((s) => s.frame === "phone");
  const title = roles.map((r, i) => (i === 0 ? r.role : r.role.toLowerCase())).join(" y ");
  return <section className="section case-more" id="roles" aria-labelledby="roles-h"><div className="wrap">
    <div className="section-head"><h2 id="roles-h">{title}</h2></div>
    <div className="grid case-split fill">
      <div className="span-5 case-more__text">{roles.map((r) => <div key={r.role}><h3>{r.role}</h3><p>{withCode(r.summary)}</p></div>)}</div>
      {phone && <div className="span-6 start-7 frame frame--lit case-more__visual" role="img" aria-label={phone.alt}><PhoneFrame shot={{ ...phone, alt: "" }} /></div>}
    </div>
  </div></section>;
}

/** Club Zapateo: los tres lugares como capítulos fijos (pinned-chapters, copiado de assets/moments/_demo/in-page-service.html):
 *  la sección se queda en pantalla mientras se abre cada paso y el marco de la derecha cambia a su captura. */
function Chapters({ study }: { study: CaseStudy }) {
  return <section className="section case-chapters" id="pantallas" style={{ "--h": 2 } as CSSProperties} data-moment="pinned-chapters" aria-labelledby="pantallas-h">
    <div className="wrap mo-pc__grid">
      <div className="mo-pc__text">
        <div className="section-head"><h2 id="pantallas-h">Pantallas por rol</h2><p>{study.screens}</p></div>
        <ol className="mo-pc__steps">{study.roles.map((r) => {
          const shot = r.shots[0];
          return <li className="mo-pc__step" key={r.role}>
            <h3>{r.role}</h3>
            <p>{withCode(r.summary)}</p>
            <figure className="mo-pc__visual mo-pc__visual--lit">
              {shot.frame === "phone"
                ? <PhoneFrame shot={shot} className="case-chapter__phone" />
                : <BrowserFrame shot={shot} focus={shot.focus} label={shot.title} sizes="(max-width: 1023px) 92vw, 1200px" />}
            </figure>
          </li>;
        })}</ol>
      </div>
      <div className="mo-pc__visuals frame"></div>
    </div>
  </section>;
}

/* ---------------------------------------------------------------- #arquitectura */

function Architecture({ study }: { study: CaseStudy }) {
  const d = study.diagram;
  const spec = { layout: d.preset, alt: d.alt, ground: "glow dots", nodes: d.nodes, edges: d.edges, shots: d.shots };
  return <section className="section case-arch" id="arquitectura" aria-labelledby="arquitectura-h"><div className="wrap">
    <div className="section-head"><h2 id="arquitectura-h">Arquitectura</h2><p>{withCode(study.sheet.architecture)}</p></div>
    {/* una figura con su descripción, no una imagen muda: un lector de pantalla puede recorrer las partes del
        diagrama una por una (el kit pone role="img" solo si el elemento no trae su propio rol) */}
    <div className="frame frame--lit case-arch__panel fill"><div className="dg" role="figure" aria-label={d.alt} data-diagram={JSON.stringify(spec)} /></div>
  </div></section>;
}

/* ---------------------------------------------------------------- #decisiones */

function Decisions({ study }: { study: CaseStudy }) {
  return <section className="section case-decide" id="decisiones" aria-labelledby="decisiones-h"><div className="wrap">
    <div className="section-head"><h2 id="decisiones-h">Decisiones técnicas</h2><p>{study.decisionsLead}</p></div>
    <ul className="grid case-decisions">{study.decisions.map((d) => <li key={d.title} className="span-6">
      <h3>{d.title}</h3>
      <p>{withCode(d.why)}</p>
    </li>)}</ul>
  </div></section>;
}

/* ---------------------------------------------------------------- cifras (counter-rolls) */

/** La fila de cifras verificadas. En la página con counter-rolls es el momento (ruedan una vez al entrar);
 *  en las otras, las cifras quietas. Nunca dentro de una tarjeta. */
function Figures({ study }: { study: CaseStudy }) {
  if (!study.figures) return null;
  const rolls = study.moment === "counter-rolls";
  const span = study.figures.items.length === 4 ? "span-3" : study.figures.items.length === 1 ? "span-6" : "span-4";
  return <div className="grid case-figures" data-moment={rolls ? "counter-rolls" : undefined}>
    {study.figures.items.map((f) => <div key={f.label} className={span}><p className="t-stat">{f.value}</p><p className="case-figures__label">{withCode(f.label)}</p></div>)}
  </div>;
}

/* ---------------------------------------------------------------- #calidad */

function Quality({ study }: { study: CaseStudy }) {
  if (study.quality.length === 0) return null;
  const figuresHere = study.figures?.in === "calidad";
  const rolls = figuresHere && study.moment === "counter-rolls";
  const panel = study.qualityPanel;
  const bare = !rolls && figuresHere && <div className="case-quality__figures">
    {study.figures!.items.map((f) => <div key={f.label}><p className="t-stat">{f.value}</p><p className="case-figures__label">{withCode(f.label)}</p></div>)}
  </div>;
  const list = <ul className="rows case-quality__list">{study.quality.map((q) => <li key={q}><p>{withCode(q)}</p></li>)}</ul>;
  return <section className="section case-quality" id="calidad" aria-labelledby="calidad-h"><div className="wrap">
    <div className="section-head"><h2 id="calidad-h">Calidad y evidencia</h2>{study.qualityLead && <p>{study.qualityLead}</p>}</div>
    <div className="fill case-body">
    {panel ? <div className="grid case-quality__grid">
      {/* Club Zapateo: la evidencia y su cifra suelta a la izquierda (nunca en una tarjeta, M3); a la derecha el CI que
          la corre, un panel de pasos con sus íconos reales, sin estados ni resultados */}
      <div className="span-5 case-quality__text">{list}{bare}</div>
      <figure className="span-6 start-7 frame frame--lit case-ci" role="img" aria-label={panel.alt}>
        <div className="case-ci__card">
          <p className="case-ci__title"><Icon id="github-actions" size={20} />{panel.title}</p>
          <ol className="case-ci__steps">{panel.steps.map((st) => <li key={st.label}>
            {st.icon && <img className="ic" data-icon={st.icon} src={`/assets/icons/${st.icon}.svg`} alt="" width={22} height={22} loading="lazy" />}
            <span className="case-ci__label">{st.label}</span>{st.note && <span className="case-ci__note">{withCode(st.note)}</span>}
          </li>)}</ol>
        </div>
      </figure>
    </div> : <div className="grid case-quality__grid">
      <ul className={`rows case-quality__list ${rolls ? "span-12 case-quality__list--wide" : "span-6"}`}>{study.quality.map((q) => <li key={q}><p>{withCode(q)}</p></li>)}</ul>
      {bare && <div className="span-6 start-7">{bare}</div>}
    </div>}
    {rolls && <Figures study={study} />}
    </div>
  </div></section>;
}

/* ---------------------------------------------------------------- #ficha */

function Sheet({ study }: { study: CaseStudy }) {
  const focus = <ul className="sheet__list">{study.focus.map((f) => {
    const [topic, ...rest] = f.split(":");
    return <li key={f}><b>{topic.trim()}</b>{rest.length ? <>: {withCode(rest.join(":").trim())}</> : null}</li>;
  })}</ul>;
  /* el stack como un muro de baldosas (una sola imagen para un lector de pantalla, como el de la portada): cada
     baldosa con su ícono real y su nombre adentro */
  const stack = <ul className="case-stack" role="img" aria-label={`Stack: ${study.sheet.stack.join(", ")}`}>
    {study.sheet.stack.map((t) => <li key={t} className="case-stack__tile">{ICONS[t] && <Icon id={ICONS[t]} size={32} />}<span>{t}</span></li>)}
  </ul>;
  return <section className="section case-sheet" id="ficha" aria-labelledby="ficha-h"><div className="wrap">
    <div className="section-head"><h2 id="ficha-h">Ficha técnica</h2></div>
    <div className="case-body">
    <div className="grid case-sheet__grid">
      <div className="span-5"><TechSheet sheet={study.sheet} only={["architecture", "practices"]} rows={[{ label: "Partes", content: <Parts parts={study.parts} /> }]} after={study.focus.length ? [{ label: "Enfoque", content: focus }] : []} /></div>
      <div className="span-6 start-7">
        <TechSheet sheet={study.sheet} only={["patterns"]} after={study.sheet.stack.length ? [{ label: "Stack", content: stack }] : []} className="case-sheet__right" />
      </div>
    </div>
    {study.figures?.in === "ficha" && <Figures study={study} />}
    </div>
  </div></section>;
}

/* ---------------------------------------------------------------- cierre */

function Close({ study }: { study: CaseStudy }) {
  const i = cases.findIndex((c) => c.slug === study.slug);
  const next = cases[(i + 1) % cases.length];
  const other = cases.find((c) => c.slug !== study.slug && c.slug !== next.slug)!;
  const external: [string, string][] = [["LinkedIn", site.linkedin], ["GitHub", site.github], ["WhatsApp", whatsappHref()]];
  const home: [string, string][] = [["Volver a la portada", "/"], ["Proyectos", "/#proyectos"], ["Sitios", "/#sitios"], ["Experiencia", "/#experiencia"]];
  return <footer className="footer closing closing--case" id="contacto" aria-labelledby="contacto-h"><div className="wrap">
    <div className="closing__cta close--type">
      <div className="section-head"><h2 id="contacto-h">Contacto</h2><p>Si querés hablar de {study.name} o de cómo está hecho, por email es lo más directo.</p></div>
      <a className="btn btn--primary" href={mainAction.href}>{mainAction.label}</a>
    </div>
    <div className="closing__links">
      <div className="grid">
        <div className="span-4 stack-4"><Logo mark={false} href="/" /><p className="footer__lede">Backend, integraciones y automatización con IA.</p></div>
        <div className="span-2 start-7 footer__col"><h3>Casos</h3><ul>
          <li><a href={`/${next.slug}`}>Siguiente caso: {next.name}</a></li>
          <li><a href={`/${other.slug}`}>{other.name}</a></li>
        </ul></div>
        <div className="span-2 start-9 footer__col"><h3>Portada</h3><ul>{home.map(([l, h]) => <li key={h}><a href={h}>{l}</a></li>)}</ul></div>
        <div className="span-2 start-11 footer__col"><h3>Contacto</h3><ul>{external.map(([l, h]) => <li key={l}><a href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>)}</ul></div>
      </div>
      <div className="footer__legal"><span>© 2026 {site.name}</span><span>Los nombres y logos de productos son marcas de sus dueños.</span></div>
    </div>
  </div></footer>;
}

/* ---------------------------------------------------------------- la página */

/** La precarga del momento de la página (moments.md, "Put one on the page"); el loader y su lib ya están en el layout,
 *  igual que la hoja de cada momento (en su orden, después de system.css). React la sube al <head> del HTML exportado. */
function MomentPreload({ id }: { id: CaseStudy["moment"] }) {
  return <link rel="modulepreload" href={`/assets/moments/${id}/moment.js`} />;
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return <>
    <MomentPreload id={study.moment} />
    <Nav links={sectionNav} logoHref="/" />
    <main id="top" className={`case-page case-page--${study.slug}`}>
      <Hero study={study} />
      <Problem study={study} />
      {study.moment === "pinned-chapters" ? <Chapters study={study} /> : <Screens study={study} />}
      <Architecture study={study} />
      <Decisions study={study} />
      <Quality study={study} />
      <Sheet study={study} />
    </main>
    <Close study={study} />
  </>;
}
