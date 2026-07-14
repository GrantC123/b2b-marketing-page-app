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
        headline="Give your audience exclusive access to Bankrate's financial marketplace"
        description="From private mortgage auctions to embedded rate tools, Bankrate builds custom financial experiences for enterprise partners — at scale."
      />
      <PartnersSalesForm variant="enterprise" overlapHero />
      <EnterpriseWhiteLabelShowcase />
      <Integration variant="enterprise" />
      <SupplyHowItWorks
        eyebrow="How it works"
        heading="From first conversation to live integration"
        steps={enterpriseHowItWorksSteps}
        brushBackground
      />
      <StatsStrip
        stats={ENTERPRISE_WHY_STATS}
        eyebrow="Why Bankrate"
        heading="The financial platform your audience already trusts"
        headingAlign="center"
        stackClassName="gap-20"
      />
      <StickyContactBanner formId="contact-sales" />
    </Layout>
  );
}
