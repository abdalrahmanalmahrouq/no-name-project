import { Sparkles, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoutinesEmpty({ onCreate }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-[12px] bg-[#f5f5f7] dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
      <div className="flex size-14 items-center justify-center rounded-full bg-white dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10 mb-4">
        <Sparkles className="size-6 text-[#0071e3]" />
      </div>
      <h3 className="text-[28px] font-semibold leading-[1.14] tracking-[-0.28px] text-[#1d1d1f] dark:text-white">
        Build your first routine
      </h3>
      <p className="mt-2 max-w-md text-[14px] tracking-[-0.224px] text-black/60 dark:text-white/60">
        Routines shape your days. Add a small habit and check it off when you do it.
      </p>
      <Button
        type="button"
        variant="hero"
        onClick={onCreate}
        className="mt-6 rounded-full px-6 py-2 h-auto"
      >
        <Plus className="size-4 mr-1" />
        New Routine
      </Button>
    </div>
  );
}
