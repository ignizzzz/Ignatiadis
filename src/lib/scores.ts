import { DailyEntry, ModuleScores } from "./types";

export function executionScore(entry: DailyEntry): number {
  const ops = entry.operations;
  if (ops.length === 0) return 0;
  return Math.round((ops.filter((o) => o.completed).length / ops.length) * 100);
}

export function physicalScore(entry: DailyEntry): number {
  const p = entry.physical;
  let score = 0;

  if (p.training) {
    score += 30;
    if (p.training.intensity >= 4) score += 5;
  }

  if (p.nutrition >= 4) score += 25;
  else if (p.nutrition === 3) score += 15;
  else if (p.nutrition >= 1) score += 5;

  if (p.sleepHours >= 7 && p.sleepQuality >= 3) score += 25;
  else if (p.sleepHours >= 6) score += 12;

  const avgEnergy =
    (p.energy.morning + p.energy.afternoon + p.energy.evening) / 3;
  if (avgEnergy >= 3) score += 20;
  else if (avgEnergy >= 2) score += 10;

  return Math.min(100, score);
}

export function mentalScore(entry: DailyEntry): number {
  const m = entry.mental;
  let score = 0;

  const totalFocus = m.focusSessions.reduce(
    (sum, s) => sum + s.durationMin,
    0
  );
  if (totalFocus >= 120) score += 35;
  else if (totalFocus >= 60) score += 25;
  else if (totalFocus > 0) score += 15;

  if (m.dopamineDiscipline) score += 35;

  if (m.journalLearned.trim() && m.journalAvoiding.trim()) score += 30;
  else if (m.journalLearned.trim() || m.journalAvoiding.trim()) score += 15;

  return Math.min(100, score);
}

export function presenceScore(entry: DailyEntry): number {
  const pr = entry.presence;
  let score = 0;

  if (pr.groomingDone) score += 35;
  if (pr.socialInteraction) score += 35;

  if (pr.confidenceRating >= 4) score += 30;
  else if (pr.confidenceRating >= 3) score += 20;
  else if (pr.confidenceRating >= 2) score += 10;

  return Math.min(100, score);
}

export function overallScore(entry: DailyEntry): number {
  const exec = executionScore(entry);
  const phys = physicalScore(entry);
  const ment = mentalScore(entry);
  const pres = presenceScore(entry);

  return Math.round(exec * 0.3 + phys * 0.25 + ment * 0.25 + pres * 0.2);
}

export function allScores(entry: DailyEntry): ModuleScores {
  return {
    execution: executionScore(entry),
    physical: physicalScore(entry),
    mental: mentalScore(entry),
    presence: presenceScore(entry),
    overall: overallScore(entry),
  };
}
