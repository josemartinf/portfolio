import type { ProjectTag } from "@/data/types";

/** Qué es un proyecto (Cliente, Producto propio, Personal), como etiqueta chica sobre su nombre. */
export function Tag({ tag }: { tag: ProjectTag }) {
  return <span className={`tag tag--${tag === "Cliente" ? "client" : tag === "Personal" ? "personal" : "product"}`}>{tag}</span>;
}
