import {
  Clock,
  Compare,
  LockSecure,
  type BankrateIcon,
} from "@bankrate/icons-react";

import {
  IconOffset,
  type IconOffsetColor,
  type IconOffsetVariant,
} from "@/components/common/flourish/icon-offset";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EyebrowSm, Heading2, Heading4 } from "@/components/ui/typography";

import { marketingBodySm, marketingCardIcon, marketingEyebrowSection } from "../shared/copy";
import { CopyColumn, SectionShell } from "../shared/section-shell";

const requirements: {
  icon: BankrateIcon;
  iconVariant: IconOffsetVariant;
  iconColor: IconOffsetColor;
  title: string;
  description: string;
}[] = [
  {
    icon: LockSecure,
    iconVariant: 1,
    iconColor: "blue",
    title: "Compliance-ready",
    description:
      "Licensed and able to serve consumers in your target markets with transparency.",
  },
  {
    icon: Clock,
    iconVariant: 2,
    iconColor: "green",
    title: "Lead handling capacity",
    description:
      "Able to respond to and process leads within agreed SLAs for optimal conversion.",
  },
  {
    icon: Compare,
    iconVariant: 3,
    iconColor: "indigo",
    title: "Clear product offering",
    description:
      "Defined rates, terms, or product features ready to go to market instantly.",
  },
];

const faqItems = [
  {
    question: "What are the approval criteria for new partners?",
    answer:
      "We look for high-quality content, stable traffic, and alignment with financial service categories. Applications are typically reviewed within 3-5 business days.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "Payouts are issued monthly via direct deposit or wire transfer once the minimum threshold is met. Our net-payment terms are competitive for the sector.",
  },
  {
    question: "How can I track my performance and earnings?",
    answer:
      "You never have to wait until the end of the month to see how your campaigns are pacing. Through our reporting portal, you have 24/7 access to real-time click data as well as daily conversion and commission performance metrics to help you optimize on the fly.",
  },
  {
    question: "How does Bankrate make sure I get credit for my referrals?",
    answer:
      "By default, we track clicks at the source and verify results against advertiser-reported performance data, so attribution is based on confirmed outcomes rather than estimates. If you'd like an extra layer of tracking, we also support first-party cookies and server-to-server postbacks — though these are optional and not required for accurate attribution.",
  },
  {
    question: "Are there compliance requirements?",
    answer:
      "Yes, as a financial services publisher, we provide strict guidelines to ensure all advertising is clear, conspicuous, and compliant with federal regulations.",
  },
  {
    question: "What kind of support will I receive?",
    answer:
      "Every high-volume partner is assigned a dedicated account manager to assist with initial onboarding, strategy, reporting, integration documentation and asset optimization.",
  },
  {
    question: "Can I use multiple formats on one page?",
    answer:
      "Absolutely. We encourage testing a mix of text links and interactive widgets to find the best user experience and conversion rate.",
  },
];

type SupplyRequirementsProps = {
  variant?: "requirements" | "faq";
};

export function SupplyRequirements({
  variant = "requirements",
}: SupplyRequirementsProps) {
  if (variant === "faq") {
    return (
      <SectionShell className="bg-background py-16 lg:py-20">
        <div className="mx-auto flex max-w-[960px] flex-col gap-16">
          <CopyColumn className="flex flex-col gap-4 text-center">
            <Heading2 className="text-pretty text-headings">
              Answers to common questions
            </Heading2>
          </CopyColumn>
          <Accordion type="multiple">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="bg-transparent hover:bg-transparent"
              >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-base leading-relaxed tracking-tight">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell className="bg-background">
      <div className="flex flex-col gap-16">
        <CopyColumn className="flex flex-col gap-4 text-center">
          <EyebrowSm as="p" className={marketingEyebrowSection}>
            Requirements
          </EyebrowSm>
          <Heading2 className="text-pretty text-headings">What we look for in partners</Heading2>
        </CopyColumn>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-12">
          {requirements.map((item) => {
            const RequirementIcon = item.icon;

            return (
              <div key={item.title} className="flex flex-col gap-5">
                <IconOffset
                  variant={item.iconVariant}
                  color={item.iconColor}
                  icon={<RequirementIcon className={marketingCardIcon} />}
                />
                <div className="flex flex-col gap-2">
                  <Heading4 className="text-headings">{item.title}</Heading4>
                  <p className={marketingBodySm}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
