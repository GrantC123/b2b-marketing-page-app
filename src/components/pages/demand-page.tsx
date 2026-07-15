import { LineEmphasis } from "@/components/common/flourish/line-emphasis";

import { FullBleedHero } from "../shared/full-bleed-hero";
import { SupplyRequirements } from "../supply/requirements";
import { DEMAND_BREADCRUMBS } from "../shared/hero-breadcrumbs";
import { DemandEmbedShowcase } from "../shared/illustration-showcase";
import { Integration } from "../shared/integration";
import { Layout } from "../shared/layout";
import { PartnersSalesForm } from "../shared/partners-sales-form";
import { StickyContactBanner } from "../shared/sticky-contact-banner";

export function DemandPage() {
  return (
    <Layout>
      <FullBleedHero
        breadcrumbs={DEMAND_BREADCRUMBS}
        headline={
          <LineEmphasis
            before="Monetize with comparison experiences that "
            emphasis="improve outcomes"
            after=" for your audience"
          />
        }
        description="Most monetization doesn't help people decide better. Bankrate lets you earn from trusted comparison tools—whether you publish, create, or buy media."
      />
      <PartnersSalesForm variant="demand" overlapHero />
      <DemandEmbedShowcase />
      <Integration variant="demand" />
      <SupplyRequirements variant="faq" />
      <StickyContactBanner
        formId="apply"
        message="Ready to talk with our team?"
      />
    </Layout>
  );
}
