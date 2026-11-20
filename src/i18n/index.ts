/* Los dos idiomas del sitio. El español vive en las URLs de siempre (/, /envo, ...) y el inglés bajo /en (/en, /en/envo,
   ...): un link compartido antes de que existiera el inglés sigue llevando al mismo lugar. Los ids de las secciones
   (#proyectos, #problema, ...) son los mismos en los dos idiomas, así el CSS y los anclas no se duplican. */
export type Locale = "es" | "en";
export const locales: Locale[] = ["es", "en"];
export const otherLocale = (locale: Locale): Locale => (locale === "es" ? "en" : "es");

/** Una ruta del sitio en un idioma: "/" → "/en", "/#proyectos" → "/en#proyectos", "/envo" → "/en/envo". Un ancla sola
 *  ("#contacto") o una URL externa quedan como están. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "es" || path.startsWith("#") || /^[a-z]+:/i.test(path)) return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/** El código de idioma para los metadatos (Open Graph). */
export const ogLocale: Record<Locale, string> = { es: "es_AR", en: "en_US" };
