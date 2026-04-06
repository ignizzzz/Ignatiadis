"use client";

import { useState, useEffect, useCallback } from "react";
import ModuleCard from "@/components/ModuleCard";
import ScoreRing from "@/components/ScoreRing";
import { getOrCreateEntry, setDailyEntry } from "@/lib/storage";
import { getToday } from "@/lib/dates";
import { mentalScore } from "@/lib/scores";
import { DailyEntry, FocusSession } from "@/lib/types";

export default function MentalPage() {
  const [entry, setEntry] = useState<DailyEntry | null>(null);
  const [newTask, setNewTask] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const today = getToday();

  const loadEntry = useCallback(() => {
    setEntry(getOrCreateEntry(today));
  }, [today]);

  useEffect(() => {
    loadEntry();
  }, [loadEntry]);

  if (!entry) return null;

  function update(mental: DailyEntry["mental"]) {
    const updated = { ...entry!, mental };
    setDailyEntry(updated);
    setEntry(updated);
  }

  const m = entry.mental;
  const totalFocus = m.focusSessions.reduce((s, f) => s + f.durationMin, 0);

  function addFocusSession() {
    if (!newTask.trim() || !newDuration) return;
    const session: FocusSession = {
      task: newTask.trim(),
      durationMin: parseInt(newDuration) || 0,
    };
    update({ ...m, focusSessions: [...m.focusSessions, session] });
    setNewTask("");
    setNewDuration("");
  }

  function removeFocusSession(index: number) {
    update({
      ...m,
      focusSessions: m.focusSessions.filter((_, i) => i !== index),
    });
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
            Mental
          </h1>
          <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
            Control your attention. Control your life.
          </p>
        </div>
        <ScoreRing score={mentalScore(entry)} size={72} label="Score" />
      </div>

      {/* Focus Sessions */}
      <ModuleCard
        title="Deep Work"
        subtitle={`${totalFocus} minutes logged today`}
      >
        <div className="space-y-2">
          {m.focusSessions.map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-md border border-border bg-surface-hover"
            >
              <div>
                <span className="text-sm text-text-primary">
                  {session.task}
                </span>
                <span className="text-xs text-text-muted ml-2">
                  {session.durationMin}min
                </span>
              </div>
              <button
                onClick={() => removeFocusSession(i)}
                className="text-text-muted hover:text-danger text-xs transition-colors"
              >
                x
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="What did you work on?"
              className="flex-1 px-3 py-2 rounded-md text-sm"
            />
            <input
              type="number"
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              placeholder="min"
              className="w-20 px-3 py-2 rounded-md text-sm"
            />
            <button
              onClick={addFocusSession}
              className="px-4 py-2 bg-surface-hover text-text-secondary text-sm rounded-md hover:text-text-primary transition-colors"
            >
              Log
            </button>
          </div>
        </div>
      </ModuleCard>

      {/* Dopamine Discipline */}
      <ModuleCard
        title="Dopamine Discipline"
        subtitle="No social media before noon. No mindless scrolling. No cheap stimulation."
        className="mt-4"
      >
        <button
          onClick={() =>
            update({ ...m, dopamineDiscipline: !m.dopamineDiscipline })
          }
          className={`w-full py-4 rounded-md border text-sm font-medium transition-all ${
            m.dopamineDiscipline
              ? "border-success/30 bg-success-dim text-success"
              : "border-danger/30 bg-danger-dim text-danger"
          }`}
        >
          {m.dopamineDiscipline
            ? "Protocol followed"
            : "Protocol not followed"}
        </button>
      </ModuleCard>

      {/* Journal */}
      <ModuleCard
        title="Journal"
        subtitle="Two questions. Answer them honestly."
        className="mt-4"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary uppercase tracking-wider mb-2 block">
              What did I learn today?
            </label>
            <textarea
              value={m.journalLearned}
              onChange={(e) =>
                update({ ...m, journalLearned: e.target.value })
              }
              placeholder="Something concrete. Not fluff."
              rows={2}
              className="w-full px-3 py-2 rounded-md text-sm leading-relaxed"
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary uppercase tracking-wider mb-2 block">
              What am I avoiding?
            </label>
            <textarea
              value={m.journalAvoiding}
              onChange={(e) =>
                update({ ...m, journalAvoiding: e.target.value })
              }
              placeholder="The thing you don't want to write down is probably the answer."
              rows={2}
              className="w-full px-3 py-2 rounded-md text-sm leading-relaxed"
            />
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}
