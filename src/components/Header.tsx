"use client";

import { Flame, Moon, Sun } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  totalStreak: number;
}

export function Header({ darkMode, onToggleDark, totalStreak }: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
          <Flame className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Streakly
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Build better habits
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {totalStreak > 0 && (
          <div className="flex items-center gap-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 px-3 py-1.5 text-sm font-medium text-orange-700 dark:text-orange-300">
            <Flame className="h-3.5 w-3.5" />
            {totalStreak} day{totalStreak !== 1 ? "s" : ""}
          </div>
        )}
        <button
          onClick={onToggleDark}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
