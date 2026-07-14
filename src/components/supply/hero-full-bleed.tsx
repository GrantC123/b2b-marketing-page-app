import type { ReactNode } from "react";

import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";

import {
  FullBleedHero,
} from "../shared/full-bleed-hero";
import {
  SUPPLY_BREADCRUMBS,
  type HeroBreadcrumbItem,
} from "../shared/hero-breadcrumbs";

type SupplyHeroFullBleedProps = {
  headline?: ReactNode;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  breadcrumbs?: HeroBreadcrumbItem[];
};

/** Supply full-bleed hero — Figma 561:2653. */
export function SupplyHeroFullBleed({
  headline,
  description = "Reach high-intent financial shoppers at the moment they're ready to act",
  ctaLabel,
  ctaHref = "#supply-goals",
  breadcrumbs = SUPPLY_BREADCRUMBS,
}: SupplyHeroFullBleedProps = {}) {
  return (
    <FullBleedHero
      breadcrumbs={breadcrumbs}
      headline={
        headline ?? (
          <CircleEmphasis
            before="Partnership paths built for how you "
            emphasis="go to market"
          />
        )
      }
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
    />
  );
}
