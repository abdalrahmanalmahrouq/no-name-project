import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onClose,
}) {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await onConfirm?.();
      onClose?.();
    } finally {
      setBusy(false);
    }
  };

  const isDanger = variant === "danger";

  return (
    <Modal
      open={open}
      onClose={busy ? undefined : onClose}
      title={title}
      description={description}
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={busy}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={busy}
            className={cn(
              "rounded-[8px] px-4",
              isDanger
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#0071e3] text-white hover:bg-[#0077ed]"
            )}
          >
            {busy ? "Working..." : confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full",
            isDanger
              ? "bg-red-500/10 text-red-500"
              : "bg-[#0071e3]/10 text-[#0071e3]"
          )}
        >
          <AlertTriangle className="size-5" />
        </div>
        <p className="text-[14px] leading-[1.43] tracking-[-0.224px] text-black/70 dark:text-white/70">
          {description ||
            "This action cannot be undone. Please confirm you want to continue."}
        </p>
      </div>
    </Modal>
  );
}
