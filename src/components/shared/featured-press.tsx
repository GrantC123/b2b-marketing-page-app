import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";
import LogoBar, { type LogoBarItem } from "@/components/common/logo-bar";
import { Heading2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { BrushSectionShell } from "./brush-section-shell";
import { SectionShell } from "./section-shell";

const base = "/marketing/brand/partner-logos";

/** Partner / press logos for the hub “Trusted by” bar. */
export const PLACEHOLDER_PRESS_LOGOS: LogoBarItem[] = [
  {
    src: `${base}/amazon.svg`,
    alt: "Amazon",
    width: 120,
    height: 36,
  },
  {
    src: `${base}/yahoo.svg`,
    alt: "Yahoo",
    width: 100,
    height: 28,
  },
  {
    src: `${base}/cnbc-2025.svg`,
    alt: "CNBC",
    width: 96,
    height: 31,
  },
  {
    src: `${base}/cnn.svg`,
    alt: "CNN",
    width: 62,
    height: 30,
  },
  {
    src: `${base}/bloomberg.svg`,
    alt: "Bloomberg",
    width: 121,
    height: 24,
  },
  {
    src: `${base}/wsj.svg`,
    alt: "The Wall Street Journal",
    width: 51,
    height: 28,
  },
];

type FeaturedPressProps = {
  logos?: LogoBarItem[];
  className?: string;
};

/** “Trusted by industry-leading brands” — partner / press logo bar. */
export function FeaturedPress({
  logos = PLACEHOLDER_PRESS_LOGOS,
  className,
}: FeaturedPressProps) {
  return (
    <BrushSectionShell
      className={cn(
        // Don't pull into the previous section — logo bar needs clear air above.
        "mt-0",
        className
      )}
    >
      <SectionShell
        id="featured-press"
        className="bg-transparent py-0 lg:py-0"
      >
        <div className="flex flex-col items-center gap-8">
          <Heading2 className="text-center text-pretty text-headings">
            <CircleEmphasis
              fillColor="var(--color-electric-400)"
              before="Trusted by "
              emphasis="industry-leading brands"
            />
          </Heading2>
          <LogoBar logos={logos} />
        </div>
      </SectionShell>
    </BrushSectionShell>
  );
}
