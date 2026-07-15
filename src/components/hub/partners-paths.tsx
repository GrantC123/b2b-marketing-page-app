import { FlourishArrows3 } from "@bankrate/icons-react";

import type { PartnerPathsSectionCopy } from "@/content/types";
import type { ResolvedPartnerPath } from "@/content/paths";
import { Heading2 } from "@/components/ui/typography";

import { PathCard } from "../shared/path-card";
import { marketingSectionLeadCenter } from "../shared/copy";
import { CopyColumn, SectionShell } from "../shared/section-shell";

type PartnersPathsProps = {
  copy: PartnerPathsSectionCopy;
  paths: ResolvedPartnerPath[];
};

export function PartnersPaths({ copy, paths }: PartnersPathsProps) {
  return (
    <SectionShell
      id="partner-paths"
      className="scroll-mt-[calc(82px+1rem)] bg-background"
    >
      <div className="flex flex-col gap-10">
        <CopyColumn className="flex flex-col gap-4 text-center">
          <Heading2 className="relative text-pretty text-headings">
            <FlourishArrows3
              fill="var(--color-electric-500)"
              className="absolute bottom-12 right-full hidden h-[4.5rem] w-[12.5rem] rotate-45 md:block"
              aria-hidden="true"
            />
            {copy.heading}
          </Heading2>
          <p className={marketingSectionLeadCenter}>{copy.body}</p>
        </CopyColumn>

        <div className="flex flex-col items-stretch gap-8 md:flex-row md:items-stretch md:justify-center">
          {paths.map((path, index) => (
            <PathCard
              key={path.id}
              cornerEmphasis={
                index === 0
                  ? "mobile-first"
                  : index === paths.length - 1
                    ? "desktop-last"
                    : undefined
              }
              icon={path.icon}
              iconVariant={path.iconVariant}
              iconColor={path.iconColor}
              title={path.title}
              description={path.description}
              cta={path.cta}
              href={path.href}
              className="w-full md:max-w-[25rem] md:flex-1"
            />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
