import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoutinesHeader({ onCreate }) {
  return (
    <header className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h1 className="text-[40px] font-semibold leading-[1.10] tracking-[-0.4px] text-[#1d1d1f] dark:text-white">
          Routines
        </h1>
        <p className="mt-2 text-[17px] tracking-[-0.374px] text-black/60 dark:text-white/60">
          Build the small rituals that shape your day.
        </p>
      </div>

      <Button
        type="button"
        variant="hero"
        onClick={onCreate}
        className="rounded-full px-5 py-2 h-auto"
      >
        <Plus className="size-4 mr-1" />
        New Routine
      </Button>
    </header>
  );
}
