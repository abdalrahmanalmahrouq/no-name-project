import { cn } from "@/lib/utils";

const TONE_CLASSES = {
  accent: "text-[#0071e3]",
  danger: "text-red-500",
  muted: "text-black/60 dark:text-white/60",
};

export default function SectionHeader({ icon: Icon, label, count, tone = "muted" }) {
  const toneClass = TONE_CLASSES[tone] ?? TONE_CLASSES.muted;

  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className={cn("size-4", toneClass)} />}
      <h2
        className={cn(
          "text-[14px] font-semibold uppercase tracking-[0.06em]",
          toneClass
        )}
      >
        {label}
      </h2>
      {count != null && (
        <span className="text-[12px] text-black/40 dark:text-white/40">
          {count}
        </span>
      )}
    </div>
  );
}
