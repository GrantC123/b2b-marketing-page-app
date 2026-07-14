import { Button } from "@/components/ui/button";
import { FlourishSparkle } from "@/components/ui/flourish";
import { cn } from "@/lib/utils";
import type { HeroPortraitCopy } from "@/content/types";

import { ENTERPRISE_IMG } from "../shared/enterprise-assets";
import { marketingHeroBody } from "../shared/copy";
import { SectionShell } from "../shared/section-shell";
import { HubHeadline } from "./hub-headline";

function DownPaymentCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-[220px] rounded-[25px] bg-white p-[22px] shadow-[0_4px_29px_rgba(0,0,0,0.24)]",
        className
      )}
    >
      <p
        className="text-[11px] font-semibold text-blue-900"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Down payment
      </p>
      <p className="mt-1 font-display text-2xl tracking-tight text-blue-900">
        $83,000
      </p>
      <img
        src={ENTERPRISE_IMG.heroSparkline}
        alt=""
        className="mt-4 h-6 w-full"
        aria-hidden
      />
      <div
        className="mt-4 h-[26px] w-full rounded-full border border-gray-100 bg-blue-900"
        aria-hidden
      />
    </div>
  );
}

function MonthlyPaymentCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-[130px] flex-col items-center rounded-[24px] bg-white p-4 shadow-[0_2px_14px_rgba(0,0,0,0.24)]",
        className
      )}
    >
      <img
        src={ENTERPRISE_IMG.heroMonthlyBadge}
        alt=""
        className="size-[72px]"
        aria-hidden
      />
      <p className="mt-2 text-center font-display text-sm text-blue-900">
        $2,171/mo
      </p>
    </div>
  );
}

/** Hero from Figma frame 150:6211 — navy card on cream, portrait + UI cards on the right. */
export function HubHero({ copy }: { copy: HeroPortraitCopy }) {
  return (
    <SectionShell id="hub-hero" variant="hero" className="bg-background pb-10">
      <div className="relative flex min-h-[640px] flex-col overflow-hidden rounded-[32px] bg-blue-900 md:min-h-[520px] md:flex-row md:items-stretch lg:min-h-[674px] lg:block lg:rounded-[56px]">
        {/* Copy + CTA */}
        <div className="relative z-10 px-6 py-12 sm:px-10 md:flex md:w-[46%] md:shrink-0 md:flex-col md:justify-center md:py-10 md:pl-10 md:pr-6 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[min(520px,42%)] lg:flex-col lg:justify-center lg:px-0 lg:pl-[70px] lg:py-[140px]">
          <div className="flex max-w-[534px] flex-col gap-8">
            <div className="relative flex flex-col gap-8">
              <HubHeadline
                copy={copy.headline}
                className="leading-[1.2] tracking-tight text-white lg:max-w-[778px]"
              />
              <p className={cn("max-w-[534px]", marketingHeroBody)}>{copy.body}</p>
            </div>
            <Button size="lg" href={copy.cta.href} className="w-full max-w-[240px]">
              {copy.cta.label}
            </Button>
          </div>
        </div>

        {/* Mobile — stacked below copy */}
        <div
          className="pointer-events-none relative z-[1] mt-auto aspect-[375/406] w-full shrink-0 md:hidden"
          aria-hidden
        >
          <div className="absolute -right-[5%] bottom-[-8%] h-[75%] w-[75%]">
            <div className="-rotate-90 size-full">
              <img
                src={ENTERPRISE_IMG.heroUnionBlob}
                alt=""
                className="size-full object-contain object-right"
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-[6%] right-[25%]">
            <img
              src={ENTERPRISE_IMG.heroPortrait}
              alt=""
              className="absolute bottom-0 left-[25%] h-[102%] w-auto max-w-none -translate-x-[42%] object-contain object-bottom"
            />
          </div>

          <FlourishSparkle
            className="absolute left-[34%] top-[3%] z-[4] w-[44px]"
            width={44}
            height={56}
          />

          <DownPaymentCard className="absolute left-[4%] top-[4%] z-[3] origin-top-left scale-[0.82]" />

          <MonthlyPaymentCard className="absolute right-[6%] bottom-[9%] z-[4] origin-bottom-right" />
        </div>

        {/* Tablet — visual column to the right of copy; tweak positions below */}
        <div
          className="pointer-events-none relative z-[1] hidden min-h-[480px] flex-1 md:block lg:hidden"
          aria-hidden
        >
          {/* Blob — anchored top-right; bleed offsets keep it visible after -rotate-90 */}
          <div className="absolute -right-[18%] -top-[22%] z-0 h-[125%] w-[95%]">
            <div className="-rotate-90 size-full">
              <img
                src={ENTERPRISE_IMG.heroUnionBlob}
                alt=""
                className="size-full object-contain object-right"
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-[4%] overflow-hidden">
            <img
              src={ENTERPRISE_IMG.heroPortrait}
              alt=""
              className="absolute bottom-0 left-[15%] h-[105%] w-auto max-w-none -translate-x-[38%] object-contain object-bottom"
            />
          </div>

          <FlourishSparkle
            className="absolute left-[28%] top-[6%] z-[4] w-[48px]"
            width={48}
            height={60}
          />

          <DownPaymentCard className="absolute left-[2%] top-[8%] z-[3] origin-top-left scale-[0.78]" />

          <MonthlyPaymentCard className="absolute right-[4%] bottom-[12%] z-[4] origin-bottom-right scale-[0.82]" />
        </div>

        {/* Desktop visual layer */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
          <div className="absolute -right-[20%] -top-[38%] h-[135%] w-[72%]">
            <div className="-rotate-90 size-full">
              <img
                src={ENTERPRISE_IMG.heroUnionBlob}
                alt=""
                className="size-full object-contain object-right"
              />
            </div>
          </div>

          <FlourishSparkle
            className="left-[42%] top-[14%] z-[3] w-[60px]"
            width={60}
            height={76}
          />
          <DownPaymentCard className="absolute left-[51.5%] top-[14.2%] z-[1]" />

          <div className="absolute left-[47.8%] top-[1.2%] z-[2] h-[698px] w-[646px] max-w-[48%] overflow-hidden">
            <img
              src={ENTERPRISE_IMG.heroPortrait}
              alt=""
              className="absolute h-[127%] max-w-none -left-[82%] -top-[5%] w-[205%] object-cover object-bottom"
            />
          </div>

          <MonthlyPaymentCard className="absolute right-[4.5%] top-[46.9%] z-[3]" />
        </div>
      </div>
    </SectionShell>
  );
}
