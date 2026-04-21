import { BACKGROUND_IMAGE } from "@/constants/assets";
import { cn } from "@/lib/utils";

export default function BackgroundOverlay({
  image = BACKGROUND_IMAGE,
  gradientClassName = "bg-linear-to-b from-black/70 via-black/50 to-black/80",
  className,
}) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0", className)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className={cn("absolute inset-0", gradientClassName)} />
    </div>
  );
}
