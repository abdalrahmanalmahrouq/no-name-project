import { useMemo } from "react";
import { isActiveToday } from "../constants";

export default function TodayProgress({ routines }) {
  const { done, total, percent } = useMemo(() => {
    const todays = routines.filter(isActiveToday);
    const total = todays.length;
    const done = todays.filter((r) => r.completed_today).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { done, total, percent };
  }, [routines]);

  if (routines.length === 0) return null;

  return (
    <div className="rounded-[12px] bg-[#f5f5f7] dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.06em] font-semibold text-black/55 dark:text-white/55">
            Today
          </p>
          <p className="mt-1 text-[21px] font-semibold tracking-[-0.231px] text-[#1d1d1f] dark:text-white">
            {done} of {total} completed
          </p>
        </div>
        <div className="text-[28px] font-semibold tracking-[-0.28px] text-[#0071e3] tabular-nums">
          {percent}%
        </div>
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <div
          className="h-full bg-[#0071e3] transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
