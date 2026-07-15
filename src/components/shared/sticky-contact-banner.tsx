"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StickyContactBannerProps = {
  /** DOM id of the contact form section (without #) — used for the CTA href. */
  formId: string;
  /**
   * DOM id of the element that must scroll out of view before the banner shows.
   * Defaults to `formId` (show after scrolling past the form).
   */
  showAfterId?: string;
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
        "pointer-events-none fixed inset-x-0 bottom-0 z-50 transition-[transform,opacity] duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      )}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto flex h-14 w-full items-center bg-blue-200 sm:h-16">
        <div className="mx-auto flex h-full w-full max-w-(--section-main) items-center justify-center gap-4 px-4 sm:gap-6 sm:px-6 lg:px-8">
          <p className="min-w-0 truncate font-display text-base leading-tight tracking-tight text-blue-900">
            {message}
          </p>
          <Button
            href={`#${formId}`}
            size="default"
            className="shrink-0"
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
