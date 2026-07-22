import { submitContactInquiry, type SubmitContactInquiryResult } from "./submit-contact-inquiry";

export type PartnersInquiryPayload = {
  company: string;
  contactName: string;
  role?: string;
  email: string;
  message: string;
};

export type SubmitPartnersInquiryResult = SubmitContactInquiryResult;

function buildSubject(payload: PartnersInquiryPayload): string {
  const subject = `Partnership inquiry — ${payload.company}`;
  return subject.length > 150 ? `${subject.slice(0, 147)}...` : subject;
}

function buildDescription(payload: PartnersInquiryPayload): string {
  const lines = [
    `Company: ${payload.company}`,
    `Contact: ${payload.contactName}`,
  ];

  if (payload.role?.trim()) {
    lines.push(`Title / role: ${payload.role.trim()}`);
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
