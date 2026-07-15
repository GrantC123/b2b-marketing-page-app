"use client";

import { useState } from "react";
import { Checkmark, FlourishArrows3, VerifiedBadge } from "@bankrate/icons-react";

import {
  IconOffset,
  type IconOffsetVariant,
} from "@/components/common/flourish/icon-offset";
import { FlourishSparkle } from "@/components/ui/flourish";
import { EyebrowSm, Heading3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingBody, marketingBodySm, marketingEyebrowSection } from "./copy";
import { SectionShell } from "./section-shell";

export type GoalsPanelTab = {
  key: string;
  label: string;
  eyebrow?: string;
  title: string;
  description: string[];
  bullets?: string[];
  fit?: string[];
  fitNote?: string;
  form: React.ReactNode;
};

type BlueGoalsPanelProps = {
  id: string;
  tabs: GoalsPanelTab[];
  overlapHero?: boolean;
  className?: string;
};

/** Shared "blue form" layout from Figma 561:2174 (Supply) — pill tabs + copy column + elevated form card. */
export function BlueGoalsPanel({
  id,
  tabs,
  overlapHero = false,
  className,
}: BlueGoalsPanelProps) {
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];
  const showTabs = tabs.length > 1;

  return (
    <SectionShell
      id={id}
      className={cn(
        "relative z-10 scroll-mt-[calc(82px+1rem)] bg-transparent pb-12 lg:pb-[120px]",
        overlapHero && "-mt-32 lg:-mt-40",
        className
      )}
    >
      <div className="relative rounded-[48px] bg-blue-200 px-6 py-10 sm:px-12 sm:py-14 lg:px-[72px] lg:py-14">
        {showTabs ? (
          <div className="relative mx-auto flex w-fit flex-wrap justify-center gap-3">
            {overlapHero ? (
              <FlourishArrows3
                fill="var(--color-electric-500)"
                className="pointer-events-none absolute left-0 top-0 z-20 hidden h-18 w-50 -translate-x-[70%] -translate-y-[130%] rotate-90 md:block"
                aria-hidden
              />
            ) : null}
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                className={cn(
                  "rounded-full px-[18px] py-3.5 text-sm font-semibold tracking-[-0.14px] transition-colors",
                  activeKey === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-blue-50 text-primary hover:bg-blue-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : null}

        <div
          className={cn(
            "relative flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[88px]",
            showTabs && "mt-10"
          )}
        >
          <div className="flex max-w-[448px] flex-col gap-10">
            <div className="flex flex-col gap-6">
              {active.eyebrow ? (
                <EyebrowSm as="p" className={marketingEyebrowSection}>
                  {active.eyebrow}
                </EyebrowSm>
              ) : null}
              <Heading3 className="text-blue-900">{active.title}</Heading3>
              <div className="flex flex-col gap-4">
                {active.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={marketingBody}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            {active.bullets && active.bullets.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {active.bullets.map((bullet, index) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <IconOffset
                      variant={((index % 3) + 1) as IconOffsetVariant}
                      color="blue"
                      className="mt-0.5 size-8"
                      icon={
                        <Checkmark
                          className="size-4 text-primary"
                          aria-hidden
                        />
                      }
                    />
                    <span className={marketingBody}>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {active.fit && active.fit.length > 0 ? (
              <div className="border-t border-border pt-6">
                <p className="text-sm font-bold text-gray-800">Good fit if...</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {active.fit.map((item) => (
                    <li key={item} className={cn("flex items-center gap-2", marketingBodySm)}>
                      <span className="size-1 rounded-full bg-muted-foreground" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                {active.fitNote ? (
                  <p
                    className={cn(
                      "mt-6 flex items-start gap-2 text-muted-foreground",
                      marketingBodySm
                    )}
                  >
                    <VerifiedBadge
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>{active.fitNote}</span>
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="relative min-w-0 flex-1">
            <FlourishSparkle
              className="-right-3 -top-4 hidden w-12 lg:block"
              width={48}
              height={60}
            />
            <div className="rounded-[24px] bg-card p-8 shadow-[0_4px_24px_rgba(15,27,47,0.08)] sm:p-12">
              {active.form}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
