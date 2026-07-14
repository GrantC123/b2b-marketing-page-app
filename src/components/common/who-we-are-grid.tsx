import type { CSSProperties } from "react";
import type { BankrateIcon } from "@bankrate/icons-react";

import { CornerEmphasis } from "@/components/common/flourish/corner-emphasis";
import {
  IconOffset,
  type IconOffsetVariant,
} from "@/components/common/flourish/icon-offset";
import { LineEmphasis } from "@/components/common/flourish/line-emphasis";
import SectionShell from "@/components/homepage/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heading2, Heading4 } from "@/components/ui/typography";

export type WhoWeAreCard = {
  label: string;
  trackingName: string;
  description: string;
  href: string;
  cta: string;
  icon: BankrateIcon;
};

type WhoWeAreGridProps = {
  id: string;
  trackingLocation: string;
  cards: WhoWeAreCard[];
  backgroundImageSrc: string;
  shellClassName?: string;
};

export default function WhoWeAreGrid({
  id,
  trackingLocation,
  cards,
  backgroundImageSrc,
  shellClassName,
}: WhoWeAreGridProps) {
  return (
    <SectionShell id={id} className={shellClassName ?? "px-0"}>
      <div
        className="relative w-full overflow-hidden rounded-4xl bg-blue-900 bg-(image:--bg-img) bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16 xl:px-20"
        style={{ "--bg-img": `url(${backgroundImageSrc})` } as CSSProperties}
      >
        <div className="relative z-10 flex flex-col items-center gap-12">
          <Heading2 className="max-w-(--section-copy) text-center text-pretty text-white">
            <LineEmphasis emphasis="Who we are" after=" and why we exist" />
          </Heading2>

          <div className="@container w-full">
            <div className="relative mx-auto grid w-full gap-5 @lg:max-w-205 @lg:grid-cols-2 @5xl:max-w-none @5xl:grid-cols-4">
              <CornerEmphasis className="hidden @4xl:block" />
              {cards.map((card, index) => {
                const CardIcon = card.icon;
                return (
                  <Card
                    key={card.href}
                    className="mx-auto flex w-full max-w-100 flex-col gap-4 rounded-3xl border-none bg-white p-8 shadow-none"
                  >
                    <CardContent className="flex flex-1 flex-col gap-6 px-0">
                      <IconOffset
                        variant={((index % 3) + 1) as IconOffsetVariant}
                        icon={<CardIcon className="size-8 text-blue-900" />}
                      />
                      <Heading4 as="h3" className="text-blue-900">
                        {card.label}
                      </Heading4>
                      <p className="text-base/relaxed text-pretty text-muted-foreground">
                        {card.description}
                      </p>
                    </CardContent>
                    <CardFooter className="px-0">
                      <Button
                        size="lg"
                        variant="link"
                        arrow
                        href={card.href}
                        className="relative pl-0"
                        data-location={trackingLocation}
                        data-name={card.trackingName}
                      >
                        {card.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
