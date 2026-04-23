import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Check,
  X,
  SlidersHorizontal,
  Flag,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIORITIES, STATUSES } from "../constants";

function FilterDropdown({
  label,
  icon: Icon,
  options,
  selected,
  onToggle,
  onClearThis,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const count = selected.length;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1.5 h-9 rounded-full pl-3 pr-2.5",
          "text-[13px] font-medium tracking-[-0.224px] transition-colors",
          count > 0
            ? "bg-[#0071e3] text-white hover:bg-[#0077ed]"
            : "bg-black/5 text-[#1d1d1f] hover:bg-black/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
        )}
      >
        {Icon && <Icon className="size-3.5" />}
        <span>{label}</span>
        {count > 0 && (
          <span className="ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-white/25 text-[11px] font-semibold tabular-nums">
            {count}
          </span>
        )}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute left-0 top-[calc(100%+6px)] z-30 w-60 overflow-hidden",
            "rounded-[12px] bg-white dark:bg-[#1d1d1f]",
            "shadow-[0_3px_30px_5px_rgba(0,0,0,0.18)] ring-1 ring-black/5 dark:ring-white/10"
          )}
        >
          <div className="py-1.5">
            {options.map((opt) => {
              const active = selected.includes(opt.value);
              const OptIcon = opt.icon;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onToggle(opt.value)}
                  role="menuitemcheckbox"
                  aria-checked={active}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 text-left",
                    "text-[13px] tracking-[-0.224px] text-[#1d1d1f] dark:text-white",
                    "hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-[18px] items-center justify-center rounded-md border transition-colors",
                      active
                        ? "bg-[#0071e3] border-transparent text-white"
                        : "border-black/25 dark:border-white/30"
                    )}
                  >
                    {active && <Check className="size-3" strokeWidth={3} />}
                  </span>
                  {OptIcon && (
                    <OptIcon className="size-3.5 text-black/55 dark:text-white/55" />
                  )}
                  <span className="flex-1">{opt.label}</span>
                </button>
              );
            })}
          </div>

          {count > 0 && (
            <div className="border-t border-black/5 dark:border-white/10">
              <button
                type="button"
                onClick={onClearThis}
                className="w-full py-2 text-[12px] font-medium tracking-[-0.12px] text-[#0066cc] dark:text-[#2997ff] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TaskFilters({
  priorities,
  statuses,
  onTogglePriority,
  onToggleStatus,
  onClear,
  total = 0,
  visible = 0,
}) {
  const hasFilters = priorities.length > 0 || statuses.length > 0;

  const clearPriorities = () => priorities.forEach((v) => onTogglePriority(v));
  const clearStatuses = () => statuses.forEach((v) => onToggleStatus(v));

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="inline-flex items-center gap-1.5 h-9 pr-1 text-black/55 dark:text-white/55">
        <SlidersHorizontal className="size-4" />
        <span className="text-[12px] uppercase tracking-[0.08em] font-semibold">
          Filter
        </span>
      </div>

      <FilterDropdown
        label="Priority"
        icon={Flag}
        options={PRIORITIES}
        selected={priorities}
        onToggle={onTogglePriority}
        onClearThis={clearPriorities}
      />

      <FilterDropdown
        label="Status"
        icon={Activity}
        options={STATUSES}
        selected={statuses}
        onToggle={onToggleStatus}
        onClearThis={clearStatuses}
      />

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1 h-9 px-2 text-[12px] font-medium tracking-[-0.12px] text-[#0066cc] dark:text-[#2997ff] hover:underline"
        >
          <X className="size-3.5" />
          Clear all
        </button>
      )}

      <span className="ml-auto text-[12px] tracking-[-0.12px] text-black/50 dark:text-white/50 tabular-nums">
        {visible === total ? (
          <>
            <span className="font-semibold text-[#1d1d1f] dark:text-white">
              {total}
            </span>{" "}
            {total === 1 ? "task" : "tasks"}
          </>
        ) : (
          <>
            Showing{" "}
            <span className="font-semibold text-[#1d1d1f] dark:text-white">
              {visible}
            </span>{" "}
            of {total}
          </>
        )}
      </span>
    </div>
  );
}
