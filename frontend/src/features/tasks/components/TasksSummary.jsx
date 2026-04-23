import { useMemo } from "react";
import { AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { isOverdue } from "../constants";

function ProgressRing({ percent, size = 112, stroke = 10 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-label={`${percent}% completed`}
      role="img"
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          className="stroke-black/10 dark:stroke-white/10"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-[#0071e3] transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[28px] font-semibold leading-none tracking-[-0.28px] text-[#1d1d1f] dark:text-white tabular-nums">
          {percent}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/50 dark:text-white/50 mt-0.5">
          percent
        </span>
      </div>
    </div>
  );
}

function buildMessage({ total, done, percent, overdue }) {
  if (total === 0) return "Nothing on your plate — add your first task.";
  if (overdue > 0)
    return `${overdue} overdue · let's tackle those first.`;
  if (done === total) return "All clear. Nice work today.";
  if (percent >= 75) return "Almost there — keep the streak going.";
  if (percent >= 50) return "Halfway there.";
  if (percent >= 25) return "Good momentum — keep going.";
  if (done > 0) return "Nice start — one at a time.";
  return "Let's get the day started.";
}

export default function TasksSummary({ tasks }) {
  const data = useMemo(() => {
    const active = tasks.filter((t) => t.status !== "archived");
    const total = active.length;
    const completed = active.filter((t) => t.status === "completed").length;
    const inProgress = active.filter((t) => t.status === "in_progress").length;
    const pending = active.filter((t) => t.status === "pending").length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    const overdue = active.filter(
      (t) => t.status !== "completed" && isOverdue(t.due_date)
    ).length;

    return { total, completed, inProgress, pending, percent, overdue };
  }, [tasks]);

  if (tasks.length === 0) return null;

  const { total, completed, inProgress, pending, percent, overdue } = data;

  const segments = [
    {
      key: "completed",
      label: "Completed",
      count: completed,
      bar: "bg-[#0071e3]",
      dot: "bg-[#0071e3]",
    },
    {
      key: "in_progress",
      label: "In progress",
      count: inProgress,
      bar: "bg-[#0071e3]/55",
      dot: "bg-[#0071e3]/55",
    },
    {
      key: "pending",
      label: "Pending",
      count: pending,
      bar: "bg-black/20 dark:bg-white/25",
      dot: "bg-black/20 dark:bg-white/25",
    },
  ];

  const message = buildMessage({ total, done: completed, percent, overdue });

  return (
    <div className="rounded-[12px] bg-[#f5f5f7] dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 p-6">
      <div className="flex items-center gap-6 flex-wrap">
        <ProgressRing percent={percent} />

        <div className="flex-1 min-w-[220px]">
          <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-black/55 dark:text-white/55">
            Progress
          </p>
          <p className="mt-1 text-[24px] font-semibold leading-[1.14] tracking-[-0.28px] text-[#1d1d1f] dark:text-white">
            <span className="tabular-nums">{completed}</span>
            <span className="text-black/40 dark:text-white/40"> / </span>
            <span className="tabular-nums">{total}</span>
            <span className="ml-2 text-[14px] font-normal tracking-[-0.224px] text-black/55 dark:text-white/55">
              tasks complete
            </span>
          </p>
          <p
            className={cn(
              "mt-2 inline-flex items-center gap-1.5 text-[13px] tracking-[-0.224px]",
              overdue > 0
                ? "text-red-500"
                : "text-black/60 dark:text-white/60"
            )}
          >
            {overdue > 0 ? (
              <AlertCircle className="size-3.5" />
            ) : (
              <Sparkles className="size-3.5 text-[#0071e3]" />
            )}
            {message}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div
          className="flex h-2 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/5"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {segments.map((s) => {
            const width = total === 0 ? 0 : (s.count / total) * 100;
            if (width === 0) return null;
            return (
              <div
                key={s.key}
                className={cn(
                  "h-full transition-[width] duration-700 ease-out",
                  s.bar
                )}
                style={{ width: `${width}%` }}
              />
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          {segments.map((s) => (
            <div key={s.key} className="inline-flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", s.dot)} />
              <span className="text-[12px] tracking-[-0.12px] text-black/55 dark:text-white/55">
                {s.label}
              </span>
              <span className="text-[12px] font-semibold tracking-[-0.12px] text-[#1d1d1f] dark:text-white tabular-nums">
                {s.count}
              </span>
            </div>
          ))}

          {overdue > 0 && (
            <div className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-2.5 py-1 text-red-500">
              <AlertCircle className="size-3.5" />
              <span className="text-[12px] font-semibold tracking-[-0.12px] tabular-nums">
                {overdue} overdue
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
