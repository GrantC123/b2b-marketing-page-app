import { getHubContent } from "@/content/hub";
import { HubBenefits } from "../hub/benefits";
import { HubHero } from "../hub/hero";
import { HubHeroPaths } from "../hub/hero-paths";
import { HubIllustrationShowcases } from "../shared/illustration-showcase";
import { FeaturedPress } from "../shared/featured-press";
import { Integration } from "../shared/integration";
import { StatsStrip } from "../shared/stats-strip";
import { ENTERPRISE_STATS } from "../shared/stat-tooltips";
import { Layout } from "../shared/layout";
import { PartnersPaths } from "../hub/partners-paths";
import { PartnersSalesForm } from "../shared/partners-sales-form";
import { StickyContactBanner } from "../shared/sticky-contact-banner";

export function HubPage() {
  const content = getHubContent();
  const usePathsHero = content.heroVariant === "paths";
  const bannerShowAfterId = usePathsHero ? "partner-paths" : "hub-hero";

  return (
    <Layout>
      {usePathsHero ? (
        <HubHeroPaths copy={content.heroPaths} paths={content.partnerPaths} />
      ) : (
        <HubHero copy={content.heroPortrait} />
      )}
      {!usePathsHero ? (
        <PartnersPaths copy={content.partnerPathsSection} paths={content.partnerPaths} />
      ) : null}
      <HubIllustrationShowcases />
      <HubBenefits />
      <Integration />
      <StatsStrip
        stats={ENTERPRISE_STATS}
        showTooltips
        heading={content.stats.heading}
      />
      <PartnersSalesForm variant="hub" />
      <FeaturedPress />
      <StickyContactBanner
        formId="contact-sales"
        showAfterId={bannerShowAfterId}
        message="Ready to talk with our team?"
      />
    </Layout>
  );
}
