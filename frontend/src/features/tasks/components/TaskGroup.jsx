import { cn } from "@/lib/utils";
import TaskCard from "./TaskCard";

export default function TaskGroup({
  label,
  tone = "muted",
  icon: Icon,
  tasks,
  highlighted = false,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  if (tasks.length === 0) return null;

  const toneClasses = {
    accent: "text-[#0071e3]",
    danger: "text-red-500",
    muted: "text-black/60 dark:text-white/60",
  }[tone];

  return (
    <section
      className={cn(
        "space-y-3",
        highlighted &&
          "rounded-[12px] ring-1 p-4",
        highlighted && tone === "accent" &&
          "bg-[#0071e3]/5 ring-[#0071e3]/25",
        highlighted && tone === "danger" &&
          "bg-red-500/5 ring-red-500/25"
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className={cn("size-4", toneClasses)} />}
        <h2
          className={cn(
            "text-[14px] font-semibold uppercase tracking-[0.06em]",
            toneClasses
          )}
        >
          {label}
        </h2>
        <span className="text-[12px] text-black/40 dark:text-white/40">
          {tasks.length}
        </span>
      </div>

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
