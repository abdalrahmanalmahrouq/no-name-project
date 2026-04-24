import OptionGrid from "@/components/OptionGrid";
import { DAYS } from "../constants";

export default function DayPicker({ value = [], onChange }) {
  return (
    <OptionGrid
      options={DAYS}
      value={value}
      onChange={onChange}
      multi
      layout="pill"
      containerClassName="flex flex-wrap gap-1.5"
    />
  );
}
