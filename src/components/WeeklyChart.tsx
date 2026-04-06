"use client";

import { getShortDay } from "@/lib/dates";

interface WeeklyChartProps {
  data: { date: string; score: number }[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const maxScore = 100;

  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d) => {
        const height = Math.max((d.score / maxScore) * 100, 2);
        const color =
          d.score >= 80
            ? "bg-success"
            : d.score >= 50
              ? "bg-accent"
              : d.score > 0
                ? "bg-danger"
                : "bg-border";

        return (
          <div
            key={d.date}
            className="flex-1 flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] text-text-muted tabular-nums">
              {d.score > 0 ? d.score : ""}
            </span>
            <div className="w-full bg-surface rounded-sm overflow-hidden h-24 flex items-end">
              <div
                className={`w-full ${color} rounded-sm transition-all duration-500`}
                style={{ height: `${height}%` }}
              />
            </div>
            <span className="text-[10px] text-text-secondary font-medium">
              {getShortDay(d.date)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
