"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Heading3 } from "@/components/ui/typography";
import {
  COMPANY_SIZE_OPTIONS,
  ORGANIZATION_TYPE_OPTIONS,
  PARTNERS_INTEREST_OPTIONS,
  type PartnersInterestOption,
} from "@/lib/form/partners-inquiry-types";
import { submitPartnersInquiry } from "@/lib/form/submit-partners-inquiry";
import { useRecaptchaScript } from "@/lib/form/use-recaptcha-script";
import {
  EMAIL_REGEX,
  MAX_COMPANY_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
} from "@/lib/form/validation";
import { cn } from "@/lib/utils";

type FormState = {
  company: string;
  contactName: string;
  email: string;
  interest: string;
  otherDetails: string;
  organizationType: string;
  companySize: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  company: "",
  contactName: "",
  email: "",
  interest: "",
  otherDetails: "",
  organizationType: "",
  companySize: "",
  message: "",
};

function validate(
  form: FormState,
  requireQualification: boolean
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.company.trim()) errors.company = "Company name is required.";
  else if (form.company.trim().length > MAX_COMPANY_LENGTH)
    errors.company = `Company name must be ${MAX_COMPANY_LENGTH} characters or fewer.`;

  if (!form.contactName.trim()) errors.contactName = "Contact name is required.";
  else if (form.contactName.trim().length > MAX_NAME_LENGTH)
    errors.contactName = `Contact name must be ${MAX_NAME_LENGTH} characters or fewer.`;

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (form.email.trim().length > MAX_EMAIL_LENGTH)
    errors.email = `Email must be ${MAX_EMAIL_LENGTH} characters or fewer.`;
  else if (!EMAIL_REGEX.test(form.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!form.interest) errors.interest = "Select an area of interest.";

  if (form.interest === "other") {
    if (!form.otherDetails.trim())
      errors.otherDetails = "Please describe what you're interested in.";
    else if (form.otherDetails.trim().length > MAX_DESCRIPTION_LENGTH)
      errors.otherDetails = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;
  }

  if (requireQualification) {
    if (!form.organizationType)
      errors.organizationType = "Select an organization type.";
    if (!form.companySize) errors.companySize = "Select a company size.";
  }

  if (form.message.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.message = `Message must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  return errors;
}

type PartnersInquiryFormProps = {
  className?: string;
  formId?: string;
  title?: string;
  submitLabel?: string;
  defaultInterest?: string;
  hideInterestField?: boolean;
  /** Interest dropdown options. Defaults to the full hub/routing list. */
  interestOptions?: readonly PartnersInterestOption[];
  /** Show org type + company size for enterprise qualification. */
  showQualificationFields?: boolean;
};

export function PartnersInquiryForm({
  className,
  formId: formIdProp,
  title,
  submitLabel = "Request info",
  defaultInterest,
  hideInterestField = false,
  interestOptions = PARTNERS_INTEREST_OPTIONS,
  showQualificationFields = false,
}: PartnersInquiryFormProps) {
  useRecaptchaScript();

  const generatedId = useId();
  const formId = formIdProp ?? `partners-inquiry-${generatedId}`;
  const companyId = `${formId}-company`;
  const contactId = `${formId}-contact`;
  const emailId = `${formId}-email`;
  const interestId = `${formId}-interest`;
  const otherDetailsId = `${formId}-other-details`;
  const organizationTypeId = `${formId}-organization-type`;
  const companySizeId = `${formId}-company-size`;
  const messageId = `${formId}-message`;

  const [form, setForm] = useState<FormState>({
    ...INITIAL_STATE,
    interest: defaultInterest ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const showOtherDetails = form.interest === "other";

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function handleInterestChange(value: string) {
    setForm((prev) => ({
      ...prev,
      interest: value,
      otherDetails: value === "other" ? prev.otherDetails : "",
    }));
    if (errors.interest || errors.otherDetails) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.interest;
        delete next.otherDetails;
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerErrors([]);

    const validationErrors = validate(form, showQualificationFields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const result = await submitPartnersInquiry({
      company: form.company,
      contactName: form.contactName,
      email: form.email,
      interest: form.interest,
      otherDetails: form.otherDetails,
      organizationType: showQualificationFields
        ? form.organizationType
        : undefined,
      companySize: showQualificationFields ? form.companySize : undefined,
      message: form.message,
    });

    if (result.ok) {
      setSuccess(true);
    } else {
      setServerErrors(result.errors);
    }

    setSubmitting(false);
  }

  function handleReset() {
    setForm({ ...INITIAL_STATE, interest: defaultInterest ?? "" });
    setErrors({});
    setServerErrors([]);
    setSuccess(false);
  }

  if (success) {
    return (
      <div className={cn("flex flex-col items-center gap-4 py-12 text-center", className)}>
        <h3 className="text-xl font-semibold text-foreground">Request received!</h3>
        <p className="max-w-md text-muted-foreground">
          Thanks for reaching out. A member of our partnerships team will get back to you
          soon.
        </p>
        <Button variant="outline" onClick={handleReset} type="button">
          Send another request
        </Button>
      </div>
    );
  }

  const companyField = (
    <div className="flex flex-col gap-2">
      <Label htmlFor={companyId}>
        Company name <span className="text-destructive">*</span>
      </Label>
      <Input
        id={companyId}
        name="company"
        autoComplete="organization"
        placeholder="Your company"
        value={form.company}
        onChange={(e) => updateField("company", e.target.value)}
        aria-invalid={!!errors.company}
        aria-describedby={errors.company ? `${companyId}-error` : undefined}
        maxLength={MAX_COMPANY_LENGTH}
        size="lg"
      />
      {errors.company && (
        <p id={`${companyId}-error`} className="text-sm text-destructive">
          {errors.company}
        </p>
      )}
    </div>
  );

  const companySizeField = (
    <div className="flex flex-col gap-2">
      <Label htmlFor={companySizeId}>
        Company size <span className="text-destructive">*</span>
      </Label>
      <Select
        value={form.companySize || undefined}
        onValueChange={(value) => updateField("companySize", value)}
      >
        <SelectTrigger
          id={companySizeId}
          size="lg"
          aria-invalid={!!errors.companySize}
          aria-describedby={
            errors.companySize ? `${companySizeId}-error` : undefined
          }
          className="w-full bg-card"
        >
          <SelectValue placeholder="Select company size" />
        </SelectTrigger>
        <SelectContent>
          {COMPANY_SIZE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.companySize && (
        <p id={`${companySizeId}-error`} className="text-sm text-destructive">
          {errors.companySize}
        </p>
      )}
    </div>
  );

  const contactField = (
    <div className="flex flex-col gap-2">
      <Label htmlFor={contactId}>
        Contact name <span className="text-destructive">*</span>
      </Label>
      <Input
        id={contactId}
        name="contactName"
        autoComplete="name"
        placeholder="Your full name"
        value={form.contactName}
        onChange={(e) => updateField("contactName", e.target.value)}
        aria-invalid={!!errors.contactName}
        aria-describedby={
          errors.contactName ? `${contactId}-error` : undefined
        }
        maxLength={MAX_NAME_LENGTH}
        size="lg"
      />
      {errors.contactName && (
        <p id={`${contactId}-error`} className="text-sm text-destructive">
          {errors.contactName}
        </p>
      )}
    </div>
  );

  const organizationTypeField = (
    <div className="flex flex-col gap-2">
      <Label htmlFor={organizationTypeId}>
        Organization type <span className="text-destructive">*</span>
      </Label>
      <Select
        value={form.organizationType || undefined}
        onValueChange={(value) => updateField("organizationType", value)}
      >
        <SelectTrigger
          id={organizationTypeId}
          size="lg"
          aria-invalid={!!errors.organizationType}
          aria-describedby={
            errors.organizationType
              ? `${organizationTypeId}-error`
              : undefined
          }
          className="w-full bg-card"
        >
          <SelectValue placeholder="Select organization type" />
        </SelectTrigger>
        <SelectContent>
          {ORGANIZATION_TYPE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.organizationType && (
        <p
          id={`${organizationTypeId}-error`}
          className="text-sm text-destructive"
        >
          {errors.organizationType}
        </p>
      )}
    </div>
  );

  const emailField = (
    <div className="flex flex-col gap-2">
      <Label htmlFor={emailId}>
        Email address <span className="text-destructive">*</span>
      </Label>
      <Input
        id={emailId}
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={form.email}
        onChange={(e) => updateField("email", e.target.value)}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? `${emailId}-error` : undefined}
        maxLength={MAX_EMAIL_LENGTH}
        size="lg"
      />
      {errors.email && (
        <p id={`${emailId}-error`} className="text-sm text-destructive">
          {errors.email}
        </p>
      )}
    </div>
  );

  const interestField = !hideInterestField ? (
    <div className="flex flex-col gap-2">
      <Label htmlFor={interestId}>
        I&apos;m interested in <span className="text-destructive">*</span>
      </Label>
      <Select
        value={form.interest || undefined}
        onValueChange={handleInterestChange}
      >
        <SelectTrigger
          id={interestId}
          size="lg"
          aria-invalid={!!errors.interest}
          aria-describedby={
            errors.interest ? `${interestId}-error` : undefined
          }
          className="w-full bg-card"
        >
          <SelectValue placeholder="Select an area of interest" />
        </SelectTrigger>
        <SelectContent>
          {interestOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.interest && (
        <p id={`${interestId}-error`} className="text-sm text-destructive">
          {errors.interest}
        </p>
      )}
    </div>
  ) : null;

  const otherDetailsField = showOtherDetails ? (
    <div className="flex flex-col gap-2">
      <Label htmlFor={otherDetailsId}>
        Please describe <span className="text-destructive">*</span>
      </Label>
      <Textarea
        id={otherDetailsId}
        name="otherDetails"
        placeholder="Tell us what you're interested in…"
        rows={3}
        value={form.otherDetails}
        onChange={(e) => updateField("otherDetails", e.target.value)}
        aria-invalid={!!errors.otherDetails}
        aria-describedby={
          errors.otherDetails ? `${otherDetailsId}-error` : undefined
        }
        maxLength={MAX_DESCRIPTION_LENGTH}
      />
      {errors.otherDetails && (
        <p
          id={`${otherDetailsId}-error`}
          className="text-sm text-destructive"
        >
          {errors.otherDetails}
        </p>
      )}
    </div>
  ) : null;

  const messageField = (
    <div className="flex flex-col gap-2">
      <Label htmlFor={messageId}>Message</Label>
      <Textarea
        id={messageId}
        name="message"
        placeholder="Tell us about your goals, footprint, or timeline…"
        rows={5}
        value={form.message}
        onChange={(e) => updateField("message", e.target.value)}
        aria-invalid={!!errors.message}
        aria-describedby={errors.message ? `${messageId}-error` : undefined}
        maxLength={MAX_DESCRIPTION_LENGTH}
      />
      {errors.message && (
        <p id={`${messageId}-error`} className="text-sm text-destructive">
          {errors.message}
        </p>
      )}
    </div>
  );

  const serverErrorBlock =
    serverErrors.length > 0 ? (
      <div
        role="alert"
        className="rounded-xl border border-destructive/50 bg-destructive/5 p-3"
      >
        {serverErrors.map((err, i) => (
          <p key={i} className="text-sm text-destructive">
            {err}
          </p>
        ))}
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      {title ? (
        <Heading3 className="text-[28px] leading-[1.2] text-blue-900 lg:text-[28px]">
          {title}
        </Heading3>
      ) : null}
      <form
        id={formId}
        onSubmit={handleSubmit}
        noValidate
        className={cn("flex flex-col gap-6", className)}
      >
        {showQualificationFields ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {contactField}
            {emailField}
            {companyField}
            {organizationTypeField}
            {companySizeField}
            {interestField}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {companyField}
            {contactField}
            {emailField}
            {interestField}
          </div>
        )}

        {otherDetailsField}
        {messageField}
        {serverErrorBlock}

        <div>
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full sm:w-auto sm:min-w-[12rem]"
          >
            {submitting ? "Sending…" : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
