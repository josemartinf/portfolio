import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";

const title = "José Martin Flores — Sitios web y sistemas para negocios";
const description = "Desarrollo sitios, tiendas online y sistemas de gestión para negocios en Buenos Aires. Next.js, Mercado Pago, automatización con IA.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url), title, description,
  openGraph: { type: "website", title, description, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  icons: { icon: "/icon.svg" },
  other: { "page-type": "service", "site-kind": "other" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#ecebe7" };
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="es" data-type="service" data-radius="soft" data-buttons="solid" data-motion="">
    <head>
      <link rel="stylesheet" href="/assets/system.css" />
      <link rel="stylesheet" href="/assets/ui/cards.css" />
      <link rel="stylesheet" href="/assets/motion/motion.css" />
      <link rel="stylesheet" href="/assets/layout/layout.css" />
      <link rel="stylesheet" href="/assets/icons/icon.css" />
      <link rel="stylesheet" href="/assets/diagrams/diagram.css" />
      <link rel="stylesheet" href="/assets/moments/picture-develops/moment.css" />
      <link rel="stylesheet" href="/site.css" />
      <link rel="modulepreload" href="/assets/moments/moments.js" />
      <link rel="modulepreload" href="/assets/moments/lib.js" />
      <link rel="modulepreload" href="/assets/moments/picture-develops/moment.js" />
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('m-enter','mo-js');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)" }} />
    </head>
    <body>{children}
      <script type="module" src="/assets/system.js" />
      <script type="module" src="/assets/motion/motion.js" />
      <script type="module" src="/assets/layout/layout.js" />
      <script type="module" src="/assets/diagrams/mount.js" />
    </body>
  </html>;
}
