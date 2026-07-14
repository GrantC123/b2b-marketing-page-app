import {
  CcStar,
  CcTransfer,
  CdRates,
  FlourishArrows3,
  HomeEquity,
  Lock,
  MortgageMarket,
  MortgagePercent,
  Savings,
  type BankrateIcon,
} from "@bankrate/icons-react";

import { CornerEmphasis } from "@/components/common/flourish/corner-emphasis";
import {
  IconOffset,
  type IconOffsetColor,
  type IconOffsetVariant,
} from "@/components/common/flourish/icon-offset";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heading2, Heading3 } from "@/components/ui/typography";

import SectionShell from "./shell";

type Tile = {
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  href: string;
  icon: BankrateIcon;
  iconColor?: IconOffsetColor;
};

const MORTGAGE_TILES: Tile[] = [
  {
    title: "Buy a home",
    subtitle: "<strong>90%</strong> of buyers overpay",
    body: "The average cost: $3,656 a year — just by not shopping their rate. On Bankrate, 100+ lenders compete for your loan so you see their best offer, not their opening one.",
    cta: "Get a top rate now",
    href: "https://www.bankrate.com/mortgages/mortgage-rates/",
    icon: MortgageMarket,
    iconColor: "indigo",
  },
  {
    title: "Refinance a mortgage",
    subtitle: "<strong>79%</strong> of refinancers overpay",
    body: "No deadline. No pressure. Just thousands in annual savings most borrowers never go looking for. 100+ banks and credit unions bidding in your favor.",
    cta: "Check if I’m overpaying",
    href: "https://www.bankrate.com/mortgages/refinance-rates/",
    icon: MortgagePercent,
    iconColor: "green",
  },
  {
    title: "Tap into home equity",
    subtitle: "<strong>$299k</strong> in untapped equity on average",
    body: "Most homeowners don't realize how much equity they're sitting on, or that they can access it at rates far below a personal loan. See what's available to you.",
    cta: "See your equity options",
    href: "https://www.bankrate.com/home-equity/home-equity-loan-rates/",
    icon: HomeEquity,
    iconColor: "yellow",
  },
];

const BANKING_TILES: Tile[] = [
  {
    title: "Get a better savings rate",
    subtitle: "<strong>93%</strong> of savers earn less with lower rates",
    body: "The best rate on Bankrate pays 4× more than most savers earn today. We survey 850+ banks every week and show you only the top 10% of rates.",
    cta: "Find a better savings rate",
    href: "https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/",
    icon: Savings,
    iconColor: "indigo",
  },
  {
    title: "Save smarter with a CD",
    subtitle: "<strong>$44B</strong> missed in CD earnings annually",
    body: "Most people never check what CDs are paying right now. Lock in today's best rates from hundreds of surveyed banks and credit unions and start saving.",
    cta: "Get today's best CD rates",
    href: "https://www.bankrate.com/banking/cds/cd-rates/",
    icon: CdRates,
    iconColor: "green",
  },
];

const CC_TILES: Tile[] = [
  {
    title: "Find a better credit card",
    subtitle: "<strong>90%+</strong> of U.S. credit card accounts covered",
    body: "Ranked by what's best for your spending profile — not by what issuers pay us to put first. We earn a flat fee at account opening. Nothing more.",
    cta: "Compare cards now",
    href: "https://www.bankrate.com/credit-cards/best-credit-cards/",
    icon: CcStar,
    iconColor: "yellow",
  },
  {
    title: "Stop paying 20% APR",
    subtitle: "<strong>0%</strong> intro rate on top balance transfer cards",
    body: "The market average credit card APR is 19.57%. Every month you wait is a month you're paying interest you don't have to. See how much a balance transfer could save you.",
    cta: "See your transfer options",
    href: "https://www.bankrate.com/credit-cards/balance-transfer/best-balance-transfer-cards/",
    icon: CcTransfer,
  },
];

const TABS = [
  { label: "Mortgages", tiles: MORTGAGE_TILES },
  { label: "Banking", tiles: BANKING_TILES },
  { label: "Credit Cards", tiles: CC_TILES },
];

export default function NextSteps() {
  return (
    <SectionShell id="next-steps">
      <div className="flex flex-col items-center gap-4">
        <Heading2 className="relative text-pretty">
          <FlourishArrows3
            fill="var(--color-electric-500)"
            className="absolute right-full bottom-12 hidden h-18 w-50 rotate-45 text-gray-800 md:block"
            aria-hidden="true"
          />
          What&apos;s your next step?
        </Heading2>
        <p className="text-center text-lg leading-relaxed text-gray-700 text-balance">
          Whether you&apos;re buying or refinancing, most people overpay. Here&apos;s how not to.
        </p>
      </div>
      <Tabs defaultValue={TABS[0].label}>
        <TabsList variant="pill" className="mx-auto my-10">
          {TABS.map((tab, index) => (
            <TabsTrigger
              key={tab.label}
              value={tab.label}
              className="max-sm:px-3"
              id={`homepage-tab-${tab.label.toLowerCase().replace(/\s+/g, "-")}`}
              data-beam-element-clicked-no-delay=""
              data-type="button"
              data-location="homepage"
              data-name={`tab-${tab.label.toLowerCase().replace(/\s+/g, "-")}`}
              data-text={tab.label}
              data-position={String(index + 1)}
              data-outcome="interact"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.label} value={tab.label}>
            <div className="mx-auto flex max-w-296 flex-col items-center justify-center gap-8 md:flex-row md:items-stretch">
              {tab.tiles.map((tile, index) => {
                const TileIcon = tile.icon;
                return (
                  <Card
                    key={tile.title}
                    className="relative max-w-100 flex-1 gap-4 border-none px-8 pt-6 pb-12 shadow-xs"
                  >
                    {index === tab.tiles.length - 1 ? (
                      <CornerEmphasis className="hidden xl:block" />
                    ) : null}
                    <CardHeader className="border-b border-gray-300 px-0 pb-4">
                      <IconOffset
                        variant={(index + 1) as IconOffsetVariant}
                        color={tile.iconColor}
                        icon={<TileIcon className="size-8 text-gray-800" />}
                      />
                      <CardTitle>
                        <Heading3 className="text-blue-900">{tile.title}</Heading3>
                      </CardTitle>
                      <CardDescription
                        className="text-lg tracking-tighter text-blue-800"
                        dangerouslySetInnerHTML={{ __html: tile.subtitle }}
                      />
                    </CardHeader>
                    <CardContent className="mb-4 px-0">
                      <p className="tracking-tighter text-gray-700">{tile.body}</p>
                    </CardContent>
                    <CardFooter className="px-0">
                      <Button size="lg" href={tile.href} arrow>
                        {tile.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-10 flex items-center justify-center gap-4">
        <Lock className="size-4 shrink-0 text-gray-800" />
        <p className="text-sm text-gray-800">
          Your information is not shared until you decide to apply for an account or loan
        </p>
      </div>
    </SectionShell>
  );
}
