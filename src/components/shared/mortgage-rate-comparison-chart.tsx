"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Info } from "@bankrate/icons-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type TimelineOption = "6 M" | "1 Y" | "5 Y" | "10 Y" | "All";
type LoanPurpose = "purchase" | "refinance";
type LoanType = "30-year-fixed" | "15-year-fixed" | "5-1-arm";

const PARTNER_LINE = "#13223b"; // blue-900
const NATIONAL_LINE = "#0061fe"; // primary

/** Static series so SSR/client markup stays in sync. */
function generateData(
  timeline: TimelineOption,
  purpose: LoanPurpose,
  loanType: LoanType
) {
  const baseRates = {
    "30-year-fixed": { bankrate: 5.44, national: 6.1 },
    "15-year-fixed": { bankrate: 4.95, national: 5.65 },
    "5-1-arm": { bankrate: 5.15, national: 5.85 },
  };

  const purposeAdjustment = purpose === "refinance" ? 0.25 : 0;
  const base = baseRates[loanType];

  const months =
    timeline === "6 M"
      ? 6
      : timeline === "1 Y"
        ? 12
        : timeline === "5 Y"
          ? 60
          : timeline === "10 Y"
            ? 120
            : 180;
  const dataPoints = Math.min(months, 22);

  const result = [];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const variances = [
    0.12, -0.05, 0.08, -0.03, 0.15, -0.08, 0.04, -0.12, 0.1, -0.02, 0.06, -0.09,
    0.11, -0.04, 0.07, -0.06, 0.13, -0.01, 0.05, -0.1, 0.09, -0.07,
  ];

  for (let i = 0; i < dataPoints; i++) {
    const monthsAgo = dataPoints - 1 - i;
    const baseMonth = 2; // March 2026
    const baseYear = 2026;
    const totalMonths = baseMonth - monthsAgo;
    const month = ((totalMonths % 12) + 12) % 12;
    const year = baseYear + Math.floor((baseMonth - monthsAgo) / 12);
    const monthName = monthNames[month];
    const variance = variances[i % variances.length];

    result.push({
      date: `${monthName} ${year}`,
      bankrate: Number(
        (base.bankrate + purposeAdjustment + variance).toFixed(2)
      ),
      national: Number(
        (base.national + purposeAdjustment + variance * 0.5 + 0.1).toFixed(2)
      ),
    });
  }

  return result;
}

