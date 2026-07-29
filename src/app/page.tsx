"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { Habit } from "@/types/habit";
import { loadHabits, saveHabits, calculateStreak } from "@/lib/storage";
import { getToday } from "@/lib/utils";
import { Header } from "@/components/Header";
import { HabitCard } from "@/components/HabitCard";
import { AddHabitModal } from "@/components/AddHabitModal";
import { Heatmap } from "@/components/Heatmap";
import { Stats } from "@/components/Stats";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHabits(loadHabits());
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("streakly-theme");
    const isDark = saved ? saved === "dark" : prefersDark;
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    if (mounted) saveHabits(habits);
  }, [habits, mounted]);

  const toggleDark = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("streakly-theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  const addHabit = (title: string, emoji: string, color: string) => {
    setHabits((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        emoji,
        color,
        createdAt: new Date().toISOString(),
        completedDates: [],
      },
    ]);
  };

  const toggleHabit = (id: string) => {
    const today = getToday();
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const has = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: has
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const totalStreak = habits.reduce(
    (max, h) => Math.max(max, calculateStreak(h.completedDates)),
    0
  );

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 transition-colors dark:bg-zinc-950">
      <div className="mx-auto max-w-lg px-4 py-8 sm:px-6">
        <Header darkMode={darkMode} onToggleDark={toggleDark} totalStreak={totalStreak} />
        {habits.length > 0 && (
          <>
            <Stats habits={habits} />
            <div className="mt-4"><Heatmap habits={habits} /></div>
          </>
        )}
        <div className="mt-6 space-y-3">
          {habits.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-800/30">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl dark:bg-indigo-950/50">🔥</div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Start your first habit</h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Small daily actions compound into big results.</p>
              <button onClick={() => setModalOpen(true)} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-90">
                <Plus className="h-4 w-4" /> Add Habit
              </button>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} onDelete={deleteHabit} />
            ))
          )}
        </div>
        {habits.length > 0 && (
          <button onClick={() => setModalOpen(true)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-zinc-300 py-3.5 text-sm font-medium text-zinc-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-zinc-700 dark:hover:border-indigo-500 dark:hover:text-indigo-400">
            <Plus className="h-4 w-4" /> Add another habit
          </button>
        )}
        <footer className="mt-12 text-center text-xs text-zinc-400">Built with Next.js · Data stays in your browser</footer>
      </div>
      <AddHabitModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={addHabit} />
    </div>
  );
}
