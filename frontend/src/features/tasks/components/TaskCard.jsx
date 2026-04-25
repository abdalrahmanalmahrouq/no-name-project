import { Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getPriorityMeta,
  formatDueDate,
  formatEstimate,
  isOverdue,
} from "../constants";
import EditButton from "@/components/EditButton";
import DeleteButton from "@/components/DeleteButton";
import CheckButton from "@/components/CheckButton";
import { useToggle } from "@/hooks/useToggle";

export default function TaskCard({ task, emphasis, onToggleComplete, onEdit, onDelete }) {
  const completed = task.status === "completed";
  const archived = task.status === "archived";
  const overdue = !completed && !archived && isOverdue(task.due_date);
  const priority = getPriorityMeta(task.priority);
  const due = formatDueDate(task.due_date);
  const estimate = formatEstimate(task.estimated_minutes);
  const PriorityIcon = priority.icon;

  const { busy, handleToggle } = useToggle(onToggleComplete);
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
      <CheckButton
        onClick={() => handleToggle(task)}
        busy={busy}
        completed={completed}
        archived={archived}
        disabled={overdue}
        title={
          overdue
            ? "This task is overdue. Update its due date to today or later to change the status."
            : undefined
        }
      />

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
        <EditButton onClick={() => onEdit(task)} ariaLabel="Edit task" />
        <DeleteButton onClick={() => onDelete(task)} ariaLabel="Delete task" />
      </div>
    </div>
  );
}
