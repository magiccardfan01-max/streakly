export interface Habit {
  id: string;
  title: string;
  emoji: string;
  color: string;
  createdAt: string;
  completedDates: string[]; // YYYY-MM-DD
}

export const HABIT_COLORS = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
] as const;

export const HABIT_EMOJIS = [
  "🔥", "✅", "💪", "📚", "🏃", "🧘", "💧", "🥗",
  "😴", "✍️", "🎯", "🧠", "🎸", "🌱", "☕", "🌅",
] as const;
