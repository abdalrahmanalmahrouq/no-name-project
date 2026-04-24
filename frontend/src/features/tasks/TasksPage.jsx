import { useMemo, useState } from "react";
import LoadingState from "@/components/LoadingState";
import ConfirmDialog from "@/components/ConfirmDialog";
import EmptyState from "@/components/EmptyState";
import { useCrudResource } from "@/hooks/useCrudResource";
import { notifyError } from "@/lib/notify";
import { tasksApi } from "./api/tasksApi";
import TasksHeader from "./components/TasksHeader";
import TasksSummary from "./components/TasksSummary";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";
import TasksEmpty from "./components/TasksEmpty";
import TaskFormModal from "./components/TaskFormModal";

const LABELS = { singular: "Task", plural: "tasks" };

export default function TasksPage() {
  const {
    items: tasks,
    setItems: setTasks,
    loading,
    modalOpen,
    editing,
    openCreate,
    openEdit,
    closeModal,
    handleSubmit,
    pendingDelete,
    requestDelete,
    clearPendingDelete,
    confirmDelete,
  } = useCrudResource(tasksApi, LABELS);

  const [priorityFilter, setPriorityFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);

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
      notifyError(err, "Failed to update task.");
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
            <EmptyState
              compact
              title="No tasks match your filters"
              description="Try clearing a filter or adding a new task."
            />
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
        onClose={closeModal}
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
        onClose={clearPendingDelete}
      />
    </div>
  );
}
