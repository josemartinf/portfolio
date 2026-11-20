import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { rootMetadata, viewport as shared } from "@/lib/metadata";

/* El layout raíz de las páginas en español (/, /envo, ...): el documento es RootShell, con <html lang="es">. */
export const metadata = rootMetadata("es");
export const viewport = shared;
export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootShell locale="es">{children}</RootShell>;
}
