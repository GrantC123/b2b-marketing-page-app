import {
  CaretDown,
  Checkmark,
  FlourishStars,
  Info,
  TallBuilding,
} from "@bankrate/icons-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { EyebrowSm, Heading3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingEyebrowSection } from "./copy";
import { ScrollReveal } from "./scroll-reveal";
import { SectionShell } from "./section-shell";

type IllustrationShowcaseProps = {
  id: string;
  eyebrow: string;
  heading: string;
  benefits: readonly string[];
  mock: ReactNode;
  /** Desktop media placement. Default `right` (copy left, image right). */
  mediaSide?: "left" | "right";
  className?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

/** Copy + product mock — same layout as Figma 616:13134. */
export function IllustrationShowcase({
  id,
  eyebrow,
  heading,
  benefits,
  mock,
  mediaSide = "right",
  className,
  ctaLabel,
  ctaHref,
}: IllustrationShowcaseProps) {
  const mediaLeft = mediaSide === "left";

  return (
    <SectionShell
      id={id}
      className={cn(
        "bg-background overflow-x-clip pb-10 pt-4 sm:pb-12 sm:pt-6 lg:pb-16 lg:pt-8",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16",
          mediaLeft && "flex-col-reverse lg:flex-row-reverse"
        )}
      >
        <div className="flex w-full flex-col gap-6 lg:max-w-[380px] lg:shrink-0 xl:max-w-[420px] lg:gap-10">
          <div className="flex flex-col gap-4 sm:gap-6">
            <EyebrowSm as="p" className={marketingEyebrowSection}>
              {eyebrow}
            </EyebrowSm>
            <Heading3 className="text-pretty text-blue-900">{heading}</Heading3>
          </div>

          <div className="flex flex-col gap-5 sm:gap-6">
            <ul className="flex flex-col gap-3 sm:gap-4 sm:pt-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2 sm:items-center"
                >
                  <span
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[10px] bg-primary sm:mt-0"
                    aria-hidden
                  >
                    <Checkmark className="size-3 text-primary-foreground" />
                  </span>
                  <span className={marketingBody}>{benefit}</span>
                </li>
              ))}
            </ul>

            {ctaLabel && ctaHref ? (
              <Button href={ctaHref} size="lg" arrow className="w-fit">
                {ctaLabel}
              </Button>
            ) : null}
          </div>
        </div>

        <div className="min-w-0 w-full flex-1 lg:min-w-[560px] xl:min-w-[680px]">
          <ScrollReveal>{mock}</ScrollReveal>
        </div>
      </div>
    </SectionShell>
  );
}

const ENTERPRISE_BENEFITS = [
  "Fast approval process",
  "Access to pre-made assets",
  "Dedicated onboarding support",
] as const;

const SUPPLY_BENEFITS = [
  "Top placement on high-intent rate tables",
  "Borrowers who already compared live pricing",
  "Two-step verified, brand-selected leads",
] as const;

const DEMAND_BENEFITS = [
  "Widgets and embeds that keep users on-site",
  "White-label options so tools match your brand",
  "Deep links to products, calculators, and reviews",
  "Compliance-ready creative and tracking",
] as const;

const DASHBOARD_ROWS = [
  {
    lender: "First National Home Lending",
    product: "30-year fixed · Purchase",
    rate: "6.375%",
    points: "0 pts",
    apr: "6.512%",
    payment: "$2,498/mo",
  },
  {
    lender: "Summit Mortgage Group",
    product: "30-year fixed · Purchase",
    rate: "6.500%",
    points: "0.5 pts",
    apr: "6.641%",
    payment: "$2,528/mo",
  },
  {
    lender: "Pacific Coast Lending",
    product: "15-year fixed · Refinance",
    rate: "5.875%",
    points: "0 pts",
    apr: "6.014%",
    payment: "$3,312/mo",
  },
  {
    lender: "Heartland Home Loans",
    product: "30-year fixed · Purchase",
    rate: "6.625%",
    points: "0 pts",
    apr: "6.738%",
    payment: "$2,560/mo",
  },
  {
    lender: "Atlas Mortgage Co.",
    product: "5/1 ARM · Purchase",
    rate: "5.990%",
    points: "1 pt",
    apr: "6.402%",
    payment: "$2,395/mo",
  },
  {
    lender: "Riverbend Financial",
    product: "30-year fixed · Purchase",
    rate: "6.750%",
    points: "0 pts",
    apr: "6.864%",
    payment: "$2,592/mo",
  },
] as const;

