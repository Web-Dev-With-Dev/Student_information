# Database Setup Guide

## Overview
This guide explains how to set up the MySQL database for the Student Information System (SIS) backend.

## Prerequisites
- MySQL Server (5.7 or higher) installed and running
- MySQL command-line client or MySQL Workbench
- Administrator access to your MySQL server

## Database Setup Steps

### Step 1: Create Database and Tables
Execute the SQL script to create the database and all necessary tables:

```bash
# Using MySQL CLI
mysql -u root -p < backend/database.sql
```

Or using MySQL Workbench:
1. Open MySQL Workbench
2. Go to File → Open SQL Script → Select `backend/database.sql`
3. Execute the script

### Step 2: Verify Database Creation
```bash
mysql -u root -p -e "USE sis_db; SHOW TABLES;"
```

You should see the following tables:
- `Department`
- `Student`
- `Instructor`
- `Course`
- `Enrollment`
- `Fee`

## Database Schema

### Department Table
| Column | Type | Key | Description |
|--------|------|-----|-------------|
| dept_id | INT | PRIMARY | Auto-increment department ID |
| dept_name | VARCHAR(100) | - | Department name |
| dept_code | VARCHAR(10) | UNIQUE | Department code (e.g., CE, IT) |
| email | VARCHAR(100) | - | Department email |
| phone | VARCHAR(20) | - | Department phone number |
| created_at | DATETIME | - | Record creation timestamp |

### Student Table
| Column | Type | Key | Description |
|--------|------|-----|-------------|
| student_id | INT | PRIMARY | Auto-increment student ID |
| roll_number | VARCHAR(50) | UNIQUE | Student roll number |
| first_name | VARCHAR(50) | - | Student's first name |
| last_name | VARCHAR(50) | - | Student's last name |
| email | VARCHAR(100) | UNIQUE | Student email |
| phone | VARCHAR(20) | - | Phone number |
| dob | DATE | - | Date of birth |
| gender | ENUM | - | Male/Female/Other |
| address | TEXT | - | Residential address |
| admission_date | DATE | - | Date of admission |
| dept_id | INT | FOREIGN | Reference to Department |
| status | ENUM | - | Active/Inactive/Graduated/Suspended |
| created_at | DATETIME | - | Record creation timestamp |

### Instructor Table
| Column | Type | Key | Description |
|--------|------|-----|-------------|
| instructor_id | INT | PRIMARY | Auto-increment instructor ID |
| emp_id | VARCHAR(50) | UNIQUE | Employee ID |
| first_name | VARCHAR(50) | - | Instructor's first name |
| last_name | VARCHAR(50) | - | Instructor's last name |
| email | VARCHAR(100) | UNIQUE | Instructor email |
| phone | VARCHAR(20) | - | Phone number |
| dob | DATE | - | Date of birth |
| gender | ENUM | - | Male/Female/Other |
| office_location | VARCHAR(100) | - | Office location |
| dept_id | INT | FOREIGN | Reference to Department |
| specialization | VARCHAR(100) | - | Area of specialization |
| hire_date | DATE | - | Date of hire |
| status | ENUM | - | Active/Inactive/On Leave |
| created_at | DATETIME | - | Record creation timestamp |

### Course Table
| Column | Type | Key | Description |
|--------|------|-----|-------------|
| course_id | INT | PRIMARY | Auto-increment course ID |
| course_code | VARCHAR(20) | UNIQUE | Course code (e.g., CE301) |
| course_name | VARCHAR(100) | - | Course name |
| description | TEXT | - | Course description |
| credits | INT | - | Credit hours |
| dept_id | INT | FOREIGN | Reference to Department |
| semester | ENUM | - | Fall/Spring/Summer |
| academic_year | YEAR | - | Academic year |
| capacity | INT | - | Maximum students allowed |
| created_at | DATETIME | - | Record creation timestamp |

