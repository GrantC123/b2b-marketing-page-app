import type { ReactNode } from "react";
import type { BankrateIcon } from "@bankrate/icons-react";

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EyebrowSm, Heading3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingCardIcon, marketingEyebrowSection } from "./copy";

/** Card shell from brand-identity homepage next-steps tiles. */
export const pathCardClassName =
  "relative flex min-w-0 w-full flex-1 flex-col gap-4 overflow-visible border-none bg-card px-6 pt-6 pb-12 shadow-xs ring-0 has-data-[slot=card-footer]:pb-12 sm:px-8";

export type PathCardProps = {
  icon?: BankrateIcon;
  iconVariant?: IconOffsetVariant;
  iconColor?: IconOffsetColor;
  kicker: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  className?: string;
  footer?: ReactNode;
  /** Desktop: last-card flourish. Mobile: first-card flourish when stacked. */
  cornerEmphasis?: "mobile-first" | "desktop-last";
};

export function PathCard({
  icon: PathIcon,
  iconVariant = 1,
  iconColor = "blue",
  kicker,
  title,
  description,
  cta,
  href,
  className,
  footer,
  cornerEmphasis,
}: PathCardProps) {
  return (
    <div className={cn("relative flex h-full min-w-0 w-full flex-1 flex-col", className)}>
      {cornerEmphasis === "mobile-first" ? (
        <CornerEmphasis className="-right-4 -z-10 md:hidden" />
      ) : null}
      {cornerEmphasis === "desktop-last" ? (
        <CornerEmphasis className="-z-10 hidden md:block" />
      ) : null}
      <Card className={cn(pathCardClassName, "relative z-0 h-full")}>
        <CardHeader className="gap-4 px-0 pb-4">
          {PathIcon ? (
            <IconOffset
              variant={iconVariant}
              color={iconColor}
              icon={<PathIcon className={marketingCardIcon} />}
            />
          ) : null}
          <EyebrowSm as="p" className={marketingEyebrowSection}>
            {kicker}
          </EyebrowSm>
          <CardTitle>
            <Heading3 className="text-blue-900">{title}</Heading3>
          </CardTitle>
        </CardHeader>
        <CardContent className="mb-4 px-0">
          <p className={marketingBody}>{description}</p>
        </CardContent>
        <CardFooter className="mt-auto border-0 bg-transparent p-0">
          {footer ?? (
            <Button
              size="lg"
              arrow
              href={href}
              className="w-full max-w-full whitespace-normal sm:w-auto sm:whitespace-nowrap"
            >
              {cta}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
