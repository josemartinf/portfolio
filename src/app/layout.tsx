import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";

/* Kit design-taste-frontend repartido como software (brief-v2.md, línea 2):
   palette soot-pale-lime · type familjen · radius sharp · buttons arrow · ground sky ·
   effect painterly-landscape (marco del hero collage) · moments liquid-type + iris-opens (portada),
   counter-rolls (Envo, Stockie), pinned-chapters (Club Zapateo) · hero collage (portada), triptych (casos). */
const title = "José Martin Flores — Software Engineer";
const description = "Software Engineer en Naranja X. Backend, integraciones y automatización con IA: Envo, Stockie y Club Zapateo contados por dentro, con su arquitectura y sus decisiones.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title, description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title, description, url: "/", images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: { icon: "/icon.svg" },
  other: { "page-type": "software", "site-kind": "software" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0f0f0f" };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="es" data-type="software" data-radius="sharp" data-buttons="arrow" data-ground="sky" data-motion="">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* El layout raíz del App Router cubre todas las páginas; la regla piensa en pages/_document. */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400..700&family=IBM+Plex+Mono:wght@400;500&display=swap" />
      <link rel="stylesheet" href="/assets/system.css" />
      <link rel="stylesheet" href="/assets/ui/cards.css" />
      <link rel="stylesheet" href="/assets/motion/motion.css" />
      <link rel="stylesheet" href="/assets/backgrounds/backgrounds.css" />
      <link rel="stylesheet" href="/assets/layout/layout.css" />
      <link rel="stylesheet" href="/assets/icons/icon.css" />
      <link rel="stylesheet" href="/assets/diagrams/diagram.css" />
      <link rel="stylesheet" href="/assets/moments/liquid-type/moment.css" />
      <link rel="stylesheet" href="/assets/moments/iris-opens/moment.css" />
      <link rel="stylesheet" href="/assets/moments/counter-rolls/moment.css" />
      <link rel="stylesheet" href="/assets/moments/pinned-chapters/moment.css" />
      <link rel="stylesheet" href="/site.css" />
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('m-enter','mo-js');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)" }} />
      <script src="/assets/backgrounds/backgrounds.js" />
      <link rel="modulepreload" href="/assets/moments/moments.js" />
      <link rel="modulepreload" href="/assets/moments/lib.js" />
      {/* La precarga del momento de cada página va en la página (moments.md): liquid-type e iris-opens en la portada,
          counter-rolls o pinned-chapters en cada caso. */}
    </head>
    <body>{children}
      <script type="module" src="/assets/system.js" />
      <script type="module" src="/assets/motion/motion.js" />
      <script type="module" src="/assets/layout/layout.js" />
      <script type="module" src="/assets/diagrams/mount.js" />
      <script type="module" src="/site.js" />
    </body>
  </html>;
}
