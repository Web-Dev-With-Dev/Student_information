import React from 'react';
import { Course } from '../types';
import useCrud from '../hooks/useCrud';
import { api } from '../services/api';
import DataTable, { Column } from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmationDialog from '../components/ConfirmationDialog';

const CourseForm: React.FC<{
  course: Partial<Course>;
  onSave: (course: Partial<Course>) => void;
  onCancel: () => void;
}> = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState(course);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isNumber = ['credits', 'dept_id', 'instructor_id', 'semester', 'max_capacity'].includes(name);
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
        <input type="text" name="course_name" placeholder="Course Name" value={formData.course_name || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="text" name="course_code" placeholder="Course Code" value={formData.course_code || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="credits" placeholder="Credits" value={formData.credits || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="dept_id" placeholder="Dept ID" value={formData.dept_id || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="instructor_id" placeholder="Instructor ID (Optional)" value={formData.instructor_id || ''} onChange={handleChange} className="bg-background border-border rounded-md" />
        <input type="number" name="semester" placeholder="Semester" value={formData.semester || ''} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <input type="number" name="max_capacity" placeholder="Max Capacity" value={formData.max_capacity || 60} onChange={handleChange} required className="bg-background border-border rounded-md" />
        <select name="course_type" value={formData.course_type || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
            <option value="">Select Type</option>
            <option>Theory</option>
            <option>Lab</option>
            <option>Elective</option>
        </select>
         <select name="status" value={formData.status || ''} onChange={handleChange} required className="bg-background border-border rounded-md">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-surface text-text-primary rounded-md hover:bg-border">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Save</button>
      </div>
    </form>
  );
};


const CoursesPage: React.FC = () => {
  const {
    items: courses,
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
  } = useCrud<Course, 'course_id'>(api.courses, 'course_id');

  const columns: Column<Course>[] = [
    { header: 'ID', accessor: 'course_id' },
    { header: 'Code', accessor: 'course_code' },
    { header: 'Name', accessor: 'course_name' },
    { header: 'Credits', accessor: 'credits' },
    { header: 'Semester', accessor: 'semester' },
    { header: 'Dept ID', accessor: 'dept_id' },
    { header: 'Instructor ID', accessor: 'instructor_id' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <button onClick={handleAddItem} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700">Add Course</button>
      </div>
      {loading && <p>Loading courses...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <DataTable columns={columns} data={courses} onEdit={handleEditItem} onDelete={handleDeleteItem} />}
      {isModalOpen && (
        <Modal title={editingItem?.course_id ? "Edit Course" : "Add Course"} onClose={closeModal}>
          <CourseForm
            course={editingItem || {}}
            onSave={handleSaveItem}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {deletingItem && (
        <ConfirmationDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete course: ${deletingItem.course_name}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default CoursesPage;