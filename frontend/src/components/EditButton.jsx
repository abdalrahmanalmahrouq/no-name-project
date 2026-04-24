import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function EditButton( { onClick, ariaLabel } ) {
    return (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn("rounded-full text-black/60 dark:text-white/60 cursor-pointer")}
        >
            <Pencil className="size-4" />
        </Button>
    )
}