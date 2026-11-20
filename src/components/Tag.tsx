import type { ProjectTag } from "@/data/types";
import type { Locale } from "@/i18n";
import { ui } from "@/i18n/ui";

/** Qué es un proyecto (Cliente, Producto propio, Personal), como etiqueta chica sobre su nombre. Los datos guardan la
 *  clave (client, product, personal) y la palabra sale del idioma de la página. */
export function Tag({ tag, locale = "es" }: { tag: ProjectTag; locale?: Locale }) {
  return <span className={`tag tag--${tag}`}>{ui[locale].tags[tag]}</span>;
}
