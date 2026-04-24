import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";
import SectionHeader from "@/components/SectionHeader";

export default function TaskGroup({
  label,
  tone = "muted",
  icon,
  tasks,
  highlighted = false,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  if (tasks.length === 0) return null;

  return (
    <section
      className={cn(
        "space-y-3",
        highlighted && "rounded-[12px] ring-1 p-4",
        highlighted && tone === "accent" && "bg-[#0071e3]/5 ring-[#0071e3]/25",
        highlighted && tone === "danger" && "bg-red-500/5 ring-red-500/25"
      )}
    >
      <SectionHeader icon={icon} label={label} count={tasks.length} tone={tone} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            emphasis={highlighted ? tone : undefined}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
