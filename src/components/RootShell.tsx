/* eslint-disable @next/next/no-head-element, @next/next/no-css-tags, @next/next/no-sync-scripts -- la cáscara de los dos layouts raíz (el
   <head>, las hojas y los scripts del kit, en su orden): las reglas la tratan como un componente cualquiera porque no vive en
   app/layout.tsx */
import type { ReactNode } from "react";
import { Familjen_Grotesk, IBM_Plex_Mono } from "next/font/google";
import type { Locale } from "@/i18n";
import "../app/globals.css";

/* El documento (html, head y body), el mismo para los dos idiomas: cada idioma tiene su layout raíz (src/app/(es) y
   src/app/(en)), así el <html lang> de cada página dice su idioma desde el primer byte, y los dos usan esta cáscara.

   Las dos familias, servidas desde el propio sitio (next/font las baja en el build): ningún pedido a Google en cada
   visita, y una fuente de respaldo con las medidas de la real, así el texto no se reacomoda cuando la fuente llega
   (con la hoja de Google y display=swap, el h1 y los párrafos cambiaban de ancho al cargar). site.css las nombra por
   sus variables. El español entra entero en el subconjunto latin. */
const familjen = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-familjen", display: "swap" });
// la mono sin precarga: va en pocos lugares (el dominio del footer, los números de la nota del hero, el código de los casos)
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap", preload: false });

/* Kit design-taste-frontend repartido como software (brief-v2.md, línea 2):
   palette soot-pale-lime · type familjen · radius sharp · buttons arrow · ground sky ·
   effect painterly-landscape (marco del hero collage) · moments liquid-type + iris-opens (portada),
   counter-rolls (Envo, Stockie), pinned-chapters (Club Zapateo) · hero collage (portada), triptych (casos). */

/* El tema, antes de pintar nada: el que el visitante eligió (localStorage) o, si nunca eligió, el de su sistema. Va en
   <html data-theme>, que site.css lee; sin script manda la preferencia del sistema (la media query de site.css). */
const THEME = "try{var t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t;";
const ENTER = "document.documentElement.classList.add('m-enter','mo-js');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)";

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <html lang={locale} className={`${familjen.variable} ${plexMono.variable}`} data-type="software" data-radius="sharp" data-buttons="arrow" data-ground="sky" data-motion="" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: THEME }} />
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
      <script dangerouslySetInnerHTML={{ __html: ENTER }} />
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
