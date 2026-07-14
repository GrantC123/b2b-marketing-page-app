import type React from "react";

import { EyebrowLg, Heading3 } from "@/components/ui/typography";
import { MARKETING_BRUSH_IMG } from "@/components/shared/brush-assets";

import SectionShell from "./shell";

const STATS = [
  {
    value: "1982",
    description: "Founded by a journalist to hold banks accountable",
    tagline: "Independent since day one.",
  },
  {
    value: "100M+",
    description: "People use Bankrate every year",
    tagline: "Where Americans go for a fair rate.",
  },
  {
    value: "$700M+",
    description: "saved by Bankrate members every year",
    tagline: "Real money. Real people.",
  },
  {
    value: "Federal Reserve",
    description: "Official data provider to the Federal Reserve",
    tagline: "The standard for rate data.",
  },
] as const;

export default function WhyBankrate() {
  return (
    <div
      className="relative overflow-hidden py-16 before:absolute before:top-0 before:h-16 before:w-screen before:bg-gray-50 before:bg-(image:--bg-image-top) before:bg-center before:bg-size-[auto_100%] after:absolute after:bottom-0 after:h-16 after:w-screen after:bg-gray-50 after:bg-(image:--bg-image-bottom) after:bg-center after:bg-size-[auto_100%] xl:before:bg-size-[100%_auto] xl:after:bg-size-[100%_auto]"
      style={
        {
          "--bg-image-top": `url(${MARKETING_BRUSH_IMG.sectionTop})`,
          "--bg-image-bottom": `url(${MARKETING_BRUSH_IMG.sectionBottom})`,
        } as React.CSSProperties
      }
    >
      <SectionShell id="why-bankrate" className="bg-gray-100 py-0 lg:py-0">
        <div className="flex flex-col gap-8 text-center">
          <EyebrowLg as="h2">Why Bankrate</EyebrowLg>
          <div className="grid rounded-3xl p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-12">
            {STATS.map(({ value, description, tagline }) => (
              <div
                key={value}
                className="flex flex-col items-center gap-4 px-6 py-4 text-center text-blue-900"
              >
                <Heading3 as="strong" className="text-blue-900">
                  {value}
                </Heading3>
                <div className="flex flex-col gap-2">
                  <p className="max-w-50 text-balance leading-relaxed tracking-tighter">
                    {description}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700">{tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
