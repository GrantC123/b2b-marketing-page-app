import type { ReactNode } from "react";
import { FlourishCaretRight } from "@bankrate/icons-react";

import { LineEmphasis } from "@/components/common/flourish/line-emphasis";
import { FlourishSparkle } from "@/components/ui/flourish";
import { EyebrowSm, Heading2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingEyebrowSection } from "../shared/copy";

import { SectionShell } from "../shared/section-shell";

const items: ReactNode[] = [
  <>
    <span className="font-bold">Real savings for the people you serve: </span>
    Help them avoid overpaying—compare competitive offers side by side so they find
    a better rate.
  </>,
  <>
    <span className="font-bold">Backed by Bankrate: </span>
    Built on 40+ years of data, lender relationships, and market insight people
    already trust.
  </>,
  <>
    <span className="font-bold">Low-lift setup by design: </span>
    Flexible integration and onboarding options built to fit your business—not the
    other way around.
  </>,
];

export function HubBenefits() {
  return (
    <SectionShell className="bg-background">
      <div className="relative">
        <FlourishSparkle
          className="right-8 -top-8 z-10 hidden w-[71px] lg:block"
          width={71}
          height={90}
        />

        <div className="relative z-0 rounded-[48px] bg-blue-200 px-8 py-14 lg:px-[72px] lg:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-[88px]">
            <div className="max-w-[420px] shrink-0">
              <EyebrowSm as="p" className={marketingEyebrowSection}>
                The benefits
              </EyebrowSm>
              <Heading2 className="mt-4 text-blue-900">
                Why <LineEmphasis emphasis="partner" /> with us
              </Heading2>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex max-w-[580px] flex-col gap-4">
                {items.map((content, i) => (
                  <div
                    key={i}
                    className={cn("flex items-start gap-3", marketingBody)}
                  >
                    <span className="mt-[5px] flex size-[18px] shrink-0 items-center justify-center">
                      <FlourishCaretRight
                        aria-hidden
                        fill="var(--color-blue-600)"
                        className="size-[15px]"
                      />
                    </span>
                    <p className="min-w-0 flex-1">{content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
