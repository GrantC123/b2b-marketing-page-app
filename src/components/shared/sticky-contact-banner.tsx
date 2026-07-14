"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EyebrowSm } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingEyebrowHero } from "./copy";

type StickyContactBannerProps = {
  /** DOM id of the contact form section (without #) — used for the CTA href. */
  formId: string;
  /**
   * DOM id of the element that must scroll out of view before the banner shows.
   * Defaults to `formId` (show after scrolling past the form).
   */
  showAfterId?: string;
  eyebrow?: string;
  message?: string;
  buttonLabel?: string;
};

/**
 * Sticky bottom CTA that appears after a trigger section scrolls out of view,
 * linking to the contact form.
 */
export function StickyContactBanner({
  formId,
  showAfterId,
  eyebrow = "Bankrate Partners",
  message = "Ready to talk partnerships?",
  buttonLabel = "Contact sales",
}: StickyContactBannerProps) {
  const [visible, setVisible] = useState(false);
  const triggerId = showAfterId ?? formId;

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(
          !entry.isIntersecting && entry.boundingClientRect.bottom < 0
        );
      },
      { threshold: 0 }
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [triggerId]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-[transform,opacity] duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
      aria-hidden={!visible}
    >
      <div
        className={cn(
          "pointer-events-auto bg-blue-900",
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
          "shadow-[0_-12px_40px_rgba(19,34,59,0.35)]"
        )}
      >
        <div className="mx-auto flex w-full max-w-(--section-main) flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-4 lg:px-8">
          <div className="min-w-0 flex flex-col gap-1 text-center sm:text-left">
            <EyebrowSm as="p" className={marketingEyebrowHero}>
              {eyebrow}
            </EyebrowSm>
            <p className="font-display text-lg leading-snug tracking-tight text-balance text-white sm:text-xl sm:leading-tight">
              {message}
            </p>
          </div>
          <Button
            href={`#${formId}`}
            size="lg"
            className="w-full shrink-0 sm:w-auto"
            arrow
            tabIndex={visible ? undefined : -1}
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
