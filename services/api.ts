import { Department, Student, Instructor, Course, Enrollment, Fee, DashboardStats } from '../types';

const API_BASE_URL = '/api'; // Use relative path for proxy

/**
 * A helper function to handle fetch requests and JSON parsing.
 * Throws an error if the network response is not ok.
 */
const fetchApi = async (url: string, options?: RequestInit) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
            throw new Error(errorData.message || `Server responded with status: ${response.status}`);
        }
        // For DELETE requests which might not have a body
        if (response.status === 204) {
            return;
        }
        return response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            console.error('Network Error: Failed to fetch. Is the backend server running and accessible? Check for CORS issues.');
            throw new Error('Could not connect to the server. Please ensure it is running and accessible.');
        }
        // Re-throw other errors
        throw error;
    }
};


const createApiEndpoints = <T extends Record<string, any>, K extends keyof T>(resource: string, primaryKey: K) => {
    const resourceUrl = `${API_BASE_URL}/${resource}`;
    
    return {
        getAll: (): Promise<T[]> => fetchApi(resourceUrl),
        
        add: (item: Omit<T, K>): Promise<T> => fetchApi(resourceUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        }),
        
        update: (id: T[K], updatedItem: Partial<T>): Promise<T> => fetchApi(`${resourceUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem),
        }),
        
        delete: (id: T[K]): Promise<void> => fetchApi(`${resourceUrl}/${id}`, {
            method: 'DELETE',
        }),
    };
};

const getDashboardStats = (): Promise<DashboardStats> => {
    return fetchApi(`${API_BASE_URL}/dashboard/stats`);
};

const getAllDataForReport = async (): Promise<any> => {
    // This can be a new endpoint or multiple calls
    const [departments, students, instructors, courses, enrollments, fees] = await Promise.all([
        api.departments.getAll(),
        api.students.getAll(),
        api.instructors.getAll(),
        api.courses.getAll(),
        api.enrollments.getAll(),
        api.fees.getAll(),
    ]);
    return { departments, students, instructors, courses, enrollments, fees };
};

const ping = (): Promise<{ message: string }> => {
    return fetchApi(`${API_BASE_URL}/ping`);
};


export const api = {
    departments: createApiEndpoints<Department, 'dept_id'>('departments', 'dept_id'),
    students: createApiEndpoints<Student, 'student_id'>('students', 'student_id'),
    instructors: createApiEndpoints<Instructor, 'instructor_id'>('instructors', 'instructor_id'),
    courses: createApiEndpoints<Course, 'course_id'>('courses', 'course_id'),
    enrollments: createApiEndpoints<Enrollment, 'enrollment_id'>('enrollments', 'enrollment_id'),
    fees: createApiEndpoints<Fee, 'fee_id'>('fees', 'fee_id'),
    getDashboardStats,
    getAllDataForReport,
    ping
};