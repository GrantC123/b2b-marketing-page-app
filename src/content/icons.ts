import { Bank, Online, TallBuilding, type BankrateIcon } from "@bankrate/icons-react";

const PARTNER_PATH_ICONS: Record<string, BankrateIcon> = {
  bank: Bank,
  "tall-building": TallBuilding,
  online: Online,
};

export function resolvePartnerPathIcon(key: string): BankrateIcon {
  const icon = PARTNER_PATH_ICONS[key];
  if (!icon) {
    throw new Error(`Unknown partner path icon "${key}". Add it to src/content/icons.ts.`);
  }
  return icon;
}
