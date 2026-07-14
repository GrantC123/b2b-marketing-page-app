"use client";

import { useState } from "react";
import { Info } from "@bankrate/icons-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export type StatTooltipData = {
  heading?: string;
  body: string;
  linkText: string;
  linkHref: string;
};

export function StatTooltip({ heading, body, linkText, linkHref }: StatTooltipData) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        onClick={() => setOpen((o) => !o)}
        className="absolute right-3 top-3 rounded-full p-0.5 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="More information"
      >
        <Info className="size-3.5" aria-hidden="true" />
      </TooltipTrigger>
      <TooltipContent sideOffset={4} className="max-w-72 p-4 text-xs leading-relaxed">
        {heading && <p className="font-semibold mb-2">{heading}</p>}
        <p className="text-foreground/80">{body}</p>
        <a
          href={linkHref}
          className="mt-2 block font-medium underline underline-offset-2 hover:text-primary"
        >
          {linkText}
        </a>
      </TooltipContent>
    </Tooltip>
  );
}
