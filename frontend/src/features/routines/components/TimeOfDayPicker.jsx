import OptionGrid from "@/components/OptionGrid";
import { TIME_OF_DAY } from "../constants";

export default function TimeOfDayPicker({ value, onChange }) {
  return (
    <OptionGrid
      options={TIME_OF_DAY}
      value={value}
      onChange={onChange}
      layout="stack"
      containerClassName="grid grid-cols-5 gap-2"
    />
  );
}
