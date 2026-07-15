import type { IconOffsetColor, IconOffsetVariant } from "@/components/common/flourish/icon-offset";

export type HeadlineCopy = {
  before: string;
  emphasis: string;
  after?: string;
};

export type CtaCopy = {
  label: string;
  href: string;
};

export type HeroPortraitCopy = {
  headline: HeadlineCopy;
  body: string;
  cta: CtaCopy;
};

export type HeroPathsCopy = {
  headline: HeadlineCopy;
  body: string;
};

export type PartnerPathYaml = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: string;
  iconVariant: IconOffsetVariant;
  iconColor: IconOffsetColor;
};

export type PartnerPathsSectionCopy = {
  heading: string;
  body: string;
};

export type HubContentYaml = {
  meta: {
    title: string;
  };
  hero: {
    variant: "portrait" | "paths";
    portrait: HeroPortraitCopy;
    paths: HeroPathsCopy;
  };
  partnerPaths: {
    pathsFile: string;
    section: PartnerPathsSectionCopy;
  };
};
