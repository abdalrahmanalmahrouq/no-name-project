import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  compact = false,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center rounded-[12px]",
        "bg-[#f5f5f7] dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10",
        compact ? "py-8 px-6" : "py-20 px-6"
      )}
    >
      {Icon && !compact && (
        <div className="flex size-14 items-center justify-center rounded-full bg-white dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 mb-4">
          <Icon className="size-6 text-[#0071e3]" />
        </div>
      )}

      <h3
        className={cn(
          "font-semibold text-[#1d1d1f] dark:text-white",
          compact
            ? "text-[15px]"
            : "text-[28px] leading-[1.14] tracking-[-0.28px]"
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            "text-black/60 dark:text-white/60",
            compact
              ? "mt-1 text-[13px]"
              : "mt-2 max-w-md text-[14px] tracking-[-0.224px]"
          )}
        >
          {description}
        </p>
      )}

      {onAction && actionLabel && (
        <Button
          type="button"
          variant="hero"
          onClick={onAction}
          className="mt-6 rounded-full px-6 py-2 h-auto"
        >
          <Plus className="size-4 mr-1" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