### Enrollment Table
| Column | Type | Key | Description |
|--------|------|-----|-------------|
| enrollment_id | INT | PRIMARY | Auto-increment enrollment ID |
| student_id | INT | FOREIGN | Reference to Student |
| course_id | INT | FOREIGN | Reference to Course |
| enrollment_date | DATE | - | Date of enrollment |
| grade | VARCHAR(2) | - | Final grade (A, B, C, etc.) |
| status | ENUM | - | Enrolled/Completed/Dropped/Withdrawn |
| attendance | DECIMAL(5,2) | - | Attendance percentage |
| created_at | DATETIME | - | Record creation timestamp |

### Fee Table
| Column | Type | Key | Description |
|--------|------|-----|-------------|
| fee_id | INT | PRIMARY | Auto-increment fee ID |
| student_id | INT | FOREIGN | Reference to Student |
| amount | DECIMAL(10,2) | - | Fee amount |
| fee_type | VARCHAR(50) | - | Type of fee (Tuition, Library, etc.) |
| due_date | DATE | - | Due date for payment |
| payment_date | DATE | - | Actual payment date |
| status | ENUM | - | Pending/Paid/Overdue |
| remarks | TEXT | - | Additional notes |
| created_at | DATETIME | - | Record creation timestamp |

## Sample Data
The `database.sql` file includes sample data for testing:
- 4 Departments
- 5 Students
- 4 Instructors
- 5 Courses
- 7 Enrollments
- 7 Fee records

## Backend Connection

### Environment Variables
Create a `.env` file in the `backend` folder (use `.env.example` as template):

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_DATABASE=sis_db

# CORS Settings
CORS_ORIGIN=http://localhost:5173
```

### Verify Connection
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the backend server:
   ```bash
   npm start
   ```

3. Check for connection message:
   ```
   Successfully connected to the database.
   Server is running on http://localhost:3001
   ```

## Troubleshooting

### Connection Error: "PROTOCOL_CONNECTION_LOST"
- Ensure MySQL server is running
- Verify DB credentials in `.env` file
- Check if `sis_db` database exists

### Error: "Table 'sis_db.student' doesn't exist"
- Ensure you've run the `database.sql` script
- Verify the database name is `sis_db` (case-sensitive on Linux)

### Error: "Access denied for user 'root'@'localhost'"
- Check your MySQL password in `.env`
- Ensure you have proper MySQL permissions

### Error: "Unknown database 'sis_db'"
- Run the SQL script again: `mysql -u root -p < backend/database.sql`

## Useful MySQL Commands

### Check Database Status
```bash
mysql -u root -p -e "SELECT VERSION();"
```

### List All Databases
```bash
mysql -u root -p -e "SHOW DATABASES;"
```

### View Table Structure
```bash
mysql -u root -p sis_db -e "DESCRIBE Student;"
```

### View Sample Data
```bash
mysql -u root -p sis_db -e "SELECT * FROM Student LIMIT 5;"
```

### Reset Database
```bash
mysql -u root -p sis_db -e "DROP DATABASE IF EXISTS sis_db;"
mysql -u root -p < backend/database.sql
```

## Backend Routes (API Endpoints)

The backend provides the following API endpoints:

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Add new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Instructors
- `GET /api/instructors` - Get all instructors
- `POST /api/instructors` - Add new instructor
- `PUT /api/instructors/:id` - Update instructor
- `DELETE /api/instructors/:id` - Delete instructor

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Add new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Create enrollment
- `PUT /api/enrollments/:id` - Update enrollment
- `DELETE /api/enrollments/:id` - Delete enrollment

### Fees
- `GET /api/fees` - Get all fees
- `POST /api/fees` - Create fee record
- `PUT /api/fees/:id` - Update fee
- `DELETE /api/fees/:id` - Delete fee

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

### Health Check
- `GET /api/ping` - Health check endpoint

## Next Steps
1. Follow the [LOCAL_SETUP.md](./LOCAL_SETUP.md) to set up the complete development environment
2. Run both backend and frontend as described in [README.md](./README.md)
3. Access the application at `http://localhost:5173`
