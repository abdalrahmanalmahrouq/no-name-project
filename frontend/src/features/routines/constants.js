import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Clock,
  Dumbbell,
  BookOpen,
  Code,
  Coffee,
  Droplet,
  Heart,
  Brain,
  Music,
  PenLine,
  Leaf,
  Bike,
  Footprints,
  Apple,
  Sparkles,
} from "lucide-react";

export const TIME_OF_DAY = [
  { value: "morning",   label: "Morning",   icon: Sunrise },
  { value: "afternoon", label: "Afternoon", icon: Sun },
  { value: "evening",   label: "Evening",   icon: Sunset },
  { value: "night",     label: "Night",     icon: Moon },
  { value: "anytime",   label: "Anytime",   icon: Clock },
];

export const DAYS = [
  { value: "mon", label: "Mon" },
  { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" },
  { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" },
  { value: "sat", label: "Sat" },
  { value: "sun", label: "Sun" },
];

export const ROUTINE_ICONS = [
  { value: "dumbbell",   icon: Dumbbell },
  { value: "book-open",  icon: BookOpen },
  { value: "code",       icon: Code },
  { value: "coffee",     icon: Coffee },
  { value: "droplet",    icon: Droplet },
  { value: "heart",      icon: Heart },
  { value: "brain",      icon: Brain },
  { value: "music",      icon: Music },
  { value: "pen",        icon: PenLine },
  { value: "leaf",       icon: Leaf },
  { value: "bike",       icon: Bike },
  { value: "footprints", icon: Footprints },
  { value: "apple",      icon: Apple },
  { value: "sparkles",   icon: Sparkles },
];

export function getRoutineIcon(value) {
  const found = ROUTINE_ICONS.find((i) => i.value === value);
  return found ? found.icon : Sparkles;
}

export function getTimeOfDayMeta(value) {
  return TIME_OF_DAY.find((t) => t.value === value) ?? TIME_OF_DAY[4];
}

export function todayKey() {
  return ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()];
}

export function isActiveToday(routine) {
  const days = routine.active_days ?? [];
  if (days.length === 0) return true;
  return days.includes(todayKey());
}
