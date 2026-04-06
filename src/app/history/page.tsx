"use client";

import { useState, useEffect } from "react";
import ModuleCard from "@/components/ModuleCard";
import ScoreRing from "@/components/ScoreRing";
import { getDailyEntry } from "@/lib/storage";
import { allScores, overallScore } from "@/lib/scores";
import { DailyEntry, ModuleScores } from "@/lib/types";

function getLast30Days(): string[] {
  const dates: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split("T")[0]);
  }
  return dates;
}

export default function HistoryPage() {
  const [data, setData] = useState<
    { date: string; entry: DailyEntry | null; scores: ModuleScores | null }[]
  >([]);

  useEffect(() => {
    const dates = getLast30Days();
    const loaded = dates.map((date) => {
      const entry = getDailyEntry(date);
      return {
        date,
        entry,
        scores: entry ? allScores(entry) : null,
      };
    });
    setData(loaded);
  }, []);

  const activeDays = data.filter((d) => d.entry !== null);
  const avgOverall =
    activeDays.length > 0
      ? Math.round(
          activeDays.reduce(
            (s, d) => s + (d.scores ? d.scores.overall : 0),
            0
          ) / activeDays.length
        )
      : 0;

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
            History
          </h1>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
            Last 30 days. The data doesn&apos;t lie.
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm text-text-secondary">
            {activeDays.length}/30 days logged
          </span>
        </div>
      </div>

      {/* 30 day average */}
      <div className="flex items-center justify-center mb-8">
        <ScoreRing score={avgOverall} size={120} strokeWidth={5} label="30-Day Average" />
      </div>

      {/* Trend bars */}
      <ModuleCard title="Daily Performance" subtitle="Each bar is a day.">
        <div className="flex items-end gap-[3px] h-40">
          {data.map((d) => {
            const score = d.entry ? overallScore(d.entry) : 0;
            const height = Math.max((score / 100) * 100, score > 0 ? 3 : 1);
            const color =
              score >= 80
                ? "bg-success"
                : score >= 50
                  ? "bg-accent"
                  : score > 0
                    ? "bg-danger"
                    : "bg-border";

            const dayNum = new Date(d.date + "T12:00:00").getDate();

            return (
              <div
                key={d.date}
                className="flex-1 flex flex-col items-center gap-1 group relative"
              >
                <div className="w-full bg-surface rounded-sm overflow-hidden h-32 flex items-end">
                  <div
                    className={`w-full ${color} rounded-sm transition-all duration-300`}
                    style={{ height: `${height}%` }}
                  />
                </div>
                {dayNum === 1 ||
                dayNum === 10 ||
                dayNum === 20 ||
                dayNum === new Date(d.date + "T12:00:00").getDate() ? (
                  <span className="text-[8px] text-text-muted">
                    {dayNum % 5 === 0 || dayNum === 1 ? dayNum : ""}
                  </span>
                ) : (
                  <span className="text-[8px] text-transparent">.</span>
                )}

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                  <div className="bg-surface border border-border rounded px-2 py-1 text-[10px] text-text-secondary whitespace-nowrap">
                    {d.date}: {score}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ModuleCard>

      {/* Module breakdown */}
      <ModuleCard
        title="Module Averages"
        subtitle="Where are you strong? Where are you slipping?"
        className="mt-4"
      >
        {activeDays.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-4">
            No data yet.
          </p>
        ) : (
          <div className="space-y-3">
            {(
              [
                ["Execution", "execution"],
                ["Physical", "physical"],
                ["Mental", "mental"],
                ["Presence", "presence"],
              ] as const
            ).map(([label, key]) => {
              const avg = Math.round(
                activeDays.reduce(
                  (s, d) => s + (d.scores ? d.scores[key] : 0),
                  0
                ) / activeDays.length
              );
              const color =
                avg >= 80
                  ? "bg-success"
                  : avg >= 50
                    ? "bg-accent"
                    : "bg-danger";

              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">{label}</span>
                    <span className="text-text-primary font-medium tabular-nums">
                      {avg}%
                    </span>
                  </div>
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-500`}
                      style={{ width: `${avg}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </ModuleCard>

      {/* Daily log */}
      <ModuleCard title="Log" subtitle="Recent entries." className="mt-4">
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {data
            .slice()
            .reverse()
            .map((d) => {
              if (!d.entry) return null;
              const score = overallScore(d.entry);
              const color =
                score >= 80
                  ? "text-success"
                  : score >= 50
                    ? "text-accent"
                    : "text-danger";

              return (
                <div
                  key={d.date}
                  className="flex items-center justify-between px-3 py-2 rounded hover:bg-surface-hover transition-colors"
                >
                  <span className="text-sm text-text-secondary">{d.date}</span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-text-muted">
                      {d.entry.operations.filter((o) => o.completed).length}/
                      {d.entry.operations.length} ops
                    </span>
                    <span className={`font-medium tabular-nums ${color}`}>
                      {score}%
                    </span>
                  </div>
                </div>
              );
            })
            .filter(Boolean)}
          {activeDays.length === 0 && (
            <p className="text-sm text-text-muted text-center py-4">
              No entries yet. Start logging.
            </p>
          )}
        </div>
      </ModuleCard>
    </div>
  );
}
