import { useMemo } from "react";
import RoutineGroup from "./RoutineGroup";
import { TIME_OF_DAY } from "../constants";

export default function RoutineList({ routines, onToggle, onEdit, onDelete }) {
  const grouped = useMemo(() => {
    const map = Object.fromEntries(TIME_OF_DAY.map((t) => [t.value, []]));
    routines.forEach((r) => {
      const key = map[r.time_of_day] ? r.time_of_day : "anytime";
      map[key].push(r);
    });
    return map;
  }, [routines]);

  return (
    <div className="space-y-8">
      {TIME_OF_DAY.map(({ value }) => (
        <RoutineGroup
          key={value}
          timeOfDay={value}
          routines={grouped[value]}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
