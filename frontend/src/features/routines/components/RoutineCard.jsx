import { cn } from "@/lib/utils";
import { getRoutineIcon, DAYS, isActiveToday } from "../constants";
import EditButton from "@/components/EditButton";
import DeleteButton from "@/components/DeleteButton";
import CheckButton from "@/components/CheckButton";
import { useToggle } from "@/hooks/useToggle";
export default function RoutineCard({ routine, onToggle, onEdit, onDelete }) {
  const Icon = getRoutineIcon(routine.icon);
  const completed = !!routine.completed_today;
  const activeToday = isActiveToday(routine);

  const { busy, handleToggle} = useToggle(onToggle);

  return (
    <div
      className={cn(
        "group relative flex items-center gap-4 rounded-[12px] p-4 transition-colors",
        "bg-[#f5f5f7] dark:bg-white/5",
        "ring-1 ring-black/5 dark:ring-white/10",
        !activeToday && "opacity-60"
      )}
    >
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-[10px]",
          "bg-white text-[#1d1d1f] dark:bg-white/10 dark:text-white",
          "ring-1 ring-black/5 dark:ring-white/10"
        )}
      >
        <Icon className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              "truncate text-[15px] font-semibold leading-tight tracking-[-0.224px]",
              "text-[#1d1d1f] dark:text-white",
              completed && "line-through text-black/40 dark:text-white/40"
            )}
          >
            {routine.title}
          </h3>
        </div>
        <DaysStrip days={routine.active_days ?? []} />
      </div>

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
        <EditButton onClick={() => onEdit(routine)} ariaLabel="Edit routine" />
        <DeleteButton onClick={() => onDelete(routine)} ariaLabel="Delete routine" />
      </div>

      <CheckButton onClick={() => handleToggle(routine)} busy={busy} completed={completed} />
    </div>
  );
}

function DaysStrip({ days }) {
  const everyDay = days.length === 0 || days.length === 7;

  if (everyDay) {
    return (
      <p className="mt-1.5 text-[12px] text-black/55 dark:text-white/55 tracking-[-0.12px]">
        Every day
      </p>
    );
  }

  return (
    <div className="mt-1.5 flex items-center gap-2.5">
      {DAYS.map(({ value, label }) => {
        const active = days.includes(value);
        return (
          <div
            key={value}
            className="flex flex-col items-center gap-1"
            title={label}
          >
            <span
              className={cn(
                "inline-block size-1.5 rounded-full",
                active ? "bg-[#0071e3]" : "bg-black/15 dark:bg-white/20"
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium leading-none tracking-[-0.08px] uppercase",
                active
                  ? "text-[#0071e3]"
                  : "text-black/40 dark:text-white/40"
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
