import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
};

/**
 * Default section padding — sourced from `--section-y` / `--section-y-lg` in index.css.
 * Change those CSS variables to adjust spacing between sections site-wide.
 */
export const sectionYClassName =
  "py-[length:var(--section-y)] lg:py-[length:var(--section-y-lg)]";

/** Horizontal inset that pairs with sectionYClassName. */
export const sectionXClassName = "px-4 md:px-6";

/** Full default section shell padding (x + y). */
export const sectionPaddingClassName = cn(sectionXClassName, sectionYClassName);

/**
 * Gap between stacked blocks that should match the visual space between
 * two adjacent SectionShells (top padding + bottom padding).
 */
export const sectionStackGapClassName =
  "gap-[length:var(--section-gap)] lg:gap-[length:var(--section-gap-lg)]";

/** Section wrapper from brand-identity-pages — responsive padding + page width. */
export function SectionShell({ children, className, id, style }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(sectionPaddingClassName, className)}
      style={style}
    >
      <div className="mx-auto w-full max-w-(--section-main)">{children}</div>
    </section>
  );
}
