import type { ReactNode } from "react";
import {
  FlourishOffset1,
  FlourishOffset2,
  FlourishOffset3,
  type BankrateIcon,
} from "@bankrate/icons-react";

import { cn } from "@/lib/utils";

export type IconOffsetVariant = 1 | 2 | 3;

export type IconOffsetColor = "blue" | "green" | "indigo" | "yellow";

const ICON_OFFSET_COLORS: Record<IconOffsetColor, string> = {
  blue: "var(--color-blue-200)",
  green: "var(--color-green-200)",
  indigo: "var(--color-electric-200)",
  yellow: "var(--color-yellow-100)",
};

const OFFSET_ICONS: Record<IconOffsetVariant, BankrateIcon> = {
  1: FlourishOffset1,
  2: FlourishOffset2,
  3: FlourishOffset3,
};

export type IconOffsetProps = {
  icon: ReactNode;
  variant?: IconOffsetVariant;
  color?: IconOffsetColor;
  className?: string;
};

export function IconOffset({
  icon,
  variant,
  color = "blue",
  className,
}: IconOffsetProps) {
  const OffsetBackground = variant !== undefined ? OFFSET_ICONS[variant] : null;

  return (
    <div
      className={cn(
        "relative flex size-12 shrink-0 items-center justify-center",
        className
      )}
    >
      {OffsetBackground ? (
        <OffsetBackground
          fill={ICON_OFFSET_COLORS[color]}
          className="absolute inset-0 z-0 size-full"
          aria-hidden="true"
          focusable="false"
        />
      ) : null}
      <div className="relative z-[1]">{icon}</div>
    </div>
  );
}
