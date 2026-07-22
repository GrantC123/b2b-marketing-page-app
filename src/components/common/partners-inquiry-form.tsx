"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heading3 } from "@/components/ui/typography";
import { submitPartnersInquiry } from "@/lib/form/submit-partners-inquiry";
import { useRecaptchaScript } from "@/lib/form/use-recaptcha-script";
import {
  EMAIL_REGEX,
  MAX_COMPANY_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_ROLE_LENGTH,
} from "@/lib/form/validation";
import { cn } from "@/lib/utils";

type FormState = {
  company: string;
  contactName: string;
  role: string;
  email: string;
  message: string;
};

const INITIAL_STATE: FormState = {
  company: "",
  contactName: "",
  role: "",
  email: "",
  message: "",
};

function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.company.trim()) errors.company = "Company name is required.";
  else if (form.company.trim().length > MAX_COMPANY_LENGTH)
    errors.company = `Company name must be ${MAX_COMPANY_LENGTH} characters or fewer.`;

  if (!form.contactName.trim()) errors.contactName = "Contact name is required.";
  else if (form.contactName.trim().length > MAX_NAME_LENGTH)
    errors.contactName = `Contact name must be ${MAX_NAME_LENGTH} characters or fewer.`;

  if (!form.role.trim()) errors.role = "Title / role is required.";
  else if (form.role.trim().length > MAX_ROLE_LENGTH)
    errors.role = `Title / role must be ${MAX_ROLE_LENGTH} characters or fewer.`;

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (form.email.trim().length > MAX_EMAIL_LENGTH)
    errors.email = `Email must be ${MAX_EMAIL_LENGTH} characters or fewer.`;
  else if (!EMAIL_REGEX.test(form.email.trim()))
    errors.email = "Enter a valid email address.";

  if (form.message.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.message = `Message must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  return errors;
}

type PartnersInquiryFormProps = {
  className?: string;
  formId?: string;
  title?: string;
  /** Supporting copy under the title — hidden on the success state. */
  description?: string;
  submitLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
};

export function PartnersInquiryForm({
  className,
  formId: formIdProp,
  title,
  description,
  submitLabel = "Request info",
  messageLabel = "Message",
  messagePlaceholder = "Tell us about your goals, footprint, or timeline…",
}: PartnersInquiryFormProps) {
  useRecaptchaScript();

  const generatedId = useId();
  const formId = formIdProp ?? `partners-inquiry-${generatedId}`;
  const companyId = `${formId}-company`;
  const contactId = `${formId}-contact`;
  const roleId = `${formId}-role`;
  const emailId = `${formId}-email`;
  const messageId = `${formId}-message`;

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerErrors([]);

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const result = await submitPartnersInquiry({
      company: form.company,
      contactName: form.contactName,
      role: form.role,
      email: form.email,
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
    setForm(INITIAL_STATE);
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
        <Button
          onClick={handleReset}
          type="button"
          size="lg"
          className="w-full sm:w-auto sm:min-w-[12rem]"
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {title || description ? (
        <div className="flex flex-col gap-3">
          {title ? (
            <Heading3 className="text-pretty text-blue-900">{title}</Heading3>
          ) : null}
          {description ? (
            <p className="text-sm leading-relaxed text-gray-700">{description}</p>
          ) : null}
        </div>
      ) : null}
      <form
        id={formId}
        onSubmit={handleSubmit}
        noValidate
        className={cn("flex flex-col gap-6", className)}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

          <div className="flex flex-col gap-2">
            <Label htmlFor={roleId}>
              Title / role <span className="text-destructive">*</span>
            </Label>
            <Input
              id={roleId}
              name="role"
              autoComplete="organization-title"
              placeholder="Your title or role"
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              aria-invalid={!!errors.role}
              aria-describedby={errors.role ? `${roleId}-error` : undefined}
              maxLength={MAX_ROLE_LENGTH}
              size="lg"
            />
            {errors.role && (
              <p id={`${roleId}-error`} className="text-sm text-destructive">
                {errors.role}
              </p>
            )}
          </div>

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
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={messageId}>{messageLabel}</Label>
          <Textarea
            id={messageId}
            name="message"
            placeholder={messagePlaceholder}
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

        {serverErrors.length > 0 ? (
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
        ) : null}

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