const FEATURED_RATE_ROWS = [
  {
    featured: true,
    product: "Your company · 30 Year Fixed",
    brand: "Your company",
    meta: "Where your brand appears first",
    rate: "5.500%",
    apr: "5.712%",
    points: "Points: 1.25",
    payment: "$1,868",
    score: "4.9",
    reviews: "(512)",
  },
  {
    featured: false,
    product: "Summit Home Lending 30 Year Fixed",
    brand: "Summit",
    meta: "NMLS #2048192",
    rate: "5.625%",
    apr: "5.839%",
    points: "Points: 1.675",
    payment: "$1,893",
    score: "4.7",
    reviews: "(274)",
  },
  {
    featured: false,
    product: "Pacific Coast Loans 30 Year Fixed",
    brand: "Pacific",
    meta: "NMLS #3304",
    rate: "5.873%",
    apr: "6.103%",
    points: "Points: 1.98",
    payment: "$1,940",
    score: "4.8",
    reviews: "(734)",
  },
  {
    featured: false,
    product: "Heartland Mortgage 30 Year Fixed",
    brand: "Heartland",
    meta: "NMLS #1852041",
    rate: "5.990%",
    apr: "6.214%",
    points: "Points: 1.5",
    payment: "$1,968",
    score: "4.6",
    reviews: "(418)",
  },
  {
    featured: false,
    product: "Atlas Home Finance 30 Year Fixed",
    brand: "Atlas",
    meta: "NMLS #991204",
    rate: "6.125%",
    apr: "6.341%",
    points: "Points: 1.25",
    payment: "$1,997",
    score: "4.5",
    reviews: "(192)",
  },
] as const;

const SAVINGS_ROWS = [
  {
    bank: "North Shore Bank",
    product: "High-Yield Savings",
    rating: "4.8",
    apy: "4.10%",
    minimum: "$0",
  },
  {
    bank: "Harbor Online",
    product: "Performance Savings",
    rating: "4.7",
    apy: "4.00%",
    minimum: "$100",
  },
  {
    bank: "Summit Federal",
    product: "Everyday Savings",
    rating: "4.6",
    apy: "3.90%",
    minimum: "$0",
  },
  {
    bank: "Riverbend CU",
    product: "Premier Savings",
    rating: "4.5",
    apy: "3.85%",
    minimum: "$500",
  },
] as const;

/** Figma 616:13134 — Enterprise white-label dashboard. */
export function EnterpriseWhiteLabelShowcase() {
  return (
    <IllustrationShowcase
      id="enterprise-white-label"
      eyebrow="Enterprise"
      heading="Embed Bankrate experiences in your product for private or captive audiences—powered by widgets, APIs, and SSO."
      benefits={ENTERPRISE_BENEFITS}
      mock={<WhiteLabelDashboardMock />}
    />
  );
}

/** Supply — featured placement rate table (top row sharp, others soft-focused). */
export function SupplyRateTableShowcase() {
  return (
    <IllustrationShowcase
      id="supply-rate-table"
      eyebrow="Supply partners"
      heading="Win the comparison — put your brand first on Bankrate rate tables shoppers already trust."
      benefits={SUPPLY_BENEFITS}
      mock={<FeaturedRateTableMock />}
    />
  );
}

/** Demand — embedded savings comparison for publishers/creators. */
export function DemandEmbedShowcase() {
  return (
    <IllustrationShowcase
      id="demand-embed"
      eyebrow="Publishers & creators"
      heading="Monetize with Bankrate comparison experiences your audience already trusts."
      benefits={DEMAND_BENEFITS}
      mock={<SavingsAccountsMock />}
    />
  );
}

/**
 * Hub — all three partner-path illustrations, staggered:
 * image left → image right → image left.
 */
