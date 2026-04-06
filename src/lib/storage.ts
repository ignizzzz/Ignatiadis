import {
  Identity,
  DailyEntry,
  Operation,
  GrowthData,
  WeeklyReview,
} from "./types";

function get<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

function set<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Identity
export function getIdentity(): Identity | null {
  return get<Identity>("os:identity");
}

export function setIdentity(identity: Identity): void {
  set("os:identity", identity);
}

// Daily entries
export function getDailyEntry(date: string): DailyEntry | null {
  return get<DailyEntry>(`os:daily:${date}`);
}

export function setDailyEntry(entry: DailyEntry): void {
  set(`os:daily:${entry.date}`, entry);
}

// Default operations template
export function getOperationsTemplate(): Operation[] {
  return get<Operation[]>("os:operations:template") || [];
}

export function setOperationsTemplate(ops: Operation[]): void {
  set("os:operations:template", ops);
}

// Growth data
export function getGrowthData(): GrowthData {
  return (
    get<GrowthData>("os:growth") || {
      skills: [],
      projects: [],
      financial: [],
    }
  );
}

export function setGrowthData(data: GrowthData): void {
  set("os:growth", data);
}

// Weekly reviews
export function getWeeklyReview(weekStart: string): WeeklyReview | null {
  return get<WeeklyReview>(`os:review:${weekStart}`);
}

export function setWeeklyReview(review: WeeklyReview): void {
  set(`os:review:${review.weekStart}`, review);
}

// Create blank daily entry
export function createBlankEntry(date: string): DailyEntry {
  const template = getOperationsTemplate();
  return {
    date,
    operations: template.map((op) => ({ ...op, completed: false })),
    reflection: "",
    physical: {
      training: null,
      nutrition: 3 as const,
      sleepHours: 0,
      sleepQuality: 3 as const,
      energy: {
        morning: 3 as const,
        afternoon: 3 as const,
        evening: 3 as const,
      },
    },
    mental: {
      focusSessions: [],
      dopamineDiscipline: false,
      journalLearned: "",
      journalAvoiding: "",
    },
    presence: {
      groomingDone: false,
      socialInteraction: false,
      confidenceRating: 3 as const,
    },
  };
}

// Get or create today's entry
export function getOrCreateEntry(date: string): DailyEntry {
  const existing = getDailyEntry(date);
  if (existing) return existing;
  const blank = createBlankEntry(date);
  setDailyEntry(blank);
  return blank;
}
