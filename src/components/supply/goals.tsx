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
    title: "Leads from borrowers who already compared—and chose you",
    description: [
      "Every lead comes from shoppers who compared live rates, selected your brand, and completed two-step phone verification before you ever see them.",
      "Your loan officers spend time on borrowers who are ready to proceed—not cold inquiries.",
    ],
    bullets: [
      "No blind submissions: leads go only to the brand the borrower selected",
      "High-quality audience with an average FICO of 742 and average loan amount of $465k",
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
    title: "Reach savers already comparing rates and products",
    description: [
      "Connect with people actively shopping CDs, savings, and money market accounts—when they're ready to choose where their money goes.",
    ],
    bullets: [
      "Go live within 2 weeks",
      "High-quality audience with average balances of $30k savings/MMA and $70k CD accounts",
      "Advertise CDs, HYSA, MMA, or checking",
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
      "Reach prime-plus consumers comparing rewards, balance transfer, and low-APR cards with transparent disclosures.",
    ],
    bullets: [
      "Placement across comparison tables, category pages, and card detail pages",
      "Performance-based CPA model — pay per approved account, not per click",
      "Compliance-reviewed creative with accurate APR and disclosure handling",
    ],
    fit: [
      "Issuer, bank, or credit union with live card products",
      "Online application with instant approval",
      "Competitive rewards, APR, or bonus offers",
      "Scale spend with performance",
    ],
    fitNote:
      "Our credit cards team reviews every inquiry and is selective about who we partner with. Meeting these criteria is a starting point — not a guarantee of a fit.",
  },
  Other: {
    key: "Other",
    label: "Other",
    eyebrow: "Other financial products",
    title: "Explore custom programs that fit your audience",
    description: [
      "Personal loans, auto, insurance, and more—tell us what you offer and we'll route you to the right team.",
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