export function HubIllustrationShowcases() {
  return (
    <div id="hub-illustrations" className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
      <IllustrationShowcase
        id="hub-illustration-enterprise"
        eyebrow="Enterprise"
        heading="Embed Bankrate experiences in your product for private or captive audiences—powered by widgets, APIs, and SSO."
        benefits={ENTERPRISE_BENEFITS}
        mock={<WhiteLabelDashboardMock />}
        mediaSide="left"
        className="py-4 sm:py-6 lg:py-8"
        ctaLabel="View enterprise options"
        ctaHref="/partner/enterprise"
      />
      <IllustrationShowcase
        id="hub-illustration-supply"
        eyebrow="Supply partners"
        heading="Win the comparison — put your brand first on Bankrate rate tables shoppers already trust."
        benefits={SUPPLY_BENEFITS}
        mock={<FeaturedRateTableMock />}
        mediaSide="right"
        className="py-4 sm:py-6 lg:py-8"
        ctaLabel="Explore advertiser programs"
        ctaHref="/partner/supply"
      />
      <IllustrationShowcase
        id="hub-illustration-demand"
        eyebrow="Publishers & creators"
        heading="Monetize with Bankrate comparison experiences your audience already trusts."
        benefits={DEMAND_BENEFITS}
        mock={<SavingsAccountsMock />}
        mediaSide="left"
        className="py-4 sm:py-6 lg:pb-12 lg:pt-8"
        ctaLabel="Explore affiliate programs"
        ctaHref="/partner/demand"
      />
    </div>
  );
}

