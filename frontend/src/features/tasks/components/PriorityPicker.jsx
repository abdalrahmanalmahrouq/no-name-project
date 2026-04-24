import OptionGrid from "@/components/OptionGrid";
import { PRIORITIES } from "../constants";

export default function PriorityPicker({ value, onChange }) {
  return (
    <OptionGrid
      options={PRIORITIES}
      value={value}
      onChange={onChange}
      layout="row"
      containerClassName="grid grid-cols-3 gap-2"
    />
  );
}
