import type { ReactNode } from "react";
import { FlourishArrows3 } from "@bankrate/icons-react";

import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";
import { Button } from "@/components/ui/button";
import { Heading1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { MARKETING_BRUSH_IMG } from "../shared/brush-assets";
import { marketingHeroBody } from "../shared/copy";
import {
  HeroBreadcrumbs,
  type HeroBreadcrumbItem,
} from "../shared/hero-breadcrumbs";
import { SectionShell } from "../shared/section-shell";

type SupplyHeroProps = {
  headline?: ReactNode;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  breadcrumbs?: HeroBreadcrumbItem[];
};

/** Supply hero from Figma 561:2174 — centered brush navy with overlapping goals panel below. */
export function SupplyHero({
  headline,
  description = "Reach high-intent financial shoppers at the moment they're ready to act",
  ctaLabel,
  ctaHref = "#supply-goals",
  breadcrumbs,
}: SupplyHeroProps = {}) {
  return (
    <SectionShell variant="hero" className="relative z-0 bg-background pb-0">
      <div className="relative overflow-hidden rounded-t-[32px] bg-blue-900 pb-40 pt-10 sm:pb-44 sm:pt-12 lg:rounded-t-[56px] lg:pb-48 lg:pt-14">
        <img
          src={MARKETING_BRUSH_IMG.mobile}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover opacity-90 md:hidden"
        />
        <img
          src={MARKETING_BRUSH_IMG.desktop}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden size-full object-cover opacity-90 md:block"
        />

        <div className="relative z-10 px-6 sm:px-10 lg:px-14">
          {breadcrumbs?.length ? (
            <HeroBreadcrumbs items={breadcrumbs} className="mb-8 sm:mb-10 lg:mb-12" />
          ) : null}
          <div className="mx-auto flex max-w-[50.625rem] flex-col items-center gap-6 text-center">
            <Heading1 className="text-pretty leading-[1.2] tracking-tight text-white">
              {headline ?? (
                <CircleEmphasis
                  before="Partnership paths built for how you "
                  emphasis="go to market"
                />
              )}
            </Heading1>
            <p className={cn("max-w-[45rem] text-balance text-center", marketingHeroBody)}>
              {description}
            </p>
            {ctaLabel ? (
              <Button size="lg" href={ctaHref} className="mt-2 w-full max-w-[240px]">
                {ctaLabel}
              </Button>
            ) : null}
          </div>
        </div>

        <FlourishArrows3
          fill="var(--color-electric-500)"
          className="pointer-events-none absolute bottom-24 right-6 hidden h-12 w-12 rotate-45 md:block lg:bottom-28 lg:right-10 lg:h-14 lg:w-14"
          aria-hidden
        />
      </div>
    </SectionShell>
  );
}
