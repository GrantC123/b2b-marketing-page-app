import { SupplyGoals } from "../supply/goals";
import { SupplyHeroFullBleed } from "../supply/hero-full-bleed";
import { SupplyHowItWorks } from "../supply/how-it-works";
import { SupplyWhyBankrate } from "../supply/why-bankrate";
import { StatsStrip } from "../shared/stats-strip";
import { SUPPLY_STATS } from "../shared/stat-tooltips";
import { Layout } from "../shared/layout";

/** Supply partners landing page — Figma frame 561:2174. */
export function SupplyPage() {
  return (
    <Layout>
      <SupplyHeroFullBleed />
      <SupplyGoals />
      <StatsStrip
        stats={SUPPLY_STATS}
        showTooltips
        columns={4}
        className="pb-12 lg:pb-16"
      />
      <SupplyHowItWorks />
      <SupplyWhyBankrate />
    </Layout>
  );
}
