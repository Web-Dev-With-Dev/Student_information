import React from 'react';
import { Fee } from '../types';
import useCrud from '../hooks/useCrud';
import { api } from '../services/api';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmationDialog from '../components/ConfirmationDialog';

const FeeForm: React.FC<{
  fee: Partial<Fee>;
  onSave: (fee: Partial<Fee>) => void;
  onCancel: () => void;
}> = ({ fee, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(fee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ 
        ...prev, 
        [name]: isNumber ? (value === '' ? '' : Number(value)) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
     <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="number" name="student_id" placeholder="Student ID" value={formData.student_id || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="semester" placeholder="Semester" value={formData.semester || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="text" name="academic_year" placeholder="Academic Year (e.g. 2023-24)" value={formData.academic_year || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="tuition_fee" placeholder="Tuition Fee" value={formData.tuition_fee || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="other_fee" placeholder="Other Fee" value={formData.other_fee || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="total_fee" placeholder="Total Fee" value={formData.total_fee || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="amount_paid" placeholder="Amount Paid" value={formData.amount_paid || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="date" name="due_date" value={formData.due_date || ''} onChange={handleChange} required className="bg-background border-border rounded-md text-text-secondary" />
        <select name="status" value={formData.status || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
            <option value="">Select Status</option>
            <option>Pending</option>
            <option>Partial</option>
            <option>Paid</option>
            <option>Overdue</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-border">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};

const FeesPage: React.FC = () => {
  const {
    items: fees,
    loading,
    error,
    isModalOpen,
    editingItem,
    deletingItem,
    confirmDelete,
    cancelDelete,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    handleSaveItem,
    closeModal,
  } = useCrud<Fee, 'fee_id'>(api.fees, 'fee_id');

  const columns: Column<Fee>[] = [
    { header: 'ID', accessor: 'fee_id' },
    { header: 'Student ID', accessor: 'student_id' },
    { header: 'Semester', accessor: 'semester' },
    { header: 'Total Fee', accessor: (item: Fee) => item.total_fee.toFixed(2) },
    { header: 'Amount Paid', accessor: (item: Fee) => item.amount_paid.toFixed(2) },
    { header: 'Due Date', accessor: (item) => new Date(item.due_date).toLocaleDateString() },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Fee Records</h1>
        <button onClick={handleAddItem} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Add Fee Record</button>
      </div>
      {loading && <p>Loading fees...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <DataTable columns={columns} data={fees} onEdit={handleEditItem} onDelete={handleDeleteItem} />}
      {isModalOpen && (
        <Modal title={editingItem?.fee_id ? "Edit Fee Record" : "Add Fee Record"} onClose={closeModal}>
          <FeeForm
            fee={editingItem || {}}
            onSave={handleSaveItem}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {deletingItem && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete fee record ${deletingItem.fee_id} for student ${deletingItem.student_id}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default FeesPage;