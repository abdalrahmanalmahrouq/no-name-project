import { useState } from "react";

export function useToggle(onToggle) {
  const [busy, setBusy] = useState(false);

    
  const handleToggle = async (item) => {
    if (busy) return;
    setBusy(true);
    try {
      await onToggle(item);
    } finally {
      setBusy(false);
    }
  };

  return { busy, handleToggle };
}