import { cn } from "@/lib/utils";

const ACTIVE = "bg-[#0071e3] text-white border-transparent";
const INACTIVE =
  "bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#ededf2] dark:bg-white/5 dark:text-white dark:hover:bg-white/10";

const PILL_ACTIVE = "bg-[#0071e3] text-white border-transparent";
const PILL_INACTIVE =
  "bg-transparent text-[#1d1d1f] dark:text-white border-black/15 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10";

const BORDER_BASE = "border border-black/5 dark:border-white/10";

const ITEM_LAYOUT = {
  stack: "flex flex-col items-center gap-1.5 rounded-[8px] px-2 py-3 transition-colors",
  row: "flex items-center justify-center gap-2 rounded-[8px] px-3 py-2.5 transition-colors",
  icon: "flex aspect-square items-center justify-center rounded-[8px] transition-colors",
  pill: "h-9 min-w-[44px] rounded-full px-3 text-[12px] font-semibold tracking-[-0.12px] border transition-colors",
};

const LABEL_CLASS = {
  stack: "text-[12px] font-medium tracking-[-0.12px]",
  row: "text-[13px] font-medium tracking-[-0.224px]",
};

export default function OptionGrid({
  options,
  value,
  onChange,
  multi = false,
  layout = "stack",
  containerClassName = "grid grid-cols-5 gap-2",
  disabled = false,
}) {
  const isPill = layout === "pill";

  const isActive = (v) =>
    multi ? Array.isArray(value) && value.includes(v) : value === v;

  const handleClick = (v) => {
    if (!multi) return onChange(v);
    const arr = Array.isArray(value) ? value : [];
    onChange(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  };

  const activeClass = isPill ? PILL_ACTIVE : ACTIVE;
  const inactiveClass = isPill ? PILL_INACTIVE : INACTIVE;

  return (
    <div className={containerClassName}>
      {options.map(({ value: v, label, icon: Icon }) => {
        const active = isActive(v);
        const labelClass = LABEL_CLASS[layout];
        return (
          <button
            key={v}
            type="button"
            onClick={() => handleClick(v)}
            aria-pressed={active}
            disabled={disabled}
            className={cn(
              ITEM_LAYOUT[layout],
              !isPill && BORDER_BASE,
              active ? activeClass : inactiveClass,
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {Icon && <Icon className="size-4" />}
            {label && labelClass && <span className={labelClass}>{label}</span>}
            {isPill && label}
          </button>
        );
      })}
    </div>
  );
}
