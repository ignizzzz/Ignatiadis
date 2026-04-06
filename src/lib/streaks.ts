import { DailyEntry } from "./types";
import { overallScore } from "./scores";

export function calculateStreak(
  getEntry: (date: string) => DailyEntry | null
): number {
  let streak = 0;
  const date = new Date();
  // Start from yesterday if today has no data yet
  const todayStr = date.toISOString().split("T")[0];
  const todayEntry = getEntry(todayStr);
  if (!todayEntry || overallScore(todayEntry) === 0) {
    date.setDate(date.getDate() - 1);
  }

  for (let i = 0; i < 365; i++) {
    const dateStr = date.toISOString().split("T")[0];
    const entry = getEntry(dateStr);

    if (entry && overallScore(entry) >= 50) {
      streak++;
      date.setDate(date.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
