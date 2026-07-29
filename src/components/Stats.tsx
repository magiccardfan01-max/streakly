"use client";

import { Habit } from "@/types/habit";
import { calculateLongestStreak } from "@/lib/storage";
import { getToday } from "@/lib/utils";
import { Target, Flame, CalendarCheck, TrendingUp } from "lucide-react";

interface StatsProps {
  habits: Habit[];
}

export function Stats({ habits }: StatsProps) {
  const today = getToday();
  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today)
  ).length;
  const totalHabits = habits.length;
  const completionRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  let bestStreak = 0;
  for (const h of habits) {
    bestStreak = Math.max(bestStreak, calculateLongestStreak(h.completedDates));
  }

  const totalCompletions = habits.reduce(
    (sum, h) => sum + h.completedDates.length,
    0
  );

  const cards = [
    {
      label: "Today",
      value: `${completedToday}/${totalHabits}`,
      icon: Target,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
    },
    {
      label: "Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
    },
    {
      label: "Best Streak",
      value: bestStreak,
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/40",
    },
    {
      label: "Total Checks",
      value: totalCompletions,
      icon: CalendarCheck,
      color: "text-sky-500",
      bg: "bg-sky-50 dark:bg-sky-950/40",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-700 dark:bg-zinc-800/50"
        >
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-lg ${c.bg}`}
            >
              <c.icon className={`h-4 w-4 ${c.color}`} />
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-400">
                {c.label}
              </p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">
                {c.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
