import type { Metadata } from "next";

import { AmazonCaseStudyPage } from "@/components/pages/amazon-case-study-page";
import { amazonCaseStudyContent } from "@/components/case-studies/content-amazon";

export const metadata: Metadata = {
  title: amazonCaseStudyContent.documentTitle,
};

export default function Page() {
  return <AmazonCaseStudyPage />;
}
