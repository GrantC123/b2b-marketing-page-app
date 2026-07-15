import { EyebrowSm, Heading2, Heading3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingEyebrowSection } from "../shared/copy";
import { CopyColumn, SectionShell } from "../shared/section-shell";

const reasons = [
  {
    index: "01",
    title: "Award-winning editorial content",
    body: "Over 20,000 pieces of expert content that help people make smarter banking, lending, investing, credit card, and insurance decisions.",
  },
  {
    index: "02",
    title: "Product comparison tools",
    body: "Side-by-side comparisons for mortgages, credit cards, and more—so shoppers find better rates before they choose a brand.",
  },
  {
    index: "03",
    title: "Financial calculators",
    body: "Over 200 interactive tools that turn complex decisions into clear next steps—including mortgage savings and payment breakdowns.",
  },
  {
    index: "04",
    title: "Objective reviews",
    body: "Unbiased editorial reviews and Bankrate scores, plus verified consumer feedback—so people can decide with confidence.",
  },
] as const;

/** "Why millions turn to Bankrate" — Figma 561:2174. */
export function SupplyWhyBankrate() {
  return (
    <SectionShell className="bg-background">
      <div className="flex flex-col items-center gap-16">
        <CopyColumn className="flex flex-col gap-4 text-center">
          <EyebrowSm as="p" className={marketingEyebrowSection}>
            Backed by Bankrate
          </EyebrowSm>
          <Heading2 className="text-pretty text-headings">
            Why shoppers trust us with their biggest decisions
          </Heading2>
        </CopyColumn>

        <div className="grid w-full gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason) => (
            <article
              key={reason.index}
              className={cn(
                "flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 shadow-none"
              )}
            >
              <p className="text-xs font-bold uppercase tracking-[2.5px] text-gray-600">
                {reason.index}
              </p>
              <Heading3 className="text-lg tracking-tight text-gray-700 lg:text-lg">
                {reason.title}
              </Heading3>
              <p className={cn("text-lg leading-[1.7] tracking-tight", marketingBody)}>
                {reason.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
