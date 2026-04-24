import RoutineCard from "./RoutineCard";
import SectionHeader from "@/components/SectionHeader";
import { getTimeOfDayMeta } from "../constants";

export default function RoutineGroup({ timeOfDay, routines, onToggle, onEdit, onDelete }) {
  if (routines.length === 0) return null;
  const meta = getTimeOfDayMeta(timeOfDay);

  return (
    <section className="space-y-3">
      <SectionHeader icon={meta.icon} label={meta.label} count={routines.length} />

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
