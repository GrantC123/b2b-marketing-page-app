import { EyebrowSm, Heading2 } from "@/components/ui/typography";

import { marketingEyebrowSection } from "./copy";
import { StatPlus, StatTile } from "./stat-tile";
import { ENTERPRISE_PROOF_STATS } from "./stat-tooltips";
import { SectionShell } from "./section-shell";

export function Proof() {
  return (
    <SectionShell className="bg-background">
      <div className="flex flex-col gap-10">
        <div>
          <EyebrowSm as="p" className={marketingEyebrowSection}>
            Partnership proof points
          </EyebrowSm>
          <Heading2 className="mt-4 max-w-(--section-copy) text-pretty text-headings">
            Trusted by the market, proven by the data
          </Heading2>
        </div>
        <div className="grid w-full gap-4 md:grid-cols-3">
          {ENTERPRISE_PROOF_STATS.map((stat) => (
            <StatTile
              key={stat.label}
              value={
                <>
                  {stat.value}
                  {stat.suffix ? <StatPlus /> : null}
                </>
              }
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
