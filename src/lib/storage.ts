import { Habit } from "@/types/habit";

const STORAGE_KEY = "streakly-habits";

export function loadHabits(): Habit[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Habit[];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function calculateStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  const sorted = [...completedDates].sort().reverse();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let current = new Date(today);

  const todayStr = current.toISOString().split("T")[0];
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) {
    return 0;
  }

  for (const dateStr of sorted) {
    const expected = current.toISOString().split("T")[0];
    if (dateStr === expected) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else if (dateStr < expected) {
      break;
    }
  }
  return streak;
}

export function calculateLongestStreak(completedDates: string[]): number {
  if (completedDates.length === 0) return 0;
  const sorted = [...new Set(completedDates)].sort();
  let longest = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }
  return longest;
}
