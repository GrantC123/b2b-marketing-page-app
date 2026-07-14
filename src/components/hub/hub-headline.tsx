import type { HeadlineCopy } from "@/content/types";
import { CircleEmphasis } from "@/components/common/flourish/circle-emphasis";
import { Heading1 } from "@/components/ui/typography";

type HubHeadlineProps = {
  copy: HeadlineCopy;
  className?: string;
};

/** Renders hub hero headline with circle emphasis on the configured phrase. */
export function HubHeadline({ copy, className }: HubHeadlineProps) {
  return (
    <Heading1 className={className}>
      {copy.before ? <span className="relative z-[1]">{copy.before}</span> : null}
      <CircleEmphasis emphasis={copy.emphasis} />
      {copy.after ? <span className="relative z-[1]">{copy.after}</span> : null}
    </Heading1>
  );
}
