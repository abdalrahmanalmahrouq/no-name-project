import { TIME_OF_DAY } from "../constants";
import { cn } from "@/lib/utils";

export default function TimeOfDayPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {TIME_OF_DAY.map(({ value: v, label, icon: Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              "group flex flex-col items-center gap-1.5 rounded-[8px] px-2 py-3 transition-colors",
              "border border-black/5 dark:border-white/10",
              active
                ? "bg-[#0071e3] text-white border-transparent"
                : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#ededf2] dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            )}
            aria-pressed={active}
          >
            <Icon className="size-4" />
            <span className="text-[12px] font-medium tracking-[-0.12px]">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
