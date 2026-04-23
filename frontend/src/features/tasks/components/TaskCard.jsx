import { useState } from "react";
import { Check, Pencil, Trash2, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getPriorityMeta,
  formatDueDate,
  formatEstimate,
} from "../constants";

export default function TaskCard({ task, emphasis, onToggleComplete, onEdit, onDelete }) {
  const completed = task.status === "completed";
  const archived = task.status === "archived";
  const priority = getPriorityMeta(task.priority);
  const due = formatDueDate(task.due_date);
  const estimate = formatEstimate(task.estimated_minutes);
  const PriorityIcon = priority.icon;

  const [busy, setBusy] = useState(false);

  const handleToggle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onToggleComplete(task);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-start gap-4 rounded-[12px] p-4 transition-colors",
        "bg-white dark:bg-white/5",
        "ring-1 ring-black/5 dark:ring-white/10",
        emphasis === "accent" &&
          "ring-[#0071e3]/30 shadow-[0_3px_20px_0_rgba(0,113,227,0.12)]",
        emphasis === "danger" &&
          "ring-red-500/30 shadow-[0_3px_20px_0_rgba(239,68,68,0.12)]",
        archived && "opacity-60"
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        disabled={busy || archived}
        aria-pressed={completed}
        aria-label={completed ? "Mark not done" : "Mark done"}
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full transition-all",
          "border-2",
          completed
            ? "bg-[#0071e3] border-transparent text-white"
            : "border-black/25 dark:border-white/30 text-transparent hover:border-[#0071e3]",
          busy && "opacity-60"
        )}
      >
        <Check className="size-3.5" strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className={cn(
              "truncate text-[15px] font-semibold leading-tight tracking-[-0.224px]",
              "text-[#1d1d1f] dark:text-white",
              completed && "line-through text-black/40 dark:text-white/40"
            )}
          >
            {task.title}
          </h3>

          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
              "text-[10px] font-semibold uppercase tracking-[-0.08px]",
              priority.badgeBg,
              priority.badgeText
            )}
          >
            <PriorityIcon className="size-3" />
            {priority.label}
          </span>
        </div>

        {task.description && (
          <p
            className={cn(
              "mt-1.5 text-[13px] leading-[1.43] tracking-[-0.224px]",
              "text-black/65 dark:text-white/65",
              completed && "line-through text-black/35 dark:text-white/35"
            )}
          >
            {task.description}
          </p>
        )}

        {(due || estimate) && (
          <div className="mt-2 flex items-center gap-3 flex-wrap text-[12px] tracking-[-0.12px]">
            {due && (
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  due.tone === "danger" && "text-red-500",
                  due.tone === "accent" && "text-[#0071e3]",
                  due.tone === "muted" &&
                    "text-black/55 dark:text-white/55"
                )}
              >
                <Calendar className="size-3.5" />
                {due.label}
              </span>
            )}
            {estimate && (
              <span className="inline-flex items-center gap-1 text-black/55 dark:text-white/55">
                <Clock className="size-3.5" />
                {estimate}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onEdit(task)}
          aria-label="Edit task"
          className="rounded-full text-black/60 dark:text-white/60"
        >
          <Pencil className="size-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onDelete(task)}
          aria-label="Delete task"
          className="rounded-full text-black/60 dark:text-white/60 hover:text-red-600"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
