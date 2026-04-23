import { PRIORITIES } from "../constants";
import { cn } from "@/lib/utils";

export default function PriorityPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {PRIORITIES.map(({ value: v, label, icon: Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={active}
            className={cn(
              "flex items-center justify-center gap-2 rounded-[8px] px-3 py-2.5 transition-colors",
              "border border-black/5 dark:border-white/10",
              active
                ? "bg-[#0071e3] text-white border-transparent"
                : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#ededf2] dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            )}
          >
            <Icon className="size-4" />
            <span className="text-[13px] font-medium tracking-[-0.224px]">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
