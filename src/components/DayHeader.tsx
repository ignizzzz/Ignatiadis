"use client";

import { formatDate } from "@/lib/dates";

interface DayHeaderProps {
  date: string;
  streak: number;
}

export default function DayHeader({ date, streak }: DayHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          {formatDate(date)}
        </h1>
        <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
          Execute or regret
        </p>
      </div>
      {streak > 0 && (
        <div className="text-right">
          <span className="text-2xl font-bold text-accent tabular-nums">
            {streak}
          </span>
          <p className="text-[10px] text-text-muted uppercase tracking-wider">
            day streak
          </p>
        </div>
      )}
    </div>
  );
}
