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
  description = "Most ad placements don't reach people ready to decide. Put your brand in front of shoppers already comparing live rates—so you win when intent is highest.",
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
            before="Win the comparison when shoppers are "
            emphasis="ready to act"
          />
        )
      }
      description={description}
      ctaLabel={ctaLabel}
      ctaHref={ctaHref}
    />
  );
}
