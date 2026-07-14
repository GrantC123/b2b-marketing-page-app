import type { ReactNode } from "react";

import { EyebrowLg, Heading2 } from "@/components/ui/typography";

interface StatProps {
  lead?: string;
  value: ReactNode;
  label: string;
}

export default function Stat({ value, label, lead }: StatProps) {
  return (
    <div className="flex items-stretch gap-4 rounded-3xl bg-white p-2.5 border border-gray-200">
      {/* Inner value chip */}
      <div className="flex flex-col w-30 min-h-21 shrink-0 items-center justify-center rounded-[0.875rem] bg-blue-50 p-3">
        {lead && (
          <EyebrowLg className="text-primary leading-none">{lead}</EyebrowLg>
        )}
        <Heading2 as="span" className="text-primary">
          {value}
        </Heading2>
      </div>

      {/* Label */}
      <div className="flex items-center">
          <p className="min-w-0 flex-1 text-base font-bold leading-snug tracking-tighter text-blue-900 text-balance">{label}</p>
      </div>
    </div>
  );
}
