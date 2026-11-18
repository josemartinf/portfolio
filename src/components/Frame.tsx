import type { CSSProperties } from "react";
import type { Focus, Shot as ShotData } from "@/data/types";
import { Shot } from "./Shot";

/**
 * Una captura de escritorio dentro de una ventana de navegador: la barra con los tres puntos y el nombre
 * de la pantalla arriba, la captura entera abajo. Nada va debajo de la captura.
 * `pos` corre la captura dentro de la ventana cuando `crop` le da una proporción más baja (por ejemplo,
 * para no mostrar el negro vacío del pie de una pantalla corta). `zoom` le da a la captura el zoom de la capa de
 * movimiento al pasar el puntero (.m-zoom: crece dentro de su propio marco, la caja no se mueve).
 * `focus` (con `crop`) muestra solo una parte de la captura, más grande: desde x, y (fracciones), w del ancho; la ventana
 * tiene la proporción `crop`. Así una ventana chica se sigue leyendo.
 */
const SRC_RATIO = 1.6; // las capturas de escritorio son 1600×1000
/** Con `focus` la captura se muestra 1 / w más ancha que la ventana: cada largo de `sizes` (los vw y px, no las
 *  condiciones entre paréntesis) crece igual, así el navegador elige el archivo que de verdad se ve. */
export function focusSizes(sizes: string, w: number): string {
  return sizes.replace(/(\([^)]*\))|(\d+(?:\.\d+)?)(vw|px)/g, (m, cond, n, unit) => (cond ? cond : `${Math.round(Number(n) / w)}${unit}`));
}
export function BrowserFrame({ shot, sizes, eager, label, labelShort, className, crop, pos, zoom, focus, dataPeekFor, hidden }: { shot: ShotData; sizes: string; eager?: boolean; label?: string; labelShort?: string; className?: string; crop?: number; pos?: string; zoom?: boolean; focus?: Focus; dataPeekFor?: string; hidden?: boolean }) {
  const ratio = crop ?? (focus ? SRC_RATIO : undefined);
  const f = focus && ratio ? {
    "--bf-img-w": `${(100 / focus.w).toFixed(3)}%`,
    "--bf-left": `${((-100 * focus.x) / focus.w).toFixed(3)}%`,
    "--bf-top": `${((-100 * (focus.y ?? 0) * ratio) / (focus.w * SRC_RATIO)).toFixed(3)}%`,
  } : {};
  const style = { ...(ratio ? { "--bf-ratio": String(ratio) } : {}), ...(pos ? { "--bf-pos": pos } : {}), ...f } as CSSProperties;
  // en un teléfono la barra lleva el nombre corto (M10): el de la página o el de la captura
  const full = label ?? shot.title;
  const short = labelShort ?? shot.short ?? full;
  const cls = `bframe${ratio ? " bframe--crop" : ""}${focus ? " bframe--focus" : ""}${className ? ` ${className}` : ""}`;
  return <div className={cls} style={style} data-peek-for={dataPeekFor} hidden={hidden}>
    <div className="bframe__bar" aria-hidden="true"><span className="bframe__dots"><i /><i /><i /></span><span className="bframe__label" data-label={full} data-label-short={short !== full ? short : undefined} /></div>
    <div className={`bframe__view${zoom ? " m-zoom" : ""}`}><Shot src={shot.src} alt={shot.alt} sizes={focus ? focusSizes(sizes, focus.w) : sizes} eager={eager} height={shot.height} /></div>
  </div>;
}

/** Una captura de teléfono (780×1688) en un marco de teléfono; nunca en una ventana de escritorio. */
export function PhoneFrame({ shot, className, style }: { shot: ShotData; className?: string; style?: CSSProperties }) {
  return <div className={`pframe${className ? ` ${className}` : ""}`} style={style}>
    <div className="pframe__screen"><Shot src={shot.src} alt={shot.alt} frame="phone" /></div>
  </div>;
}
