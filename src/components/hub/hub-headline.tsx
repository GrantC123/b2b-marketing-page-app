import type { HeadlineCopy } from "@/content/types";
import { LineEmphasis } from "@/components/common/flourish/line-emphasis";
import { Heading1 } from "@/components/ui/typography";

type HubHeadlineProps = {
  copy: HeadlineCopy;
  className?: string;
};

/** Renders hub hero headline with underline emphasis on the configured phrase. */
export function HubHeadline({ copy, className }: HubHeadlineProps) {
  return (
    <Heading1 className={className}>
      {copy.before ? <span className="relative z-[1]">{copy.before}</span> : null}
      <LineEmphasis emphasis={copy.emphasis} />
      {copy.after ? <span className="relative z-[1]">{copy.after}</span> : null}
    </Heading1>
  );
}
