"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { HABIT_COLORS, HABIT_EMOJIS } from "@/types/habit";
import { cn } from "@/lib/utils";

interface AddHabitModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (title: string, emoji: string, color: string) => void;
}

export function AddHabitModal({ open, onClose, onAdd }: AddHabitModalProps) {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState(HABIT_EMOJIS[0]);
  const [color, setColor] = useState(HABIT_COLORS[0].value);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), emoji, color);
    setTitle("");
    setEmoji(HABIT_EMOJIS[0]);
    setColor(HABIT_COLORS[0].value);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl dark:bg-zinc-900 sm:rounded-3xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">New Habit</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Morning run" className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" autoFocus />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Icon</label>
            <div className="flex flex-wrap gap-2">
              {HABIT_EMOJIS.map((e) => (
                <button key={e} type="button" onClick={() => setEmoji(e)} className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-xl transition", emoji === e ? "bg-indigo-100 ring-2 ring-indigo-500 dark:bg-indigo-950" : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700")}>{e}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Color</label>
            <div className="flex flex-wrap gap-2">
              {HABIT_COLORS.map((c) => (
                <button key={c.value} type="button" onClick={() => setColor(c.value)} className={cn("h-8 w-8 rounded-full transition ring-offset-2 dark:ring-offset-zinc-900", color === c.value && "ring-2 ring-zinc-900 dark:ring-white")} style={{ backgroundColor: c.value }} title={c.name} />
              ))}
            </div>
          </div>
          <button type="submit" disabled={!title.trim()} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:opacity-90 disabled:opacity-40">Add Habit</button>
        </form>
      </div>
    </div>
  );
}
