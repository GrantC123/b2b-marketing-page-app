"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

const RATE_DATA = [
  { month: "Sep", national: 6.05, member: 5.52 },
  { month: "Oct", national: 6.12, member: 5.5 },
  { month: "Nov", national: 6.15, member: 5.45 },
  { month: "Dec", national: 6.1, member: 5.48 },
  { month: "Jan", national: 6.18, member: 5.5 },
  { month: "Feb", national: 6.15, member: 5.45 },
] as const;

function formatRate(value: number) {
  return `${value.toFixed(2)}%`;
}

function MemberRateTooltip({
  active,
  payload,
  label,
}: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  const national = payload.find((p) => p.dataKey === "national")?.value;
  const member = payload.find((p) => p.dataKey === "member")?.value;

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-[0_8px_24px_rgba(15,27,47,0.12)]">
      <p className="text-xs font-bold text-gray-800">{label}</p>
      <div className="mt-1.5 flex flex-col gap-1">
        {typeof national === "number" ? (
          <p className="flex items-center gap-1.5 text-[11px]">
            <span className="size-2 shrink-0 rounded-full bg-gray-400" />
            <span className="text-gray-500">National Avg:</span>
            <span className="font-bold text-gray-800">
              {formatRate(national)}
            </span>
          </p>
        ) : null}
        {typeof member === "number" ? (
          <p className="flex items-center gap-1.5 text-[11px]">
            <span className="size-2 shrink-0 rounded-full bg-blue-900" />
            <span className="text-gray-500">Empower Members:</span>
            <span className="font-bold text-gray-800">{formatRate(member)}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Interactive member vs national rate trend — Recharts + custom tooltip. */
export function MemberRateChart() {
  return (
    <div className="h-[120px] w-full sm:h-[140px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={[...RATE_DATA]}
          margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
        >
          <CartesianGrid
            stroke="#e5e7eb"
            strokeDasharray="3 3"
            vertical
            horizontal
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            dy={4}
          />
          <YAxis
            domain={[5, 6.5]}
            ticks={[5, 5.4, 5.8, 6.5]}
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#9ca3af", fontSize: 9 }}
            width={36}
          />
          <Tooltip
            content={MemberRateTooltip}
            cursor={{ stroke: "#9ca3af", strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="national"
            name="National Avg"
            stroke="#9ca3af"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: "#9ca3af" }}
          />
          <Line
            type="monotone"
            dataKey="member"
            name="Empower Members"
            stroke="#13223b"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0, fill: "#13223b" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
