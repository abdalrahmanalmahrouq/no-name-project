import { DAYS } from "../constants";
import { cn } from "@/lib/utils";

export default function DayPicker({ value = [], onChange }) {
  const toggle = (day) => {
    if (value.includes(day)) onChange(value.filter((d) => d !== day));
    else onChange([...value, day]);
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {DAYS.map(({ value: v, label }) => {
        const active = value.includes(v);
        return (
          <button
            key={v}
            type="button"
            onClick={() => toggle(v)}
            aria-pressed={active}
            className={cn(
              "h-9 min-w-[44px] rounded-full px-3 text-[12px] font-semibold tracking-[-0.12px] transition-colors",
              "border",
              active
                ? "bg-[#0071e3] text-white border-transparent"
                : "bg-transparent text-[#1d1d1f] dark:text-white border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
