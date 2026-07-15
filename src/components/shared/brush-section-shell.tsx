import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { MARKETING_BRUSH_IMG } from "./brush-assets";
import { sectionYClassName } from "./section-shell";

type BrushSectionShellProps = {
  children: ReactNode;
  className?: string;
};

/** Light gray band with brush top/bottom edges — brand-identity Why Bankrate pattern. */
export function BrushSectionShell({
  children,
  className,
}: BrushSectionShellProps) {
  return (
    <div
      className={cn(
        // Pull up so the top brush edge sits over the previous section instead of
        // getting clipped by its solid background (same idea as hero section-end).
        "relative z-10 -mt-10",
        sectionYClassName,
        "before:pointer-events-none before:absolute before:top-0 before:z-[1] before:h-16 before:w-screen before:bg-gray-50 before:bg-(image:--bg-image-top) before:bg-center before:bg-size-[auto_100%] xl:before:bg-size-[100%_auto]",
        "after:pointer-events-none after:absolute after:bottom-0 after:z-[1] after:h-16 after:w-screen after:bg-gray-50 after:bg-(image:--bg-image-bottom) after:bg-center after:bg-size-[auto_100%] xl:after:bg-size-[100%_auto]",
        className
      )}
      style={
        {
          "--bg-image-top": `url(${MARKETING_BRUSH_IMG.sectionTop})`,
          "--bg-image-bottom": `url(${MARKETING_BRUSH_IMG.sectionBottom})`,
        } as CSSProperties
      }
    >
      <div className="relative bg-gray-100">{children}</div>
    </div>
  );
}
