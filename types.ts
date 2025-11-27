
export interface Department {
    dept_id: number;
    dept_name: string;
    dept_code: string;
    hod_name?: string;
    building?: string;
    phone?: string;
}

export interface Student {
    student_id: number;
    roll_number: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string; // YYYY-MM-DD
    gender: 'Male' | 'Female' | 'Other';
    address?: string;
    admission_date: string; // YYYY-MM-DD
    dept_id: number;
    status: 'Active' | 'Graduated' | 'Suspended';
}

export interface Instructor {
    instructor_id: number;
    emp_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dept_id: number;
    designation: 'Professor' | 'Associate Professor' | 'Assistant Professor' | 'Lecturer';
    qualification?: string;
    salary: number;
    joining_date: string; // YYYY-MM-DD
    status: 'Active' | 'On Leave' | 'Retired';
}

export interface Course {
    course_id: number;
    course_code: string;
    course_name: string;
    credits: number;
    dept_id: number;
    instructor_id?: number;
    course_type: 'Theory' | 'Lab' | 'Elective';
    semester: number;
    max_capacity: number;
    status: 'Active' | 'Inactive';
}

export interface Enrollment {
    enrollment_id: number;
    student_id: number;
    course_id: number;
    enrollment_date: string; // YYYY-MM-DD
    grade?: string;
    status: 'Enrolled' | 'Completed' | 'Dropped' | 'Failed';
}

export interface Fee {
    fee_id: number;
    student_id: number;
    semester: number;
    academic_year: string;
    tuition_fee: number;
    other_fee: number;
    total_fee: number;
    amount_paid: number;
    due_date: string; // YYYY-MM-DD
    status: 'Pending' | 'Partial' | 'Paid' | 'Overdue';
}

export type Page = 'Dashboard' | 'Departments' | 'Students' | 'Instructors' | 'Courses' | 'Enrollments' | 'Fees';

export interface DashboardStats {
  students: number;
  instructors: number;
  courses: number;
  departments: number;
}
