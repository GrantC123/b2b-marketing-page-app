"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { submitPartnersInquiry } from "@/lib/form/submit-partners-inquiry";
import { useRecaptchaScript } from "@/lib/form/use-recaptcha-script";
import {
  EMAIL_REGEX,
  MAX_DESCRIPTION_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_NAME_LENGTH,
  MAX_WEBSITE_LENGTH,
} from "@/lib/form/validation";
import { cn } from "@/lib/utils";

export type DemandPartnerType = "publisher" | "creator" | "other";

const FOLLOWER_RANGES = [
  "1K - 10K",
  "10K - 50K",
  "50K - 100K",
  "100K - 500K",
  "500K - 1M",
  "1M+",
] as const;

const TRAFFIC_RANGES = [
  "1K - 100K sessions/month",
  "100K - 500K sessions/month",
  "500K - 1M sessions/month",
  "1M - 5M sessions/month",
  "5M+ sessions/month",
] as const;

const CURRENT_VERTICALS = [
  "Credit cards",
  "Mortgages & home loans",
  "Personal loans",
  "Banking/deposits",
  "Investing/brokerage",
  "Insurance",
  "None",
] as const;

const PUBLISHER_AFFILIATE_HISTORY = [
  "New to affiliate marketing",
  "1-3 years experience",
  "3-5 years experience",
  "5+ years experience",
] as const;

const CREATOR_PLATFORMS = [
  { key: "youtube", label: "YouTube", metric: "Subscribers" },
  { key: "tiktok", label: "TikTok", metric: "Followers" },
  { key: "instagram", label: "Instagram", metric: "Followers" },
  { key: "podcast", label: "Podcast", metric: "Subscribers" },
] as const;

type CreatorPlatformKey = (typeof CREATOR_PLATFORMS)[number]["key"];

const CONTENT_FOCUS = [
  "Budgeting & personal finance",
  "Investing & wealth building",
  "Credit & debt management",
  "Real estate & mortgages",
  "Financial independence/FIRE",
  "Other financial topic",
] as const;

const CREATOR_AFFILIATE_EXPERIENCE = [
  "No prior affiliate or sponsorship experience",
  "Some affiliate experience (1-2 partners)",
  "Actively monetize through affiliates",
] as const;

const OTHER_COMPANY_TYPES = [
  "Affiliate network / program",
  "Performance marketing agency",
  "Other",
] as const;

type PlatformDetails = {
  selected: boolean;
  handle: string;
  audience: string;
};

type FormState = {
  contactName: string;
  email: string;
  website: string;
  // Publisher
  monthlyTraffic: string;
  audienceProfile: string;
  currentVerticals: string[];
  interestedVerticals: string;
  affiliateHistory: string;
  currentPartners: string;
  // Creator
  platforms: Record<CreatorPlatformKey, PlatformDetails>;
  totalFollowers: string;
  monthlyEngagement: string;
  creatorAudience: string;
  contentFocus: string[];
  creatorAffiliateExperience: string;
  brandPartnerships: string;
  disclosurePractice: string;
  // Other
  companyType: string;
  monthlyFinanceTraffic: string;
  trafficSources: string;
  majorBrands: string;
  fraudPrevention: string;
  // Shared
  expectations: string;
};

function emptyPlatform(): PlatformDetails {
  return { selected: false, handle: "", audience: "" };
}

const INITIAL_STATE: FormState = {
  contactName: "",
  email: "",
  website: "",
  monthlyTraffic: "",
  audienceProfile: "",
  currentVerticals: [],
  interestedVerticals: "",
  affiliateHistory: "",
  currentPartners: "",
  platforms: {
    youtube: emptyPlatform(),
    tiktok: emptyPlatform(),
    instagram: emptyPlatform(),
    podcast: emptyPlatform(),
  },
  totalFollowers: "",
  monthlyEngagement: "",
  creatorAudience: "",
  contentFocus: [],
  creatorAffiliateExperience: "",
  brandPartnerships: "",
  disclosurePractice: "",
  companyType: "",
  monthlyFinanceTraffic: "",
  trafficSources: "",
  majorBrands: "",
  fraudPrevention: "",
  expectations: "",
};

const PARTNER_COPY: Record<
  DemandPartnerType,
  { title: string; subtitle: string; companyFallback: string }
