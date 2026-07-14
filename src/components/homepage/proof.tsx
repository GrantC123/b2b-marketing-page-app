import type React from "react";
import { FlourishPlus } from "@bankrate/icons-react";
import Stat from "@/components/ui/stat";
import SectionShell from "@/components/homepage/shell";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StatTooltip, type StatTooltipData } from "@/components/homepage/stat-tooltip";

const STATS: { value: React.ReactNode; lead?: string; label: string; tooltip: StatTooltipData }[] = [
  {
    value: "$73k",
    label: "Average saved by Bankrate mortgage users over 30 years",
    tooltip: {
      heading: "During 2025, Bankrate's average rate saved its consumers $73,397 on their expected 30-year mortgage cost.",
      body: "Savings based on a modeled comparison of Bankrate's monthly average clicked-on rate in 2025 for purchases and refinances and Freddie Mac's average published mortgage rate, with savings calculated over a 30-year term using Bankrate's average loan amount. Freddie Mac's survey criteria differ from Bankrate data, and fees and points are excluded for both. Not actual realized consumer savings; actual savings vary based on loan terms, rates, costs, and how long the loan is held. Bankrate is not a lender.",
      linkText: "Learn more about our methodology.",
      linkHref: "https://www.bankrate.com/mortgages/bankrate-low-offers-methodology/",
    },
  },
  {
    value: (
      <div className="flex items-center gap-1" role="text" aria-label="850+">
        <span aria-hidden="true">850</span>
        <FlourishPlus className="size-4" aria-hidden="true" />
      </div>
    ),
    label: "Banks and credit unions surveyed every week",
    tooltip: {
      body: "Bankrate's rate data covers 850+ banks and credit unions nationwide, updated regularly across mortgage, savings, CD, and other deposit products. In mortgage specifically, 600+ lenders are surveyed. Rates shown reflect top offers, not averages.",
      linkText: "See our full methodology.",
      linkHref: "https://www.bankrate.com/mortgages/bankrate-low-offers-methodology/",
    },
  },
  {
    lead: "Top",
    value: "1%",
    label: "Bankrate customers got better rates than 99% of banks in 2025",
    tooltip: {
      heading: "During 2025, Bankrate's top offer outperformed 99.77% of offers by 600+ banks and credit unions surveyed.",
      body: "Based on an 8-year cost of loan calculation (including interest payments, lender fees and points). Comparison of Bankrate's best quoted offer clicked by a user each day in 2025 for a 30-year fixed purchase, $310k–$330k loan with 20% down, 700–780 FICO, primary residence, single family) against rates from all institutions surveyed by Bankrate for similar loan each applicable day (assuming $320k loan, 740 FICO). Bankrate is not a lender.",
      linkText: "Learn more about our methodology.",
      linkHref: "https://www.bankrate.com/mortgages/bankrate-low-offers-methodology/",
    },
  },
];

export default function Proof() {
  return (
    <SectionShell id="proof" className="py-0 lg:pt-0">
      <TooltipProvider>
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            {STATS.map(({ value, lead, label, tooltip }) => (
              <div key={label} className="relative">
                <Stat value={value} lead={lead} label={label} />
                <StatTooltip {...tooltip} />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              variant="link"
              href="https://www.bankrate.com/mortgages/bankrate-low-offers-methodology/"
              arrow
              id="homepage-behind-the-numbers"
              data-beam-element-clicked-no-delay=""
              data-type="button"
              data-location="homepage"
              data-name="behind-the-numbers"
              data-text="Behind the numbers"
              data-outcome="navigate"
            >
              Behind the numbers
            </Button>
          </div>
        </div>
      </TooltipProvider>
    </SectionShell>
  );
}
