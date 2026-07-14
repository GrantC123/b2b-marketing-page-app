import { loadPartnerPaths, type ResolvedPartnerPath } from "./paths";
import { loadYaml } from "./load";
import type {
  HeroPathsCopy,
  HeroPortraitCopy,
  HubContentYaml,
  PartnerPathsSectionCopy,
} from "./types";

export type HubContent = {
  meta: HubContentYaml["meta"];
  heroVariant: HubContentYaml["hero"]["variant"];
  heroPortrait: HeroPortraitCopy;
  heroPaths: HeroPathsCopy;
  partnerPaths: ResolvedPartnerPath[];
  partnerPathsSection: PartnerPathsSectionCopy;
  stats: HubContentYaml["stats"];
};

let cached: HubContent | undefined;

export function getHubContent(): HubContent {
  if (cached) return cached;

  const yaml = loadYaml<HubContentYaml>("hub.yaml");

  cached = {
    meta: yaml.meta,
    heroVariant: yaml.hero.variant,
    heroPortrait: yaml.hero.portrait,
    heroPaths: yaml.hero.paths,
    partnerPaths: loadPartnerPaths(yaml.partnerPaths.pathsFile),
    partnerPathsSection: yaml.partnerPaths.section,
    stats: yaml.stats,
  };

  return cached;
}
