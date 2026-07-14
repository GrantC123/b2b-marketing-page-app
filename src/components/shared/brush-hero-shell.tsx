import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { MARKETING_BRUSH_IMG } from "./brush-assets";
import {
  HeroBreadcrumbs,
  type HeroBreadcrumbItem,
} from "./hero-breadcrumbs";
import { SectionShell } from "./section-shell";

type BrushHeroShellProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  breadcrumbs?: HeroBreadcrumbItem[];
};

/** Navy hero card with brand homepage brush stroke background — for text-only subpages. */
export function BrushHeroShell({
  children,
  className,
  contentClassName,
  breadcrumbs,
}: BrushHeroShellProps) {
  return (
    <SectionShell
      variant="hero"
      className={cn("relative z-0 bg-background pb-2 pt-3 lg:pb-4 lg:pt-5", className)}
    >
      <div className="relative w-full overflow-hidden rounded-[32px] bg-blue-900 lg:rounded-[56px]">
        <img
          src={MARKETING_BRUSH_IMG.mobile}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 size-full object-cover md:hidden"
        />
        <img
          src={MARKETING_BRUSH_IMG.desktop}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden size-full object-cover md:block"
        />
        <div
          className={cn(
            "relative z-10 px-6 py-16 lg:px-14 lg:py-[120px] xl:px-[70px]",
            contentClassName
          )}
        >
          {breadcrumbs?.length ? (
            <HeroBreadcrumbs
              items={breadcrumbs}
              className="mb-8 w-full self-stretch text-left lg:mb-10"
            />
          ) : null}
          {children}
        </div>
      </div>
    </SectionShell>
  );
}
