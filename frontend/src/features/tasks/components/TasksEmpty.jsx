import { ListChecks } from "lucide-react";
import EmptyState from "@/components/EmptyState";

export default function TasksEmpty({ onCreate }) {
  return (
    <EmptyState
      icon={ListChecks}
      title="Nothing on your list yet"
      description="Add your first task. Keep it small, specific, and something you can finish today."
      actionLabel="New Task"
      onAction={onCreate}
    />
  );
}
