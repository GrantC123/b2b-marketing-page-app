import { ENTERPRISE_IMG } from "../shared/enterprise-assets";
import { Button } from "@/components/ui/button";
import { Heading2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import { marketingOnDarkBody } from "../shared/copy";
import { SectionShell } from "../shared/section-shell";

const mosaicPhotos = [
  { src: ENTERPRISE_IMG.missionPhoto1, bg: "bg-purple-400" },
  { src: ENTERPRISE_IMG.missionPhoto2, bg: "bg-green-300" },
  { src: ENTERPRISE_IMG.missionPhoto3, bg: "bg-yellow-200" },
  { src: ENTERPRISE_IMG.missionPhoto4, bg: "bg-green-300" },
] as const;

export function HubEthos() {
  return (
    <SectionShell className="bg-background">
      <div className="overflow-hidden rounded-[48px] bg-gradient-to-b from-blue-900 to-blue-800 px-8 py-14 lg:px-20 lg:py-16">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-[112px]">
          <div className="flex max-w-[492px] flex-col gap-8">
            <div className="flex flex-col gap-6">
              <Heading2 className="text-pretty text-white">
                We connect people to trusted ways to save, borrow, and thrive.
              </Heading2>
              <p className={marketingOnDarkBody}>
                Our mission doesn&apos;t stop with the consumer. We are committed to building
                a transparent, efficient marketplace where financial institutions can thrive
                alongside the customers they serve. Let&apos;s build the future of finance
                together.
              </p>
            </div>
            <Button
              size="lg"
              arrow
              href="#"
              className="w-fit"
            >
              Get in touch with our partnership team
            </Button>
          </div>

          <div className="relative flex flex-1 justify-center lg:justify-end">
            <div className="grid max-w-[548px] grid-cols-2 gap-3">
              {mosaicPhotos.map((photo, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative aspect-[4/5] overflow-hidden rounded-2xl",
                    photo.bg
                  )}
                >
                  <img
                    src={photo.src}
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
