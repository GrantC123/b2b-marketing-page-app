import { Checkmark } from "@bankrate/icons-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EyebrowSm, Heading1, Heading2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingEyebrowSection } from "./copy";
import { SectionShell } from "./section-shell";

const caseStudyContent = {
  eyebrow: "Case study",
  heading: "See what enterprise partnership looks like in practice",
  highlight: "$73K average savings",
  kicker: "Fortune 50 technology company",
  body: "By integrating a private mortgage auction directly into their employee benefits portal, this global technology leader enabled their workforce to access rates substantially lower than the national average.",
  cta: "Read the full case study",
  ctaHref: "/partner/case-studies/amazon",
  outcomes: [
    "98% employee satisfaction score",
    "Seamless SSO integration",
    "Live within 6 weeks",
  ],
};

export function CaseStudies() {
  return (
    <SectionShell className="bg-background">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <EyebrowSm as="p" className={marketingEyebrowSection}>
            {caseStudyContent.eyebrow}
          </EyebrowSm>
          <Heading2 className="text-pretty text-headings">
            {caseStudyContent.heading}
          </Heading2>
        </div>

        <Card className="w-full rounded-[24px] border-1 border-gray-200 bg-card p-8 shadow-none ring-0 lg:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Heading1 className="text-pretty text-headings">
                  {caseStudyContent.highlight}
                </Heading1>
                <EyebrowSm as="p" className={marketingEyebrowSection}>
                  {caseStudyContent.kicker}
                </EyebrowSm>
              </div>
              <p className={cn("max-w-none text-base leading-[1.7] tracking-tighter", marketingBody)}>
                {caseStudyContent.body}
              </p>
              <Button
                variant="link"
                size="lg"
                arrow
                href={caseStudyContent.ctaHref}
                className="h-auto w-fit justify-start p-0 text-base font-normal"
              >
                {caseStudyContent.cta}
              </Button>
            </div>

            <div className="w-full shrink-0 rounded-2xl bg-[#f9f9fc] p-8 lg:max-w-[400px]">
              <ul className="flex flex-col gap-5">
                {caseStudyContent.outcomes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-[10px] bg-primary">
                      <Checkmark className="size-3 text-white" aria-hidden />
                    </span>
                    <p className="min-w-0 flex-1 text-base leading-[1.7] tracking-tighter text-headings">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}
