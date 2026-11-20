import type { ReactNode } from "react";
import { RootShell } from "@/components/RootShell";
import { rootMetadata, viewport as shared } from "@/lib/metadata";

/* El layout raíz de las páginas en inglés (/en, /en/envo, ...): el documento es RootShell, con <html lang="en">. */
export const metadata = rootMetadata("en");
export const viewport = shared;
export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
