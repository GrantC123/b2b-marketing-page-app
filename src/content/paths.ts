import type { BankrateIcon } from "@bankrate/icons-react";

import type { IconOffsetColor, IconOffsetVariant } from "@/components/common/flourish/icon-offset";

import { resolvePartnerPathIcon } from "./icons";
import { loadYaml } from "./load";
import type { PartnerPathYaml } from "./types";

export type ResolvedPartnerPath = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: BankrateIcon;
  iconVariant: IconOffsetVariant;
  iconColor: IconOffsetColor;
};

export function loadPartnerPaths(relativePath: string): ResolvedPartnerPath[] {
  const paths = loadYaml<PartnerPathYaml[]>(relativePath);
  return paths.map((path) => ({
    ...path,
    icon: resolvePartnerPathIcon(path.icon),
  }));
}
