import RoutineCard from "./RoutineCard";
import { getTimeOfDayMeta } from "../constants";

export default function RoutineGroup({ timeOfDay, routines, onToggle, onEdit, onDelete }) {
  if (routines.length === 0) return null;
  const meta = getTimeOfDayMeta(timeOfDay);
  const Icon = meta.icon;

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-black/60 dark:text-white/60" />
        <h2 className="text-[14px] font-semibold uppercase tracking-[0.06em] text-black/60 dark:text-white/60">
          {meta.label}
        </h2>
        <span className="text-[12px] text-black/40 dark:text-white/40">
          {routines.length}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {routines.map((r) => (
          <RoutineCard
            key={r.id}
            routine={r}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}
