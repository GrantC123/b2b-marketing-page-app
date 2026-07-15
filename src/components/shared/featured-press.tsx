import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";
import LogoBar, { type LogoBarItem } from "@/components/common/logo-bar";
import { Heading2 } from "@/components/ui/typography";

import { SectionShell } from "./section-shell";

/** Placeholder slots until final partner logo assets are ready. Amazon is live. */
export const PLACEHOLDER_PRESS_LOGOS: LogoBarItem[] = [
  {
    src: "/marketing/brand/partner-logos/amazon.svg",
    alt: "Amazon",
    width: 160,
    height: 48,
  },
  { alt: "Partner logo 2", width: 130, height: 24, placeholder: true },
  { alt: "Partner logo 3", width: 40, height: 40, placeholder: true },
  { alt: "Partner logo 4", width: 200, height: 29, placeholder: true },
  { alt: "Partner logo 5", width: 62, height: 30, placeholder: true },
  { alt: "Partner logo 6", width: 121, height: 24, placeholder: true },
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
    <SectionShell id="featured-press" className={className}>
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
  );
}
