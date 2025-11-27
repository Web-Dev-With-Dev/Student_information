// FIX: Remove React and ConfirmationDialog imports as this hook should not render components.
import { useState, useEffect, useCallback } from 'react';

interface Api<T, K extends keyof T> {
  getAll: () => Promise<T[]>;
  add: (item: Omit<T, K>) => Promise<T>;
  update: (id: T[K], item: Partial<T>) => Promise<T>;
  delete: (id: T[K]) => Promise<void>;
}

// Helper to format date strings
const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return '';
    try {
        return new Date(dateString).toISOString().split('T')[0];
    } catch (e) {
        return ''; // Return empty string if date is invalid
    }
};

const useCrud = <T extends { [key: string]: any }, K extends keyof T>(
  api: Api<T, K>,
  primaryKey: K
) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<T> | null>(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAll();
      setItems(data);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch data.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAddItem = () => {
    setEditingItem({});
    setIsModalOpen(true);
  };

  const handleEditItem = (item: T) => {
    // FIX: Automatically format date fields for form inputs
    const formattedItem = { ...item };
    for (const key in formattedItem) {
        if (typeof formattedItem[key] === 'string' && formattedItem[key].match(/^\d{4}-\d{2}-\d{2}T/)) {
            (formattedItem as any)[key] = formatDateForInput(formattedItem[key]);
        }
    }
    setEditingItem(formattedItem);
    setIsModalOpen(true);
  };
  
  const handleDeleteItem = (item: T) => {
    setDeletingItem(item);
  };

  const confirmDelete = async () => {
    if (deletingItem) {
      try {
        await api.delete(deletingItem[primaryKey]);
        setItems(prev => prev.filter(i => i[primaryKey] !== deletingItem[primaryKey]));
      } catch (e: any) {
        setError(e.message || 'Failed to delete item.');
        console.error(e);
      } finally {
        setDeletingItem(null);
      }
    }
  };

  const cancelDelete = () => {
    setDeletingItem(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSaveItem = async (item: Partial<T>) => {
    try {
      if ((item as T)[primaryKey]) {
        await api.update((item as T)[primaryKey], item);
      } else {
        await api.add(item as Omit<T, K>);
      }
      fetchItems();
      closeModal();
    } catch (e: any) {
      setError(e.message || 'Failed to save item.');
      console.error(e);
    }
  };

  return {
    items,
    loading,
    error,
    isModalOpen,
    editingItem,
    deletingItem,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    handleSaveItem,
    closeModal,
    confirmDelete,
    cancelDelete,
  };
};

export default useCrud;