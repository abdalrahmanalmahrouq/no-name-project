import LoadingState from "@/components/LoadingState";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useCrudResource } from "@/hooks/useCrudResource";
import { notifyError } from "@/lib/notify";
import { routinesApi } from "./api/routinesApi";
import RoutinesHeader from "./components/RoutinesHeader";
import TodayProgress from "./components/TodayProgress";
import RoutineList from "./components/RoutineList";
import RoutinesEmpty from "./components/RoutinesEmpty";
import RoutineFormModal from "./components/RoutineFormModal";

const LABELS = { singular: "Routine", plural: "routines" };

export default function RoutinesPage() {
  const {
    items: routines,
    setItems: setRoutines,
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
  } = useCrudResource(routinesApi, LABELS);

  const handleToggle = async (routine) => {
    const optimistic = { ...routine, completed_today: !routine.completed_today };
    setRoutines((list) => list.map((r) => (r.id === routine.id ? optimistic : r)));
    try {
      const updated = await routinesApi.toggle(routine.id);
      setRoutines((list) => list.map((r) => (r.id === updated.id ? updated : r)));
    } catch (err) {
      setRoutines((list) => list.map((r) => (r.id === routine.id ? routine : r)));
      notifyError(err, "Failed to update routine.");
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
        onClose={closeModal}
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
        onClose={clearPendingDelete}
      />
    </div>
  );
}
