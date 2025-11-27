import React from 'react';
import { Department } from '../types';
import useCrud from '../hooks/useCrud';
import { api } from '../services/api';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmationDialog from '../components/ConfirmationDialog';

const DepartmentForm: React.FC<{
  department: Partial<Department>;
  onSave: (department: Partial<Department>) => void;
  onCancel: () => void;
}> = ({ department, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(department);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary">Department Name</label>
        <input type="text" name="dept_name" value={formData.dept_name || ''} onChange={handleChange} required className="mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary">Department Code</label>
        <input type="text" name="dept_code" value={formData.dept_code || ''} onChange={handleChange} required className="mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
      </div>
       <div>
        <label className="block text-sm font-medium text-text-secondary">HOD Name</label>
        <input type="text" name="hod_name" value={formData.hod_name || ''} onChange={handleChange} className="mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
      </div>
       <div>
        <label className="block text-sm font-medium text-text-secondary">Building</label>
        <input type="text" name="building" value={formData.building || ''} onChange={handleChange} className="mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
      </div>
       <div>
        <label className="block text-sm font-medium text-text-secondary">Phone</label>
        <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className="mt-1 block w-full bg-background border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-border">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};

const DepartmentsPage: React.FC = () => {
  const {
    items: departments,
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
  } = useCrud<Department, 'dept_id'>(api.departments, 'dept_id');

  const columns: Column<Department>[] = [
    { header: 'ID', accessor: 'dept_id' },
    { header: 'Name', accessor: 'dept_name' },
    { header: 'Code', accessor: 'dept_code' },
    { header: 'HOD', accessor: 'hod_name' },
    { header: 'Building', accessor: 'building' },
    { header: 'Phone', accessor: 'phone' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Departments</h1>
        <button onClick={handleAddItem} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Add Department</button>
      </div>
      {loading && <p>Loading departments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <DataTable columns={columns} data={departments} onEdit={handleEditItem} onDelete={handleDeleteItem} />}
      {isModalOpen && (
        <Modal title={editingItem?.dept_id ? "Edit Department" : "Add Department"} onClose={closeModal}>
          <DepartmentForm
            department={editingItem || {}}
            onSave={handleSaveItem}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {deletingItem && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete department: ${deletingItem.dept_name}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default DepartmentsPage;