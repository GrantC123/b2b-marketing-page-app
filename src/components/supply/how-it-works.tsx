import { Number1, Number2, Number3, type BankrateIcon } from "@bankrate/icons-react";

import {
  IconOffset,
  type IconOffsetColor,
  type IconOffsetVariant,
} from "@/components/common/flourish/icon-offset";
import { EyebrowSm, Heading2, Heading4 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBodySm, marketingCardIcon, marketingEyebrowSection } from "../shared/copy";
import { BrushSectionShell } from "../shared/brush-section-shell";
import { CopyColumn, SectionShell } from "../shared/section-shell";

type HowItWorksStep = {
  icon: BankrateIcon;
  iconVariant: IconOffsetVariant;
  iconColor: IconOffsetColor;
  title: string;
  description: string;
};

const defaultSteps: HowItWorksStep[] = [
  {
    icon: Number1,
    iconVariant: 1,
    iconColor: "blue",
    title: "Tell us who you serve",
    description:
      "Share your products, footprint, and the outcomes you want—better placement, stronger leads, or both",
  },
  {
    icon: Number2,
    iconVariant: 2,
    iconColor: "green",
    title: "We match you to the right program",
    description:
      "Our team recommends the campaign, placement, or integration that fits how your audience shops",
  },
  {
    icon: Number3,
    iconVariant: 3,
    iconColor: "indigo",
    title: "Launch, measure, improve",
    description:
      "Go live with a success partner who helps you track performance and keep improving results",
  },
];

const enterpriseSteps: HowItWorksStep[] = [
  {
    icon: Number1,
    iconVariant: 1,
    iconColor: "blue",
    title: "Align on outcomes",
    description:
      "We learn about the people you serve, your platform, and what engagement and loyalty look like for you.",
  },
  {
    icon: Number2,
    iconVariant: 2,
    iconColor: "green",
    title: "Choose a low-lift approach",
    description:
      "Pick widgets, APIs, SSO, or a custom build—designed to fit your business, not the other way around.",
  },
  {
    icon: Number3,
    iconVariant: 3,
    iconColor: "indigo",
    title: "Launch and keep improving",
    description:
      "Go live with a dedicated team tracking performance—and the financial outcomes you deliver.",
  },
];

type SupplyHowItWorksProps = {
  eyebrow?: string;
  heading?: string;
  steps?: HowItWorksStep[];
  className?: string;
  brushBackground?: boolean;
};

export function SupplyHowItWorks({
  eyebrow = "How it works",
  heading = "Three steps to better placement and stronger leads",
  steps = defaultSteps,
  className,
  brushBackground = false,
}: SupplyHowItWorksProps) {
  const content = (
    <div className="flex flex-col gap-16">
      <CopyColumn className="flex flex-col gap-4 text-center">
        <EyebrowSm as="p" className={marketingEyebrowSection}>
          {eyebrow}
        </EyebrowSm>
        <Heading2 className="text-pretty text-headings">{heading}</Heading2>
      </CopyColumn>
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
        {steps.map((step) => {
          const StepIcon = step.icon;

          return (
            <div key={step.title} className="flex flex-col items-center gap-6 text-center">
              <IconOffset
                variant={step.iconVariant}
                color={step.iconColor}
                icon={<StepIcon className={marketingCardIcon} />}
              />
              <div className="flex max-w-[300px] flex-col gap-3">
                <Heading4 className="text-headings">{step.title}</Heading4>
                <p className={marketingBodySm}>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (brushBackground) {
    return (
      <BrushSectionShell className={className}>
        <SectionShell className="bg-transparent py-0">
          {content}
        </SectionShell>
      </BrushSectionShell>
    );
  }

  return (
    <SectionShell className={cn("bg-background", className)}>
      {content}
    </SectionShell>
  );
}

export { enterpriseSteps as enterpriseHowItWorksSteps };
