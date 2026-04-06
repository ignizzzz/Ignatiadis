export interface Identity {
  futureSelf: string;
  nonNegotiables: string[];
  standards: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Operation {
  id: string;
  label: string;
  completed: boolean;
}

export interface TrainingEntry {
  type: string;
  durationMin: number;
  intensity: 1 | 2 | 3 | 4 | 5;
}

export interface PhysicalEntry {
  training: TrainingEntry | null;
  nutrition: 1 | 2 | 3 | 4 | 5;
  sleepHours: number;
  sleepQuality: 1 | 2 | 3 | 4 | 5;
  energy: {
    morning: 1 | 2 | 3 | 4 | 5;
    afternoon: 1 | 2 | 3 | 4 | 5;
    evening: 1 | 2 | 3 | 4 | 5;
  };
}

export interface FocusSession {
  task: string;
  durationMin: number;
}

export interface MentalEntry {
  focusSessions: FocusSession[];
  dopamineDiscipline: boolean;
  journalLearned: string;
  journalAvoiding: string;
}

export interface PresenceEntry {
  groomingDone: boolean;
  socialInteraction: boolean;
  confidenceRating: 1 | 2 | 3 | 4 | 5;
}

export interface DailyEntry {
  date: string;
  operations: Operation[];
  reflection: string;
  physical: PhysicalEntry;
  mental: MentalEntry;
  presence: PresenceEntry;
}

export interface Skill {
  name: string;
  startedAt: string;
  status: "active" | "paused" | "completed";
}

export interface Project {
  name: string;
  description: string;
  status: "active" | "completed" | "abandoned";
}

export interface FinancialEntry {
  month: string;
  income: number;
  savingsRate: number;
  invested: number;
}

export interface GrowthData {
  skills: Skill[];
  projects: Project[];
  financial: FinancialEntry[];
}

export interface ModuleScores {
  execution: number;
  physical: number;
  mental: number;
  presence: number;
  overall: number;
}

export interface WeeklyReview {
  weekStart: string;
  scores: ModuleScores;
  hardTruth: string;
  focusAreas: string[];
  notes: string;
}

export type Rating = 1 | 2 | 3 | 4 | 5;
