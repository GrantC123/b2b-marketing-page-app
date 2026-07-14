import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Heading1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingHeroBody } from "./copy";
import {
  HeroBreadcrumbs,
  type HeroBreadcrumbItem,
} from "./hero-breadcrumbs";
import { SectionShell } from "./section-shell";
import { SUPPLY_IMG } from "../supply/assets";

type FullBleedHeroProps = {
  headline: ReactNode;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  breadcrumbs: HeroBreadcrumbItem[];
  /** Centered (default) for supply/demand; start for enterprise left-aligned copy. */
  align?: "center" | "start";
  /**
   * Extra bottom padding for an overlapping panel below (supply/demand).
   * Enterprise lead form sits flush — leave false.
   */
  overlapPanel?: boolean;
};

/**
 * Full-bleed navy hero — spans 100vw on every desktop width:
 * navy field + brush scribble texture + Section-end edge (Figma 581:1938).
 * Copy stays in a readable max-width column; decoration pins to viewport edges.
 */
export function FullBleedHero({
  headline,
  description,
  ctaLabel,
  ctaHref,
  breadcrumbs,
  align = "center",
  overlapPanel = true,
}: FullBleedHeroProps) {
  const centered = align === "center";

  return (
    <SectionShell
      variant="hero"
      fullBleed
      className="relative z-0 overflow-x-clip bg-background"
    >
      <div className="relative w-full">
        <div
          className={cn(
            "relative bg-blue-900 pt-10 sm:pt-12 lg:pt-14",
            overlapPanel
              ? "pb-[10.5rem] sm:pb-44 lg:pb-[13.5rem]"
              : "pb-10 sm:pb-12 lg:pb-14"
          )}
        >
          {/* Full-viewport scribble brush — cover + bottom-right so strokes remain on ultra-wide */}
          <img
            src={SUPPLY_IMG.heroFullBleedBg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full min-w-full object-cover object-[center_bottom] sm:object-[right_bottom]"
          />

          <div className="relative z-10 mx-auto w-full max-w-(--section-main) px-6 lg:px-8">
            <HeroBreadcrumbs
              items={breadcrumbs}
              className="mb-10 sm:mb-12 lg:mb-14"
            />
            <div
              className={cn(
                "flex max-w-[50.625rem] flex-col gap-6",
                centered
                  ? "mx-auto items-center text-center"
                  : "items-start text-left"
              )}
            >
              <Heading1 className="text-pretty leading-[1.2] tracking-tight text-white">
                {headline}
              </Heading1>
              <p
                className={cn(
                  "max-w-[45rem] text-balance",
                  centered && "text-center",
                  marketingHeroBody
                )}
              >
                {description}
              </p>
              {ctaLabel && ctaHref ? (
                <Button
                  size="lg"
                  href={ctaHref}
                  className={cn("mt-2 w-full max-w-[240px]", !centered && "min-w-[240px]")}
                >
                  {ctaLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        {/* Section-end — Figma 581:1938; overlaps navy + page so the brush edge is visible */}
        <div
          className="pointer-events-none relative z-[5] -mt-6 h-6 w-full sm:-mt-8 sm:h-8 lg:-mt-10 lg:h-10"
          aria-hidden
        >
          <img
            src={SUPPLY_IMG.heroSectionEnd}
            alt=""
            className="absolute inset-0 size-full max-w-none object-fill"
          />
        </div>
      </div>
    </SectionShell>
  );
}
