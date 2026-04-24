import OptionGrid from "@/components/OptionGrid";
import { ROUTINE_ICONS } from "../constants";

export default function IconPicker({ value, onChange }) {
  return (
    <OptionGrid
      options={ROUTINE_ICONS}
      value={value}
      onChange={onChange}
      layout="icon"
      containerClassName="grid grid-cols-7 gap-2"
    />
  );
}
