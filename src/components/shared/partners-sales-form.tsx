import { DemandPartnerIntakeForm } from "@/components/common/demand-partner-intake-form";
import { PartnersInquiryForm } from "@/components/common/partners-inquiry-form";
import { Heading2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { BlueGoalsPanel, type GoalsPanelTab } from "./blue-goals-panel";
import { marketingBodySm } from "./copy";
import { SectionShell } from "./section-shell";

type PartnersSalesFormProps = {
  variant?: "default" | "enterprise" | "demand" | "hub";
  /** Pull the panel up over the preceding full-bleed hero (supply pattern). */
  overlapHero?: boolean;
};

const enterpriseForm = (
  <PartnersInquiryForm submitLabel="Submit request" />
);

const hubForm = (
  <PartnersInquiryForm title="Tell us about your goals" submitLabel="Submit request" />
);

const enterpriseTabs: GoalsPanelTab[] = [
  {
    key: "enterprise",
    label: "Enterprise",
    form: enterpriseForm,
    title: "Tell us about your goals",
    description: [
      "Our team will reach out within 24 hours to discuss how Bankrate can power your audience's financial journey.",
    ],
  },
];

const hubTabs: GoalsPanelTab[] = [
  {
    key: "hub",
    label: "Get started",
    form: hubForm,
    eyebrow: "Get started",
    title: "Not sure where to start? Tell us about your business",
    description: [
      "Every partner path starts with a conversation. Tell us about your audience and goals, and we'll route you to the right program — lending, deposits, data licensing, or an embedded integration.",
    ],
    bullets: [
      "One conversation, routed to the right team",
      "No commitment required to explore fit",
      "We support audiences of every size",
    ],
  },
];

const demandTabs: GoalsPanelTab[] = [
  {
    key: "publisher",
    label: "Publisher",
    form: <DemandPartnerIntakeForm partnerType="publisher" />,
    eyebrow: "Publisher",
    title: "Tell us about your business to see if we're a good fit",
    description: [
      "We're looking for high-quality publishers with decision-ready audiences aligned with financial products.",
    ],
  },
  {
    key: "creator",
    label: "Creator",
    form: <DemandPartnerIntakeForm partnerType="creator" />,
    eyebrow: "Creator",
    title: "Tell us about your business to see if we're a good fit",
    description: [
      "We're looking for creators with engaged audiences interested in financial products.",
    ],
  },
  {
    key: "other",
    label: "Other",
    form: <DemandPartnerIntakeForm partnerType="other" />,
    eyebrow: "Other",
    title: "Tell us about your business to see if we're a good fit",
    description: [
      "We work with agencies and networks that drive quality traffic to financial products and maintain compliance standards.",
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

  if (variant === "hub") {
    return (
      <BlueGoalsPanel
        id="contact-sales"
        tabs={hubTabs}
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
