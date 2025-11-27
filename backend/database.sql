CREATE DATABASE IF NOT EXISTS sis_db; 
 
USE sis_db;

-- Department Table
CREATE TABLE IF NOT EXISTS Department (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    dept_code VARCHAR(10) UNIQUE NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Student Table
CREATE TABLE IF NOT EXISTS Student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    roll_number VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    address TEXT,
    admission_date DATE NOT NULL,
    dept_id INT NOT NULL,
    status ENUM('Active', 'Inactive', 'Graduated', 'Suspended') DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE RESTRICT
);

-- Instructor Table
CREATE TABLE IF NOT EXISTS Instructor (
    instructor_id INT PRIMARY KEY AUTO_INCREMENT,
    emp_id VARCHAR(50) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    dob DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    office_location VARCHAR(100),
    dept_id INT NOT NULL,
    specialization VARCHAR(100),
    hire_date DATE NOT NULL,
    status ENUM('Active', 'Inactive', 'On Leave') DEFAULT 'Active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE RESTRICT
);

-- Course Table
CREATE TABLE IF NOT EXISTS Course (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    credits INT NOT NULL,
    dept_id INT NOT NULL,
    semester ENUM('Fall', 'Spring', 'Summer') NOT NULL,
    academic_year YEAR NOT NULL,
    capacity INT DEFAULT 30,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id) ON DELETE RESTRICT
);

-- Enrollment Table
CREATE TABLE IF NOT EXISTS Enrollment (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    grade VARCHAR(2),
    status ENUM('Enrolled', 'Completed', 'Dropped', 'Withdrawn') DEFAULT 'Enrolled',
    attendance DECIMAL(5, 2) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id)
);

-- Fee Table
CREATE TABLE IF NOT EXISTS Fee (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    fee_type VARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    payment_date DATE,
    status ENUM('Pending', 'Paid', 'Overdue') DEFAULT 'Pending',
    remarks TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Student(student_id) ON DELETE CASCADE
);

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert Departments
INSERT INTO Department (dept_name, dept_code, email, phone) VALUES
('Computer Engineering', 'CE', 'ce@university.edu', '+1-555-0101'),
('Information Technology', 'IT', 'it@university.edu', '+1-555-0102'),
('Mechanical Engineering', 'ME', 'me@university.edu', '+1-555-0103'),
('Electrical Engineering', 'EE', 'ee@university.edu', '+1-555-0104');

-- Insert Students
INSERT INTO Student (roll_number, first_name, last_name, email, phone, dob, gender, address, admission_date, dept_id, status) VALUES
('STU001', 'Raj', 'Sharma', 'raj.sharma@uni.edu', '+1-555-1001', '2003-05-15', 'Male', '123 Main St', '2024-07-15', 1, 'Active'),
('STU002', 'Priya', 'Patel', 'priya.patel@uni.edu', '+1-555-1002', '2003-02-20', 'Female', '456 Oak Ave', '2024-07-15', 1, 'Active'),
('STU003', 'Amit', 'Verma', 'amit.verma@uni.edu', '+1-555-1003', '2003-11-10', 'Male', '789 Pine Rd', '2024-07-15', 2, 'Active'),
('STU004', 'Neha', 'Joshi', 'neha.joshi@uni.edu', '+1-555-1004', '2003-07-30', 'Female', '321 Elm St', '2024-07-15', 2, 'Active'),
('STU005', 'Sanjay', 'Kumar', 'sanjay.kumar@uni.edu', '+1-555-1005', '2003-12-25', 'Male', '654 Birch Ln', '2024-07-15', 3, 'Active');

-- Insert Instructors
INSERT INTO Instructor (emp_id, first_name, last_name, email, phone, dob, gender, office_location, dept_id, specialization, hire_date, status) VALUES
('EMP001', 'Dr. Reshma', 'Dayma', 'reshma.dayma@uni.edu', '+1-555-2001', '1975-03-15', 'Female', 'CE-101', 1, 'Database Systems', '2010-08-01', 'Active'),
('EMP002', 'Dr. Pankaj', 'Prajapati', 'pankaj.p@uni.edu', '+1-555-2002', '1980-07-22', 'Male', 'CE-102', 1, 'Algorithms', '2015-01-15', 'Active'),
('EMP003', 'Dr. Sanjay', 'Patel', 'sanjay.p@uni.edu', '+1-555-2003', '1978-11-30', 'Male', 'IT-201', 2, 'Web Technologies', '2012-03-01', 'Active'),
('EMP004', 'Dr. Meera', 'Desai', 'meera.d@uni.edu', '+1-555-2004', '1982-04-18', 'Female', 'ME-301', 3, 'Thermodynamics', '2018-08-15', 'Active');

-- Insert Courses
INSERT INTO Course (course_code, course_name, description, credits, dept_id, semester, academic_year, capacity) VALUES
('CE301', 'Database Management Systems', 'Fundamentals of database design and SQL', 4, 1, 'Fall', 2024, 30),
('CE302', 'Data Structures', 'Study of fundamental data structures and algorithms', 4, 1, 'Fall', 2024, 30),
('IT301', 'Web Technologies', 'Introduction to web development technologies', 3, 2, 'Fall', 2024, 35),
('ME301', 'Thermodynamics', 'Fundamental principles of thermodynamics', 4, 3, 'Fall', 2024, 25),
('EE301', 'Circuit Analysis', 'Basics of electrical circuits', 4, 4, 'Fall', 2024, 28);

-- Insert Enrollments
INSERT INTO Enrollment (student_id, course_id, enrollment_date, status, attendance) VALUES
(1, 1, '2024-07-15', 'Enrolled', 85.5),
(1, 2, '2024-07-15', 'Enrolled', 90.0),
(2, 1, '2024-07-15', 'Enrolled', 88.0),
(2, 2, '2024-07-15', 'Enrolled', 92.5),
(3, 3, '2024-07-15', 'Enrolled', 87.0),
(4, 3, '2024-07-15', 'Enrolled', 91.0),
(5, 4, '2024-07-15', 'Enrolled', 86.5);

-- Insert Fees
INSERT INTO Fee (student_id, amount, fee_type, due_date, status) VALUES
(1, 5000, 'Tuition', '2024-08-30', 'Paid'),
(1, 500, 'Library', '2024-08-30', 'Pending'),
(2, 5000, 'Tuition', '2024-08-30', 'Paid'),
(2, 500, 'Library', '2024-08-30', 'Paid'),
(3, 5000, 'Tuition', '2024-08-30', 'Pending'),
(4, 5000, 'Tuition', '2024-08-30', 'Paid'),
(5, 5000, 'Tuition', '2024-08-30', 'Paid');