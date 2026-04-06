"use client";

import { useState, useEffect, useCallback } from "react";
import ModuleCard from "@/components/ModuleCard";
import RatingInput from "@/components/RatingInput";
import ScoreRing from "@/components/ScoreRing";
import { getOrCreateEntry, setDailyEntry } from "@/lib/storage";
import { getToday } from "@/lib/dates";
import { physicalScore } from "@/lib/scores";
import { DailyEntry, Rating } from "@/lib/types";

export default function PhysicalPage() {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const today = getToday();

  const loadEntry = useCallback(() => {
    setEntry(getOrCreateEntry(today));
  }, [today]);

  useEffect(() => {
    loadEntry();
  }, [loadEntry]);

  if (!entry) return null;

  function update(physical: DailyEntry["physical"]) {
    const updated = { ...entry!, physical };
    setDailyEntry(updated);
    setEntry(updated);
  }

  const p = entry.physical;

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
            Physical
          </h1>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
            Your body is the vehicle. Maintain it.
          </p>
        </div>
        <ScoreRing score={physicalScore(entry)} size={72} label="Score" />
      </div>

      {/* Training */}
      <ModuleCard title="Training" subtitle="Log today's session.">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary w-20">Type</label>
            <input
              type="text"
              value={p.training?.type || ""}
              onChange={(e) =>
                update({
                  ...p,
                  training: {
                    type: e.target.value,
                    durationMin: p.training?.durationMin || 0,
                    intensity: p.training?.intensity || 3,
                  },
                })
              }
              placeholder="Push, Pull, Legs, Cardio..."
              className="flex-1 px-3 py-2 rounded-md text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary w-20">Duration</label>
            <input
              type="number"
              value={p.training?.durationMin || ""}
              onChange={(e) =>
                update({
                  ...p,
                  training: {
                    type: p.training?.type || "",
                    durationMin: parseInt(e.target.value) || 0,
                    intensity: p.training?.intensity || 3,
                  },
                })
              }
              placeholder="minutes"
              className="w-24 px-3 py-2 rounded-md text-sm"
            />
            <span className="text-xs text-text-muted">min</span>
          </div>
          <RatingInput
            label="Intensity"
            value={p.training?.intensity || 3}
            onChange={(v) =>
              update({
                ...p,
                training: {
                  type: p.training?.type || "",
                  durationMin: p.training?.durationMin || 0,
                  intensity: v,
                },
              })
            }
          />
          {!p.training?.type && (
            <p className="text-xs text-danger mt-1">
              No training logged. Rest day or skipping?
            </p>
          )}
        </div>
      </ModuleCard>

      {/* Nutrition */}
      <ModuleCard
        title="Nutrition"
        subtitle="Quality, not calories. How clean did you eat?"
        className="mt-4"
      >
        <RatingInput
          label="Food quality"
          value={p.nutrition}
          onChange={(v) => update({ ...p, nutrition: v })}
        />
      </ModuleCard>

      {/* Sleep */}
      <ModuleCard title="Sleep" subtitle="Last night." className="mt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Hours</span>
            <input
              type="number"
              step="0.5"
              value={p.sleepHours || ""}
              onChange={(e) =>
                update({ ...p, sleepHours: parseFloat(e.target.value) || 0 })
              }
              placeholder="0"
              className="w-20 px-3 py-2 rounded-md text-sm text-right"
            />
          </div>
          <RatingInput
            label="Quality"
            value={p.sleepQuality}
            onChange={(v) => update({ ...p, sleepQuality: v })}
          />
        </div>
      </ModuleCard>

      {/* Energy */}
      <ModuleCard
        title="Energy Levels"
        subtitle="Track your baseline throughout the day."
        className="mt-4"
      >
        <div className="space-y-3">
          <RatingInput
            label="Morning"
            value={p.energy.morning}
            onChange={(v: Rating) =>
              update({ ...p, energy: { ...p.energy, morning: v } })
            }
          />
          <RatingInput
            label="Afternoon"
            value={p.energy.afternoon}
            onChange={(v: Rating) =>
              update({ ...p, energy: { ...p.energy, afternoon: v } })
            }
          />
          <RatingInput
            label="Evening"
            value={p.energy.evening}
            onChange={(v: Rating) =>
              update({ ...p, energy: { ...p.energy, evening: v } })
            }
          />
        </div>
      </ModuleCard>
    </div>
  );
}
