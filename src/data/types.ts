export type CaseSlug = "envo" | "stockie" | "club-zapateo";

/** Una captura. `title` es corto y va al lado de la captura, nunca debajo. */
export interface Shot {
  src: string;
  alt: string;
  frame: "browser" | "phone";
  title: string;
  /** El nombre corto para la barra en un teléfono, cuando `title` pasa de 24 caracteres. */
  short?: string;
  /** La parte de la captura que se muestra en una ventana más baja o más chica: desde `x` e `y` (fracciones del ancho
   * y del alto de la captura), `w` del ancho. Sin esto se ve la captura entera. Solo escritorio. */
  focus?: Focus;
}

export interface Focus {
  x: number;
  y?: number;
  w: number;
}

/** Un set del collage del hero (triptych): un rol con su captura principal, una segunda opcional y una nota. */
export interface HeroSet {
  label: string;
  line: string;
  main: Shot;
  side?: Shot;
}

export interface TechSheet {
  architecture: string;
  stack: string[];
  practices: string[];
  patterns: string[];
  /** La ficha resumida de la portada (spec: "una línea por parte"). Lo que falta sale de la ficha completa. */
  short?: { architecture?: string; stack?: string; practices?: string; patterns?: string };
}

export interface Decision {
  title: string;
  why: string;
}

export interface RoleView {
  role: string;
  summary: string;
  shots: Shot[];
}

/** Un nodo del diagrama. `icon` es el nombre de un archivo de public/assets/icons, sin la extensión; `sub` es la línea
 * chica de la tarjeta (desde 900 px). `at` y `atCompact` son fracciones de la caja (layout `free` del kit), en escritorio
 * y bajo 480 px. */
export interface ArchNode {
  id: string;
  label: string;
  icon?: string;
  sub?: string;
  at: [number, number];
  atCompact: [number, number];
}

/**
 * La arquitectura como diagrama del kit (assets/diagrams, layout `free`, el del preset free-approval): los nodos en
 * su lugar, las líneas reales entre ellos y `shots`, el orden en que corren los pulsos ("a>b"; una lista corre junta).
 */
export interface ArchDiagram {
  preset: "free";
  nodes: ArchNode[];
  edges: { from: string; to: string; curve?: "curve" | "elbow" | "straight"; faint?: boolean }[];
  shots: (string | string[])[][];
  alt: string;
}

/** Una cifra verificada, para la fila de counter-rolls: el número solo y su texto corto. */
export interface Figure {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: CaseSlug;
  name: string;
  tagline: string;
  /** Una línea corta: qué es y para quién (la portada y el encabezado del caso). */
  lead: string;
  /** El momento repartido para su página (brief-v2): las cifras que ruedan o los capítulos fijos en las pantallas. */
  moment: "counter-rolls" | "pinned-chapters";
  homeFacts: [string, string, string];
  problem: string;
  heroShot: Shot;
  /** El collage del hero: de 2 a 4 sets, uno por rol. */
  heroSets: HeroSet[];
  /** La línea bajo el título de la sección de pantallas. */
  screens: string;
  roles: RoleView[];
  diagram: ArchDiagram;
  decisions: Decision[];
  /** La línea bajo "Decisiones técnicas": el riesgo propio de este caso que las decisiones atienden (fix round 1, G1). */
  decisionsLead: string;
  quality: string[];
  /** La línea bajo "Calidad y evidencia", propia del caso; solo si hay calidad. */
  qualityLead?: string;
  /** El CI que consta, dibujado como el visual de Calidad (un solo panel, sin estados ni resultados inventados). */
  qualityPanel?: { title: string; alt: string; steps: { label: string; icon?: string; note?: string }[] };
  /** De 2 a 4 cifras que constan, para counter-rolls, y la sección donde van (brief-v2). */
  figures?: { in: "calidad" | "ficha"; items: Figure[] };
  sheet: TechSheet;
  /** Partes del sistema (checklist de Web Reactiva): web, API, Mini App, panel... */
  parts: string[];
  /** Puntos de enfoque que el código demuestra. */
  focus: string[];
  /** Logros y estado: en producción, quién lo usa. Nada inventado. */
  status: string;
  /** Una cifra que consta, junto al estado en el hero (el dato duro del primer pantallazo). */
  heroFact: string;
  liveUrl?: string;
  /** Una demo pública para abrir desde el hero ("Abrir la demo"). Nunca /admin ni /login. */
  demoUrl?: string;
}

export interface SiteProject {
  slug: string;
  name: string;
  summary: string;
  layers: string[];
  sheet: TechSheet;
  liveUrl: string;
  /** Otros sitios de la misma entrada (GlobalFia y MonJeep comparten una). */
  moreLinks?: { name: string; url: string }[];
  shot: Shot;
  relatedCase?: CaseSlug;
  /** Partes del sistema (checklist de Web Reactiva): web, API, Mini App, panel... */
  parts: string[];
  /** Puntos de enfoque que el código demuestra. */
  focus: string[];
  /** Logros y estado: en producción, quién lo usa. Nada inventado. */
  status: string;
}

export interface ToolProject {
  slug: string;
  name: string;
  summary: string;
  layers: string[];
  sheet: TechSheet;
  shot?: Shot;
}

export interface Job {
  company: string;
  role: string;
  from: string;
  to: string | null;
  summary: string;
}

export interface Education {
  school: string;
  degree: string;
  from: string;
  to: string;
}
