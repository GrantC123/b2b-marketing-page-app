import {
  getCompanySizeLabel,
  getOrganizationTypeLabel,
  getPartnersInterestLabel,
} from "./partners-inquiry-types";
import { submitContactInquiry, type SubmitContactInquiryResult } from "./submit-contact-inquiry";

export type PartnersInquiryPayload = {
  company: string;
  contactName: string;
  role?: string;
  email: string;
  interest: string;
  otherDetails?: string;
  organizationType?: string;
  companySize?: string;
  message: string;
};

export type SubmitPartnersInquiryResult = SubmitContactInquiryResult;

function buildSubject(payload: PartnersInquiryPayload): string {
  const interestLabel = getPartnersInterestLabel(payload.interest);
  const subject = `Partnership inquiry: ${interestLabel} — ${payload.company}`;
  return subject.length > 150 ? `${subject.slice(0, 147)}...` : subject;
}

function buildDescription(payload: PartnersInquiryPayload): string {
  const interestLabel = getPartnersInterestLabel(payload.interest);
  const lines = [
    `Company: ${payload.company}`,
    `Contact: ${payload.contactName}`,
    `Interest: ${interestLabel}`,
  ];

  if (payload.role?.trim()) {
    lines.splice(2, 0, `Title / role: ${payload.role.trim()}`);
  }

  if (payload.organizationType) {
    lines.push(
      `Organization type: ${getOrganizationTypeLabel(payload.organizationType)}`
    );
  }

  if (payload.companySize) {
    lines.push(
      `Company / audience size: ${getCompanySizeLabel(payload.companySize)}`
    );
  }

  if (payload.interest === "other" && payload.otherDetails?.trim()) {
    lines.push(`Other details: ${payload.otherDetails.trim()}`);
  }

  if (payload.message.trim()) {
    lines.push("", payload.message.trim());
  }

  return lines.join("\n");
}

export async function submitPartnersInquiry(
  payload: PartnersInquiryPayload
): Promise<SubmitPartnersInquiryResult> {
  return submitContactInquiry(
    {
      contactName: payload.contactName,
      email: payload.email,
      subject: buildSubject(payload),
      description: buildDescription(payload),
    },
    "PartnersInquiry"
  );
}
