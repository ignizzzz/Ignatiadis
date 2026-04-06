"use client";

import { useState, useEffect, useCallback } from "react";
import ModuleCard from "@/components/ModuleCard";
import RatingInput from "@/components/RatingInput";
import ScoreRing from "@/components/ScoreRing";
import { getOrCreateEntry, setDailyEntry } from "@/lib/storage";
import { getToday } from "@/lib/dates";
import { presenceScore } from "@/lib/scores";
import { DailyEntry } from "@/lib/types";

export default function PresencePage() {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const today = getToday();

  const loadEntry = useCallback(() => {
    setEntry(getOrCreateEntry(today));
  }, [today]);

  useEffect(() => {
    loadEntry();
  }, [loadEntry]);

  if (!entry) return null;

  function update(presence: DailyEntry["presence"]) {
    const updated = { ...entry!, presence };
    setDailyEntry(updated);
    setEntry(updated);
  }

  const pr = entry.presence;

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
            Presence
          </h1>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
            How you show up matters. Craft it intentionally.
          </p>
        </div>
        <ScoreRing score={presenceScore(entry)} size={72} label="Score" />
      </div>

      {/* Grooming */}
      <ModuleCard
        title="Style & Grooming"
        subtitle="Did you present yourself well today?"
      >
        <button
          onClick={() => update({ ...pr, groomingDone: !pr.groomingDone })}
          className={`w-full py-4 rounded-md border text-sm font-medium transition-all ${
            pr.groomingDone
              ? "border-success/30 bg-success-dim text-success"
              : "border-border bg-surface-hover text-text-muted"
          }`}
        >
          {pr.groomingDone ? "Grooming handled" : "Not yet"}
        </button>
      </ModuleCard>

      {/* Social */}
      <ModuleCard
        title="Social Connection"
        subtitle="Did you connect with someone today? Real conversation, not texting."
        className="mt-4"
      >
        <button
          onClick={() =>
            update({ ...pr, socialInteraction: !pr.socialInteraction })
          }
          className={`w-full py-4 rounded-md border text-sm font-medium transition-all ${
            pr.socialInteraction
              ? "border-success/30 bg-success-dim text-success"
              : "border-border bg-surface-hover text-text-muted"
          }`}
        >
          {pr.socialInteraction ? "Connected" : "No real interaction"}
        </button>
      </ModuleCard>

      {/* Confidence */}
      <ModuleCard
        title="Confidence"
        subtitle="How did you carry yourself today?"
        className="mt-4"
      >
        <RatingInput
          label="Self-rating"
          value={pr.confidenceRating}
          onChange={(v) => update({ ...pr, confidenceRating: v })}
        />
        <div className="mt-3 flex justify-between text-[10px] text-text-muted uppercase tracking-wider">
          <span>Shrinking</span>
          <span>Commanding</span>
        </div>
      </ModuleCard>
    </div>
  );
}
