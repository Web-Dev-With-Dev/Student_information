import React from 'react';
import { Instructor } from '../types';
import useCrud from '../hooks/useCrud';
import { api } from '../services/api';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmationDialog from '../components/ConfirmationDialog';

const InstructorForm: React.FC<{
  instructor: Partial<Instructor>;
  onSave: (instructor: Partial<Instructor>) => void;
  onCancel: () => void;
}> = ({ instructor, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(instructor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumberField = ['dept_id', 'salary'].includes(name);
    setFormData(prev => ({ 
        ...prev, 
        [name]: isNumberField ? (value === '' ? '' : Number(value)) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
     <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="email" name="email" placeholder="Email" value={formData.email || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="text" name="emp_id" placeholder="Employee ID" value={formData.emp_id || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="dept_id" placeholder="Dept ID" value={formData.dept_id || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification || ''} onChange={handleChange} className="bg-background border-border rounded-md" />
        <input type="number" name="salary" placeholder="Salary" value={formData.salary || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="date" name="joining_date" value={formData.joining_date || ''} onChange={handleChange} required className="bg-background border-border rounded-md text-text-secondary" />
        <select name="designation" value={formData.designation || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
            <option value="">Select Designation</option>
            <option>Professor</option>
            <option>Associate Professor</option>
            <option>Assistant Professor</option>
            <option>Lecturer</option>
        </select>
        <select name="status" value={formData.status || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Retired">Retired</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-border">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};


const InstructorsPage: React.FC = () => {
  const {
    items: instructors,
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
  } = useCrud<Instructor, 'instructor_id'>(api.instructors, 'instructor_id');

  const columns: Column<Instructor>[] = [
    { header: 'ID', accessor: 'instructor_id' },
    { header: 'Emp ID', accessor: 'emp_id' },
    { header: 'Name', accessor: (item: Instructor) => `${item.first_name} ${item.last_name}` },
    { header: 'Email', accessor: 'email' },
    { header: 'Designation', accessor: 'designation' },
    { header: 'Dept ID', accessor: 'dept_id' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Instructors</h1>
        <button onClick={handleAddItem} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Add Instructor</button>
      </div>
      {loading && <p>Loading instructors...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <DataTable columns={columns} data={instructors} onEdit={handleEditItem} onDelete={handleDeleteItem} />}
      {isModalOpen && (
        <Modal title={editingItem?.instructor_id ? "Edit Instructor" : "Add Instructor"} onClose={closeModal}>
          <InstructorForm
            instructor={editingItem || {}}
            onSave={handleSaveItem}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {deletingItem && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete instructor: ${deletingItem.first_name} ${deletingItem.last_name}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default InstructorsPage;