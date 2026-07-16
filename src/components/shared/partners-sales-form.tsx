import { DemandPartnerIntakeForm } from "@/components/common/demand-partner-intake-form";
import { PartnersInquiryForm } from "@/components/common/partners-inquiry-form";
import { Heading2 } from "@/components/ui/typography";
import { ENTERPRISE_INTEREST_OPTIONS } from "@/lib/form/partners-inquiry-types";
import { cn } from "@/lib/utils";

import { BlueGoalsPanel, type GoalsPanelTab } from "./blue-goals-panel";
import { marketingBodySm } from "./copy";
import { SectionShell } from "./section-shell";

type PartnersSalesFormProps = {
  variant?: "default" | "enterprise" | "demand";
  /** Pull the panel up over the preceding full-bleed hero (supply pattern). */
  overlapHero?: boolean;
};

const enterpriseForm = (
  <PartnersInquiryForm
    submitLabel="Submit request"
    interestOptions={ENTERPRISE_INTEREST_OPTIONS}
    showQualificationFields
  />
);

const enterpriseTabs: GoalsPanelTab[] = [
  {
    key: "enterprise",
    label: "Enterprise",
    form: enterpriseForm,
    title: "Tell us about your audience and goals",
    description: [
      "We'll reach out to show how a private Bankrate marketplace can improve financial outcomes for the people you serve—and drive engagement and loyalty for your business.",
    ],
  },
];

const demandTabs: GoalsPanelTab[] = [
  {
    key: "publisher",
    label: "Publisher",
    form: <DemandPartnerIntakeForm partnerType="publisher" />,
    eyebrow: "Publisher",
    title: "Tell us about your audience and goals",
    description: [
      "We're looking for publishers whose audiences are making real financial decisions—so you can monetize with comparison experiences they already trust.",
    ],
  },
  {
    key: "creator",
    label: "Creator",
    form: <DemandPartnerIntakeForm partnerType="creator" />,
    eyebrow: "Creator",
    title: "Tell us about your audience and goals",
    description: [
      "We're looking for creators whose audiences care about financial products—so you can earn from trusted comparison experiences that improve outcomes.",
    ],
  },
  {
    key: "other",
    label: "Other",
    form: <DemandPartnerIntakeForm partnerType="other" />,
    eyebrow: "Other",
    title: "Tell us about your audience and goals",
    description: [
      "We partner with agencies and networks that drive quality finance traffic—and help audiences make better decisions with Bankrate experiences.",
    ],
  },
];

export function PartnersSalesForm({
  variant = "default",
  overlapHero = false,
}: PartnersSalesFormProps) {
  if (variant === "enterprise") {
    return (
      <BlueGoalsPanel
        id="contact-sales"
        tabs={enterpriseTabs}
        overlapHero={overlapHero}
      />
    );
  }

  if (variant === "demand") {
    return (
      <BlueGoalsPanel id="apply" tabs={demandTabs} overlapHero={overlapHero} />
    );
  }

  return (
    <SectionShell
      id="contact-sales"
      className="scroll-mt-[calc(82px+1rem)] bg-background"
    >
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 lg:p-12">
        <Heading2 className="max-w-(--section-copy) text-pretty text-headings">
          Contact one of our sales representatives
        </Heading2>
        <p className="mt-4 text-sm text-gray-700">* Required field</p>
        <p className={cn("mt-2 max-w-[640px]", marketingBodySm)}>
          Your personal information and privacy is protected. Please read our{" "}
          <a
            href="https://www.bankrate.com/privacy/"
            className="font-semibold text-primary underline decoration-primary/30 underline-offset-[3px] transition-colors hover:decoration-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            privacy policy
          </a>{" "}
          for details.
        </p>
        <div className="mt-10">
          <PartnersInquiryForm />
        </div>
      </div>
    </SectionShell>
  );
}
