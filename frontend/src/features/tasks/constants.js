import {
  CircleDashed,
  Loader,
  CheckCircle2,
  Archive,
  Flag,
  ArrowDown,
  ArrowRight,
  ArrowUp,
} from "lucide-react";

export const STATUSES = [
  {
    value: "pending",
    label: "Pending",
    icon: CircleDashed,
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: Loader,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
  },
  {
    value: "archived",
    label: "Archived",
    icon: Archive,
  },
];

export const PRIORITIES = [
  {
    value: "low",
    label: "Low",
    icon: ArrowDown,
    accent: "text-black/55 dark:text-white/55",
    badgeBg: "bg-black/5 dark:bg-white/5",
    badgeText: "text-black/60 dark:text-white/60",
  },
  {
    value: "medium",
    label: "Medium",
    icon: ArrowRight,
    accent: "text-[#0071e3]",
    badgeBg: "bg-[#0071e3]/10",
    badgeText: "text-[#0071e3]",
  },
  {
    value: "high",
    label: "High",
    icon: ArrowUp,
    accent: "text-red-500",
    badgeBg: "bg-red-500/10",
    badgeText: "text-red-500",
  },
];

export function getStatusMeta(value) {
  return STATUSES.find((s) => s.value === value) ?? STATUSES[0];
}

export function getPriorityMeta(value) {
  return PRIORITIES.find((p) => p.value === value) ?? PRIORITIES[1];
}

export const PriorityFlag = Flag;

export function formatDueDate(iso) {
  if (!iso) return null;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((date - today) / (1000 * 60 * 60 * 24));

  if (diff === 0) return { label: "Today", tone: "accent" };
  if (diff === 1) return { label: "Tomorrow", tone: "accent" };
  if (diff === -1) return { label: "Yesterday", tone: "danger" };
  if (diff < -1) return { label: `${Math.abs(diff)}d overdue`, tone: "danger" };
  if (diff <= 7)
    return {
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
      tone: "muted",
    };
  return {
    label: date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    tone: "muted",
  };
}

export function formatEstimate(minutes) {
  if (!minutes) return null;
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function todayISO() {
  const now = new Date();
  const tz = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

export function isToday(iso) {
  return !!iso && iso === todayISO();
}

export function isOverdue(iso) {
  return !!iso && iso < todayISO();
}

export const DUE_BUCKETS = [
  { key: "overdue",   label: "Overdue",   tone: "danger" },
  { key: "today",     label: "Today",     tone: "accent" },
  { key: "upcoming",  label: "Upcoming",  tone: "muted" },
  { key: "someday",   label: "No due date", tone: "muted" },
  { key: "completed", label: "Completed", tone: "muted" },
  { key: "archived",  label: "Archived",  tone: "muted" },
];

export function bucketForTask(task) {
  if (task.status === "archived") return "archived";
  if (task.status === "completed") return "completed";
  if (!task.due_date) return "someday";
  if (isOverdue(task.due_date)) return "overdue";
  if (isToday(task.due_date)) return "today";
  return "upcoming";
}
