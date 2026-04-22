import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import Modal from "./Modal";
import IconPicker from "./IconPicker";
import TimeOfDayPicker from "./TimeOfDayPicker";
import DayPicker from "./DayPicker";

const DEFAULTS = {
  title: "",
  icon: "sparkles",
  time_of_day: "morning",
  active_days: [],
};

export default function RoutineFormModal({ open, routine, onClose, onSubmit }) {
  const isEdit = Boolean(routine);
  const [form, setForm] = useState(DEFAULTS);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      routine
        ? {
            title: routine.title ?? "",
            icon: routine.icon ?? "sparkles",
            time_of_day: routine.time_of_day ?? "morning",
            active_days: routine.active_days ?? [],
          }
        : DEFAULTS
    );
  }, [open, routine]);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setErrors({ title: "Title is required." });
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
      toast.success(isEdit ? "Routine updated." : "Routine created.", {
        autoClose: 2500,
        position: "bottom-right",
      });
      onClose();
    } catch (err) {
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors) {
        const flat = Object.fromEntries(
          Object.entries(apiErrors).map(([k, v]) => [k, v[0]])
        );
        setErrors(flat);
      }
      toast.error(
        err?.response?.data?.message || "Failed to save routine.",
        { autoClose: 3000, position: "bottom-right" }
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit routine" : "New routine"}
      description={
        isEdit
          ? "Update the details of this routine."
          : "Create a small habit you want to repeat."
      }
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="routine-form"
            variant="hero"
            disabled={submitting}
          >
            {submitting ? "Saving..." : isEdit ? "Save changes" : "Create routine"}
          </Button>
        </>
      }
    >
      <form id="routine-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Morning workout"
            autoFocus
          />
          {errors.title && (
            <p className="text-[12px] text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Icon</Label>
          <IconPicker
            value={form.icon}
            onChange={(icon) => update({ icon })}
          />
        </div>

        <div className="space-y-2">
          <Label>Time of day</Label>
          <TimeOfDayPicker
            value={form.time_of_day}
            onChange={(time_of_day) => update({ time_of_day })}
          />
        </div>

        <div className="space-y-2">
          <Label>Active days</Label>
          <DayPicker
            value={form.active_days}
            onChange={(active_days) => update({ active_days })}
          />
          <p className="text-[12px] text-black/55 dark:text-white/55 tracking-[-0.12px]">
            Leave empty for every day.
          </p>
        </div>
      </form>
    </Modal>
  );
}
