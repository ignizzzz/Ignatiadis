"use client";

import { useState, useEffect, useCallback } from "react";
import DayHeader from "@/components/DayHeader";
import OperationItem from "@/components/OperationItem";
import ScoreRing from "@/components/ScoreRing";
import ModuleCard from "@/components/ModuleCard";
import WeeklyChart from "@/components/WeeklyChart";
import {
  getOrCreateEntry,
  setDailyEntry,
  getDailyEntry,
  getOperationsTemplate,
  setOperationsTemplate,
} from "@/lib/storage";
import { getToday, getWeekDates } from "@/lib/dates";
import { allScores, overallScore } from "@/lib/scores";
import { calculateStreak } from "@/lib/streaks";
import { DailyEntry, Operation } from "@/lib/types";

export default function Dashboard() {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [streak, setStreak] = useState(0);
  const [weekData, setWeekData] = useState<{ date: string; score: number }[]>(
    []
  );
  const [newOp, setNewOp] = useState("");
  const today = getToday();

  const loadData = useCallback(() => {
    const e = getOrCreateEntry(today);
    setEntry(e);
    setStreak(calculateStreak((d) => getDailyEntry(d)));
    const week = getWeekDates(today);
    setWeekData(
      week.map((d) => {
        const de = getDailyEntry(d);
        return { date: d, score: de ? overallScore(de) : 0 };
      })
    );
  }, [today]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!entry) return null;

  const scores = allScores(entry);

  function updateEntry(updated: DailyEntry) {
    setDailyEntry(updated);
    setEntry(updated);
  }

  function toggleOp(id: string) {
    const updated = {
      ...entry!,
      operations: entry!.operations.map((op) =>
        op.id === id ? { ...op, completed: !op.completed } : op
      ),
    };
    updateEntry(updated);
  }

  function addOperation() {
    if (!newOp.trim()) return;
    const op: Operation = {
      id: Date.now().toString(),
      label: newOp.trim(),
      completed: false,
    };
    const updated = {
      ...entry!,
      operations: [...entry!.operations, op],
    };
    updateEntry(updated);
    // Also save to template
    const template = getOperationsTemplate();
    setOperationsTemplate([...template, { ...op, completed: false }]);
    setNewOp("");
  }

  function removeOperation(id: string) {
    const updated = {
      ...entry!,
      operations: entry!.operations.filter((op) => op.id !== id),
    };
    updateEntry(updated);
    const template = getOperationsTemplate().filter((op) => op.id !== id);
    setOperationsTemplate(template);
  }

  return (
    <div>
      <DayHeader date={today} streak={streak} />

      {/* Score overview */}
      <div className="flex items-center justify-center gap-6 mb-8 flex-wrap">
        <ScoreRing score={scores.overall} size={96} label="Overall" />
        <ScoreRing score={scores.execution} size={64} strokeWidth={3} label="Exec" />
        <ScoreRing score={scores.physical} size={64} strokeWidth={3} label="Body" />
        <ScoreRing score={scores.mental} size={64} strokeWidth={3} label="Mind" />
        <ScoreRing score={scores.presence} size={64} strokeWidth={3} label="Presence" />
      </div>

      {/* Daily Operations */}
      <ModuleCard title="Daily Operations" subtitle="Binary. Done or not done.">
        <div className="space-y-2">
          {entry.operations.map((op) => (
            <div key={op.id} className="flex items-center gap-2">
              <div className="flex-1">
                <OperationItem
                  label={op.label}
                  completed={op.completed}
                  onToggle={() => toggleOp(op.id)}
                />
              </div>
              <button
                onClick={() => removeOperation(op.id)}
                className="text-text-muted hover:text-danger text-xs px-2 py-1 transition-colors"
              >
                x
              </button>
            </div>
          ))}

          {entry.operations.length === 0 && (
            <p className="text-sm text-text-muted py-4 text-center">
              No operations set. Define what matters today.
            </p>
          )}

          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <input
              type="text"
              value={newOp}
              onChange={(e) => setNewOp(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addOperation()}
              placeholder="Add operation..."
              className="flex-1 px-3 py-2 rounded-md text-sm"
            />
            <button
              onClick={addOperation}
              className="px-4 py-2 bg-surface-hover text-text-secondary text-sm rounded-md hover:text-text-primary transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </ModuleCard>

      {/* Reflection */}
      <ModuleCard title="End of Day" subtitle="Be honest." className="mt-4">
        <textarea
          value={entry.reflection}
          onChange={(e) => updateEntry({ ...entry, reflection: e.target.value })}
          placeholder="What happened today? What did you execute on? What slipped?"
          rows={3}
          className="w-full px-3 py-2 rounded-md text-sm leading-relaxed"
        />
      </ModuleCard>

      {/* Weekly overview */}
      <ModuleCard title="This Week" className="mt-4">
        <WeeklyChart data={weekData} />
      </ModuleCard>
    </div>
  );
}
