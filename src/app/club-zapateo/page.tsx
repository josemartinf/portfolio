import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case/CaseStudyPage";
import { caseBySlug } from "@/data/cases";
import { caseMetadata } from "@/lib/case-metadata";

const study = caseBySlug("club-zapateo");
export const metadata: Metadata = caseMetadata(study);
export default function Page() {
  return <CaseStudyPage study={study} />;
}
