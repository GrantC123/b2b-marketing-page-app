import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  /** hero — contact panel padding */
  variant?: "default" | "hero";
};

const heroPadding = "px-0 py-6 lg:py-10 lg:px-6 xl:px-20";

/** Section wrapper — responsive padding + page width. */
export function SectionShell({
  children,
  className,
  id,
  style,
  variant = "default",
}: SectionShellProps) {
  if (variant === "hero") {
    return (
      <section id={id} className={cn(heroPadding, className)} style={style}>
        <div className="mx-auto w-full max-w-(--section-main)">{children}</div>
      </section>
    );
  }

  return (
    <section
      id={id}
      className={cn(
        "px-4 py-[length:var(--section-y)] md:px-6 lg:py-[length:var(--section-y-lg)]",
        className
      )}
      style={style}
    >
      <div className="mx-auto w-full max-w-(--section-main)">{children}</div>
    </section>
  );
}
