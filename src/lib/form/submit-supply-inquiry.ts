import { getPartnersInterestLabel } from "./partners-inquiry-types";
import {
  SUPPLY_VERTICAL_INTEREST,
  type SupplyVertical,
} from "./supply-inquiry-types";
import { submitContactInquiry, type SubmitContactInquiryResult } from "./submit-contact-inquiry";

export type SupplyInquiryPayload = {
  vertical: SupplyVertical;
  company: string;
  website: string;
  contactName: string;
  email: string;
  role: string;
  loanTypes: string[];
  nmls: string;
  markets: string;
  productFocus: string[];
  eligibility: string;
  geoFootprint: string;
  monthlyBudget: string;
  acquisitionGoal: string;
  cpaTarget: string;
  cardCategories: string[];
  offerMatrix: string;
  notes: string;
};

export type SubmitSupplyInquiryResult = SubmitContactInquiryResult;

function buildSubject(payload: SupplyInquiryPayload): string {
  const interest = SUPPLY_VERTICAL_INTEREST[payload.vertical];
  const interestLabel = getPartnersInterestLabel(interest);
  const subject = `Supply partnership: ${payload.vertical} — ${interestLabel} — ${payload.company}`;
  return subject.length > 150 ? `${subject.slice(0, 147)}...` : subject;
}

function buildDescription(payload: SupplyInquiryPayload): string {
  const lines = [
    `Vertical: ${payload.vertical}`,
    `Company: ${payload.company}`,
    `Contact: ${payload.contactName}`,
    `Email: ${payload.email}`,
  ];

  if (payload.website.trim()) lines.push(`Website: ${payload.website.trim()}`);
  if (payload.role.trim()) lines.push(`Role: ${payload.role.trim()}`);

  if (payload.vertical === "Mortgage") {
    if (payload.loanTypes.length > 0) {
      lines.push(`Loan types: ${payload.loanTypes.join(", ")}`);
    }
    if (payload.nmls.trim()) lines.push(`NMLS: ${payload.nmls.trim()}`);
    if (payload.markets.trim()) lines.push(`Markets: ${payload.markets.trim()}`);
  }

  if (payload.vertical === "Deposits") {
    if (payload.productFocus.length > 0) {
      lines.push(`Product focus: ${payload.productFocus.join(", ")}`);
    }
    if (payload.eligibility.trim()) {
      lines.push(`Eligibility restrictions: ${payload.eligibility.trim()}`);
    }
    if (payload.geoFootprint.trim()) {
      lines.push(`Geo footprint: ${payload.geoFootprint.trim()}`);
    }
    if (payload.monthlyBudget.trim()) {
      lines.push(`Monthly budget: ${payload.monthlyBudget.trim()}`);
    }
    if (payload.acquisitionGoal.trim()) {
      lines.push(`Acquisition goal: ${payload.acquisitionGoal.trim()}`);
    }
  }

  if (payload.vertical === "Credit Cards") {
    if (payload.cpaTarget.trim()) {
      lines.push(`CPA target or budget: ${payload.cpaTarget.trim()}`);
    }
    if (payload.cardCategories.length > 0) {
      lines.push(`Card categories: ${payload.cardCategories.join(", ")}`);
    }
    if (payload.eligibility.trim()) {
      lines.push(`Eligibility restrictions: ${payload.eligibility.trim()}`);
    }
    if (payload.offerMatrix.trim()) {
      lines.push(`Offer matrix link: ${payload.offerMatrix.trim()}`);
    }
    if (payload.notes.trim()) {
      lines.push(`Notes: ${payload.notes.trim()}`);
    }
  }

  return lines.join("\n");
}

export async function submitSupplyInquiry(
  payload: SupplyInquiryPayload
): Promise<SubmitSupplyInquiryResult> {
  return submitContactInquiry(
    {
      contactName: payload.contactName,
      email: payload.email,
      subject: buildSubject(payload),
      description: buildDescription(payload),
    },
    "SupplyInquiry"
  );
}
