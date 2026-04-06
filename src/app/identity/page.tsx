"use client";

import { useState, useEffect } from "react";
import ModuleCard from "@/components/ModuleCard";
import { getIdentity, setIdentity } from "@/lib/storage";
import { Identity } from "@/lib/types";

const EMPTY_IDENTITY: Identity = {
  futureSelf: "",
  nonNegotiables: [],
  standards: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function IdentityPage() {
  const [identity, setId] = useState<Identity>(EMPTY_IDENTITY);
  const [newNonNeg, setNewNonNeg] = useState("");
  const [newStandard, setNewStandard] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getIdentity();
    if (stored) setId(stored);
  }, []);

  function save(updated: Identity) {
    const withTimestamp = { ...updated, updatedAt: new Date().toISOString() };
    setIdentity(withTimestamp);
    setId(withTimestamp);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function addNonNegotiable() {
    if (!newNonNeg.trim() || identity.nonNegotiables.length >= 5) return;
    save({
      ...identity,
      nonNegotiables: [...identity.nonNegotiables, newNonNeg.trim()],
    });
    setNewNonNeg("");
  }

  function removeNonNegotiable(index: number) {
    save({
      ...identity,
      nonNegotiables: identity.nonNegotiables.filter((_, i) => i !== index),
    });
  }

  function addStandard() {
    if (!newStandard.trim()) return;
    save({
      ...identity,
      standards: [...identity.standards, newStandard.trim()],
    });
    setNewStandard("");
  }

  function removeStandard(index: number) {
    save({
      ...identity,
      standards: identity.standards.filter((_, i) => i !== index),
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Identity
        </h1>
        <p className="text-xs text-text-muted mt-1 uppercase tracking-wider">
          Who you are becoming. Not who you were.
        </p>
        {saved && (
          <span className="text-xs text-success mt-2 inline-block">
            Saved
          </span>
        )}
      </div>

      {/* Future Self */}
      <ModuleCard
        title="Future Self"
        subtitle="Write a declaration of the man you are becoming. Present tense. No hedging."
      >
        <textarea
          value={identity.futureSelf}
          onChange={(e) => {
            const updated = { ...identity, futureSelf: e.target.value };
            setId(updated);
          }}
          onBlur={() => save(identity)}
          placeholder="I am a man who..."
          rows={5}
          className="w-full px-3 py-2 rounded-md text-sm leading-relaxed"
        />
      </ModuleCard>

      {/* Non-Negotiables */}
      <ModuleCard
        title="Non-Negotiables"
        subtitle="3-5 rules you never break. These define your floor."
        className="mt-4"
      >
        <div className="space-y-2">
          {identity.nonNegotiables.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-md border border-accent/20 bg-accent-dim"
            >
              <span className="text-sm font-medium text-accent">{item}</span>
              <button
                onClick={() => removeNonNegotiable(i)}
                className="text-text-muted hover:text-danger text-xs transition-colors"
              >
                remove
              </button>
            </div>
          ))}

          {identity.nonNegotiables.length < 5 && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <input
                type="text"
                value={newNonNeg}
                onChange={(e) => setNewNonNeg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addNonNegotiable()}
                placeholder="e.g., Train 6x/week"
                className="flex-1 px-3 py-2 rounded-md text-sm"
              />
              <button
                onClick={addNonNegotiable}
                className="px-4 py-2 bg-accent text-bg text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Add
              </button>
            </div>
          )}

          {identity.nonNegotiables.length >= 5 && (
            <p className="text-xs text-text-muted mt-2">
              Maximum 5 non-negotiables. Keep it tight.
            </p>
          )}
        </div>
      </ModuleCard>

      {/* Standards */}
      <ModuleCard
        title="Personal Standards"
        subtitle="Your code of conduct. How you carry yourself."
        className="mt-4"
      >
        <div className="space-y-2">
          {identity.standards.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-md border border-border bg-surface-hover"
            >
              <span className="text-sm text-text-primary">{item}</span>
              <button
                onClick={() => removeStandard(i)}
                className="text-text-muted hover:text-danger text-xs transition-colors"
              >
                remove
              </button>
            </div>
          ))}

          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <input
              type="text"
              value={newStandard}
              onChange={(e) => setNewStandard(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addStandard()}
              placeholder="e.g., Speak with purpose, never complain"
              className="flex-1 px-3 py-2 rounded-md text-sm"
            />
            <button
              onClick={addStandard}
              className="px-4 py-2 bg-surface-hover text-text-secondary text-sm rounded-md hover:text-text-primary transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </ModuleCard>
    </div>
  );
}
