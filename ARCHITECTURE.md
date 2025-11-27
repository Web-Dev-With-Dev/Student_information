# Architecture & Data Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          STUDENT INFORMATION SYSTEM                         │
│                          (SIS Admin Panel)                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER LAYER                                     │
│                       (Web Browser - Any OS)                                │
│                    http://localhost:5173                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                                      │
│                    React + Vite (Port 5173)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ React Components                                                    │  │
│  │ ├── Dashboard Page       (Statistics & Overview)                   │  │
│  │ ├── Students Page        (View, Add, Edit, Delete)                │  │
│  │ ├── Courses Page         (View, Add, Edit, Delete)                │  │
│  │ ├── Instructors Page     (View, Add, Edit, Delete)                │  │
│  │ ├── Departments Page     (View, Add, Edit, Delete)                │  │
│  │ ├── Enrollments Page     (View, Add, Edit, Delete)                │  │
│  │ └── Fees Page            (View, Add, Edit, Delete)                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Vite Proxy Configuration                                            │  │
│  │ Rule: /api/* → http://localhost:3001/api/*                        │  │
│  │ (Solves CORS issues in development)                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ API Service Layer (services/api.ts)                                │  │
│  │ ├── departments.getAll()      → GET /api/departments              │  │
│  │ ├── students.getAll()         → GET /api/students                 │  │
│  │ ├── instructors.getAll()      → GET /api/instructors             │  │
│  │ ├── courses.getAll()          → GET /api/courses                 │  │
│  │ ├── enrollments.getAll()      → GET /api/enrollments             │  │
│  │ ├── fees.getAll()             → GET /api/fees                    │  │
│  │ └── ping()                    → GET /api/ping                    │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
                    HTTP Request to http://localhost:3001
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND LAYER                                       │
│                    Express.js (Port 3001)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Express Server (server.js)                                          │  │
│  │ ├── Middleware: CORS(), JSON Parser                                │  │
│  │ ├── Routes Manager                                                 │  │
│  │ └── Error Handler                                                  │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ API Route Handlers                                                  │  │
│  │ ├── routes/departments.js                                          │  │
│  │ ├── routes/students.js                                             │  │
│  │ ├── routes/instructors.js                                          │  │
│  │ ├── routes/courses.js                                              │  │
│  │ ├── routes/enrollments.js                                          │  │
│  │ ├── routes/fees.js                                                 │  │
│  │ └── routes/dashboard.js                                            │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                    ↓                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │ Database Connection Pool (db.js)                                    │  │
│  │ ├── Connection Pooling (mysql2/promise)                            │  │
│  │ ├── Error Handling & Retry Logic                                   │  │
│  │ └── Environment-based Configuration                                │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↓
                    SQL Query to localhost:3306
                                    ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER                                      │
│                    MySQL (Port 3306)                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Database: sis_db                                                          │
│  ├── Department                                                            │
│  │   └── Relationships: (1:N) with Student, Instructor, Course           │
│  ├── Student                                                               │
│  │   └── Relationships: (N:1) Department, (N:N) Course via Enrollment    │
│  ├── Instructor                                                            │
│  │   └── Relationships: (N:1) Department                                  │
│  ├── Course                                                                │
│  │   └── Relationships: (N:1) Department, (N:N) Student via Enrollment   │
│  ├── Enrollment                                                            │
│  │   └── Relationships: (N:1) Student, (N:1) Course                      │
│  └── Fee                                                                   │
│      └── Relationships: (N:1) Student                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Fetching Students Example

```
USER ACTION: Click "Students" page in UI
                            ↓
REACT COMPONENT: StudentsPage.tsx
  - Component mounts
  - useEffect hook triggers
                            ↓
API SERVICE CALL: api.students.getAll()
  - Function calls: fetchApi('/api/students', { method: 'GET' })
                            ↓
VITE PROXY INTERCEPTS:
  Request: GET /api/students
  Forwards to: GET http://localhost:3001/api/students
                            ↓
EXPRESS SERVER RECEIVES:
  app.use('/api/students', studentRoutes)
  Route: router.get('/', async (req, res, next) => { ... })
                            ↓
DATABASE QUERY EXECUTES:
  db.query('SELECT * FROM Student')
                            ↓
MYSQL PROCESSES QUERY:
  SELECT * FROM Student;
  Returns: [
    { student_id: 1, roll_number: 'STU001', ... },
    { student_id: 2, roll_number: 'STU002', ... },
    ...
  ]
                            ↓
RESPONSE SENT BACK:
  Express Handler → res.json(rows) → HTTP Response
                            ↓
FRONTEND RECEIVES:
  fetchApi processes response
  Returns: Promise<Student[]>
                            ↓
REACT UPDATE:
  useState setStudents(data)
  Component re-renders with new data
                            ↓
USER SEES: Student list displayed in table on page
```

---

## Database Schema Relationships

```
┌──────────────────────────────────────────────────────────────────┐
│                      DEPARTMENT TABLE                            │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ dept_id (PK) │ dept_name │ dept_code │ email │ phone       │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
    ↑              ↑                     ↑
    │              │                     │
    │ 1:N          │ 1:N                 │ 1:N
    │              │                     │
┌───┴──────┐  ┌──────┴─────┐      ┌─────┴───────┐
│ STUDENT  │  │ INSTRUCTOR │      │ COURSE      │
│ ────────────────────────  │      │ ─────────────│
│ student_id (PK)        │  │ instructor_id (PK)│ course_id (PK)
│ roll_number            │  │ emp_id            │ course_code
│ first_name             │  │ first_name        │ course_name
│ last_name              │  │ last_name         │ credits
│ email (UNIQUE)         │  │ email (UNIQUE)    │ dept_id (FK)
│ phone                  │  │ phone             │ semester
│ dob                    │  │ dob               │ academic_year
│ gender                 │  │ gender            │ capacity
│ address                │  │ office_location   │
│ admission_date         │  │ dept_id (FK) ──┐  │
│ dept_id (FK) ────┐     │  │ specialization  │  │
│ status                 │  │ hire_date       │  │
└───────────────────────┐ │  │ status          │  │
                        │ │  └────────────────┘  │
                        │ │         ↑            │
                        │ │         │ 1:N        │
                        │ └─────────┼────────────┘
                        │           │
                        │    ┌──────┴──────────┐
                        │    │ ENROLLMENT     │
                        │    │ ──────────────  │
                        └──→ │enrollment_id(PK)│
                             │student_id (FK)  │
                             │course_id (FK) ──┘
                             │enrollment_date
                             │grade
                             │status
                             │attendance
                             └──────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                       FEE TABLE                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ fee_id (PK) │ student_id (FK) → STUDENT (N:1)│ amount...│  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

Legend:
PK  = Primary Key (Unique identifier for record)
FK  = Foreign Key (Reference to another table)
N:1 = Many-to-One relationship
N:N = Many-to-Many relationship (through junction table)
```

---

## Request-Response Cycle

```
FRONTEND REQUEST
├── HTTP Method: GET, POST, PUT, DELETE
├── URL: /api/{resource}/{id?}
├── Headers: Content-Type: application/json, Authorization (if needed)
├── Body: { JSON data } (for POST, PUT)
└── Example:
    POST /api/students
    Content-Type: application/json
    { roll_number, first_name, last_name, email, phone, dob, gender, ... }

                            ↓

BACKEND PROCESSING
├── Route Match: /api/students → studentRoutes
├── Handler: router.post('/', async (req, res, next) => {})
├── Parse: Extract data from req.body
├── Validate: (Optional) Check data integrity
├── Query: db.query('INSERT INTO Student (...) VALUES (...)')
├── Error Handling: Catch and pass to next(err)
└── Response: res.status(201).json(newStudent)

                            ↓

FRONTEND RESPONSE
├── HTTP Status: 200 OK, 201 Created, 400 Bad Request, 500 Error
├── Headers: Content-Type: application/json
├── Body: { JSON response data }
└── Example:
    201 Created
    { student_id: 6, roll_number: 'STU006', first_name: 'New', ... }
```

---

## CRUD Operations Mapping

```
┌──────────────────────────────────────────────────────────────┐
│ OPERATION │ HTTP METHOD │ ENDPOINT        │ DESCRIPTION     │
├──────────────────────────────────────────────────────────────┤
│ CREATE    │ POST        │ /api/{resource} │ Add new record  │
│ READ      │ GET         │ /api/{resource} │ Fetch all       │
│ READ ONE  │ GET         │ /api/{resource}/:id │ Fetch one   │
│ UPDATE    │ PUT         │ /api/{resource}/:id │ Update record│
│ DELETE    │ DELETE      │ /api/{resource}/:id │ Remove record│
└──────────────────────────────────────────────────────────────┘

Example for Students:
┌──────────────────────────────────────────────────────────────┐
│ CREATE    │ POST        │ /api/students       │ Add student │
│ READ ALL  │ GET         │ /api/students       │ List all    │
│ READ ONE  │ GET         │ /api/students/1     │ Get #1      │
│ UPDATE    │ PUT         │ /api/students/1     │ Update #1   │
│ DELETE    │ DELETE      │ /api/students/1     │ Remove #1   │
└──────────────────────────────────────────────────────────────┘
```

---

## Environment-based Configuration

```
DEVELOPMENT SETUP (localhost)
┌─────────────────────────────────────────────────────────────┐
│ .env (Backend)                  .env.local (Frontend)        │
├─────────────────────────────────────────────────────────────┤
│ PORT=3001                       VITE_API_URL=               │
│ NODE_ENV=development            http://localhost:3001/api   │
│ DB_HOST=localhost                                            │
│ DB_USER=root                                                │
│ DB_PASSWORD=my_password                                     │
│ DB_DATABASE=sis_db                                          │
│ CORS_ORIGIN=                                                │
│   http://localhost:5173                                     │
└─────────────────────────────────────────────────────────────┘

PRODUCTION SETUP (deployed server)
┌─────────────────────────────────────────────────────────────┐
│ .env (Backend)                  .env.local (Frontend)        │
├─────────────────────────────────────────────────────────────┤
│ PORT=3001 (or from process)     VITE_API_URL=               │
│ NODE_ENV=production             https://api.yourdomain.com  │
│ DB_HOST=your-db-server.com                                  │
│ DB_USER=prod_user                                           │
│ DB_PASSWORD=secure_password                                 │
│ DB_DATABASE=sis_db_prod                                     │
│ CORS_ORIGIN=                                                │
│   https://www.yourdomain.com                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Interaction Flow

```
App.tsx (Main Component)
├── Sidebar Component
│   ├── Navigation links
│   └── Active page indicator
├── Pages Router (based on state/URL)
│   ├── DashboardPage
│   │   └── Uses: api.getDashboardStats()
│   ├── StudentsPage
│   │   ├── Renders: DataTable component
│   │   ├── Uses: useCrud hook
│   │   └── Calls: api.students (CRUD operations)
│   ├── CoursesPage
│   │   ├── Renders: DataTable component
│   │   ├── Uses: useCrud hook
│   │   └── Calls: api.courses (CRUD operations)
│   ├── InstructorsPage
│   │   ├── Renders: DataTable component
│   │   ├── Uses: useCrud hook
│   │   └── Calls: api.instructors (CRUD operations)
│   ├── DepartmentsPage
│   │   ├── Renders: DataTable component
│   │   ├── Uses: useCrud hook
│   │   └── Calls: api.departments (CRUD operations)
│   ├── EnrollmentsPage
│   │   ├── Renders: DataTable component
│   │   ├── Uses: useCrud hook
│   │   └── Calls: api.enrollments (CRUD operations)
│   └── FeesPage
│       ├── Renders: DataTable component
│       ├── Uses: useCrud hook
│       └── Calls: api.fees (CRUD operations)
├── Modal Component (for add/edit forms)
├── ConfirmationDialog Component (for delete confirmation)
└── Global Error Handler
```

---

## Summary

This architecture provides:
✅ Clean separation of concerns (Frontend, Backend, Database)
✅ Scalable design with modular components
✅ RESTful API design
✅ Type-safe TypeScript implementation
✅ Connection pooling for database efficiency
✅ Error handling at all layers
✅ CORS-free development with Vite proxy
✅ Production-ready deployment configuration
