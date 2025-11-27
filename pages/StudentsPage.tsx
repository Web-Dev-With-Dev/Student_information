import React from 'react';
import { Student } from '../types';
import useCrud from '../hooks/useCrud';
import { api } from '../services/api';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmationDialog from '../components/ConfirmationDialog';

const StudentForm: React.FC<{
  student: Partial<Student>;
  onSave: (student: Partial<Student>) => void;
  onCancel: () => void;
}> = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(student);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumberField = name === 'dept_id';
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
        <input type="text" name="roll_number" placeholder="Roll Number" value={formData.roll_number || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} required className="bg-background border-border rounded-md text-text-secondary" />
        <select name="gender" value={formData.gender || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="admission_date" value={formData.admission_date || ''} onChange={handleChange} required className="bg-background border-border rounded-md text-text-secondary" />
        <input type="number" name="dept_id" placeholder="Department ID" value={formData.dept_id || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <select name="status" value={formData.status || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
          <option value="Active">Active</option>
          <option value="Graduated">Graduated</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-border">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};

const StudentsPage: React.FC = () => {
  const {
    items: students,
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
  } = useCrud<Student, 'student_id'>(api.students, 'student_id');

  const columns: Column<Student>[] = [
    { header: 'ID', accessor: 'student_id' },
    { header: 'Roll No', accessor: 'roll_number' },
    { header: 'Name', accessor: (item: Student) => `${item.first_name} ${item.last_name}` },
    { header: 'Email', accessor: 'email' },
    { header: 'Dept ID', accessor: 'dept_id' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <button onClick={handleAddItem} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Add Student</button>
      </div>
      {loading && <p>Loading students...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <DataTable columns={columns} data={students} onEdit={handleEditItem} onDelete={handleDeleteItem} />}
      {isModalOpen && (
        <Modal title={editingItem?.student_id ? "Edit Student" : "Add Student"} onClose={closeModal}>
          <StudentForm
            student={editingItem || {}}
            onSave={handleSaveItem}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {deletingItem && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete student: ${deletingItem.first_name} ${deletingItem.last_name}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default StudentsPage;