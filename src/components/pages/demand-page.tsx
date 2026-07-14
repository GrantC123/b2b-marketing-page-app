import { FullBleedHero } from "../shared/full-bleed-hero";
import { SupplyRequirements } from "../supply/requirements";
import { DEMAND_BREADCRUMBS } from "../shared/hero-breadcrumbs";
import { DemandEmbedShowcase } from "../shared/illustration-showcase";
import { Integration } from "../shared/integration";
import { Layout } from "../shared/layout";
import { PartnersSalesForm } from "../shared/partners-sales-form";
import { StickyContactBanner } from "../shared/sticky-contact-banner";
import { StatsStrip } from "../shared/stats-strip";
import { ENTERPRISE_STATS } from "../shared/stat-tooltips";

export function DemandPage() {
  return (
    <Layout>
      <FullBleedHero
        breadcrumbs={DEMAND_BREADCRUMBS}
        headline="Monetize your audience with Bankrate's financial marketplaces"
        description="Whether you run a finance blog, a YouTube channel, or a paid media operation — Bankrate has a program built for how you work."
      />
      <PartnersSalesForm variant="demand" overlapHero />
      <DemandEmbedShowcase />
      <StatsStrip stats={ENTERPRISE_STATS} showTooltips className="pb-12 lg:pb-16" />
      <Integration variant="demand" />
      <SupplyRequirements variant="faq" />
      <StickyContactBanner formId="apply" />
    </Layout>
  );
}
