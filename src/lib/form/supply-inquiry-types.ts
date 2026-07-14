export const SUPPLY_VERTICALS = ["Mortgage", "Deposits", "Credit Cards", "Other"] as const;

export type SupplyVertical = (typeof SUPPLY_VERTICALS)[number];

export const SUPPLY_LOAN_TYPES = [
  "Purchase",
  "Refinance",
  "HELOC",
  "Home equity",
] as const;

export const SUPPLY_DEPOSIT_PRODUCTS = [
  "High-Yield Savings",
  "CDs",
  "Checking",
  "Money Market",
  "Other",
] as const;

export const SUPPLY_GEO_FOOTPRINTS = [
  "National",
  "Multi-state / regional",
  "Single state",
  "Other",
] as const;

export const SUPPLY_MONTHLY_BUDGETS = [
  "Under $10k",
  "$10k–$25k",
  "$25k–$50k",
  "$50k–$100k",
  "$100k+",
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
