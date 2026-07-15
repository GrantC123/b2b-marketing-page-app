import { FullBleedHero } from "../shared/full-bleed-hero";
import { ENTERPRISE_BREADCRUMBS } from "../shared/hero-breadcrumbs";
import { Integration } from "../shared/integration";
import { StatsStrip } from "../shared/stats-strip";
import { ENTERPRISE_WHY_STATS } from "../shared/stat-tooltips";
import {
  SupplyHowItWorks,
  enterpriseHowItWorksSteps,
} from "../supply/how-it-works";
import { Layout } from "../shared/layout";
import { PartnersSalesForm } from "../shared/partners-sales-form";
import { StickyContactBanner } from "../shared/sticky-contact-banner";
import { EnterpriseWhiteLabelShowcase } from "../enterprise/white-label-showcase";

export function EnterprisePage() {
  return (
    <Layout>
      <FullBleedHero
        breadcrumbs={ENTERPRISE_BREADCRUMBS}
        headline="A private mortgage marketplace where lenders compete—so the people you serve don't overpay"
        description="Most people only see one mortgage rate—the one their lender shows them. We bring real offers together so lenders compete, costs come down, and you offer a benefit that drives engagement and loyalty."
      />
      <PartnersSalesForm variant="enterprise" overlapHero />
      <EnterpriseWhiteLabelShowcase />
      <Integration variant="enterprise" />
      <SupplyHowItWorks
        eyebrow="How it works"
        heading="From first conversation to a benefit that improves outcomes"
        steps={enterpriseHowItWorksSteps}
        brushBackground
      />
      <StatsStrip
        stats={ENTERPRISE_WHY_STATS}
        eyebrow="Why Bankrate"
        heading="Backed by Bankrate—proven by the data"
        headingAlign="center"
        stackClassName="gap-20"
      />
      <StickyContactBanner
        formId="contact-sales"
        message="Ready to talk with our team?"
      />
    </Layout>
  );
}
