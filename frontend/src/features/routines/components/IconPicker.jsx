import { ROUTINE_ICONS } from "../constants";
import { cn } from "@/lib/utils";

export default function IconPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {ROUTINE_ICONS.map(({ value: v, icon: Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={active}
            className={cn(
              "flex aspect-square items-center justify-center rounded-[8px] transition-colors",
              "border border-black/5 dark:border-white/10",
              active
                ? "bg-[#0071e3] text-white border-transparent"
                : "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#ededf2] dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            )}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
