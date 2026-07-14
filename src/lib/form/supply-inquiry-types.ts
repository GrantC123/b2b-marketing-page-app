export const SUPPLY_VERTICALS = ["Mortgage", "Deposits", "Credit Cards", "Other"] as const;

export type SupplyVertical = (typeof SUPPLY_VERTICALS)[number];

export const SUPPLY_LOAN_TYPES = [
  "Purchase",
  "Refinance",
  "HELOC",
  "Home equity",
] as const;

/** Maps lenders vertical tabs to partners interest values for Zendesk routing. */
export const SUPPLY_VERTICAL_INTEREST: Record<SupplyVertical, string> = {
  Mortgage: "mortgage-advertising",
  Deposits: "deposits-cards",
  "Credit Cards": "deposits-cards",
  Other: "other",
};

export function supplyFormTitle(vertical: SupplyVertical): string {
  return `Request ${vertical.toLowerCase()} partnership info`;
}
