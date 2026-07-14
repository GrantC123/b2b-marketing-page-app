import { SupplyPartnershipForm } from "@/components/common/supply-partnership-form";
import { BlueGoalsPanel, type GoalsPanelTab } from "@/components/shared/blue-goals-panel";
import {
  SUPPLY_VERTICALS,
  type SupplyVertical,
} from "@/lib/form/supply-inquiry-types";

const verticalTabs: Record<SupplyVertical, Omit<GoalsPanelTab, "form">> = {
  Mortgage: {
    key: "Mortgage",
    label: "Mortgage",
    eyebrow: "Mortgage & home lending",
    title: "A lead worth your loan officer's time",
    description: [
      "Every lead is sourced from a prime plus audience and has compared real time pricing from our rate table before selecting your brand, filling out a lead form and then completing a 2 step phone verification.",
      "You loan officers can focus their time on borrowers who are ready to proceed.",
    ],
    bullets: [
      "Two-step verification confirms a working number and leads are only passed once this step is complete",
      "No blind submissions: leads are only sold to the borrowers who selected your brand",
      "High quality audience with an average FICO of 742 and average loan amount of $465k",
      "Purchase, Refi, HELOC, HELOAN and shared equity leads available",
    ],
    fit: [
      "You offer highly competitive rates",
      "You're licensed in 15+ states, or licensed in New York",
      "You have a team of 10+ loan officers",
      "You're digital-first, with a modern tech stack",
    ],
  },
  Deposits: {
    key: "Deposits",
    label: "Deposits",
    eyebrow: "Deposits & savings",
    title: "Reach savers comparing rates and products",
    description: [
      "Connect with consumers actively shopping CDs, savings, and money market accounts across Bankrate surfaces.",
    ],
    bullets: [
      "Go live within 2 weeks!",
      "High quality audience with average balances of $30k savings/MMA accounts and $70k CD accounts",
      "Advertise CD's, HYSA, MMA or Checking",
    ],
    fit: [
      "FDIC or NCUA Insured",
      "Online account opening",
      "National or Regional Campaigns",
      "Scale Budget with Performance",
    ],
  },
  "Credit Cards": {
    key: "Credit Cards",
    label: "Credit cards",
    eyebrow: "Credit cards",
    title: "Put your card offers in front of ready applicants",
    description: [
      "Reach consumers comparing rewards, balance transfer, and low-APR cards with transparent disclosures.",
    ],
    bullets: [
      "Card marketplace listings",
      "Category and rewards targeting",
      "Compliance-ready creative",
      "Conversion tracking",
    ],
    fit: [
      "Issuing bank or program manager",
      "Approved marketing materials",
      "Application funnel ready",
    ],
  },
  Other: {
    key: "Other",
    label: "Other",
    eyebrow: "Other financial products",
    title: "Explore custom partnership programs",
    description: [
      "Personal loans, auto, insurance, and more — tell us what you offer and we will route you to the right team.",
    ],
    bullets: [
      "Multi-vertical marketplace access",
      "Custom integration options",
      "Dedicated partner support",
      "Flexible commercial models",
    ],
    fit: [
      "Licensed where required",
      "Clear go-to-market plan",
      "Operational readiness",
    ],
  },
};

const tabs: GoalsPanelTab[] = SUPPLY_VERTICALS.map((vertical) => ({
  ...verticalTabs[vertical],
  form: <SupplyPartnershipForm key={vertical} vertical={vertical} />,
}));

/** Tabbed vertical form panel from Figma 561:2174 — overlaps supply hero. */
export function SupplyGoals() {
  return <BlueGoalsPanel id="supply-goals" tabs={tabs} overlapHero />;
}
