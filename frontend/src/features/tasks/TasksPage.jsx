import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import LoadingState from "@/components/LoadingState";
import { tasksApi } from "./api/tasksApi";
import TasksHeader from "./components/TasksHeader";
import TasksSummary from "./components/TasksSummary";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import TasksEmpty from "./components/TasksEmpty";
import TaskFormModal from "./components/TaskFormModal";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const [priorityFilter, setPriorityFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await tasksApi.list();
      setTasks(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load tasks.", {
        autoClose: 3000,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (priorityFilter.length > 0 && !priorityFilter.includes(t.priority))
        return false;
      if (statusFilter.length > 0 && !statusFilter.includes(t.status))
        return false;
      return true;
    });
  }, [tasks, priorityFilter, statusFilter]);

  const togglePriority = (value) =>
    setPriorityFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const toggleStatus = (value) =>
    setStatusFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  const clearFilters = () => {
    setPriorityFilter([]);
    setStatusFilter([]);
  };

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setEditing(task);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    if (editing) {
      const updated = await tasksApi.update(editing.id, payload);
      setTasks((list) => list.map((t) => (t.id === updated.id ? updated : t)));
    } else {
      const created = await tasksApi.create(payload);
      setTasks((list) => [created, ...list]);
    }
  };

  const handleToggleComplete = async (task) => {
    const nextStatus = task.status === "completed" ? "pending" : "completed";
    const optimistic = {
      ...task,
      status: nextStatus,
      is_completed: nextStatus === "completed",
    };
    setTasks((list) => list.map((t) => (t.id === task.id ? optimistic : t)));
    try {
      const updated = await tasksApi.setStatus(task.id, nextStatus);
      setTasks((list) => list.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setTasks((list) => list.map((t) => (t.id === task.id ? task : t)));
      toast.error(err?.response?.data?.message || "Failed to update task.", {
        autoClose: 3000,
        position: "bottom-right",
      });
    }
  };

  const requestDelete = (task) => setPendingDelete(task);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const task = pendingDelete;
    const previous = tasks;
    setTasks((list) => list.filter((t) => t.id !== task.id));
    try {
      await tasksApi.remove(task.id);
      toast.success("Task deleted.", {
        autoClose: 2500,
        position: "bottom-right",
      });
    } catch (err) {
      setTasks(previous);
      toast.error(err?.response?.data?.message || "Failed to delete task.", {
        autoClose: 3000,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="space-y-8">
      <TasksHeader tasks={tasks} onCreate={openCreate} />

      {loading ? (
        <LoadingState />
      ) : tasks.length === 0 ? (
        <TasksEmpty onCreate={openCreate} />
      ) : (
        <>
          <TasksSummary tasks={tasks} />

          <TaskFilters
            priorities={priorityFilter}
            statuses={statusFilter}
            onTogglePriority={togglePriority}
            onToggleStatus={toggleStatus}
            onClear={clearFilters}
            total={tasks.length}
            visible={filteredTasks.length}
          />

          {filteredTasks.length === 0 ? (
            <div className="rounded-[12px] bg-[#f5f5f7] dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 p-8 text-center">
              <p className="text-[15px] font-semibold text-[#1d1d1f] dark:text-white">
                No tasks match your filters
              </p>
              <p className="mt-1 text-[13px] text-black/60 dark:text-white/60">
                Try clearing a filter or adding a new task.
              </p>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onEdit={openEdit}
              onDelete={requestDelete}
            />
          )}
        </>
      )}

      <TaskFormModal
        open={modalOpen}
        task={editing}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete task?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be removed. This action cannot be undone.`
            : undefined
        }
        confirmLabel="Delete"
        variant="danger"
        onConfirm={confirmDelete}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
}
