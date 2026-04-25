import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Modal from "@/components/Modal";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { todayISO } from "@/lib/date";
import PriorityPicker from "./PriorityPicker";
import StatusPicker from "./StatusPicker";

const buildDefaults = () => ({
  title: "",
  description: "",
  priority: "medium",
  status: "pending",
  due_date: todayISO(),
  estimated_minutes: "",
});

function toPayload(form) {
  return {
    title: form.title.trim(),
    description: form.description.trim() ? form.description.trim() : null,
    priority: form.priority,
    status: form.status,
    due_date: form.due_date ? form.due_date : null,
    estimated_minutes: form.estimated_minutes
      ? Number(form.estimated_minutes)
      : null,
  };
}

export default function TaskFormModal({ open, task, onClose, onSubmit }) {
  const isEdit = Boolean(task);
  const [form, setForm] = useState(buildDefaults);

  const { submitting, errors, setErrors, run } = useFormSubmit({
    submit: (payload) => onSubmit(payload),
    successMsg: isEdit ? "Task updated." : "Task created.",
    errorMsg: "Failed to save task.",
    onSuccess: onClose,
  });

  const today = todayISO();
  const minDate =
    isEdit && form.due_date && form.due_date < today ? form.due_date : today;

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      task
        ? {
            title: task.title ?? "",
            description: task.description ?? "",
            priority: task.priority ?? "medium",
            status: task.status ?? "pending",
            due_date: task.due_date ?? "",
            estimated_minutes:
              task.estimated_minutes != null
                ? String(task.estimated_minutes)
                : "",
          }
        : buildDefaults()
    );
  }, [open, task, setErrors]);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (form.due_date && form.due_date < minDate) {
      nextErrors.due_date = isEdit
        ? "Due date cannot be earlier than before."
        : "Due date cannot be in the past.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    await run(toPayload(form));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isEdit ? "Edit task" : "New task"}
      description={
        isEdit
          ? "Update the details of this task."
          : "Add something specific you want to finish today."
      }
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="task-form"
            variant="hero"
            disabled={submitting}
          >
            {submitting ? "Saving..." : isEdit ? "Save changes" : "Create task"}
          </Button>
        </>
      }
    >
      <form id="task-form" onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="task-title">Title</Label>
          <Input
            id="task-title"
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Review design feedback"
            autoFocus
          />
          {errors.title && (
            <p className="text-[12px] text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="task-description">Description</Label>
          <textarea
            id="task-description"
            value={form.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Add context or sub-steps (optional)"
            rows={3}
            className="w-full rounded-[8px] border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-3 py-2 text-[14px] leading-[1.47] tracking-[-0.224px] text-[#1d1d1f] dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 outline-none focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/30"
          />
          {errors.description && (
            <p className="text-[12px] text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="task-due">Due date</Label>
            <Input
              id="task-due"
              type="date"
              min={minDate}
              value={form.due_date}
              onChange={(e) => update({ due_date: e.target.value })}
            />
            {errors.due_date && (
              <p className="text-[12px] text-red-500">{errors.due_date}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-estimate">Estimate (minutes)</Label>
            <Input
              id="task-estimate"
              type="number"
              min="1"
              max="1440"
              value={form.estimated_minutes}
              onChange={(e) =>
                update({ estimated_minutes: e.target.value })
              }
              placeholder="e.g. 30"
            />
            {errors.estimated_minutes && (
              <p className="text-[12px] text-red-500">
                {errors.estimated_minutes}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Priority</Label>
          <PriorityPicker
            value={form.priority}
            onChange={(priority) => update({ priority })}
          />
        </div>

        {isEdit && (() => {
          const originalLocked =
            task &&
            !["completed", "archived"].includes(task.status) &&
            task.due_date &&
            task.due_date < today;
          const stillOverdue =
            form.due_date && form.due_date < today;
          const statusLocked = Boolean(originalLocked && stillOverdue);

          return (
            <div className="space-y-2">
              <Label>Status</Label>
              <StatusPicker
                value={form.status}
                onChange={(status) => update({ status })}
                disabled={statusLocked}
              />
              {statusLocked && (
                <p className="text-[12px] text-black/55 dark:text-white/55">
                  Status is locked while this task is overdue. Move the due date to today or later to change it.
                </p>
              )}
            </div>
          );
        })()}
      </form>
    </Modal>
  );
}
