import {
  CaretDown,
  CaretUp,
  Checkmark,
  FlourishCaretRight,
  FlourishPercentage,
  FlourishStars,
  Info,
  Mortgage,
  Star,
  TallBuilding,
} from "@bankrate/icons-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { EyebrowSm, Heading2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingEyebrowSection } from "./copy";
import { MemberRateChart } from "./member-rate-chart";
import { MortgageRateComparisonChart } from "./mortgage-rate-comparison-chart";
import { ScrollReveal } from "./scroll-reveal";
import {
  SectionShell,
  sectionStackGapClassName,
  sectionYClassName,
} from "./section-shell";

type IllustrationShowcaseProps = {
  id: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  benefits?: readonly string[];
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
  description,
  benefits = [],
  mock,
  mediaSide = "right",
  className,
  ctaLabel,
  ctaHref,
}: IllustrationShowcaseProps) {
  const mediaLeft = mediaSide === "left";
  const hasBenefits = benefits.length > 0;
  const hasCta = Boolean(ctaLabel && ctaHref);

  return (
    <SectionShell
      id={id}
      className={cn(
        "bg-background overflow-x-clip",
        className
      )}
    >
      <div
        className={cn(
          // Always copy-above-media when stacked; only reverse on desktop.
          "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16",
          mediaLeft && "lg:flex-row-reverse"
        )}
      >
        <div className="flex w-full flex-col gap-6 lg:max-w-[380px] lg:shrink-0 xl:max-w-[420px] lg:gap-10">
          <div className="flex flex-col gap-4 sm:gap-6">
            {eyebrow ? (
              <EyebrowSm as="p" className={marketingEyebrowSection}>
                {eyebrow}
              </EyebrowSm>
            ) : null}
            <Heading2 className="text-pretty text-blue-900">{heading}</Heading2>
            {description ? (
              <p className={cn("text-pretty", marketingBody)}>{description}</p>
            ) : null}
          </div>

          {hasBenefits || hasCta ? (
            <div className="flex flex-col gap-5 sm:gap-6">
              {hasBenefits ? (
                <ul className="flex flex-col gap-3 sm:gap-4 sm:pt-2">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className={cn("flex items-start gap-3", marketingBody)}
                    >
                      <span className="mt-[5px] flex size-[18px] shrink-0 items-center justify-center">
                        <FlourishCaretRight
                          aria-hidden
                          fill="var(--color-blue-600)"
                          className="size-[15px]"
                        />
                      </span>
                      <span className="min-w-0 flex-1 text-pretty">{benefit}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {hasCta ? (
                <Button
                  href={ctaHref}
                  variant="outline"
                  size="lg"
                  arrow
                  className="w-fit"
                >
                  {ctaLabel}
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="min-w-0 w-full flex-1 overflow-hidden rounded-[16px] sm:rounded-[20px] lg:min-w-[min(100%,560px)] xl:min-w-[min(100%,680px)]">
          <ScrollReveal>{mock}</ScrollReveal>
        </div>
      </div>
    </SectionShell>
  );
}

const ENTERPRISE_BENEFITS = [
  "Zero engineering lift for partner UI",
  "Live lender rates, always up to date",
  "Bankrate-managed compliance & disclosures",
  "Matches partner brand via theming tokens",
] as const;

const SUPPLY_BENEFITS = [
  "Top placement when shoppers are ready to act",
  "Borrowers who've already compared live pricing",
  "Verified, brand-selected leads worth your team's time",
] as const;

const DEMAND_BENEFITS = [
  "Comparison experiences that keep users on-site",
  "White-label options so tools match your brand",
  "Monetize decisions your audience is already making",
  "Compliance-ready creative and tracking",
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
      eyebrow="Drop-in widgets, fully managed"
      heading="Enterprise Components"
      description="Bankrate supplies production-ready UI components — rate tables, calculators, lead flows — that embed directly into the partner product. Bankrate owns the data pipeline, lender relationships, and compliance."
      benefits={ENTERPRISE_BENEFITS}
      mock={<MortgageRateComparisonChart />}
    />
  );
}

/** Supply — featured placement rate table (top row sharp, others soft-focused). */
export function SupplyRateTableShowcase() {
  return (
    <IllustrationShowcase
      id="supply-rate-table"
      eyebrow="Advertisers"
      heading="Win the comparison with top placement on rate tables shoppers already trust"
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
      heading="Embed comparison tools that earn revenue—without sending users away"
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
    <div
      id="hub-illustrations"
      className={cn(
        "flex flex-col",
        sectionYClassName,
        sectionStackGapClassName
      )}
    >
      <IllustrationShowcase
        id="hub-illustration-supply"
        eyebrow="Advertise"
        heading="Win top placement on rate tables shoppers already trust"
        mock={<FeaturedRateTableMock />}
        mediaSide="left"
        className="py-0 lg:py-0"
        ctaLabel="Explore advertiser programs"
        ctaHref="/partner/supply"
      />
      <IllustrationShowcase
        id="hub-illustration-enterprise"
        eyebrow="Integrate"
        heading="Bring comparison to your audience, under your brand"
        mock={<MortgageRateComparisonChart />}
        mediaSide="right"
        className="py-0 lg:py-0"
        ctaLabel="View enterprise options"
        ctaHref="/partner/enterprise"
      />
      <IllustrationShowcase
        id="hub-illustration-demand"
        eyebrow="Monetize"
        heading="Embed widgets that earn revenue without sending users away"
        mock={<SavingsAccountsMock />}
        mediaSide="left"
        className="py-0 lg:py-0"
        ctaLabel="Explore affiliate programs"
        ctaHref="/partner/demand"
      />
    </div>
  );
}

/** Shared frame so blur children don't square off overflow:hidden radius. */
const showcaseMockFrame =
  "overflow-hidden rounded-[16px] [clip-path:inset(0_round_16px)] sm:rounded-[20px] sm:[clip-path:inset(0_round_20px)]";

/** Home Financing Widget — Empower-style enterprise component mock. */
export function WhiteLabelDashboardMock() {
  return (
    <div
      className={cn(
        "w-full border border-blue-100 bg-white shadow-[0_24px_60px_rgba(0,41,61,0.12),0_2px_8px_rgba(0,41,61,0.06)]",
        showcaseMockFrame
      )}
    >
      <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4">
        {/* Widget chrome */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <img
              src="/marketing/bankrate-logo.svg"
              alt=""
              className="h-4 w-auto sm:h-[18px]"
            />
            <span className="hidden h-3.5 w-px bg-gray-200 sm:block" />
            <span className="truncate text-[10px] font-semibold text-blue-900 sm:text-xs">
              Home Financing Widget
            </span>
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <span className="hidden text-[10px] text-gray-500 lg:inline">
              Exclusive rates + planning tools for Empower members
            </span>
            <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
              · Enterprise component
            </span>
          </div>
        </div>

        {/* Program summary */}
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-3.5">
          <div className="flex items-start gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-blue-900">
              <Mortgage className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-blue-900">
                    Exclusive Mortgage Program
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-gray-600">
                    Empower has partnered with Bankrate to bring exclusive rates
                    to Empower members.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] font-semibold text-gray-600">
                  Live Rates
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg bg-gray-50 px-3 py-2 text-[11px] text-gray-700">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex size-3.5 items-center justify-center rounded-full bg-primary text-white">
                <Checkmark className="size-2.5" />
              </span>
              Save <strong className="font-bold text-blue-900">$223/mo</strong>{" "}
              vs. national avg
            </span>
            <span>
              Member rate:{" "}
              <strong className="font-bold text-blue-900">5.45%</strong> vs.
              6.15% national
            </span>
          </div>

          <div className="mt-2.5 flex justify-center">
            <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-gray-600">
              Show less
              <CaretUp className="size-3" />
            </span>
          </div>
        </div>

        {/* Compare chart */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-gray-500">
            Compare
          </p>
          <p className="text-xs font-semibold leading-snug text-blue-900 sm:text-sm">
            Today&apos;s Empower member rates vs. national average (March 6,
            2026)
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-blue-900" />
              Empower members:{" "}
              <strong className="font-bold text-blue-900">5.45%</strong>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-gray-400" />
              National average:{" "}
              <strong className="font-bold text-blue-900">6.15%</strong>
            </span>
          </div>
          <MemberRateChart />
        </div>

        {/* Savings callout */}
        <div className="rounded-xl bg-blue-900 p-3 text-white sm:p-3.5">
          <div className="flex items-start gap-2">
            <FlourishPercentage
              className="mt-0.5 size-4 shrink-0 text-white"
              aria-hidden
            />
            <p className="text-xs font-semibold leading-snug sm:text-sm">
              Today&apos;s average Empower member rates are 70 bps below the
              national average.
            </p>
          </div>
          <p className="mt-2 text-[11px] text-white/75">
            On a $500K 30-year loan, that translates to:
          </p>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            {[
              { label: "Monthly savings", value: "$223" },
              { label: "Yearly savings", value: "$2,676" },
              { label: "Savings over loan", value: "$80K" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-white/10 px-2 py-2 text-center"
              >
                <p className="text-[8px] font-bold uppercase tracking-wide text-white/70 sm:text-[9px]">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-sm font-bold sm:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Today's best rate */}
        <div className="flex flex-col gap-2">
          <p className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-gray-500">
            Today&apos;s best rate
            <Info className="size-3 opacity-60" />
          </p>
          <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-3.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <p className="text-sm font-bold text-blue-900">Tomo Mortgage</p>
              <p className="text-[10px] text-gray-500">NMLS #2059741</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">
                  Rate
                </p>
                <p className="text-lg font-bold tracking-tight text-primary sm:text-xl">
                  5.45%
                </p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">
                  APR
                </p>
                <p className="text-sm font-bold tracking-tight text-blue-900 sm:text-base">
                  5.628%
                </p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-500">
                  Payment
                </p>
                <p className="text-sm font-bold tracking-tight text-blue-900 sm:text-base">
                  $2,823/mo
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-1.5 border-t border-gray-100 pt-2.5">
              <span className="mt-0.5 size-2.5 shrink-0 rounded-sm bg-primary" />
              <p className="text-[10px] font-bold uppercase leading-snug tracking-wide text-primary">
                Empower member exclusive: $1,000 off closing costs for Empower
                members
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const featuredRateTableGrid =
  "grid-cols-[minmax(0,1.4fr)_auto_auto_auto] sm:grid-cols-[1.4fr_0.7fr_0.7fr_0.85fr_auto] md:grid-cols-[1.4fr_0.7fr_0.7fr_0.85fr_0.75fr_0.7fr]";

export function FeaturedRateTableMock() {
  return (
    <div
      className={cn(
        "flex w-full flex-col border border-gray-200 bg-white shadow-[0_24px_60px_rgba(0,41,61,0.12),0_2px_8px_rgba(0,41,61,0.06)] sm:aspect-[1440/820]",
        showcaseMockFrame
      )}
      aria-hidden
    >
      <div
        className={cn(
          "grid shrink-0 gap-2 bg-blue-900 px-3 py-2.5 sm:gap-2 sm:px-4 sm:py-2",
          featuredRateTableGrid
        )}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
          Lender
        </span>
        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
          Rate
          <Info className="hidden size-3 opacity-70 sm:inline" />
        </span>
        <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:text-xs">
          APR
          <Info className="hidden size-3 opacity-70 sm:inline" />
        </span>
        <span className="hidden items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 sm:flex sm:text-xs">
          Mo. payment
        </span>
        <span className="hidden items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-white/90 md:flex md:text-xs">
          Score
        </span>
        <span />
      </div>

      {FEATURED_RATE_ROWS.map((row, index) => (
        <div
          key={row.brand}
          className={cn(
            "relative overflow-hidden border-t border-gray-200",
            // Keep the mock compact on phones — featured + two soft rows.
            index > 2 && "hidden sm:block",
            row.featured
              ? "z-20 isolate bg-gradient-to-b from-[#f7faff] to-white shadow-[0_0_0_1px_rgba(0,97,254,0.18),0_6px_16px_rgba(0,97,254,0.1)] sm:flex-[1.45]"
              : // Shorter + softer so competitor rows don't crowd the featured placement.
                "z-0 sm:flex-[0.85]"
          )}
        >
          <div
            className={cn(
              "grid items-center gap-2 px-3 py-2.5 sm:min-h-0 sm:gap-2 sm:px-4 sm:py-2",
              featuredRateTableGrid,
              !row.featured && "opacity-35 blur-[2px]"
            )}
          >
            <div className="min-w-0">
              {row.featured ? (
                <p className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.04em] text-primary">
                  <FlourishStars className="size-3 shrink-0" />
                  <span className="truncate">Your placement</span>
                </p>
              ) : null}
              <p className="hidden truncate text-[10px] leading-tight text-gray-600 sm:block">
                {row.product}
              </p>
              <div className="flex min-w-0 items-center gap-1.5 sm:mt-1">
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
              <p className="mt-0.5 hidden truncate text-[9px] text-gray-500 sm:block">
                {row.meta}
              </p>
            </div>
            {/* Matching 2-line stacks so Rate / APR / Payment / Score share one baseline. */}
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                {row.rate}
              </p>
              <p className="hidden h-[13px] sm:block" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                {row.apr}
              </p>
              <p className="hidden truncate text-[9px] leading-[13px] text-gray-600 sm:block">
                {row.points}
              </p>
            </div>
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                {row.payment}
              </p>
              <p className="h-[13px]" aria-hidden />
            </div>
            <div className="hidden min-w-0 md:block">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold tracking-tight text-blue-900 sm:text-sm">
                  {row.score}
                  <span className="text-[9px] font-medium text-gray-500">/5</span>
                </span>
                <Star className="size-3 text-[#e8a317]" />
              </div>
              <p className="truncate text-[9px] leading-[13px] text-gray-500">
                {row.reviews}
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-0.5">
              <span className="grid h-7 place-items-center rounded-md bg-primary px-2 text-[10px] font-semibold whitespace-nowrap text-white sm:h-8 sm:text-xs">
                Next →
              </span>
              <span className="hidden text-center text-[9px] text-gray-600 sm:block">
                More details
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SavingsAccountsMock() {
  return (
    <div
      className={cn(
        "w-full bg-[#fafafa] shadow-[0_24px_60px_rgba(0,41,61,0.12),0_2px_8px_rgba(0,41,61,0.06)] sm:aspect-[1440/900]",
        showcaseMockFrame
      )}
      aria-hidden
    >
      <div className="flex min-h-0 flex-col bg-[#f2f5fa] sm:h-full">
        <div className="relative shrink-0 overflow-hidden border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2 px-3 py-2 opacity-55 blur-[2.5px] sm:gap-3 sm:px-4 sm:py-2.5">
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
        </div>

        <div className="relative shrink-0 overflow-hidden">
          <div className="space-y-1.5 px-3 py-2.5 opacity-55 blur-[2.5px] sm:space-y-2 sm:px-5 sm:py-3">
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
                    <Star className="size-3 text-[#e8a317]" />
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
                  <Star className="size-3 text-[#e8a317]" />
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
