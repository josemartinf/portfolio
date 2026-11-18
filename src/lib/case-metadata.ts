import type { Metadata } from "next";
import type { CaseStudy } from "@/data/types";

/** El head de una página de caso: title "<name> — caso · José Martin Flores" y la description desde la tagline. */
export function caseMetadata(study: CaseStudy): Metadata {
  const title = `${study.name} — caso · José Martin Flores`;
  const description = study.tagline;
  return {
    title,
    description,
    alternates: { canonical: `/${study.slug}` },
    openGraph: { type: "article", title, description, url: `/${study.slug}`, images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}
