import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { content } from "@/i18n/content";
import { caseMetadata } from "@/lib/metadata";

const study = content("es").caseBySlug("envo");
export const metadata: Metadata = caseMetadata(study, "es");
export default function Page() {
  return <CaseStudyPage study={study} locale="es" />;
}
