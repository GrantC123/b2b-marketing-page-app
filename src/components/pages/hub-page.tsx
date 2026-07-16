import { getHubContent } from "@/content/hub";
import { cn } from "@/lib/utils";

import { HubBenefits } from "../hub/benefits";
import { HubHero } from "../hub/hero";
import { HubHeroPaths } from "../hub/hero-paths";
import { HubIllustrationShowcases } from "../shared/illustration-showcase";
import { FeaturedPress } from "../shared/featured-press";
import { Integration } from "../shared/integration";
import { Layout } from "../shared/layout";
import { HubPathChooser } from "../hub/path-chooser";
import { PartnersPaths } from "../hub/partners-paths";

export function HubPage() {
  const content = getHubContent();
  const usePathsHero = content.heroVariant === "paths";

  return (
    <Layout>
      {usePathsHero ? (
        <HubHeroPaths copy={content.heroPaths} paths={content.partnerPaths} />
      ) : (
        <HubHero copy={content.heroPortrait} />
      )}
      {!usePathsHero ? (
        <PartnersPaths
          copy={content.partnerPathsSection}
          paths={content.partnerPaths}
        />
      ) : null}
      <HubIllustrationShowcases />
      <HubBenefits />
      <Integration
        className={cn(
          "pt-[length:var(--section-gap)] lg:pt-[length:var(--section-gap-lg)]",
          "pb-[length:var(--section-gap)] lg:pb-[length:var(--section-gap-lg)]"
        )}
      />
      <FeaturedPress className="mt-4 lg:mt-8" />
      <HubPathChooser id="choose-path" />
    </Layout>
  );
}
