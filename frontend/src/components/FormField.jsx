import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function FormField({ id, label, ...inputProps }) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...inputProps} />
      </div>
    );
  }