import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";
import { FEATURED_PRESS_LOGOS } from "@/components/common/featured-press-logos";
import LogoBar from "@/components/common/logo-bar";
import { Heading2 } from "@/components/ui/typography";

import SectionShell from "./shell";

export default function Trust() {
  return (
    <SectionShell id="trust">
      <div className="flex flex-col items-center gap-8">
        <Heading2 className="text-center">
          <CircleEmphasis
            fillColor="var(--color-electric-400)"
            before="Featured by names you "
            emphasis="know and trust"
          />
        </Heading2>
        <LogoBar logos={FEATURED_PRESS_LOGOS} />
      </div>
    </SectionShell>
  );
}
