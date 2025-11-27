import React from 'react';
import { Enrollment } from '../types';
import useCrud from '../hooks/useCrud';
import { api } from '../services/api';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmationDialog from '../components/ConfirmationDialog';

const EnrollmentForm: React.FC<{
  enrollment: Partial<Enrollment>;
  onSave: (enrollment: Partial<Enrollment>) => void;
  onCancel: () => void;
}> = ({ enrollment, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(enrollment);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumberField = ['student_id', 'course_id'].includes(name);
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
        <input type="number" name="student_id" placeholder="Student ID" value={formData.student_id || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="course_id" placeholder="Course ID" value={formData.course_id || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="date" name="enrollment_date" value={formData.enrollment_date || ''} onChange={handleChange} required className="bg-background border-border rounded-md text-text-secondary" />
        <input type="text" name="grade" placeholder="Grade (e.g. A+)" value={formData.grade || ''} onChange={handleChange} className="bg-background border-border rounded-md" />
        <select name="status" value={formData.status || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
            <option value="">Select Status</option>
            <option>Enrolled</option>
            <option>Completed</option>
            <option>Dropped</option>
            <option>Failed</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-border">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};

const EnrollmentsPage: React.FC = () => {
  const {
    items: enrollments,
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
  } = useCrud<Enrollment, 'enrollment_id'>(api.enrollments, 'enrollment_id');

  const columns: Column<Enrollment>[] = [
    { header: 'ID', accessor: 'enrollment_id' },
    { header: 'Student ID', accessor: 'student_id' },
    { header: 'Course ID', accessor: 'course_id' },
    { header: 'Date', accessor: (item) => new Date(item.enrollment_date).toLocaleDateString() },
    { header: 'Grade', accessor: 'grade' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Enrollments</h1>
        <button onClick={handleAddItem} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Add Enrollment</button>
      </div>
      {loading && <p>Loading enrollments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <DataTable columns={columns} data={enrollments} onEdit={handleEditItem} onDelete={handleDeleteItem} />}
      {isModalOpen && (
        <Modal title={editingItem?.enrollment_id ? "Edit Enrollment" : "Add Enrollment"} onClose={closeModal}>
          <EnrollmentForm
            enrollment={editingItem || {}}
            onSave={handleSaveItem}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {deletingItem && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete enrollment ID: ${deletingItem.enrollment_id}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default EnrollmentsPage;