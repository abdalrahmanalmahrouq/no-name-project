import { toast } from "react-toastify";

const ERROR_OPTS = { autoClose: 3000, position: "bottom-right" };
const SUCCESS_OPTS = { autoClose: 2500, position: "bottom-right" };

export function notifyError(err, fallback) {
  toast.error(err?.response?.data?.message || fallback, ERROR_OPTS);
}

export function notifySuccess(msg) {
  toast.success(msg, SUCCESS_OPTS);
}

export function flattenApiErrors(err) {
  const apiErrors = err?.response?.data?.errors;
  if (!apiErrors) return null;
  return Object.fromEntries(
    Object.entries(apiErrors).map(([k, v]) => [k, v[0]])
  );
}