function CustomTooltip({
  active,
  payload,
  label,
  partnerLabel,
}: {
  active?: boolean;
  payload?: Array<{ dataKey?: string | number; value?: number }>;
  label?: string | number;
  partnerLabel: string;
}) {
  if (!active || !payload?.length) return null;

  const national = payload.find((p) => p.dataKey === "national")?.value;
  const bankrate = payload.find((p) => p.dataKey === "bankrate")?.value;

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-xl">
      <p className="mb-3 text-sm font-semibold text-muted-foreground">{label}</p>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-1 rounded-full"
            style={{ backgroundColor: NATIONAL_LINE }}
          />
          <div>
            <p className="text-sm text-muted-foreground">National average</p>
            <p className="text-lg font-bold text-blue-900">
              {national?.toFixed(2)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-4 w-1 rounded-full"
            style={{ backgroundColor: PARTNER_LINE }}
          />
          <div>
            <p className="text-sm text-muted-foreground">{partnerLabel}</p>
            <p className="text-lg font-bold text-blue-900">
              {bankrate?.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type MortgageRateComparisonChartProps = {
  /**
   * White-label partner name shown in the chart.
   * Defaults to a placeholder so the mock reads "under your brand."
   */
  partnerName?: string;
  /** Compact styling when nested inside the partner dashboard mock. */
  embedded?: boolean;
  className?: string;
};

/** Partner-branded top offers vs national average — white-label showcase chart. */
export function MortgageRateComparisonChart({
  partnerName = "Your brand",
  embedded = false,
  className,
}: MortgageRateComparisonChartProps) {
  const [timeline, setTimeline] = useState<TimelineOption>("6 M");
  const [loanPurpose, setLoanPurpose] = useState<LoanPurpose>("purchase");
  const [loanType, setLoanType] = useState<LoanType>("30-year-fixed");

  const data = useMemo(
    () => generateData(timeline, loanPurpose, loanType),
    [timeline, loanPurpose, loanType]
  );
  const latest = data[data.length - 1];
  const diff = (latest.national - latest.bankrate).toFixed(2);
  const partnerOffersLabel = `${partnerName}'s top offers`;

  const timelineOptions: TimelineOption[] = ["6 M", "1 Y", "5 Y", "10 Y", "All"];

  return (
    <Card
      className={cn(
        "w-full gap-0 bg-card py-0 ring-0",
        embedded
          ? "rounded-[12px] border-0 shadow-none"
          : "rounded-3xl border border-border shadow-sm",
        className
      )}
    >
      <CardHeader
        className={cn("space-y-4", embedded ? "p-3 sm:p-4" : "p-4 md:p-6")}
      >
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-900">
            Compare
          </p>
          <CardTitle
            className={cn(
              "flex items-center gap-2 font-bold tracking-tight text-blue-900",
              embedded
                ? "text-base sm:text-lg md:text-xl"
                : "text-xl md:text-2xl"
            )}
          >
            {partnerOffersLabel} vs. national average interest rates
            <Info className="size-4 shrink-0 text-blue-900" />
          </CardTitle>
        </div>

        <div
          className={cn(
            "grid gap-4",
            embedded
              ? "lg:grid-cols-[200px_1fr]"
              : "lg:grid-cols-[240px_1fr]"
          )}
        >
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold text-blue-900">
                Historical timeline
              </p>
              <div className="grid grid-cols-5 overflow-hidden rounded-full bg-gray-100">
                {timelineOptions.map((item, index) => (
                  <Button
                    key={item}
                    type="button"
                    variant="ghost"
                    onClick={() => setTimeline(item)}
                    className={`h-9 text-xs font-semibold ${
                      index === 0
                        ? "rounded-l-full rounded-r-none"
                        : index === timelineOptions.length - 1
                          ? "rounded-r-full rounded-l-none"
                          : "rounded-none"
                    } ${
                      timeline === item
                        ? "bg-blue-50 text-blue-900 ring-1 ring-inset ring-blue-900"
                        : "text-blue-900 hover:bg-blue-50"
                    }`}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-blue-900">
                Loan purpose
              </p>
              <div className="grid grid-cols-2 overflow-hidden rounded-full bg-gray-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setLoanPurpose("purchase")}
                  className={`h-9 rounded-l-full rounded-r-none text-xs font-semibold ${
                    loanPurpose === "purchase"
                      ? "bg-blue-50 text-blue-900 ring-1 ring-inset ring-blue-900"
                      : "text-blue-900 hover:bg-blue-50"
                  }`}
                >
                  Purchase
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setLoanPurpose("refinance")}
                  className={`h-9 rounded-r-full rounded-l-none text-xs font-semibold ${
                    loanPurpose === "refinance"
                      ? "bg-blue-50 text-blue-900 ring-1 ring-inset ring-blue-900"
                      : "text-blue-900 hover:bg-blue-50"
                  }`}
                >
                  Refinance
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-blue-900">
                Loan type
              </p>
              <Select
                value={loanType}
                onValueChange={(value) => setLoanType(value as LoanType)}
              >
                <SelectTrigger
                  size="default"
                  className="h-9 w-full rounded-lg border-border bg-card text-sm font-semibold"
                >
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-year-fixed">30-Year Fixed</SelectItem>
                  <SelectItem value="15-year-fixed">15-Year Fixed</SelectItem>
                  <SelectItem value="5-1-arm">5/1 ARM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              type="button"
              className="text-left text-sm font-semibold text-blue-900 hover:underline"
            >
              How our rates are calculated
            </button>

            {!embedded ? (
              <Button variant="secondary" className="h-10 w-full">
                See today&apos;s mortgage rates
                <ArrowRight className="size-4" />
              </Button>
            ) : null}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: PARTNER_LINE }}
                />
                Weekly {partnerOffersLabel.toLowerCase()}:
                <span
                  className={cn(
                    "font-bold text-blue-900",
                    embedded ? "text-xl" : "text-2xl"
                  )}
                >
                  {latest.bankrate.toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: NATIONAL_LINE }}
                />
                Weekly national average:
                <span
                  className={cn(
                    "font-bold text-blue-900",
                    embedded ? "text-xl" : "text-2xl"
                  )}
                >
                  {latest.national.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className={cn("w-full", embedded ? "h-[160px]" : "h-[200px]")}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#475569", fontSize: 11 }}
                    minTickGap={40}
                  />
                  <YAxis
                    domain={[5.0, 6.5]}
                    tickFormatter={(value) => `${value.toFixed(2)}%`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#475569", fontSize: 11 }}
                    width={50}
                  />
                  <Tooltip
                    content={<CustomTooltip partnerLabel={partnerOffersLabel} />}
                    cursor={{ stroke: "#94a3b8", strokeWidth: 1.5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bankrate"
                    stroke={PARTNER_LINE}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="national"
                    stroke={NATIONAL_LINE}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
              <p className="text-sm leading-6 text-blue-900">
                For the latest week, {partnerOffersLabel.toLowerCase()} are{" "}
                <span className="font-bold">{diff}% lower</span> than the
                national average. On a{" "}
                <span className="font-bold">$340,000 30-year loan</span>, this
                translates to{" "}
                <span className="font-bold">$1,680 in annual savings.</span>
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
