import { STATUSES } from "../constants";
import { cn } from "@/lib/utils";

export default function StatusPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {STATUSES.map(({ value: v, label, icon: Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={active}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-[8px] px-2 py-3 transition-colors",
              "border border-black/5 dark:border-white/10",
              active
                ? "bg-[#0071e3] text-white border-transparent"
                : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#ededf2] dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            )}
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
