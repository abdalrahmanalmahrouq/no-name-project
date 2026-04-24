import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function DeleteButton ( { onClick, ariaLabel } ) {
    return (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn("rounded-full text-black/60 dark:text-white/60 hover:text-red-600 cursor-pointer")}
        >
          <Trash2 className="size-4" />
        </Button>
    )
}