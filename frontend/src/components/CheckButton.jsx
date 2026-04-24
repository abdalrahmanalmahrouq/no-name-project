import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckButton ({ onClick, busy, completed, archived = false}){
    return (
        <button
        type="button"
        onClick={onClick}
        disabled={busy || archived}
        aria-pressed={completed}
        aria-label={completed ? "Mark not done" : "Mark done"}
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full transition-all",
          "border-2",
          'cursor-pointer',
          completed
            ? "bg-[#0071e3] border-transparent text-white"
            : "border-black/20 dark:border-white/30 text-transparent hover:border-[#0071e3]",
          busy && "opacity-60"
        )}
      >
        <Check className="size-3.5" strokeWidth={3} />
      </button>
    )
}