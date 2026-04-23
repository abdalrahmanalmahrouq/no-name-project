import { useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isToday } from "../constants";

export default function TasksHeader({ tasks = [], onCreate }) {
  const { weekday, date } = useMemo(() => {
    const now = new Date();
    return {
      weekday: now.toLocaleDateString(undefined, { weekday: "long" }),
      date: now.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
      }),
    };
  }, []);

  const dueToday = useMemo(
    () =>
      tasks.filter(
        (t) =>
          t.status !== "archived" &&
          t.status !== "completed" &&
          isToday(t.due_date)
      ).length,
    [tasks]
  );

  return (
    <header className="flex items-end justify-between gap-4 flex-wrap">
      <div className="min-w-0">
        <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-black/55 dark:text-white/55">
          <span className="text-[#0071e3] dark:text-[#2997ff]">{weekday}</span>
          <span className="mx-1.5 text-black/25 dark:text-white/25">·</span>
          <span>{date}</span>
        </p>

        <div className="mt-1.5 flex items-center gap-3 flex-wrap">
          <h1 className="text-[40px] font-semibold leading-[1.10] tracking-[-0.4px] text-[#1d1d1f] dark:text-white">
            To-do
          </h1>

          {dueToday > 0 && (
            <span
              className="inline-flex items-center h-7 px-3 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[12px] font-semibold tracking-[-0.12px]"
              title="Tasks due today"
            >
              {dueToday} due today
            </span>
          )}
        </div>

        <p className="mt-2 text-[17px] tracking-[-0.374px] text-black/60 dark:text-white/60">
          Capture your daily tasks and push the day forward.
        </p>
      </div>

      <Button
        type="button"
        variant="hero"
        onClick={onCreate}
        className="rounded-full px-5 py-2 h-auto"
      >
        <Plus className="size-4 mr-1" />
        New Task
      </Button>
    </header>
  );
}
