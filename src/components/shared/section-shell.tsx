import type { ReactNode } from "react";

import {
  SectionShell as BaseSectionShell,
  sectionPaddingClassName,
  sectionStackGapClassName,
  sectionXClassName,
  sectionYClassName,
} from "@/components/common/section-shell";
import { cn } from "@/lib/utils";

export {
  sectionPaddingClassName,
  sectionStackGapClassName,
  sectionXClassName,
  sectionYClassName,
};

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  /** default — brand SectionShell; hero — homepage hero padding */
  variant?: "default" | "hero";
  /** When true, children fill the section without the max-width container (full-bleed heroes). */
  fullBleed?: boolean;
};

const heroPadding = "px-0 py-6 lg:py-10 lg:px-6 xl:px-20";

/** Section wrapper from brand-identity-pages SectionShell — responsive padding + page width. */
export function SectionShell({
  children,
  className,
  id,
  style,
  variant = "default",
  fullBleed = false,
}: SectionShellProps) {
  if (variant === "hero") {
    return (
      <section
        id={id}
        className={cn(
          // fullBleed must not inherit hero lg/xl horizontal padding — px-0 alone
          // cannot override lg:px-6 / xl:px-20 via twMerge.
          fullBleed ? "px-0 py-0" : heroPadding,
          className
        )}
        style={style}
      >
        {fullBleed ? (
          children
        ) : (
          <div className="mx-auto w-full max-w-(--section-main)">{children}</div>
        )}
      </section>
    );
  }

  if (fullBleed) {
    return (
      <section
        id={id}
        className={cn(sectionPaddingClassName, className)}
        style={style}
      >
        {children}
      </section>
    );
  }

  return (
    <BaseSectionShell id={id} className={className} style={style}>
      {children}
    </BaseSectionShell>
  );
}

/** Centered copy column — brand `--section-copy` (45rem / 720px). */
export function CopyColumn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-(--section-copy)", className)}>
      {children}
    </div>
  );
}

/** Lead / mission block width — brand pages often use ~846px. */
export function LeadColumn({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-(--section-lead)", className)}>
      {children}
    </div>
  );
}
