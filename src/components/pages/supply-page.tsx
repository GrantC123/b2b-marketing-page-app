import { SupplyGoals } from "../supply/goals";
import { SupplyHeroFullBleed } from "../supply/hero-full-bleed";
import { SupplyHowItWorks } from "../supply/how-it-works";
import { SupplyWhyBankrate } from "../supply/why-bankrate";
import { SupplyRateTableShowcase } from "../shared/illustration-showcase";
import { StickyContactBanner } from "../shared/sticky-contact-banner";
import { Layout } from "../shared/layout";

/** Supply partners landing page — Figma frame 561:2174. */
export function SupplyPage() {
  return (
    <Layout>
      <SupplyHeroFullBleed />
      <SupplyGoals />
      <SupplyRateTableShowcase />
      <SupplyHowItWorks />
      <SupplyWhyBankrate />
      <StickyContactBanner
        formId="supply-goals"
        message="Ready to win when shoppers are ready to act?"
      />
    </Layout>
  );
}
