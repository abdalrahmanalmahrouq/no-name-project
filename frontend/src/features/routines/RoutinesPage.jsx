import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingState from "@/components/LoadingState";
import { routinesApi } from "./api/routinesApi";
import RoutinesHeader from "./components/RoutinesHeader";
import TodayProgress from "./components/TodayProgress";
import RoutineList from "./components/RoutineList";
import RoutinesEmpty from "./components/RoutinesEmpty";
import RoutineFormModal from "./components/RoutineFormModal";
import ConfirmDialog from "./components/ConfirmDialog";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await routinesApi.list();
      setRoutines(data);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to load routines.",
        { autoClose: 3000, position: "bottom-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (routine) => {
    setEditing(routine);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    if (editing) {
      const updated = await routinesApi.update(editing.id, payload);
      setRoutines((list) => list.map((r) => (r.id === updated.id ? updated : r)));
    } else {
      const created = await routinesApi.create(payload);
      setRoutines((list) => [created, ...list]);
    }
  };

  const handleToggle = async (routine) => {
    const optimistic = { ...routine, completed_today: !routine.completed_today };
    setRoutines((list) => list.map((r) => (r.id === routine.id ? optimistic : r)));
    try {
      const updated = await routinesApi.toggle(routine.id);
      setRoutines((list) => list.map((r) => (r.id === updated.id ? updated : r)));
    } catch (err) {
      setRoutines((list) => list.map((r) => (r.id === routine.id ? routine : r)));
      toast.error(
        err?.response?.data?.message || "Failed to update routine.",
        { autoClose: 3000, position: "bottom-right" }
      );
    }
  };

  const requestDelete = (routine) => setPendingDelete(routine);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    const routine = pendingDelete;
    const previous = routines;
    setRoutines((list) => list.filter((r) => r.id !== routine.id));
    try {
      await routinesApi.remove(routine.id);
      toast.success("Routine deleted.", {
        autoClose: 2500,
        position: "bottom-right",
      });
    } catch (err) {
      setRoutines(previous);
      toast.error(
        err?.response?.data?.message || "Failed to delete routine.",
        { autoClose: 3000, position: "bottom-right" }
      );
    }
  };

  return (
    <div className="space-y-8">
      <RoutinesHeader onCreate={openCreate} />

      {loading ? (
        <LoadingState />
      ) : routines.length === 0 ? (
        <RoutinesEmpty onCreate={openCreate} />
      ) : (
        <>
          <TodayProgress routines={routines} />
          <RoutineList
            routines={routines}
            onToggle={handleToggle}
            onEdit={openEdit}
            onDelete={requestDelete}
          />
        </>
      )}

      <RoutineFormModal
        open={modalOpen}
        routine={editing}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete routine?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be removed along with its history. This action cannot be undone.`
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