export function WhiteLabelDashboardMock() {
  return (
    <div
      className="aspect-[1440/844] w-full overflow-hidden rounded-[20px] bg-[#fafafa] shadow-[0_24px_60px_rgba(0,41,61,0.12),0_2px_8px_rgba(0,41,61,0.06)]"
      aria-hidden
    >
      <div className="grid h-full grid-cols-1 bg-[#f5f2eb] sm:grid-cols-[140px_1fr]">
        <aside className="hidden border-r border-gray-200 bg-white p-3 opacity-60 blur-[2.5px] sm:flex sm:flex-col sm:gap-2.5">
          <div className="flex items-center gap-2 px-1 pb-2">
            <div className="size-6 rounded-md bg-gradient-to-br from-primary to-blue-800" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="h-1 w-[88%] rounded-full bg-blue-900/80" />
              <span className="h-1 w-[56%] rounded-full bg-blue-900/40" />
            </div>
          </div>
          {[72, 60, 52, 64, 48, 44, 40].map((width, index) => (
            <div
              key={width}
              className={cn(
                "flex items-center gap-2 rounded-lg px-2 py-1.5",
                index === 1 && "bg-primary/10"
              )}
            >
              <span className="size-3.5 shrink-0 rounded bg-blue-900/25" />
              <span
                className="h-1 rounded-full bg-blue-900/35"
                style={{ width: `${width}%` }}
              />
            </div>
          ))}
        </aside>

        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex shrink-0 items-center justify-end gap-2.5 border-b border-gray-200 bg-white px-3 py-2 opacity-60 blur-[2.5px]">
            <span className="size-7 rounded-full bg-blue-900/15" />
            <span className="h-7 min-w-[72px] rounded-md bg-primary shadow-[0_6px_14px_rgba(0,97,254,0.28)]" />
          </div>

          <div className="relative z-10 flex min-h-0 flex-1 flex-col p-3 sm:p-3.5">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-[0_16px_40px_rgba(0,41,61,0.12)]">
              <div className="grid shrink-0 grid-cols-[1.5fr_0.75fr_0.75fr_1fr] gap-2 bg-blue-900 px-3 py-2 sm:gap-3 sm:px-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
                  Lender
                </span>
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
                  Rate
                  <Info className="size-3 opacity-70" />
                </span>
                <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
                  APR
                  <Info className="size-3 opacity-70" />
                </span>
                <span />
              </div>

              {DASHBOARD_ROWS.map((row) => (
                <div
                  key={row.lender}
                  className="grid min-h-0 flex-1 grid-cols-[1.5fr_0.75fr_0.75fr_1fr] items-center gap-2 border-t border-gray-200 px-3 py-1.5 sm:gap-3 sm:px-4 sm:py-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50 text-primary">
                      <TallBuilding className="size-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold leading-tight text-blue-900 sm:text-xs">
                        {row.lender}
                      </p>
                      <p className="truncate text-[10px] leading-tight text-gray-600">
                        {row.product}
                      </p>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                      {row.rate}
                    </p>
                    <p className="text-[10px] text-gray-600">{row.points}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                      {row.apr}
                    </p>
                    <p className="text-[10px] text-gray-600">{row.payment}</p>
                  </div>
                  <div className="flex flex-col items-stretch gap-0.5">
                    <span className="grid h-7 place-items-center rounded-md bg-primary text-[11px] font-semibold text-white shadow-[0_5px_12px_rgba(0,97,254,0.22)] sm:h-8 sm:text-xs">
                      Apply
                    </span>
                    <span className="text-center text-[10px] text-gray-600">
                      More details
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedRateTableMock() {
  return (
    <div
      className="aspect-[1440/820] w-full overflow-hidden rounded-[20px] bg-[#fafafa] shadow-[0_24px_60px_rgba(0,41,61,0.12),0_2px_8px_rgba(0,41,61,0.06)]"
      aria-hidden
    >
      <div className="flex h-full flex-col bg-[#f5f2eb] p-3 sm:p-4">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-[0_16px_40px_rgba(0,41,61,0.12)]">
          <div className="grid shrink-0 grid-cols-[1.4fr_0.7fr_0.7fr_0.85fr_0.75fr_0.7fr] gap-1.5 bg-blue-900 px-3 py-2 sm:gap-2 sm:px-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
              Lender
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
              Rate
              <Info className="size-3 opacity-70" />
            </span>
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
              APR
              <Info className="size-3 opacity-70" />
            </span>
            <span className="hidden items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:flex sm:text-xs">
              Mo. payment
            </span>
            <span className="hidden items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 md:flex md:text-xs">
              Score
            </span>
            <span />
          </div>

          {FEATURED_RATE_ROWS.map((row) => (
            <div
              key={row.brand}
              className={cn(
                "grid min-h-0 flex-1 grid-cols-[1.4fr_0.7fr_0.7fr_0.85fr_0.75fr_0.7fr] items-center gap-1.5 border-t border-gray-200 px-3 py-1.5 sm:gap-2 sm:px-4 sm:py-2",
                row.featured
                  ? "relative z-10 bg-gradient-to-b from-[#f7faff] to-white shadow-[0_0_0_1px_rgba(0,97,254,0.18),0_8px_20px_rgba(0,97,254,0.1)]"
                  : "opacity-55 blur-[2.5px]"
              )}
            >
              <div className="min-w-0">
                {row.featured ? (
                  <p className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.04em] text-primary">
                    <FlourishStars className="size-3" />
                    Your placement
                  </p>
                ) : null}
                <p className="truncate text-[10px] leading-tight text-gray-600">
                  {row.product}
                </p>
                <div className="mt-1 flex min-w-0 items-center gap-1.5">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-md border text-primary",
                      row.featured
                        ? "border-primary bg-primary text-white"
                        : "border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50"
                    )}
                  >
                    <TallBuilding className="size-3" />
                  </span>
                  <span className="truncate text-[11px] font-semibold text-blue-900 sm:text-xs">
                    {row.brand}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[9px] text-gray-500">
                  {row.meta}
                </p>
              </div>
              <p className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                {row.rate}
              </p>
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                  {row.apr}
                </p>
                <p className="truncate text-[9px] text-gray-600">{row.points}</p>
              </div>
              <p className="hidden text-xs font-bold tracking-tight text-blue-900 sm:block sm:text-sm">
                {row.payment}
              </p>
              <div className="hidden min-w-0 items-center gap-1 md:flex">
                <span className="text-xs font-bold text-blue-900">
                  {row.score}
                  <span className="text-[9px] font-medium text-gray-500">/5</span>
                </span>
                <FlourishStars className="size-3 text-[#e8a317]" />
                <span className="text-[9px] text-gray-500">{row.reviews}</span>
              </div>
              <div className="flex flex-col items-stretch gap-0.5">
                <span className="grid h-7 place-items-center rounded-md bg-primary text-[10px] font-semibold text-white sm:h-8 sm:text-xs">
                  Next →
                </span>
                <span className="hidden text-center text-[9px] text-gray-600 sm:block">
                  More details
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SavingsAccountsMock() {
  return (
    <div
      className="w-full overflow-hidden rounded-[16px] bg-[#fafafa] shadow-[0_24px_60px_rgba(0,41,61,0.12),0_2px_8px_rgba(0,41,61,0.06)] sm:rounded-[20px] sm:aspect-[1440/900]"
      aria-hidden
    >
      <div className="flex flex-col bg-[#f2f5fa] sm:h-full">
        <div className="flex shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-3 py-2 opacity-55 blur-[2.5px] sm:gap-3 sm:px-4 sm:py-2.5">
          <div className="flex items-center gap-1">
            <span className="h-2 w-6 rounded-sm bg-[#0a1f44] sm:h-2.5 sm:w-8" />
            <span className="h-2 w-4 rounded-sm bg-[#c8102e] sm:h-2.5 sm:w-5" />
          </div>
          <div className="flex flex-1 items-center gap-2 overflow-hidden sm:gap-3">
            {[48, 40, 36, 44, 52].map((w, index) => (
              <span
                key={w}
                className={cn(
                  "h-1.5 shrink-0 rounded-full bg-blue-900/25",
                  index > 1 && "hidden sm:block"
                )}
                style={{ width: w }}
              />
            ))}
          </div>
          <span className="ml-auto h-5 w-10 shrink-0 rounded-md bg-blue-900/10 sm:h-6 sm:w-14" />
        </div>

        <div className="shrink-0 space-y-1.5 px-3 py-2.5 opacity-55 blur-[2.5px] sm:space-y-2 sm:px-5 sm:py-3">
          <div className="flex gap-1.5 overflow-hidden">
            {[36, 40, 48, 72].map((w, index) => (
              <span
                key={w}
                className={cn(
                  "h-1 shrink-0 rounded-full bg-blue-900/20",
                  index > 2 && "hidden sm:block"
                )}
                style={{ width: w }}
              />
            ))}
          </div>
          <div className="h-2.5 max-w-[85%] rounded-full bg-blue-900/35 sm:h-3 sm:max-w-[70%]" />
          <div className="h-1.5 max-w-[65%] rounded-full bg-blue-900/20 sm:h-2 sm:max-w-[50%]" />
        </div>

        <div className="relative z-10 m-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-gray-200 bg-white shadow-[0_16px_40px_rgba(0,41,61,0.12)] sm:m-4 sm:rounded-[12px]">
          <div className="shrink-0 border-b border-gray-100 px-3 py-2 sm:px-4">
            <p className="text-[11px] font-semibold text-blue-900 sm:text-xs">
              Best Savings Accounts · Up to 4.10% APY
            </p>
          </div>

          {/* Mobile: stacked cards keep every field readable */}
          <div className="flex flex-col sm:hidden">
            {SAVINGS_ROWS.map((row) => (
              <div
                key={row.bank}
                className="flex flex-col gap-2.5 border-t border-gray-200 px-3 py-3 first:border-t-0"
              >
                <div className="flex items-start gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50 text-primary">
                    <TallBuilding className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-blue-900">
                      {row.bank}
                    </p>
                    <p className="text-[11px] text-gray-600">{row.product}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <FlourishStars className="size-3 text-[#e8a317]" />
                    <span className="text-xs font-bold text-blue-900">
                      {row.rating}
                      <span className="text-[9px] font-medium text-gray-500">
                        /5
                      </span>
                    </span>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.04em] text-gray-500">
                        APY
                      </p>
                      <p className="text-sm font-bold tracking-tight text-blue-900">
                        {row.apy}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.04em] text-gray-500">
                        Minimum
                      </p>
                      <p className="text-sm font-bold tracking-tight text-blue-900">
                        {row.minimum}
                      </p>
                    </div>
                  </div>
                  <span className="grid h-8 place-items-center rounded-md bg-[#c8102e] px-3 text-[11px] font-semibold text-white">
                    Open account
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* sm+: full comparison table */}
          <div className="hidden min-h-0 flex-1 flex-col sm:flex">
            <div className="grid shrink-0 grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_0.9fr] gap-2 bg-[#0a1f44] px-4 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
                Institution
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
                Rating
                <Info className="size-3 opacity-70" />
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
                APY
                <Info className="size-3 opacity-70" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
                Minimum
              </span>
              <span />
            </div>

            {SAVINGS_ROWS.map((row) => (
              <div
                key={row.bank}
                className="grid min-h-0 flex-1 grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr_0.9fr] items-center gap-2 border-t border-gray-200 px-4 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-50 text-primary">
                    <TallBuilding className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-blue-900">
                      {row.bank}
                    </p>
                    <p className="truncate text-[10px] text-gray-600">
                      {row.product}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FlourishStars className="size-3 text-[#e8a317]" />
                  <span className="text-xs font-bold text-blue-900">
                    {row.rating}
                    <span className="text-[9px] font-medium text-gray-500">
                      /5
                    </span>
                  </span>
                </div>
                <p className="text-sm font-bold tracking-tight text-blue-900">
                  {row.apy}
                </p>
                <p className="text-xs font-semibold text-blue-900">
                  {row.minimum}
                </p>
                <div className="flex flex-col gap-0.5">
                  <span className="grid h-8 place-items-center rounded-md bg-[#c8102e] text-xs font-semibold text-white">
                    Open account
                  </span>
                  <span className="flex items-center justify-center gap-0.5 text-[9px] text-gray-600">
                    Why we picked this
                    <CaretDown className="size-2.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
