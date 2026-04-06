"use client";

import { useState, useEffect, useCallback } from "react";
import ModuleCard from "@/components/ModuleCard";
import ScoreRing from "@/components/ScoreRing";
import WeeklyChart from "@/components/WeeklyChart";
import HardTruth from "@/components/HardTruth";
import {
  getDailyEntry,
  getIdentity,
  getWeeklyReview,
  setWeeklyReview,
} from "@/lib/storage";
import {
  getWeekDates,
  getWeekStart,
  getPreviousWeekStart,
} from "@/lib/dates";
import { allScores, overallScore } from "@/lib/scores";
import { generateHardTruths } from "@/lib/hardTruths";
import { DailyEntry, WeeklyReview, ModuleScores } from "@/lib/types";

export default function ReviewPage() {
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [scores, setScores] = useState<ModuleScores>({
    execution: 0,
    physical: 0,
    mental: 0,
    presence: 0,
    overall: 0,
  });
  const [truths, setTruths] = useState<string[]>([]);
  const [weekChartData, setWeekChartData] = useState<
    { date: string; score: number }[]
  >([]);
  const [review, setReview] = useState<WeeklyReview | null>(null);
  const [focusInput, setFocusInput] = useState("");

  const weekStart = getWeekStart();

  const loadData = useCallback(() => {
    const weekDates = getWeekDates();
    const weekEntries: DailyEntry[] = [];
    const chartData: { date: string; score: number }[] = [];

    for (const date of weekDates) {
      const entry = getDailyEntry(date);
      if (entry) {
        weekEntries.push(entry);
        chartData.push({ date, score: overallScore(entry) });
      } else {
        chartData.push({ date, score: 0 });
      }
    }

    setEntries(weekEntries);
    setWeekChartData(chartData);

    if (weekEntries.length > 0) {
      const avgScores: ModuleScores = {
        execution: 0,
        physical: 0,
        mental: 0,
        presence: 0,
        overall: 0,
      };

      for (const entry of weekEntries) {
        const s = allScores(entry);
        avgScores.execution += s.execution;
        avgScores.physical += s.physical;
        avgScores.mental += s.mental;
        avgScores.presence += s.presence;
        avgScores.overall += s.overall;
      }

      const n = weekEntries.length;
      avgScores.execution = Math.round(avgScores.execution / n);
      avgScores.physical = Math.round(avgScores.physical / n);
      avgScores.mental = Math.round(avgScores.mental / n);
      avgScores.presence = Math.round(avgScores.presence / n);
      avgScores.overall = Math.round(avgScores.overall / n);

      setScores(avgScores);

      // Previous week for comparison
      const prevStart = getPreviousWeekStart(weekStart);
      const prevReview = getWeeklyReview(prevStart);
      const prevOverall = prevReview?.scores.overall ?? null;

      const identity = getIdentity();
      const hardTruths = generateHardTruths({
        entries: weekEntries,
        identity,
        prevWeekOverall: prevOverall,
      });
      setTruths(hardTruths);
    }

    const existing = getWeeklyReview(weekStart);
    setReview(existing);
  }, [weekStart]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function saveReview() {
    const r: WeeklyReview = {
      weekStart,
      scores,
      hardTruth: truths.join(" | "),
      focusAreas: review?.focusAreas || [],
      notes: review?.notes || "",
    };
    setWeeklyReview(r);
    setReview(r);
  }

  function addFocusArea() {
    if (!focusInput.trim()) return;
    const updated = {
      ...review,
      weekStart,
      scores,
      hardTruth: truths.join(" | "),
      focusAreas: [...(review?.focusAreas || []), focusInput.trim()],
      notes: review?.notes || "",
    };
    setWeeklyReview(updated);
    setReview(updated);
    setFocusInput("");
  }

  function removeFocusArea(index: number) {
    if (!review) return;
    const updated = {
      ...review,
      focusAreas: review.focusAreas.filter((_, i) => i !== index),
    };
    setWeeklyReview(updated);
    setReview(updated);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Weekly Review
        </h1>
        <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
          Week of {weekStart}. Face the numbers.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-text-muted text-sm">
            No data logged this week. Nothing to review.
          </p>
          <p className="text-text-muted text-xs mt-1">
            The system only works if you show up.
          </p>
        </div>
      ) : (
        <>
          {/* Scores */}
          <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
            <ScoreRing score={scores.overall} size={96} label="Overall" />
            <ScoreRing
              score={scores.execution}
              size={64}
              strokeWidth={3}
              label="Exec"
            />
            <ScoreRing
              score={scores.physical}
              size={64}
              strokeWidth={3}
              label="Body"
            />
            <ScoreRing
              score={scores.mental}
              size={64}
              strokeWidth={3}
              label="Mind"
            />
            <ScoreRing
              score={scores.presence}
              size={64}
              strokeWidth={3}
              label="Presence"
            />
          </div>

          {/* Chart */}
          <ModuleCard title="Daily Breakdown" className="mb-4">
            <WeeklyChart data={weekChartData} />
          </ModuleCard>

          {/* Hard Truths */}
          <div className="mb-4">
            <HardTruth truths={truths} />
          </div>

          {/* Focus Areas for Next Week */}
          <ModuleCard
            title="Next Week Focus"
            subtitle="Pick 2-3 areas to lock in."
          >
            <div className="space-y-2">
              {(review?.focusAreas || []).map((area, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-3 rounded-md border border-accent/20 bg-accent-dim"
                >
                  <span className="text-sm text-accent">{area}</span>
                  <button
                    onClick={() => removeFocusArea(i)}
                    className="text-text-muted hover:text-danger text-xs"
                  >
                    x
                  </button>
                </div>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                <input
                  type="text"
                  value={focusInput}
                  onChange={(e) => setFocusInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addFocusArea()}
                  placeholder="e.g., Fix sleep schedule"
                  className="flex-1 px-3 py-2 rounded-md text-sm"
                />
                <button
                  onClick={addFocusArea}
                  className="px-4 py-2 bg-accent text-bg text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
                >
                  Add
                </button>
              </div>
            </div>
          </ModuleCard>

          {/* Notes */}
          <ModuleCard
            title="Review Notes"
            subtitle="What needs to change?"
            className="mt-4"
          >
            <textarea
              value={review?.notes || ""}
              onChange={(e) => {
                const updated = {
                  weekStart,
                  scores,
                  hardTruth: truths.join(" | "),
                  focusAreas: review?.focusAreas || [],
                  notes: e.target.value,
                };
                setReview(updated);
              }}
              onBlur={saveReview}
              placeholder="Honest assessment. What's working? What's not?"
              rows={4}
              className="w-full px-3 py-2 rounded-md text-sm leading-relaxed"
            />
          </ModuleCard>

          <button
            onClick={saveReview}
            className="mt-4 w-full py-3 bg-accent text-bg font-medium text-sm rounded-md hover:opacity-90 transition-opacity"
          >
            Save Review
          </button>
        </>
      )}
    </div>
  );
}