> = {
  publisher: {
    title: "Publisher application",
    subtitle: "Help us understand your audience and traffic model",
    companyFallback: "Publisher partner",
  },
  creator: {
    title: "Creator application",
    subtitle: "Tell us about your audience and content strategy",
    companyFallback: "Creator partner",
  },
  other: {
    title: "Other application",
    subtitle: "Partner with us through your platform.",
    companyFallback: "Partner inquiry",
  },
};

function validateStep1(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.contactName.trim()) errors.contactName = "Name is required.";
  else if (form.contactName.trim().length > MAX_NAME_LENGTH)
    errors.contactName = `Name must be ${MAX_NAME_LENGTH} characters or fewer.`;

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (form.email.trim().length > MAX_EMAIL_LENGTH)
    errors.email = `Email must be ${MAX_EMAIL_LENGTH} characters or fewer.`;
  else if (!EMAIL_REGEX.test(form.email.trim()))
    errors.email = "Enter a valid email address.";

  if (!form.website.trim()) errors.website = "Website is required.";
  else if (form.website.trim().length > MAX_WEBSITE_LENGTH)
    errors.website = `Website must be ${MAX_WEBSITE_LENGTH} characters or fewer.`;

  return errors;
}

function validatePublisherStep2(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.monthlyTraffic) errors.monthlyTraffic = "Select a traffic range.";

  if (!form.audienceProfile.trim())
    errors.audienceProfile = "Audience profile is required.";
  else if (form.audienceProfile.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.audienceProfile = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (form.currentVerticals.length === 0)
    errors.currentVerticals = "Select at least one option.";

  if (!form.interestedVerticals.trim())
    errors.interestedVerticals = "This field is required.";
  else if (form.interestedVerticals.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.interestedVerticals = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (!form.affiliateHistory)
    errors.affiliateHistory = "Select your affiliate experience.";

  if (form.currentPartners.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.currentPartners = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (!form.expectations.trim()) errors.expectations = "This field is required.";
  else if (form.expectations.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.expectations = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  return errors;
}

function validateCreatorStep2(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  const selectedPlatforms = CREATOR_PLATFORMS.filter(
    (platform) => form.platforms[platform.key].selected
  );

  if (selectedPlatforms.length === 0)
    errors.platforms = "Select at least one platform.";

  if (!form.totalFollowers) errors.totalFollowers = "Select a follower range.";

  if (!form.monthlyEngagement.trim())
    errors.monthlyEngagement = "Average monthly engagement is required.";
  else if (!/^\d{1,3}(,\d{3})*$|^\d+$/.test(form.monthlyEngagement.trim()))
    errors.monthlyEngagement = "Enter a number (e.g., 500,000).";

  if (!form.creatorAudience.trim())
    errors.creatorAudience = "Audience description is required.";
  else if (form.creatorAudience.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.creatorAudience = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (form.contentFocus.length === 0)
    errors.contentFocus = "Select at least one content focus.";

  if (!form.creatorAffiliateExperience)
    errors.creatorAffiliateExperience = "Select your experience level.";

  if (form.brandPartnerships.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.brandPartnerships = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (!form.disclosurePractice.trim())
    errors.disclosurePractice = "This field is required.";
  else if (form.disclosurePractice.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.disclosurePractice = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (!form.expectations.trim()) errors.expectations = "This field is required.";
  else if (form.expectations.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.expectations = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  return errors;
}

function validateOtherStep2(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.companyType) errors.companyType = "Select a company type.";

  if (!form.monthlyFinanceTraffic.trim())
    errors.monthlyFinanceTraffic = "Monthly finance-related traffic is required.";

  if (!form.trafficSources.trim())
    errors.trafficSources = "Traffic sourcing details are required.";
  else if (form.trafficSources.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.trafficSources = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (form.currentVerticals.length === 0)
    errors.currentVerticals = "Select at least one option.";

  if (!form.affiliateHistory)
    errors.affiliateHistory = "Select your affiliate experience.";

  if (!form.majorBrands.trim())
    errors.majorBrands = "This field is required.";
  else if (form.majorBrands.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.majorBrands = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (!form.fraudPrevention.trim())
    errors.fraudPrevention = "This field is required.";
  else if (form.fraudPrevention.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.fraudPrevention = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  if (!form.expectations.trim()) errors.expectations = "This field is required.";
  else if (form.expectations.trim().length > MAX_DESCRIPTION_LENGTH)
    errors.expectations = `Must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`;

  return errors;
}

function validateStep2(
  partnerType: DemandPartnerType,
  form: FormState
): Record<string, string> {
  if (partnerType === "creator") return validateCreatorStep2(form);
  if (partnerType === "other") return validateOtherStep2(form);
  return validatePublisherStep2(form);
}

function buildPublisherMessage(form: FormState): string {
  return [
    `Website: ${form.website.trim()}`,
    `Monthly website traffic: ${form.monthlyTraffic}`,
    `Audience profile: ${form.audienceProfile.trim()}`,
    `Currently monetize: ${form.currentVerticals.join(", ")}`,
    `Interested in monetizing: ${form.interestedVerticals.trim()}`,
    `Affiliate partnership history: ${form.affiliateHistory}`,
    form.currentPartners.trim()
      ? `Current affiliate partners: ${form.currentPartners.trim()}`
      : null,
    `Partnership expectations: ${form.expectations.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildCreatorMessage(form: FormState): string {
  const platformLines = CREATOR_PLATFORMS.filter(
    (platform) => form.platforms[platform.key].selected
  ).map((platform) => {
    const details = form.platforms[platform.key];
    return `${platform.label}: handle=${details.handle || "n/a"}, ${platform.metric.toLowerCase()}=${details.audience || "n/a"}`;
  });

  return [
    `Website: ${form.website.trim()}`,
    `Platforms:\n${platformLines.join("\n")}`,
    `Total followers/subscribers: ${form.totalFollowers}`,
    `Average monthly engagement: ${form.monthlyEngagement.trim()}`,
    `Audience: ${form.creatorAudience.trim()}`,
    `Primary content focus: ${form.contentFocus.join(", ")}`,
    `Affiliate/sponsorship experience: ${form.creatorAffiliateExperience}`,
    form.brandPartnerships.trim()
      ? `Current financial brand partnerships: ${form.brandPartnerships.trim()}`
      : null,
    `Disclosure practice: ${form.disclosurePractice.trim()}`,
    `Partnership expectations: ${form.expectations.trim()}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildOtherMessage(form: FormState): string {
  return [
    `Website: ${form.website.trim()}`,
    `Company type: ${form.companyType}`,
    `Monthly finance-related traffic: ${form.monthlyFinanceTraffic.trim()}`,
    `Traffic sources: ${form.trafficSources.trim()}`,
    `Currently monetize: ${form.currentVerticals.join(", ")}`,
    `Affiliate partnership history: ${form.affiliateHistory}`,
    `Major financial brands: ${form.majorBrands.trim()}`,
    `Quality/fraud prevention: ${form.fraudPrevention.trim()}`,
    `Partnership expectations: ${form.expectations.trim()}`,
  ].join("\n\n");
}

function buildMessage(partnerType: DemandPartnerType, form: FormState): string {
  if (partnerType === "creator") return buildCreatorMessage(form);
  if (partnerType === "other") return buildOtherMessage(form);
  return buildPublisherMessage(form);
}

type DemandPartnerIntakeFormProps = {
  partnerType: DemandPartnerType;
  className?: string;
  formId?: string;
};

export function DemandPartnerIntakeForm({
  partnerType,
  className,
  formId: formIdProp,
}: DemandPartnerIntakeFormProps) {
  useRecaptchaScript();

  const generatedId = useId();
  const formId = formIdProp ?? `demand-intake-${partnerType}-${generatedId}`;
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const websiteId = `${formId}-website`;
  const copy = PARTNER_COPY[partnerType];

  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function clearError(field: string) {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  }

  function toggleVertical(vertical: string) {
    const isNone = vertical === "None";
    const next = form.currentVerticals.includes(vertical)
      ? form.currentVerticals.filter((item) => item !== vertical)
      : isNone
        ? ["None"]
        : [...form.currentVerticals.filter((item) => item !== "None"), vertical];

    updateField("currentVerticals", next);
  }

  function toggleContentFocus(focus: string) {
    const next = form.contentFocus.includes(focus)
      ? form.contentFocus.filter((item) => item !== focus)
      : [...form.contentFocus, focus];
    updateField("contentFocus", next);
  }

  function updatePlatform(
    key: CreatorPlatformKey,
    patch: Partial<PlatformDetails>
  ) {
    setForm((prev) => ({
      ...prev,
      platforms: {
        ...prev.platforms,
        [key]: { ...prev.platforms[key], ...patch },
      },
    }));
    clearError("platforms");
  }

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateStep1(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerErrors([]);

    const step1Errors = validateStep1(form);
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      setStep(1);
      return;
    }

    const step2Errors = validateStep2(partnerType, form);
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return;
    }

    setSubmitting(true);

    const websiteLine = form.website.trim();
    const result = await submitPartnersInquiry({
      company: websiteLine || copy.companyFallback,
      contactName: form.contactName,
      email: form.email,
      interest: partnerType,
      message: buildMessage(partnerType, form),
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
    setStep(1);
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

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-2">
        <Heading3 className="text-[28px] leading-[1.2] text-blue-900 lg:text-[28px]">
          {copy.title}
        </Heading3>
        <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
      </div>

      <form
        id={formId}
        onSubmit={step === 1 ? handleNext : handleSubmit}
        noValidate
        className="flex flex-col gap-6"
      >
        {step === 1 ? (
          <StepOneFields
            form={form}
            errors={errors}
            nameId={nameId}
            emailId={emailId}
            websiteId={websiteId}
            onUpdate={updateField}
          />
        ) : partnerType === "creator" ? (
          <CreatorStepTwo
            formId={formId}
            form={form}
            errors={errors}
            onUpdate={updateField}
            onToggleContentFocus={toggleContentFocus}
            onUpdatePlatform={updatePlatform}
          />
        ) : partnerType === "other" ? (
          <OtherStepTwo
            formId={formId}
            form={form}
            errors={errors}
            onUpdate={updateField}
            onToggleVertical={toggleVertical}
          />
        ) : (
          <PublisherStepTwo
            formId={formId}
            form={form}
            errors={errors}
            onUpdate={updateField}
            onToggleVertical={toggleVertical}
          />
        )}

        {step === 2 && serverErrors.length > 0 ? (
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

        {step === 1 ? (
          <Button type="submit" size="lg" className="w-fit self-start">
            Next
          </Button>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-fit self-start"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-fit self-start"
            >
              {submitting ? "Sending…" : "Submit application"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

function StepOneFields({
  form,
  errors,
  nameId,
  emailId,
  websiteId,
  onUpdate,
}: {
  form: FormState;
  errors: Record<string, string>;
  nameId: string;
  emailId: string;
  websiteId: string;
  onUpdate: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor={nameId}>
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id={nameId}
          name="contactName"
          autoComplete="name"
          placeholder="Your name"
          value={form.contactName}
          onChange={(e) => onUpdate("contactName", e.target.value)}
          aria-invalid={!!errors.contactName}
          aria-describedby={errors.contactName ? `${nameId}-error` : undefined}
          maxLength={MAX_NAME_LENGTH}
          size="lg"
        />
        {errors.contactName ? (
          <p id={`${nameId}-error`} className="text-sm text-destructive">
            {errors.contactName}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={emailId}>
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => onUpdate("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          maxLength={MAX_EMAIL_LENGTH}
          size="lg"
        />
        {errors.email ? (
          <p id={`${emailId}-error`} className="text-sm text-destructive">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={websiteId}>
          Website <span className="text-destructive">*</span>
        </Label>
        <Input
          id={websiteId}
          name="website"
          type="url"
          autoComplete="url"
          placeholder="https://www.example.com"
          value={form.website}
          onChange={(e) => onUpdate("website", e.target.value)}
          aria-invalid={!!errors.website}
          aria-describedby={errors.website ? `${websiteId}-error` : undefined}
          maxLength={MAX_WEBSITE_LENGTH}
          size="lg"
        />
        {errors.website ? (
          <p id={`${websiteId}-error`} className="text-sm text-destructive">
            {errors.website}
          </p>
        ) : null}
      </div>
    </>
  );
}

function PublisherStepTwo({
  formId,
  form,
  errors,
  onUpdate,
  onToggleVertical,
}: {
  formId: string;
  form: FormState;
  errors: Record<string, string>;
  onUpdate: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  onToggleVertical: (vertical: string) => void;
}) {
  const trafficId = `${formId}-traffic`;
  const audienceId = `${formId}-audience`;
  const verticalsId = `${formId}-verticals`;
  const interestedId = `${formId}-interested`;
  const historyId = `${formId}-history`;
  const partnersId = `${formId}-partners`;
  const expectationsId = `${formId}-expectations`;

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label htmlFor={trafficId}>
          Monthly website traffic <span className="text-destructive">*</span>
        </Label>
        <Select
          value={form.monthlyTraffic || undefined}
          onValueChange={(value) => onUpdate("monthlyTraffic", value ?? "")}
        >
          <SelectTrigger
            id={trafficId}
            size="lg"
            aria-invalid={!!errors.monthlyTraffic}
            className="w-full bg-card"
          >
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {TRAFFIC_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.monthlyTraffic ? (
          <p className="text-sm text-destructive">{errors.monthlyTraffic}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={audienceId}>
          Audience profile <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={audienceId}
          name="audienceProfile"
          rows={4}
          placeholder="Describe your typical visitor: age range, income level, financial sophistication, decision intent (e.g., active credit card shoppers, mortgage researchers)"
          value={form.audienceProfile}
          onChange={(e) => onUpdate("audienceProfile", e.target.value)}
          aria-invalid={!!errors.audienceProfile}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        {errors.audienceProfile ? (
          <p className="text-sm text-destructive">{errors.audienceProfile}</p>
        ) : null}
      </div>

      <fieldset className="flex flex-col">
        <LegendRequired>
          Which financial verticals do you currently monetize?
        </LegendRequired>
        <div className="flex flex-col gap-3">
          {CURRENT_VERTICALS.map((vertical) => {
            const optionId = `${verticalsId}-${vertical}`;
            return (
              <label
                key={vertical}
                htmlFor={optionId}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <Checkbox
                  id={optionId}
                  checked={form.currentVerticals.includes(vertical)}
                  onCheckedChange={() => onToggleVertical(vertical)}
                />
                {vertical}
              </label>
            );
          })}
        </div>
        {errors.currentVerticals ? (
          <p className="text-sm text-destructive">{errors.currentVerticals}</p>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor={interestedId}>
          Which verticals are you interested in monetizing with Bankrate?{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={interestedId}
          name="interestedVerticals"
          placeholder="List the financial categories where you see partnership opportunity"
          rows={3}
          value={form.interestedVerticals}
          onChange={(e) => onUpdate("interestedVerticals", e.target.value)}
          aria-invalid={!!errors.interestedVerticals}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        {errors.interestedVerticals ? (
          <p className="text-sm text-destructive">{errors.interestedVerticals}</p>
        ) : null}
      </div>

      <fieldset className="flex flex-col">
        <LegendRequired>Affiliate partnership history</LegendRequired>
        <div className="flex flex-col gap-3">
          {PUBLISHER_AFFILIATE_HISTORY.map((option) => {
            const optionId = `${historyId}-${option}`;
            return (
              <label
                key={option}
                htmlFor={optionId}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <input
                  id={optionId}
                  type="radio"
                  name={`${formId}-affiliate-history`}
                  value={option}
                  checked={form.affiliateHistory === option}
                  onChange={() => onUpdate("affiliateHistory", option)}
                  className="size-4 accent-primary"
                />
                {option}
              </label>
            );
          })}
        </div>
        {errors.affiliateHistory ? (
          <p className="text-sm text-destructive">{errors.affiliateHistory}</p>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor={partnersId}>Current affiliate partners</Label>
        <Textarea
          id={partnersId}
          name="currentPartners"
          placeholder="List any affiliate networks or brands you currently work with (e.g., AMEX, Chase, LendingClub)"
          rows={3}
          value={form.currentPartners}
          onChange={(e) => onUpdate("currentPartners", e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
      </div>

      <ExpectationsField
        id={expectationsId}
        value={form.expectations}
        error={errors.expectations}
        onChange={(value) => onUpdate("expectations", value)}
      />
    </>
  );
}

function CreatorStepTwo({
  formId,
  form,
  errors,
  onUpdate,
  onToggleContentFocus,
  onUpdatePlatform,
}: {
  formId: string;
  form: FormState;
  errors: Record<string, string>;
  onUpdate: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  onToggleContentFocus: (focus: string) => void;
  onUpdatePlatform: (
    key: CreatorPlatformKey,
    patch: Partial<PlatformDetails>
  ) => void;
}) {
  const platformsId = `${formId}-platforms`;
  const followersId = `${formId}-followers`;
  const engagementId = `${formId}-engagement`;
  const audienceId = `${formId}-creator-audience`;
  const focusId = `${formId}-focus`;
  const experienceId = `${formId}-experience`;
  const brandsId = `${formId}-brands`;
  const disclosureId = `${formId}-disclosure`;
  const expectationsId = `${formId}-expectations`;

  return (
    <>
      <fieldset className="flex flex-col">
        <LegendRequired>Platform(s)</LegendRequired>
        <div className="flex flex-col gap-4">
          {CREATOR_PLATFORMS.map((platform) => {
            const details = form.platforms[platform.key];
            const optionId = `${platformsId}-${platform.key}`;
            const handleId = `${optionId}-handle`;
            const audienceIdForPlatform = `${optionId}-audience`;

            return (
              <div key={platform.key} className="flex flex-col gap-3">
                <label
                  htmlFor={optionId}
                  className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
                >
                  <Checkbox
                    id={optionId}
                    checked={details.selected}
                    onCheckedChange={(checked) =>
                      onUpdatePlatform(platform.key, {
                        selected: checked === true,
                      })
                    }
                  />
                  {platform.label}
                </label>
                {details.selected ? (
                  <div className="grid gap-3 pl-7 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={handleId}>Handle/username</Label>
                      <Input
                        id={handleId}
                        placeholder="@handle"
                        value={details.handle}
                        onChange={(e) =>
                          onUpdatePlatform(platform.key, {
                            handle: e.target.value,
                          })
                        }
                        size="lg"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor={audienceIdForPlatform}>{platform.metric}</Label>
                      <Input
                        id={audienceIdForPlatform}
                        placeholder="e.g., 120000"
                        value={details.audience}
                        onChange={(e) =>
                          onUpdatePlatform(platform.key, {
                            audience: e.target.value,
                          })
                        }
                        size="lg"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {errors.platforms ? (
          <p className="text-sm text-destructive">{errors.platforms}</p>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor={followersId}>
          Total followers/subscribers <span className="text-destructive">*</span>
        </Label>
        <Select
          value={form.totalFollowers || undefined}
          onValueChange={(value) => onUpdate("totalFollowers", value ?? "")}
        >
          <SelectTrigger
            id={followersId}
            size="lg"
            aria-invalid={!!errors.totalFollowers}
            className="w-full bg-card"
          >
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {FOLLOWER_RANGES.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.totalFollowers ? (
          <p className="text-sm text-destructive">{errors.totalFollowers}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={engagementId}>
          Average monthly engagement (views, listens, opens){" "}
          <span className="text-destructive">*</span>
        </Label>
        <Input
          id={engagementId}
          name="monthlyEngagement"
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          placeholder="e.g., 500,000"
          value={form.monthlyEngagement}
          onChange={(e) =>
            onUpdate("monthlyEngagement", e.target.value.replace(/[^\d,]/g, ""))
          }
          aria-invalid={!!errors.monthlyEngagement}
          size="lg"
        />
        <p className="text-sm text-muted-foreground">
          This helps us gauge audience reach and interest.
        </p>
        {errors.monthlyEngagement ? (
          <p className="text-sm text-destructive">{errors.monthlyEngagement}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={audienceId}>
          Describe your audience <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={audienceId}
          name="creatorAudience"
          placeholder="Age, income level, interests, financial sophistication, and what they follow you for"
          rows={4}
          value={form.creatorAudience}
          onChange={(e) => onUpdate("creatorAudience", e.target.value)}
          aria-invalid={!!errors.creatorAudience}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        {errors.creatorAudience ? (
          <p className="text-sm text-destructive">{errors.creatorAudience}</p>
        ) : null}
      </div>

      <fieldset className="flex flex-col">
        <LegendRequired>What is your primary content focus?</LegendRequired>
        <div className="flex flex-col gap-3">
          {CONTENT_FOCUS.map((focus) => {
            const optionId = `${focusId}-${focus}`;
            return (
              <label
                key={focus}
                htmlFor={optionId}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <Checkbox
                  id={optionId}
                  checked={form.contentFocus.includes(focus)}
                  onCheckedChange={() => onToggleContentFocus(focus)}
                />
                {focus}
              </label>
            );
          })}
        </div>
        {errors.contentFocus ? (
          <p className="text-sm text-destructive">{errors.contentFocus}</p>
        ) : null}
      </fieldset>

      <fieldset className="flex flex-col">
        <LegendRequired>Affiliate/sponsorship experience</LegendRequired>
        <div className="flex flex-col gap-3">
          {CREATOR_AFFILIATE_EXPERIENCE.map((option) => {
            const optionId = `${experienceId}-${option}`;
            return (
              <label
                key={option}
                htmlFor={optionId}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <input
                  id={optionId}
                  type="radio"
                  name={`${formId}-creator-affiliate`}
                  value={option}
                  checked={form.creatorAffiliateExperience === option}
                  onChange={() => onUpdate("creatorAffiliateExperience", option)}
                  className="size-4 accent-primary"
                />
                {option}
              </label>
            );
          })}
        </div>
        {errors.creatorAffiliateExperience ? (
          <p className="text-sm text-destructive">
            {errors.creatorAffiliateExperience}
          </p>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor={brandsId}>Current financial brand partnerships</Label>
        <Textarea
          id={brandsId}
          name="brandPartnerships"
          placeholder="List any current affiliate partnerships or brand sponsorships with financial companies"
          rows={3}
          value={form.brandPartnerships}
          onChange={(e) => onUpdate("brandPartnerships", e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={disclosureId}>
          How do you disclose affiliate relationships to your audience?{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={disclosureId}
          name="disclosurePractice"
          placeholder="Explain how you transparently disclose sponsorships and affiliate links"
          rows={3}
          value={form.disclosurePractice}
          onChange={(e) => onUpdate("disclosurePractice", e.target.value)}
          aria-invalid={!!errors.disclosurePractice}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        {errors.disclosurePractice ? (
          <p className="text-sm text-destructive">{errors.disclosurePractice}</p>
        ) : null}
      </div>

      <ExpectationsField
        id={expectationsId}
        value={form.expectations}
        error={errors.expectations}
        onChange={(value) => onUpdate("expectations", value)}
      />
    </>
  );
}

function OtherStepTwo({
  formId,
  form,
  errors,
  onUpdate,
  onToggleVertical,
}: {
  formId: string;
  form: FormState;
  errors: Record<string, string>;
  onUpdate: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  onToggleVertical: (vertical: string) => void;
}) {
  const companyTypeId = `${formId}-company-type`;
  const financeTrafficId = `${formId}-finance-traffic`;
  const sourcesId = `${formId}-sources`;
  const verticalsId = `${formId}-other-verticals`;
  const historyId = `${formId}-other-history`;
  const brandsId = `${formId}-major-brands`;
  const fraudId = `${formId}-fraud`;
  const expectationsId = `${formId}-expectations`;

  return (
    <>
      <fieldset className="flex flex-col">
        <LegendRequired>Company type</LegendRequired>
        <div className="flex flex-col gap-3">
          {OTHER_COMPANY_TYPES.map((option) => {
            const optionId = `${companyTypeId}-${option}`;
            return (
              <label
                key={option}
                htmlFor={optionId}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <input
                  id={optionId}
                  type="radio"
                  name={`${formId}-company-type`}
                  value={option}
                  checked={form.companyType === option}
                  onChange={() => onUpdate("companyType", option)}
                  className="size-4 accent-primary"
                />
                {option}
              </label>
            );
          })}
        </div>
        {errors.companyType ? (
          <p className="text-sm text-destructive">{errors.companyType}</p>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor={financeTrafficId}>
          Monthly finance-related traffic <span className="text-destructive">*</span>
        </Label>
        <Input
          id={financeTrafficId}
          name="monthlyFinanceTraffic"
          placeholder="Estimated clicks/month focused on financial products"
          value={form.monthlyFinanceTraffic}
          onChange={(e) => onUpdate("monthlyFinanceTraffic", e.target.value)}
          aria-invalid={!!errors.monthlyFinanceTraffic}
          size="lg"
        />
        <p className="text-sm text-muted-foreground">
          This helps us estimate potential Bankrate audience.
        </p>
        {errors.monthlyFinanceTraffic ? (
          <p className="text-sm text-destructive">{errors.monthlyFinanceTraffic}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={sourcesId}>
          How do you source/generate traffic?{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={sourcesId}
          name="trafficSources"
          placeholder="Describe your traffic sources: paid search, display, social, organic, etc."
          rows={4}
          value={form.trafficSources}
          onChange={(e) => onUpdate("trafficSources", e.target.value)}
          aria-invalid={!!errors.trafficSources}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        {errors.trafficSources ? (
          <p className="text-sm text-destructive">{errors.trafficSources}</p>
        ) : null}
      </div>

      <fieldset className="flex flex-col">
        <LegendRequired>
          Which financial verticals do you currently monetize?
        </LegendRequired>
        <div className="flex flex-col gap-3">
          {CURRENT_VERTICALS.map((vertical) => {
            const optionId = `${verticalsId}-${vertical}`;
            return (
              <label
                key={vertical}
                htmlFor={optionId}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <Checkbox
                  id={optionId}
                  checked={form.currentVerticals.includes(vertical)}
                  onCheckedChange={() => onToggleVertical(vertical)}
                />
                {vertical}
              </label>
            );
          })}
        </div>
        {errors.currentVerticals ? (
          <p className="text-sm text-destructive">{errors.currentVerticals}</p>
        ) : null}
      </fieldset>

      <fieldset className="flex flex-col">
        <LegendRequired>Affiliate partnership history</LegendRequired>
        <div className="flex flex-col gap-3">
          {PUBLISHER_AFFILIATE_HISTORY.map((option) => {
            const optionId = `${historyId}-${option}`;
            return (
              <label
                key={option}
                htmlFor={optionId}
                className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
              >
                <input
                  id={optionId}
                  type="radio"
                  name={`${formId}-other-affiliate-history`}
                  value={option}
                  checked={form.affiliateHistory === option}
                  onChange={() => onUpdate("affiliateHistory", option)}
                  className="size-4 accent-primary"
                />
                {option}
              </label>
            );
          })}
        </div>
        {errors.affiliateHistory ? (
          <p className="text-sm text-destructive">{errors.affiliateHistory}</p>
        ) : null}
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor={brandsId}>
          Major financial brands you currently work with (or have worked with){" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={brandsId}
          name="majorBrands"
          placeholder="List current and past financial brand partnerships (e.g., Chase, AMEX, LendingClub)"
          rows={3}
          value={form.majorBrands}
          onChange={(e) => onUpdate("majorBrands", e.target.value)}
          aria-invalid={!!errors.majorBrands}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        <p className="text-sm text-muted-foreground">
          This helps us assess partnership track record and reputation
        </p>
        {errors.majorBrands ? (
          <p className="text-sm text-destructive">{errors.majorBrands}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor={fraudId}>
          How do you ensure traffic is quality and prevent fraud?{" "}
          <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id={fraudId}
          name="fraudPrevention"
          placeholder="Describe your fraud detection, bot-prevention, and quality assurance measures"
          rows={3}
          value={form.fraudPrevention}
          onChange={(e) => onUpdate("fraudPrevention", e.target.value)}
          aria-invalid={!!errors.fraudPrevention}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
        {errors.fraudPrevention ? (
          <p className="text-sm text-destructive">{errors.fraudPrevention}</p>
        ) : null}
      </div>

      <ExpectationsField
        id={expectationsId}
        value={form.expectations}
        error={errors.expectations}
        onChange={(value) => onUpdate("expectations", value)}
      />
    </>
  );
}

function ExpectationsField({
  id,
  value,
  error,
  onChange,
}: {
  id: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        What are your expectations for a partnership with Bankrate?{" "}
        <span className="text-destructive">*</span>
      </Label>
      <Textarea
        id={id}
        name="expectations"
        placeholder="Your expectations, monetization goals, and what interests you about Bankrate"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        maxLength={MAX_DESCRIPTION_LENGTH}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}

function LegendRequired({ children }: { children: React.ReactNode }) {
  return (
    <legend className="mb-2 text-sm font-semibold leading-none text-foreground">
      {children} <span className="text-destructive">*</span>
    </legend>
  );
}
