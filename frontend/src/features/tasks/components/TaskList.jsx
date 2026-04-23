import { useMemo } from "react";
import { AlertCircle, CalendarClock, CalendarRange, Inbox, CheckCircle2, Archive } from "lucide-react";
import TaskGroup from "./TaskGroup";
import { bucketForTask } from "../constants";

const GROUP_ORDER = [
  { key: "overdue",   label: "Overdue",     tone: "danger", icon: AlertCircle,    highlighted: true },
  { key: "today",     label: "Today",       tone: "accent", icon: CalendarClock,  highlighted: true },
  { key: "upcoming",  label: "Upcoming",    tone: "muted",  icon: CalendarRange,  highlighted: false },
  { key: "someday",   label: "No due date", tone: "muted",  icon: Inbox,          highlighted: false },
  { key: "completed", label: "Completed",   tone: "muted",  icon: CheckCircle2,   highlighted: false },
  { key: "archived",  label: "Archived",    tone: "muted",  icon: Archive,        highlighted: false },
];

export default function TaskList({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const grouped = useMemo(() => {
    const map = Object.fromEntries(GROUP_ORDER.map((g) => [g.key, []]));
    tasks.forEach((t) => {
      map[bucketForTask(t)].push(t);
    });
    return map;
  }, [tasks]);

  return (
    <div className="space-y-6">
      {GROUP_ORDER.map((g) => (
        <TaskGroup
          key={g.key}
          label={g.label}
          tone={g.tone}
          icon={g.icon}
          highlighted={g.highlighted}
          tasks={grouped[g.key]}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
