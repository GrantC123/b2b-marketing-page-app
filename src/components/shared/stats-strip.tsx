import { EyebrowSm, Heading1, Heading2, Heading3 } from "@/components/ui/typography";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { marketingEyebrowSection } from "./copy";
import { SectionShell } from "./section-shell";
import { StatPlus, StatTile } from "./stat-tile";
import { StatTooltip } from "./stat-tooltip";
import type {
  StatsStripHighlightStat,
  StatsStripTileStat,
} from "./stat-tooltips";

type StatsStripBaseProps = {
  className?: string;
  stackClassName?: string;
  eyebrow?: string;
  heading?: string;
  headingAlign?: "left" | "center";
  /** Grid columns for tile layout. Defaults from stat count (max 4). */
  columns?: 2 | 3 | 4;
};

type StatsStripTilesProps = StatsStripBaseProps & {
  layout?: "tiles";
  stats: StatsStripTileStat[];
  showTooltips?: boolean;
};

type StatsStripHighlightProps = StatsStripBaseProps & {
  layout: "highlight";
  stats: StatsStripHighlightStat[];
};

export type StatsStripProps = StatsStripTilesProps | StatsStripHighlightProps;

const tileColumnClasses: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function defaultColumns(count: number): 2 | 3 | 4 {
  if (count <= 2) return 2;
  if (count === 3) return 3;
  return 4;
}

function StatTileValue({ value, suffix }: Pick<StatsStripTileStat, "value" | "suffix">) {
  return (
    <>
      {value}
      {suffix ? <StatPlus /> : null}
    </>
  );
}

function StatsStripHeader({
  eyebrow,
  heading,
  headingAlign = "left",
}: Pick<StatsStripBaseProps, "eyebrow" | "heading" | "headingAlign">) {
  if (!eyebrow && !heading) return null;

  const centered = headingAlign === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "mx-auto max-w-(--section-copy) items-center text-center"
      )}
    >
      {eyebrow ? (
        <EyebrowSm as="p" className={marketingEyebrowSection}>
          {eyebrow}
        </EyebrowSm>
      ) : null}
      {heading ? (
        <Heading2 className={cn("text-pretty text-headings", centered && "text-center")}>
          {heading}
        </Heading2>
      ) : null}
    </div>
  );
}

function StatsStripTiles({
  stats,
  showTooltips = false,
  columns,
  eyebrow,
  heading,
  headingAlign,
  className,
  stackClassName,
}: StatsStripTilesProps) {
  const columnCount = columns ?? defaultColumns(stats.length);
  const hasHeader = Boolean(eyebrow || heading);
  const hasTooltips =
    showTooltips && stats.some((stat) => stat.tooltip !== undefined);

  const grid = (
    <div className={cn("grid gap-6", tileColumnClasses[columnCount])}>
      {stats.map((stat) => (
        <div key={stat.label} className="relative">
          <StatTile
            value={<StatTileValue value={stat.value} suffix={stat.suffix} />}
            label={stat.label}
          />
          {showTooltips && stat.tooltip ? <StatTooltip {...stat.tooltip} /> : null}
        </div>
      ))}
    </div>
  );

  return (
    <SectionShell className={cn("bg-background", className)}>
      <div
        className={cn(
          "flex flex-col",
          hasHeader ? stackClassName ?? "gap-10" : stackClassName
        )}
      >
        <StatsStripHeader
          eyebrow={eyebrow}
          heading={heading}
          headingAlign={headingAlign}
        />
        {hasTooltips ? <TooltipProvider>{grid}</TooltipProvider> : grid}
      </div>
    </SectionShell>
  );
}

function StatsStripHighlight({
  stats,
  eyebrow,
  heading,
  headingAlign = "center",
  className,
}: StatsStripHighlightProps) {
  return (
    <SectionShell className={cn("bg-background", className)}>
      <div className="flex flex-col gap-16">
        <StatsStripHeader
          eyebrow={eyebrow}
          heading={heading}
          headingAlign={headingAlign}
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="flex flex-col gap-6 rounded-3xl bg-blue-900 p-8 lg:p-12"
            >
              <Heading1 className="text-blue-200">{stat.value}</Heading1>
              <div className="flex flex-col gap-3">
                <Heading3 className="text-white">{stat.title}</Heading3>
                <p className="text-base leading-relaxed tracking-tighter text-gray-200">
                  {stat.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function StatsStrip(props: StatsStripProps) {
  if (props.layout === "highlight") {
    return <StatsStripHighlight {...props} />;
  }

  return <StatsStripTiles {...props} />;
}
