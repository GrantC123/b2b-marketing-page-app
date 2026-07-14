import Image from "next/image";

import { CornerEmphasis } from "@/components/common/flourish/corner-emphasis";
import { LineEmphasis } from "@/components/common/flourish/line-emphasis";
import { Button } from "@/components/ui/button";
import { Heading1 } from "@/components/ui/typography";
import { MARKETING_BRUSH_IMG } from "@/components/shared/brush-assets";

import SectionShell from "./shell";

export default function Hero() {
  return (
    <SectionShell id="hero" className="px-0 py-6 lg:py-10 lg:px-6 xl:px-20">
      <div className="relative w-full overflow-hidden rounded-3xl bg-blue-900 lg:h-[600px] lg:rounded-4xl">
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

        <div className="relative z-10 flex flex-col gap-10 px-6 py-6 md:px-10 lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center lg:px-[147px] lg:py-0">
          <div className="flex flex-col gap-8">
            <Heading1 className="leading-[1.2] tracking-tight text-white lg:max-w-[778px]">
              <LineEmphasis
                before="9 out of 10 homebuyers overpay for their mortgage. "
                emphasis="You don't have to."
              />
            </Heading1>
            <p className="text-lg leading-[1.7] text-gray-50 lg:max-w-[778px]">
              American homeowners overpay $3,343 on their mortgage every year.
              Not because good rates don&rsquo;t exist, but because the system
              isn&rsquo;t built for people. Bankrate is. We make lenders compete
              for your loan until the best rate wins.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <span className="relative inline-flex self-start">
              <Button
                size="lg"
                arrow
                href="https://www.bankrate.com/mortgages/mortgage-rates/"
              >
                Get a better rate
              </Button>
              <CornerEmphasis
                fillColor="var(--color-electric-500)"
                className="-top-6 -right-7 size-7"
              />
            </span>
            <Button
              size="lg"
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
              arrow
              href="https://www.bankrate.com/mortgages/the-hidden-homeownership-tax/"
            >
              See the research
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
