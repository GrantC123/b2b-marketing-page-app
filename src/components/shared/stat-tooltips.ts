import type { StatTooltipData } from "./stat-tooltip";

/** Bankrate methodology page — same destination as brand-identity stat tooltips. */
export const BANKRATE_METHODOLOGY_HREF =
  "https://www.bankrate.com/mortgages/bankrate-low-offers-methodology/";

/** Tile stat for `StatsStrip` — tooltip is optional and controlled via `showTooltips`. */
export type StatsStripTileStat = {
  value: string;
  suffix?: boolean;
  label: string;
  tooltip?: StatTooltipData;
};

/** Navy highlight cards for `StatsStrip layout="highlight"`. */
export type StatsStripHighlightStat = {
  value: string;
  title: string;
  body: string;
};

/** @deprecated Use StatsStripTileStat */
export type StatDefinition = StatsStripTileStat & {
  tooltip: StatTooltipData;
};

/** @deprecated Use StatsStripTileStat */
export type ProofStatDefinition = Pick<
  StatsStripTileStat,
  "value" | "suffix" | "label"
>;

/** @deprecated Use StatsStripHighlightStat */
export type HighlightStatDefinition = StatsStripHighlightStat;

export const ENTERPRISE_PROOF_STATS: StatsStripTileStat[] = [
  {
    value: "#1",
    label: "Destination for organic financial search.",
  },
  {
    value: "Fed",
    label: "Federal Reserve source – Our data is used by the Fed to track national lending trends.",
  },
  {
    value: "3,000",
    suffix: true,
    label:
      "Press mentions – A brand identity that carries immediate authority with your customers.",
  },
];

export const ENTERPRISE_STATS: StatsStripTileStat[] = [
  {
    value: "300",
    suffix: true,
    label: "Unique partners",
    tooltip: {
      body: "On Bankrate, 300+ lenders and financial partners compete to reach qualified, rate-shopping consumers across mortgage, deposits, credit cards, and more — giving partners access to high-intent traffic nationwide.",
      linkText: "See our full methodology.",
      linkHref: BANKRATE_METHODOLOGY_HREF,
    },
  },
  {
    value: "$21M",
    label: "Total savings for partner audiences",
    tooltip: {
      heading:
        "In 2025, Bankrate partner audiences realized $21M in total modeled savings.",
      body: "Savings based on a modeled comparison of Bankrate's monthly average clicked-on rate in 2025 for purchases and refinances and Freddie Mac's average published mortgage rate, with savings calculated over a 30-year term using Bankrate's average loan amount. Freddie Mac's survey criteria differ from Bankrate data, and fees and points are excluded for both. Not actual realized consumer savings; actual savings vary based on loan terms, rates, costs, and how long the loan is held. Bankrate is not a lender.",
      linkText: "Learn more about our methodology.",
      linkHref: BANKRATE_METHODOLOGY_HREF,
    },
  },
  {
    value: "100M",
    suffix: true,
    label: "People use Bankrate every year",
    tooltip: {
      body: "Bankrate reaches more than 100 million people each year across its rate comparison tools, editorial content, and partner experiences — giving partners access to a large, high-intent audience shopping financial products.",
      linkText: "Learn more about our methodology.",
      linkHref: BANKRATE_METHODOLOGY_HREF,
    },
  },
  {
    value: "99.7%",
    label: "Better rates",
    tooltip: {
      heading:
        "During 2025, Bankrate's top offer outperformed 99.77% of offers by 600+ banks and credit unions surveyed.",
      body: "Based on an 8-year cost of loan calculation (including interest payments, lender fees and points). Comparison of Bankrate's best quoted offer clicked by a user each day in 2025 for a 30-year fixed purchase, $310k–$330k loan with 20% down, 700–780 FICO, primary residence, single family) against rates from all institutions surveyed by Bankrate for similar loan each applicable day (assuming $320k loan, 740 FICO). Bankrate is not a lender.",
      linkText: "Learn more about our methodology.",
      linkHref: BANKRATE_METHODOLOGY_HREF,
    },
  },
];

/** Claims from CONTENT_INSTRUCTIONS.md — enterprise proof strip (4 tiles). */
export const ENTERPRISE_CLAIMS_STATS: StatsStripTileStat[] = [
  {
    value: "$38k",
    label: "Average savings per borrower",
  },
  {
    value: "99.7%",
    label: "Mortgage rates that beat banks",
    tooltip: ENTERPRISE_STATS[3].tooltip,
  },
  {
    value: "3,000",
    suffix: true,
    label: "Top-tier press mentions in 2025",
  },
  {
    value: "#1",
    label: "Destination for organic financial search",
  },
];

export const SUPPLY_STATS: StatsStripTileStat[] = [
  {
    value: "300",
    suffix: true,
    label: "Partners",
    tooltip: ENTERPRISE_STATS[0].tooltip,
  },
  {
    value: "78%",
    label: "Actively comparing rates",
    tooltip: {
      body: "Based on Bankrate mortgage audience behavior — the majority of visitors on Bankrate mortgage surfaces are actively comparing rates and offers from multiple lenders rather than browsing passively.",
      linkText: "Learn more about our methodology.",
      linkHref: BANKRATE_METHODOLOGY_HREF,
    },
  },
  {
    value: "4.3M",
    label: "Monthly mortgage shoppers",
    tooltip: {
      body: "Monthly mortgage shoppers represent unique visitors to Bankrate mortgage content and rate comparison tools. Volume reflects aggregate audience reach across purchase, refinance, and home equity journeys.",
      linkText: "Learn more about our methodology.",
      linkHref: BANKRATE_METHODOLOGY_HREF,
    },
  },
  {
    value: "#1",
    label: "Most trusted mortgage site",
    tooltip: {
      body: "Bankrate is consistently recognized as a leading destination for mortgage rate comparison and home lending education among U.S. consumers shopping for purchase, refinance, and home equity products.",
      linkText: "Learn more about our methodology.",
      linkHref: BANKRATE_METHODOLOGY_HREF,
    },
  },
];
