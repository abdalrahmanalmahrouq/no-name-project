import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckButton({
  onClick,
  busy,
  completed,
  archived = false,
  disabled = false,
  title,
}) {
  const isDisabled = busy || archived || disabled;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-pressed={completed}
      aria-label={completed ? "Mark not done" : "Mark done"}
      title={title}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full transition-all",
        "border-2",
        completed
          ? "bg-[#0071e3] border-transparent text-white"
          : "border-black/20 dark:border-white/30 text-transparent",
        !isDisabled && !completed && "hover:border-[#0071e3] cursor-pointer",
        isDisabled && "cursor-not-allowed opacity-50",
        busy && "opacity-60"
      )}
    >
      <Check className="size-3.5" strokeWidth={3} />
    </button>
  );
}
