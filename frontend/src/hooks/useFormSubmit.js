import { useState } from "react";
import { flattenApiErrors, notifyError, notifySuccess } from "@/lib/notify";

export function useFormSubmit({ submit, successMsg, errorMsg, onSuccess }) {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const run = async (payload) => {
    setSubmitting(true);
    try {
      await submit(payload);
      notifySuccess(successMsg);
      onSuccess?.();
      setErrors({});
    } catch (err) {
      const flat = flattenApiErrors(err);
      if (flat) setErrors(flat);
      notifyError(err, errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, errors, setErrors, run };
}
