import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { EyebrowLg, Heading1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingEyebrowHero, marketingHeroBody } from "../shared/copy";
import {
  type HeroBreadcrumbItem,
} from "../shared/hero-breadcrumbs";
import { Layout } from "../shared/layout";
import { BrushHeroShell } from "../shared/brush-hero-shell";

type PartnersPlaceholderPageProps = {
  documentTitle: string;
  kicker: string;
  title: string;
  description: string;
  breadcrumbs?: HeroBreadcrumbItem[];
};

export function PartnersPlaceholderPage({
  documentTitle,
  kicker,
  title,
  description,
  breadcrumbs = [
    { label: "Partners", href: "/partner" },
    { label: title },
  ],
}: PartnersPlaceholderPageProps) {
  useEffect(() => {
    const previous = document.title;
    document.title = documentTitle;
    return () => {
      document.title = previous;
    };
  }, [documentTitle]);

  return (
    <Layout>
      <BrushHeroShell
        breadcrumbs={breadcrumbs}
        contentClassName="flex flex-col items-center py-20 text-center sm:py-24 lg:py-[120px]"
      >
        <EyebrowLg as="p" className={marketingEyebrowHero}>
          {kicker}
        </EyebrowLg>
        <Heading1 className="mt-6 max-w-[640px] leading-[1.2] tracking-tight text-white">
          {title}
        </Heading1>
        <p className={cn("mt-6 max-w-[540px]", marketingHeroBody)}>{description}</p>
        <Button size="lg" href="/partner#partner-paths" className="mt-10">
          Back to partnership paths
        </Button>
      </BrushHeroShell>
    </Layout>
  );
}
