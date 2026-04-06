import { DailyEntry, Identity } from "./types";
import {
  executionScore,
  physicalScore,
  mentalScore,
  overallScore,
} from "./scores";

interface WeekData {
  entries: DailyEntry[];
  identity: Identity | null;
  prevWeekOverall: number | null;
}

export function generateHardTruths(data: WeekData): string[] {
  const { entries, identity, prevWeekOverall } = data;
  const truths: string[] = [];
  const totalDays = entries.length;

  if (totalDays === 0) {
    return ["You logged nothing this week. Zero data means zero accountability. The system only works if you show up."];
  }

  // Training consistency
  const trainedDays = entries.filter((e) => e.physical.training !== null).length;
  if (trainedDays < 4) {
    truths.push(
      `You trained ${trainedDays} out of 7 days. ${trainedDays <= 2 ? "That's not a routine \u2014 that's occasional exercise." : "Consistency builds physique, not bursts of motivation."}`
    );
  }

  // Execution average
  const avgExec =
    entries.reduce((s, e) => s + executionScore(e), 0) / totalDays;
  if (avgExec < 60) {
    truths.push(
      `Average execution: ${Math.round(avgExec)}%. You're completing less than two-thirds of what you set out to do. That's not discipline \u2014 that's wishful thinking.`
    );
  }

  // Dopamine discipline
  const dopamineFails = entries.filter(
    (e) => !e.mental.dopamineDiscipline
  ).length;
  if (dopamineFails > 3) {
    truths.push(
      `You broke dopamine protocol ${dopamineFails} times this week. Every slip reinforces the pattern you're trying to break.`
    );
  }

  // Missing reflections
  const noReflection = entries.filter((e) => !e.reflection.trim()).length;
  if (noReflection > 3) {
    truths.push(
      `You skipped reflection ${noReflection} days. Without self-awareness, you're just going through motions.`
    );
  }

  // Sleep
  const avgSleep =
    entries.reduce((s, e) => s + e.physical.sleepHours, 0) / totalDays;
  if (avgSleep < 6.5 && avgSleep > 0) {
    truths.push(
      `Averaging ${avgSleep.toFixed(1)} hours of sleep. You're undermining recovery, focus, and every other goal you have.`
    );
  }

  // Social isolation
  const socialDays = entries.filter((e) => e.presence.socialInteraction).length;
  if (socialDays < 2) {
    truths.push(
      `You connected with people ${socialDays} time${socialDays !== 1 ? "s" : ""} this week. Isolation isn't discipline \u2014 it's avoidance.`
    );
  }

  // Focus sessions
  const focusDays = entries.filter(
    (e) => e.mental.focusSessions.length > 0
  ).length;
  if (focusDays < 4) {
    truths.push(
      `You logged deep work ${focusDays} days out of 7. The rest was just being busy.`
    );
  }

  // Overall performance
  const avgOverall =
    entries.reduce((s, e) => s + overallScore(e), 0) / totalDays;
  if (avgOverall > 85) {
    truths.push(
      `${Math.round(avgOverall)}% overall. Strong week. Now prove it wasn't a fluke.`
    );
  }

  // Week-over-week comparison
  if (prevWeekOverall !== null) {
    if (avgOverall < prevWeekOverall - 5) {
      truths.push(
        `You went from ${Math.round(prevWeekOverall)}% to ${Math.round(avgOverall)}%. The question is whether this is a dip or a direction.`
      );
    }
  }

  // Cross-reference non-negotiables
  if (identity && identity.nonNegotiables.length > 0) {
    const avgPhys =
      entries.reduce((s, e) => s + physicalScore(e), 0) / totalDays;
    const avgMent =
      entries.reduce((s, e) => s + mentalScore(e), 0) / totalDays;

    if (avgPhys < 50 || avgMent < 50 || avgExec < 50) {
      truths.push(
        `You wrote down non-negotiables: "${identity.nonNegotiables[0]}." Your data says otherwise.`
      );
    }
  }

  return truths.slice(0, 3);
}
