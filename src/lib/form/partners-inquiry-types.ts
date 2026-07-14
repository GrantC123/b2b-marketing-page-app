/** B2B partnership interest options — maps to Zendesk via submitPartnersInquiry. */
export const PARTNERS_INTEREST_OPTIONS = [
  { value: "mortgage-advertising", label: "Mortgage advertising" },
  { value: "deposits-cards", label: "Deposits & cards" },
  { value: "data-licensing", label: "Data licensing" },
  { value: "api-integrations", label: "API & integrations" },
  { value: "demand", label: "Affiliate partnerships" },
  { value: "publisher", label: "Publisher" },
  { value: "creator", label: "Creator" },
  { value: "enterprise", label: "Enterprise & private programs" },
  { value: "other", label: "Other" },
] as const;

export type PartnersInterestValue = (typeof PARTNERS_INTEREST_OPTIONS)[number]["value"];

export function getPartnersInterestLabel(value: string): string {
  return (
    PARTNERS_INTEREST_OPTIONS.find((opt) => opt.value === value)?.label ?? value
  );
}

/** Zendesk inquiry type for new partnership / advertising leads. */
export const ZENDESK_PARTNERSHIP_INQUIRY_TYPE =
  "new_partnership_/_advertise_with_us" as const;
