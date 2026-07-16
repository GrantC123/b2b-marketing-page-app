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

/** Enterprise contact form — excludes supply/affiliate routing options. */
export const ENTERPRISE_INTEREST_OPTIONS = [
  { value: "enterprise", label: "Enterprise & private programs" },
  { value: "api-integrations", label: "API & integrations" },
  { value: "data-licensing", label: "Data licensing" },
  { value: "other", label: "Other" },
] as const;

export type PartnersInterestValue = (typeof PARTNERS_INTEREST_OPTIONS)[number]["value"];

export type PartnersInterestOption = {
  value: string;
  label: string;
};

export function getPartnersInterestLabel(value: string): string {
  return (
    PARTNERS_INTEREST_OPTIONS.find((opt) => opt.value === value)?.label ?? value
  );
}

/** Enterprise qualification — who they serve. */
export const ORGANIZATION_TYPE_OPTIONS = [
  { value: "employer-benefits", label: "Employer / benefits" },
  { value: "affinity-membership", label: "Affinity / membership" },
  { value: "consumer-channel", label: "Consumer brand / channel" },
  { value: "other", label: "Other" },
] as const;

/** Enterprise qualification — approximate audience / workforce size. */
export const COMPANY_SIZE_OPTIONS = [
  { value: "under-500", label: "Under 500" },
  { value: "500-5000", label: "500 – 5,000" },
  { value: "5000-50000", label: "5,000 – 50,000" },
  { value: "50000-plus", label: "50,000+" },
] as const;

export function getOrganizationTypeLabel(value: string): string {
  return (
    ORGANIZATION_TYPE_OPTIONS.find((opt) => opt.value === value)?.label ?? value
  );
}

export function getCompanySizeLabel(value: string): string {
  return (
    COMPANY_SIZE_OPTIONS.find((opt) => opt.value === value)?.label ?? value
  );
}

/** Zendesk inquiry type for new partnership / advertising leads. */
export const ZENDESK_PARTNERSHIP_INQUIRY_TYPE =
  "new_partnership_/_advertise_with_us" as const;
