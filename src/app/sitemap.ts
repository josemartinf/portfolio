import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { site } from "@/lib/site";
import { type Locale, localePath, locales } from "@/i18n";

export const dynamic = "force-static";

/** La portada y las tres páginas de caso en los dos idiomas, con las URLs limpias que sirve Vercel (cleanUrls); cada
 *  entrada nombra su versión en el otro idioma. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [{ path: "/", priority: 1 }, ...cases.map((c) => ({ path: `/${c.slug}`, priority: 0.8 }))];
  const url = (locale: Locale, path: string) => `${site.url}${localePath(locale, path) === "/" ? "" : localePath(locale, path)}`;
  return locales.flatMap((locale) => pages.map(({ path, priority }) => ({
    url: url(locale, path), changeFrequency: "monthly" as const, priority,
    alternates: { languages: { es: url("es", path), en: url("en", path) } },
  })));
}
