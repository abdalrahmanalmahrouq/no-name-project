import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PageHeader({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
  badge,
}) {
  return (
    <header className="flex items-end justify-between gap-4 flex-wrap">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-black/55 dark:text-white/55">
            {eyebrow}
          </p>
        )}

        <div className={eyebrow ? "mt-1.5 flex items-center gap-3 flex-wrap" : "flex items-center gap-3 flex-wrap"}>
          <h1 className="text-[40px] font-semibold leading-[1.10] tracking-[-0.4px] text-[#1d1d1f] dark:text-white">
            {title}
          </h1>
          {badge}
        </div>

        {description && (
          <p className="mt-2 text-[17px] tracking-[-0.374px] text-black/60 dark:text-white/60">
            {description}
          </p>
        )}
      </div>

      {onAction && actionLabel && (
        <Button
          type="button"
          variant="hero"
          onClick={onAction}
          className="rounded-full px-5 py-2 h-auto"
        >
          <Plus className="size-4 mr-1" />
          {actionLabel}
        </Button>
      )}
    </header>
  );
}
