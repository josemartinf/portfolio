import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** La portada y las tres páginas de caso, con las URLs limpias que sirve Vercel (cleanUrls). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...cases.map((c) => ({ url: `${site.url}/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
