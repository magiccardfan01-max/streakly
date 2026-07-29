"use client";

import { useMemo } from "react";
import { Habit } from "@/types/habit";
import { cn } from "@/lib/utils";
import { format, subDays, eachDayOfInterval } from "date-fns";

interface HeatmapProps {
  habits: Habit[];
}

export function Heatmap({ habits }: HeatmapProps) {
  const days = useMemo(() => {
    const end = new Date();
    const start = subDays(end, 83);
    return eachDayOfInterval({ start, end });
  }, []);

  const completionMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const day of days) {
      const key = format(day, "yyyy-MM-dd");
      let count = 0;
      for (const habit of habits) {
        if (habit.completedDates.includes(key)) count++;
      }
      map.set(key, count);
    }
    return map;
  }, [habits, days]);

  const maxCount = Math.max(...completionMap.values(), 1);

  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length) weeks.push(currentWeek);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
      <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
        Activity
      </h3>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const count = completionMap.get(key) || 0;
              const intensity = count / maxCount;
              return (
                <div
                  key={key}
                  title={`${format(day, "MMM d")}: ${count} habit${count !== 1 ? "s" : ""}`}
                  className={cn(
                    "h-3 w-3 rounded-sm transition",
                    count === 0
                      ? "bg-zinc-100 dark:bg-zinc-700/60"
                      : "bg-indigo-500"
                  )}
                  style={
                    count > 0
                      ? { opacity: 0.25 + intensity * 0.75 }
                      : undefined
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-zinc-400">
        <span>Less</span>
        <div className="h-2.5 w-2.5 rounded-sm bg-zinc-100 dark:bg-zinc-700/60" />
        <div className="h-2.5 w-2.5 rounded-sm bg-indigo-500 opacity-40" />
        <div className="h-2.5 w-2.5 rounded-sm bg-indigo-500 opacity-70" />
        <div className="h-2.5 w-2.5 rounded-sm bg-indigo-500" />
        <span>More</span>
      </div>
    </div>
  );
}
