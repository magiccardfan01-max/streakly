"use client";

import { Check, Trash2 } from "lucide-react";
import { Habit } from "@/types/habit";
import { calculateStreak, calculateLongestStreak } from "@/lib/storage";
import { cn, getToday } from "@/lib/utils";

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const today = getToday();
  const isCompleted = habit.completedDates.includes(today);
  const streak = calculateStreak(habit.completedDates);
  const longest = calculateLongestStreak(habit.completedDates);

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-2xl border p-4 transition-all",
        isCompleted
          ? "border-transparent bg-gradient-to-r from-white to-zinc-50 shadow-sm dark:from-zinc-800 dark:to-zinc-800/80"
          : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600"
      )}
    >
      <button
        onClick={() => onToggle(habit.id)}
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-all active:scale-90",
          isCompleted
            ? "shadow-md"
            : "bg-zinc-100 dark:bg-zinc-700/50 hover:scale-105"
        )}
        style={
          isCompleted
            ? {
                backgroundColor: habit.color,
                boxShadow: `0 4px 14px ${habit.color}40`,
              }
            : undefined
        }
        aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
      >
        {isCompleted ? (
          <Check className="h-6 w-6 text-white" strokeWidth={3} />
        ) : (
          <span>{habit.emoji}</span>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "font-semibold text-zinc-900 dark:text-white",
            isCompleted && "line-through opacity-60"
          )}
        >
          {habit.title}
        </h3>
        <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: habit.color }}
            />
            {streak} day streak
          </span>
          {longest > streak && <span>Best: {longest}</span>}
        </div>
      </div>

      <button
        onClick={() => onDelete(habit.id)}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:hover:bg-red-950/30"
        aria-label="Delete habit"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
