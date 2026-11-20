import type { Metadata, Viewport } from "next";
import type { CaseStudy } from "@/data/types";
import { site } from "@/lib/site";
import { type Locale, localePath, ogLocale } from "@/i18n";
import { ui } from "@/i18n/ui";

/* El head de cada página, en su idioma. Cada página nombra su versión en el otro idioma (hreflang), y x-default es la
   española, la de siempre. */
const og = { url: "/og.jpg", width: 1200, height: 630 };

/** Las dos versiones de una página ("/" o "/envo"), para alternates.languages. */
export function languages(path: string) {
  return { es: localePath("es", path), en: localePath("en", path), "x-default": localePath("es", path) };
}

/** Lo que comparten todas las páginas de un idioma (el layout de cada uno). */
export function rootMetadata(locale: Locale): Metadata {
  const t = ui[locale].meta;
  return {
    metadataBase: new URL(site.url), title: t.title, description: t.description,
    openGraph: { type: "website", locale: ogLocale[locale], title: t.title, description: t.description, images: [og] },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: [og.url] },
    icons: { icon: "/icon.svg" },
    other: { "page-type": "software", "site-kind": "software" },
  };
}

/** La portada de un idioma. */
export function homeMetadata(locale: Locale): Metadata {
  const t = ui[locale].meta, url = localePath(locale, "/");
  return {
    title: t.title, description: t.description,
    alternates: { canonical: url, languages: languages("/") },
    openGraph: { type: "website", locale: ogLocale[locale], title: t.title, description: t.description, url, images: [og] },
  };
}

/** Una página de caso: title "<name> — caso · José Martin Flores" y la description desde la tagline. */
export function caseMetadata(study: CaseStudy, locale: Locale = "es"): Metadata {
  const title = ui[locale].meta.caseTitle(study.name);
  const description = study.tagline;
  const url = localePath(locale, `/${study.slug}`);
  return {
    title,
    description,
    alternates: { canonical: url, languages: languages(`/${study.slug}`) },
    openGraph: { type: "article", locale: ogLocale[locale], title, description, url, images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og.url] },
  };
}

/** El color de la barra del navegador en un teléfono: el del fondo de cada tema (site.js lo cambia si el visitante
 *  elige el otro). */
export const viewport: Viewport = {
  width: "device-width", initialScale: 1, viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" }],
};
