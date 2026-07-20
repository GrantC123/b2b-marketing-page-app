import { LineEmphasis } from "@/components/common/flourish/line-emphasis";
import { PartnersInquiryForm } from "@/components/common/partners-inquiry-form";
import { FlourishSparkle } from "@/components/ui/flourish";
import { Heading1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { SectionShell } from "../shared/section-shell";
import { SUPPLY_IMG } from "../supply/assets";

/**
 * Hub contact surface — Figma 692:11824.
 * Navy brush panel (brand full-bleed asset) + existing PartnersInquiryForm.
 */
export function HubContactPanel() {
  return (
    <SectionShell
      id="contact-sales"
      className="scroll-mt-[calc(82px+1rem)] bg-background"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[32px] bg-blue-900 px-6 py-12",
          "sm:rounded-[48px] sm:px-10 sm:py-16 lg:px-14 lg:py-20"
        )}
      >
        <img
          src={SUPPLY_IMG.heroFullBleedBg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full min-w-full object-cover object-[right_center]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[40rem] flex-col items-center gap-10">
          <Heading1 className="relative max-w-[52rem] text-pretty text-center leading-[1.2] tracking-tight text-white">
            <FlourishSparkle
              className="right-0 top-0 hidden size-10 translate-x-1/3 -translate-y-1/4 sm:block"
              width={40}
              height={40}
            />
            <LineEmphasis
              before="Help the people you serve make better "
              emphasis="financial decisions"
              underlineClassName="-bottom-2 sm:-bottom-3"
            />
          </Heading1>

          <div className="w-full rounded-[24px] bg-card p-6 shadow-[0_24px_60px_rgba(0,41,61,0.18)] sm:rounded-[32px] sm:p-8 lg:p-10">
            <PartnersInquiryForm
              formId="hub-contact"
              title="Tell us about your goals"
              description="Share a few details about your business, and we'll reach out to discuss how Bankrate can help you deliver better financial outcomes for your customers."
              submitLabel="Submit request"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
