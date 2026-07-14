import type { HeroPathsCopy } from "@/content/types";
import type { ResolvedPartnerPath } from "@/content/paths";
import { cn } from "@/lib/utils";

import { CornerEmphasis } from "../common/flourish/corner-emphasis";
import { marketingHeroBody } from "../shared/copy";
import { PathCard } from "../shared/path-card";
import { SectionShell } from "../shared/section-shell";
import { SUPPLY_IMG } from "../supply/assets";
import { HubHeadline } from "./hub-headline";

type HubHeroPathsProps = {
  copy: HeroPathsCopy;
  paths: ResolvedPartnerPath[];
};

/**
 * Hub hero — full-bleed navy brush (same treatment as supply/enterprise/affiliate)
 * with partner path cards overlapping the hero bottom.
 */
export function HubHeroPaths({ copy, paths }: HubHeroPathsProps) {
  return (
    <SectionShell
      variant="hero"
      fullBleed
      className="relative z-0 overflow-x-clip bg-background pb-10"
      id="partner-paths"
    >
      <div className="relative w-full">
        {/* Padding is sized for path-card overlap — tighter than the supply form hero */}
        <div className="relative bg-blue-900 pb-28 pt-10 sm:pb-32 sm:pt-12 lg:pb-[180px] lg:pt-14">
          <img
            src={SUPPLY_IMG.heroFullBleedBg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full min-w-full object-cover object-[center_bottom] sm:object-[right_bottom]"
          />

          <div className="relative z-10 mx-auto w-full max-w-(--section-main) px-6 lg:px-8">
            <div className="mx-auto flex max-w-[50.625rem] flex-col items-center gap-6 text-center">
              <HubHeadline
                copy={copy.headline}
                className="text-pretty leading-[1.2] tracking-tight text-white"
              />
              <p
                className={cn(
                  "max-w-[45rem] text-balance text-center",
                  marketingHeroBody
                )}
              >
                {copy.body}
              </p>
            </div>
          </div>
        </div>

        {/* Section-end brush edge — Figma 581:1938 */}
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

        {/* Mobile flourish — above navy, under hero copy (z-10) and cards (z-20) */}
        <div
          className="pointer-events-none absolute inset-x-0 z-[8] -mt-24 px-6 sm:-mt-28 md:hidden lg:-mt-32 lg:px-8"
          aria-hidden
        >
          <div className="relative mx-auto h-0 w-full max-w-(--section-main)">
            <CornerEmphasis className="-right-4" />
          </div>
        </div>

        <div className="relative z-20 -mt-24 px-6 sm:-mt-28 lg:-mt-32 lg:px-8">
          <div className="mx-auto grid w-full min-w-0 max-w-(--section-main) gap-8 md:grid-cols-3 md:items-stretch">
            {paths.map((path, index) => (
              <PathCard
                key={path.id}
                cornerEmphasis={
                  index === paths.length - 1 ? "desktop-last" : undefined
                }
                kicker={path.eyebrow}
                title={path.title}
                description={path.description}
                cta={path.cta}
                href={path.href}
                className="min-w-0 shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
