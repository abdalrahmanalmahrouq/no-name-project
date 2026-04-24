import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { isToday } from "@/lib/date";

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
    <PageHeader
      eyebrow={
        <>
          <span className="text-[#0071e3] dark:text-[#2997ff]">{weekday}</span>
          <span className="mx-1.5 text-black/25 dark:text-white/25">·</span>
          <span>{date}</span>
        </>
      }
      title="To-do"
      description="Capture your daily tasks and push the day forward."
      actionLabel="New Task"
      onAction={onCreate}
      badge={
        dueToday > 0 ? (
          <span
            className="inline-flex items-center h-7 px-3 rounded-full bg-[#0071e3]/10 text-[#0071e3] text-[12px] font-semibold tracking-[-0.12px]"
            title="Tasks due today"
          >
            {dueToday} due today
          </span>
        ) : null
      }
    />
  );
}
