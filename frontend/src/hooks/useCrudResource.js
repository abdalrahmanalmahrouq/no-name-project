import { useCallback, useEffect, useState } from "react";
import { notifyError, notifySuccess } from "@/lib/notify";

export function useCrudResource(api, labels) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.list();
      setItems(data);
    } catch (err) {
      notifyError(err, `Failed to load ${labels.plural}.`);
    } finally {
      setLoading(false);
    }
  }, [api, labels.plural]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((item) => {
    setEditing(item);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleSubmit = useCallback(
    async (payload) => {
      if (editing) {
        const updated = await api.update(editing.id, payload);
        setItems((list) =>
          list.map((x) => (x.id === updated.id ? updated : x))
        );
      } else {
        const created = await api.create(payload);
        setItems((list) => [created, ...list]);
      }
    },
    [api, editing]
  );

  const requestDelete = useCallback((item) => setPendingDelete(item), []);
  const clearPendingDelete = useCallback(() => setPendingDelete(null), []);

  const confirmDelete = useCallback(async () => {
    if (!pendingDelete) return;
    const target = pendingDelete;
    let previous;
    setItems((list) => {
      previous = list;
      return list.filter((x) => x.id !== target.id);
    });
    try {
      await api.remove(target.id);
      notifySuccess(`${labels.singular} deleted.`);
    } catch (err) {
      setItems(previous);
      notifyError(err, `Failed to delete ${labels.singular.toLowerCase()}.`);
    } finally {
      setPendingDelete(null);
    }
  }, [api, labels.singular, pendingDelete]);

  return {
    items,
    setItems,
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
    reload: load,
  };
}
