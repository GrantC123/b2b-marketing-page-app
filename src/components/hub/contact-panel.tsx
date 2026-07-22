import Image from "next/image";

import { LineEmphasis } from "@/components/common/flourish/line-emphasis";
import { PartnersInquiryForm } from "@/components/common/partners-inquiry-form";
import { MARKETING_BRUSH_IMG } from "@/components/shared/brush-assets";
import { FlourishSparkle } from "@/components/ui/flourish";
import { Heading1 } from "@/components/ui/typography";

import { SectionShell } from "../shared/section-shell";

/**
 * Hub contact surface — homepage hero container + partner form content.
 * Brush panel shell matches brand homepage hero responsive behavior.
 */
export function HubContactPanel() {
  return (
    <SectionShell
      id="contact-sales"
      variant="hero"
      className="scroll-mt-[calc(82px+1rem)] bg-background"
    >
      <div className="relative w-full overflow-hidden rounded-3xl bg-blue-900 lg:rounded-4xl">
        <div className="absolute inset-0 md:hidden" aria-hidden>
          <Image
            src={MARKETING_BRUSH_IMG.mobile}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 hidden md:block" aria-hidden>
          <Image
            src={MARKETING_BRUSH_IMG.desktop}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 100vw"
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-(--section-copy) flex-col items-center gap-10 px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
          <Heading1 className="w-full text-pretty text-center leading-[1.2] tracking-tight text-white">
            <LineEmphasis
              emphasis="Partner"
              after=" with us"
              underlineClassName="-bottom-2 sm:-bottom-3"
            />
          </Heading1>

          <div className="relative w-full">
            <FlourishSparkle
              className="-right-2 -top-3 z-10 w-10 sm:-right-3 sm:-top-4 sm:w-12"
              width={48}
              height={60}
            />
            <div className="w-full rounded-[24px] bg-card p-6 shadow-[0_24px_60px_rgba(0,41,61,0.18)] sm:rounded-[32px] sm:p-8 lg:p-10">
              <PartnersInquiryForm
                formId="hub-contact"
                title="Tell us about your business"
                description="Share a few details about your company and what you're looking for. We'll follow up and connect you with the right partnerships contact."
                submitLabel="Submit request"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
