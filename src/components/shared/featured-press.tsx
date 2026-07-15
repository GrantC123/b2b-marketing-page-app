import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";
import LogoBar, { type LogoBarItem } from "@/components/common/logo-bar";
import { Heading2 } from "@/components/ui/typography";

import { SectionShell } from "./section-shell";

/** Placeholder slots until final press logo assets are ready. */
export const PLACEHOLDER_PRESS_LOGOS: LogoBarItem[] = [
  { alt: "Press logo 1", width: 72, height: 28, placeholder: true },
  { alt: "Press logo 2", width: 120, height: 24, placeholder: true },
  { alt: "Press logo 3", width: 40, height: 40, placeholder: true },
  { alt: "Press logo 4", width: 160, height: 28, placeholder: true },
  { alt: "Press logo 5", width: 64, height: 28, placeholder: true },
  { alt: "Press logo 6", width: 110, height: 24, placeholder: true },
];

type FeaturedPressProps = {
  logos?: LogoBarItem[];
  className?: string;
};

/** “Featured by names you know and trust” — press logo bar. */
export function FeaturedPress({
  logos = PLACEHOLDER_PRESS_LOGOS,
  className,
}: FeaturedPressProps) {
  return (
    <SectionShell id="featured-press" className={className}>
      <div className="flex flex-col items-center gap-8">
        <Heading2 className="text-center text-pretty text-headings">
          <CircleEmphasis
            fillColor="var(--color-electric-400)"
            before="Featured by names you "
            emphasis="know and trust"
          />
        </Heading2>
        <LogoBar logos={logos} />
      </div>
    </SectionShell>
  );
}
