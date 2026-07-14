import { FlourishQuoteLeft } from "@bankrate/icons-react";

import { IconOffset } from "@/components/common/flourish/icon-offset";
import { Card, CardContent } from "@/components/ui/card";
import { EyebrowSm, Heading1, Heading2, Heading3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import type { CaseStudyContent } from "./types";
import { CASE_STUDY_IMG } from "./assets";
import {
  marketingBody,
  marketingEyebrowHero,
  marketingEyebrowSection,
  marketingHeroBody,
  marketingSectionLead,
} from "../shared/copy";
import {
  AMAZON_CASE_STUDY_BREADCRUMBS,
  HeroBreadcrumbs,
} from "../shared/hero-breadcrumbs";
import { Layout } from "../shared/layout";
import { SectionShell } from "../shared/section-shell";

type CaseStudyPageProps = {
  content: CaseStudyContent;
};

export function CaseStudyPage({ content }: CaseStudyPageProps) {
  return (
    <Layout>
      <CaseStudyHero content={content} />
      <CaseStudyChallenge content={content.challenge} />
      <CaseStudySolution content={content.solution} />
      <CaseStudyResults content={content.results} />
      <CaseStudyQuote quote={content.quote} />
    </Layout>
  );
}

function CaseStudyHero({ content }: { content: CaseStudyContent }) {
  const { hero } = content;

  return (
    <SectionShell variant="hero" className="bg-background">
      <div className="relative overflow-hidden rounded-[32px] bg-blue-900 lg:rounded-[56px]">
        <div className="flex flex-col lg:min-h-[620px] lg:flex-row lg:items-stretch">
          <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-16 lg:px-[70px] lg:py-[140px]">
            <HeroBreadcrumbs
              items={AMAZON_CASE_STUDY_BREADCRUMBS}
              className="mb-2"
            />
            <EyebrowSm as="p" className={marketingEyebrowHero}>
              {hero.label}
            </EyebrowSm>
            <Heading1 className="text-pretty text-white lg:text-[56px] lg:leading-[1.2]">
              {hero.headline}
            </Heading1>
            <p className={cn("max-w-[603px]", marketingHeroBody)}>{hero.summary}</p>
          </div>
          <div className="flex flex-1 items-center justify-center px-6 pb-10 lg:px-10 lg:pb-0 lg:pt-32">
            <div className="relative w-full max-w-[533px] overflow-hidden rounded-[48px]">
              <img
                src={hero.imageSrc}
                alt={hero.imageAlt}
                className="block h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function CaseStudyChallenge({
  content,
}: {
  content: CaseStudyContent["challenge"];
}) {
  return (
    <SectionShell className="bg-background py-16 lg:py-[120px]">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4">
            <EyebrowSm as="p" className={marketingEyebrowSection}>
              {content.label}
            </EyebrowSm>
            <Heading2 className="text-pretty text-headings">{content.headline}</Heading2>
          </div>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className={marketingSectionLead}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative w-full max-w-[529px] shrink-0">
          <div className="relative h-[363px] overflow-hidden rounded-[32px] bg-[#7ad595]">
            <img
              src={CASE_STUDY_IMG.challengeCircle}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-[88px] top-[42px] z-0 h-[404px] w-[407px]"
            />
            <img
              src={content.imageSrc}
              alt={content.imageAlt}
              className="absolute left-[103px] top-[-27px] z-10 h-[468px] w-[355px] object-cover object-top"
            />
            <span className="absolute bottom-6 left-6 z-20 rounded-full bg-[#498059] px-4 py-2.5 text-xs font-semibold text-white">
              {content.caption}
            </span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function CaseStudySolution({
  content,
}: {
  content: CaseStudyContent["solution"];
}) {
  return (
    <SectionShell className="bg-background py-16 lg:py-[120px]">
      <div className="flex flex-col gap-16">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-4 text-center">
          <EyebrowSm as="p" className={marketingEyebrowSection}>
            {content.label}
          </EyebrowSm>
          <Heading2 className="text-pretty text-headings">{content.headline}</Heading2>
          <p className={marketingSectionLead}>{content.summary}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {content.cards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-none"
              >
                <CardContent className="flex flex-col gap-5 p-0">
                  <IconOffset
                    icon={<Icon className="size-8 text-gray-800" aria-hidden />}
                    variant={card.iconVariant}
                    color={card.iconColor}
                  />
                  <div className="flex flex-col gap-2">
                    <Heading3 className="text-xl lg:text-xl text-headings">{card.title}</Heading3>
                    <p className={marketingBody}>{card.body}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}

function CaseStudyResults({
  content,
}: {
  content: CaseStudyContent["results"];
}) {
  return (
    <SectionShell className="bg-background py-16 lg:py-[120px]">
      <div className="overflow-hidden rounded-[32px] bg-blue-900 px-6 py-16 lg:rounded-[56px] lg:px-16 lg:py-[120px]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <EyebrowSm as="p" className={marketingEyebrowHero}>
              {content.label}
            </EyebrowSm>
            <Heading2 className="text-pretty text-white">{content.headline}</Heading2>
          </div>
          <div className="grid w-full gap-8 lg:grid-cols-3 lg:gap-0">
            {content.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-2 px-0 lg:px-6",
                  index > 0 && "lg:border-l lg:border-blue-800"
                )}
              >
                <Heading1 className="text-white">{stat.value}</Heading1>
                <p className="text-base leading-relaxed tracking-tighter text-blue-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function CaseStudyQuote({ quote }: { quote: CaseStudyContent["quote"] }) {
  return (
    <SectionShell className="bg-background py-16 lg:px-24 lg:py-[120px] xl:px-60">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-8 text-center">
        <FlourishQuoteLeft
          size="xl"
          fill="var(--color-primary)"
          className="shrink-0"
          aria-hidden
        />
        <blockquote className="text-balance">
          <Heading2
            as="p"
            className="text-[28px] leading-[1.4] tracking-normal lg:text-4xl"
          >
            &ldquo;{quote.text}&rdquo;
          </Heading2>
        </blockquote>
        <figcaption className="flex flex-col gap-1">
          <p className="text-lg tracking-tighter text-headings">{quote.attribution}</p>
          <p className="text-sm text-gray-700">{quote.role}</p>
        </figcaption>
      </div>
    </SectionShell>
  );
}
