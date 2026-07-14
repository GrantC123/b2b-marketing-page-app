import { SUPPLY_IMG } from "./assets";

import { EyebrowSm, Heading2, Heading3 } from "@/components/ui/typography";

import { marketingBody, marketingEyebrowSection } from "../shared/copy";
import { CopyColumn, SectionShell } from "../shared/section-shell";

const capabilities = [
  {
    title: "Marketplace placements",
    description: "Appear where consumers are actively comparing products.",
  },
  {
    title: "Geo & audience targeting",
    description: "Target by state, intent signal, credit profile, and more.",
  },
  {
    title: "Measurement & reporting",
    description: "Clear performance data tied to real consumer actions.",
  },
] as const;

export function SupplyCapabilities() {
  return (
    <SectionShell className="bg-background">
      <div className="flex flex-col gap-16">
        <CopyColumn className="flex flex-col gap-4 text-center">
          <EyebrowSm as="p" className={marketingEyebrowSection}>
            Capabilities
          </EyebrowSm>
          <Heading2 className="text-pretty text-headings">
            Built for financial institutions at every stage
          </Heading2>
        </CopyColumn>
        <div className="grid gap-6 lg:grid-cols-3">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="flex flex-col overflow-hidden rounded-[34px] bg-card p-4"
            >
              <div className="flex flex-col gap-4 p-4">
                <Heading3 className="text-blue-900">{item.title}</Heading3>
                <p className={marketingBody}>{item.description}</p>
              </div>
              <div className="mt-auto overflow-hidden rounded-lg">
                <img
                  src={SUPPLY_IMG.capabilityCard}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
