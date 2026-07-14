import {
  Compare,
  Embed,
  ExternalLink,
  GlobeWorld,
  Lock,
  Online,
  TallBuilding,
  type BankrateIcon,
} from "@bankrate/icons-react";

import {
  IconOffset,
  type IconOffsetColor,
  type IconOffsetVariant,
} from "@/components/common/flourish/icon-offset";
import { Card, CardContent } from "@/components/ui/card";
import { EyebrowSm, Heading2, Heading4 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingCardIcon, marketingEyebrowSection } from "./copy";
import { SectionShell } from "./section-shell";

type IntegrationOption = {
  icon: BankrateIcon;
  iconVariant: IconOffsetVariant;
  iconColor: IconOffsetColor;
  /** Optical scale — Bankrate glyphs vary in drawn size within the 24 viewBox. */
  iconClassName?: string;
  title: string;
  body: string;
};

const homepageOptions: IntegrationOption[] = [
  {
    icon: Compare,
    iconVariant: 1,
    iconColor: "blue",
    title: "API experiences",
    body: "Pre-fill information and reduce manual steps with our secure, seamless API connections.",
  },
  {
    icon: GlobeWorld,
    iconVariant: 2,
    iconColor: "green",
    title: "Co-branded portals",
    body: 'Launch quickly with a pre-configured, Bankrate-powered experience that carries our "halo of trust."',
  },
  {
    icon: TallBuilding,
    iconVariant: 3,
    iconColor: "indigo",
    title: "Embedded tools",
    body: "Add savings, credit cards, or lending calculators directly into your existing ecosystem.",
  },
];

const enterpriseOptions: IntegrationOption[] = [
  {
    icon: GlobeWorld,
    iconVariant: 1,
    iconColor: "blue",
    title: "Embedded widgets",
    body: "Drop Bankrate rate tools directly into your product or benefits portal.",
  },
  {
    icon: Compare,
    iconVariant: 2,
    iconColor: "green",
    title: "API access",
    body: "Pull live rates and product data into your own experience via our REST API.",
  },
  {
    icon: Lock,
    iconVariant: 3,
    iconColor: "indigo",
    title: "SSO / enterprise access",
    body: "Seamless single sign-on so your users never leave your ecosystem.",
  },
  {
    icon: TallBuilding,
    iconVariant: 1,
    iconColor: "yellow",
    title: "Custom components",
    body: "Co-built flows designed around your specific audience and use case.",
  },
];

const demandOptions: IntegrationOption[] = [
  {
    icon: ExternalLink,
    iconVariant: 1,
    iconColor: "blue",
    title: "Link-based programs",
    body: "Deep link directly to specific financial products, calculators, or reviews.",
  },
  {
    icon: Embed,
    iconVariant: 2,
    iconColor: "green",
    title: "Widgets & embeds",
    body: "Interactive cards and comparison tools that keep users on your site longer.",
  },
  {
    icon: Compare,
    iconVariant: 3,
    iconColor: "indigo",
    title: "API / data feeds",
    body: "Build custom experiences with our real-time rate data and product feeds.",
  },
  {
    icon: Online,
    iconVariant: 1,
    iconColor: "yellow",
    title: "Paid media",
    body: "Scalable solutions for media buyers looking for high-intent conversion.",
  },
];

type IntegrationProps = {
  variant?: "homepage" | "enterprise" | "demand";
  className?: string;
};

export function Integration({
  variant = "homepage",
  className,
}: IntegrationProps) {
  const isEnterprise = variant === "enterprise";
  const isDemand = variant === "demand";
  const options = isDemand
    ? demandOptions
    : isEnterprise
      ? enterpriseOptions
      : homepageOptions;

  return (
    <SectionShell
      id={isEnterprise ? "integration-options" : isDemand ? "demand-formats" : undefined}
      className={cn("scroll-mt-[calc(82px+1rem)] bg-background", className)}
    >
      {isDemand ? (
        <div className="flex flex-col gap-16">
          <Heading2 className="text-center text-pretty text-headings">
            Choose the format that fits your setup
          </Heading2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {options.map((opt) => {
              const OptionIcon = opt.icon;

              return (
                <Card
                  key={opt.title}
                  className="flex flex-col gap-5 rounded-lg border border-border bg-card p-8 shadow-none ring-0"
                >
                  <IconOffset
                    variant={opt.iconVariant}
                    color={opt.iconColor}
                    icon={
                      <OptionIcon
                        className={cn(marketingCardIcon, opt.iconClassName)}
                      />
                    }
                  />
                  <CardContent className="flex flex-col gap-2 p-0">
                    <Heading4 className="text-headings">{opt.title}</Heading4>
                    <p className={marketingBody}>{opt.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : isEnterprise ? (
        <div className="flex flex-col gap-16">
          <div className="max-w-(--section-copy)">
            <EyebrowSm as="p" className={marketingEyebrowSection}>
              Our offerings
            </EyebrowSm>
            <Heading2 className="mt-4 text-pretty text-headings">
              Choose your integration approach
            </Heading2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {options.map((opt) => {
              const OptionIcon = opt.icon;

              return (
                <Card
                  key={opt.title}
                  className="flex flex-col gap-5 rounded-xl border border-gray-100 bg-card p-8 shadow-none ring-0"
                >
                  <IconOffset
                    variant={opt.iconVariant}
                    color={opt.iconColor}
                    icon={
                      <OptionIcon
                        className={cn(marketingCardIcon, opt.iconClassName)}
                      />
                    }
                  />
                  <CardContent className="flex flex-col gap-3 p-0">
                    <Heading4 className="text-headings">{opt.title}</Heading4>
                    <p className={marketingBody}>{opt.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="mx-auto flex max-w-(--section-copy) flex-col items-center gap-4 text-center">
            <EyebrowSm as="p" className={marketingEyebrowSection}>
              Integration options
            </EyebrowSm>
            <Heading2 className="text-pretty text-headings">
              Technology that fits your business
            </Heading2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {options.map((opt) => (
              <Card
                key={opt.title}
                className="rounded-[24px] border border-gray-200 bg-card p-6 shadow-none ring-0"
              >
                <CardContent className="p-0">
                  <Heading4 className="text-headings">{opt.title}</Heading4>
                  <p className={cn("mt-4", marketingBody)}>{opt.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </SectionShell>
  );
}
