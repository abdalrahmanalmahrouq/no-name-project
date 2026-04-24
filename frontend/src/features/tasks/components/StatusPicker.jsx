import OptionGrid from "@/components/OptionGrid";
import { STATUSES } from "../constants";

export default function StatusPicker({ value, onChange }) {
  return (
    <OptionGrid
      options={STATUSES}
      value={value}
      onChange={onChange}
      layout="stack"
      containerClassName="grid grid-cols-2 sm:grid-cols-4 gap-2"
    />
  );
}
