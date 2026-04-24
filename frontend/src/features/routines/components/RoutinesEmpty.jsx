import { Sparkles } from "lucide-react";
import EmptyState from "@/components/EmptyState";

export default function RoutinesEmpty({ onCreate }) {
  return (
    <EmptyState
      icon={Sparkles}
      title="Build your first routine"
      description="Routines shape your days. Add a small habit and check it off when you do it."
      actionLabel="New Routine"
      onAction={onCreate}
    />
  );
}
