# Local Development Setup Guide

## Prerequisites
Ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MySQL Server** (5.7 or higher)
- **Git**

## Quick Start (5 minutes)

### 1. Clone and Install
```bash
# Navigate to project directory
cd sis-admin-panel

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Setup Database
```bash
# Create database and tables
mysql -u root -p < backend/database.sql

# When prompted, enter your MySQL root password
```

### 3. Configure Environment Variables

#### Backend Setup
Create `.env` file in `backend/` folder:
```bash
cd backend
# Copy example and edit
cp .env.example .env

# Edit .env with your MySQL credentials
# Linux/Mac: nano .env
# Windows: notepad .env
```

Content should be:
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=sis_db
CORS_ORIGIN=http://localhost:5173
```

#### Frontend Setup
Create `.env.local` file in root folder:
```bash
cd ..
# Copy example and edit
cp .env.example .env.local

# Edit .env.local
```

Content should be:
```env
VITE_API_URL=http://localhost:3001/api
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start Development Servers

#### Terminal 1 - Backend Server
```bash
cd backend
npm start
```

Expected output:
```
Successfully connected to the database.
Server is running on http://localhost:3001
```

#### Terminal 2 - Frontend Development Server
```bash
npm run dev
```

Expected output:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 5. Access Application
Open your browser and navigate to:
```
http://localhost:5173
```

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│         Frontend (Vite + React)             │
│         http://localhost:5173               │
├─────────────────────────────────────────────┤
│                                             │
│  ┌────────────────────────────────────┐    │
│  │   Vite Proxy                       │    │
│  │   /api → localhost:3001/api        │    │
│  └────────────────────────────────────┘    │
│                    │                        │
│                    ↓                        │
├─────────────────────────────────────────────┤
│         Backend (Express.js)                │
│         http://localhost:3001               │
├─────────────────────────────────────────────┤
│                                             │
│  ┌────────────────────────────────────┐    │
│  │   REST API Routes                  │    │
│  │   - /api/students                  │    │
│  │   - /api/courses                   │    │
│  │   - /api/instructors               │    │
│  │   - /api/enrollments               │    │
│  │   - /api/departments               │    │
│  │   - /api/fees                      │    │
│  └────────────────────────────────────┘    │
│                    │                        │
│                    ↓                        │
├─────────────────────────────────────────────┤
│         MySQL Database                      │
│         sis_db                              │
│                                             │
│  ┌────────────────────────────────────┐    │
│  │   Tables:                          │    │
│  │   - Department                     │    │
│  │   - Student                        │    │
│  │   - Instructor                     │    │
│  │   - Course                         │    │
│  │   - Enrollment                     │    │
│  │   - Fee                            │    │
│  └────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

## How Data Flows

### Example: Fetching Students

1. **Frontend** (http://localhost:5173):
   ```
   Frontend Component → API Call to `/api/students`
   ```

2. **Vite Proxy** (configured in vite.config.ts):
   ```
   /api/students → http://localhost:3001/api/students
   ```

3. **Backend** (http://localhost:3001):
   ```
   Express Route Handler → MySQL Query → Database
   ```

4. **Response Flow**:
   ```
   Database → Query Result → Express Handler → JSON Response → Frontend
   ```

## Development Features

### Frontend
- **Vite**: Fast build tool and dev server
- **React**: UI library
- **TypeScript**: Type-safe code
- **Hot Module Replacement (HMR)**: Changes reflect instantly

### Backend
- **Express.js**: Web framework
- **MySQL2/Promise**: Database driver with async/await
- **CORS**: Cross-origin resource sharing enabled
- **dotenv**: Environment variable management

## Common Tasks

### Add New Student
1. Navigate to Students page in frontend
2. Click "Add Student" button
3. Fill in form and submit
4. Frontend sends POST request to `/api/students`
5. Backend inserts into `Student` table
6. Response returned and UI updates

### View Course Enrollments
1. Navigate to Enrollments page
2. Frontend fetches `/api/enrollments`
3. Displays all enrollment records with student and course names

### Check Database Changes
```bash
# View all students
mysql -u root -p sis_db -e "SELECT * FROM Student;"

# View all courses
mysql -u root -p sis_db -e "SELECT * FROM Course;"

# Check specific student fees
mysql -u root -p sis_db -e "SELECT * FROM Fee WHERE student_id = 1;"
```

## Debugging

### View Backend Console
The backend server shows:
```
✓ Successful requests
✗ Error messages
✓ Query execution details
```

### View Frontend Console
Press `F12` in browser to open DevTools:
```
Network tab: See all API calls
Console tab: JavaScript errors
Application tab: Cookies, Local Storage
```

### Check Network Requests
1. Open Browser DevTools (F12)
2. Go to Network tab
3. Perform an action (add student, view courses, etc.)
4. Click request to see:
   - Request URL
   - Request body
   - Response status
   - Response data

## Stopping Servers

### Stop Backend
In Terminal 1: Press `Ctrl + C`

### Stop Frontend
In Terminal 2: Press `Ctrl + C`

## Troubleshooting

### Issue: "Cannot GET /api/students"
- Ensure backend is running (`npm start` in backend folder)
- Check if port 3001 is not in use
- Verify Vite proxy config in `vite.config.ts`

### Issue: "Database connection failed"
- Verify MySQL is running
- Check `.env` file has correct credentials
- Ensure `sis_db` database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Issue: "Port 5173 already in use"
```bash
# Find process using port 5173
# Windows:
netstat -ano | findstr :5173

# Then kill the process or use different port:
npm run dev -- --port 5174
```

### Issue: "CORS error"
- Ensure `CORS_ORIGIN=http://localhost:5173` in backend `.env`
- Restart backend server after changing `.env`

### Issue: Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For backend too
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Performance Tips

### Frontend Development
- Vite caches modules - refresh browser if stuck
- Use React DevTools browser extension for debugging
- Check Network tab for slow API calls

### Backend Optimization
- Database queries are logged to console
- Use indexes for frequently queried fields
- Connection pooling is configured for performance

## Next Steps

1. **Explore UI**: Navigate through all pages to understand the system
2. **Test CRUD Operations**: Create, read, update, delete records
3. **Check Database**: Verify data persists in MySQL
4. **Review Code**: Study API endpoints and React components
5. **Customize**: Modify UI, add new features, adjust business logic

## File Structure Reference

```
sis-admin-panel/
├── frontend files
│   ├── App.tsx              (Main React component)
│   ├── index.tsx            (Entry point)
│   ├── vite.config.ts       (Vite proxy configuration)
│   └── services/
│       └── api.ts           (API client)
├── backend/
│   ├── server.js            (Express server entry)
│   ├── db.js                (MySQL connection pool)
│   ├── database.sql         (Schema and sample data)
│   ├── .env.example         (Environment template)
│   └── routes/              (API endpoints)
├── components/              (React components)
├── pages/                   (Page components)
├── types.ts                 (TypeScript type definitions)
└── package.json             (Dependencies)
```

## Getting Help

1. Check error messages in console
2. Review [DATABASE_SETUP.md](./DATABASE_SETUP.md) for DB issues
3. Review [README.md](./README.md) for project overview
4. Check [INTEGRATION_VERIFICATION.md](./INTEGRATION_VERIFICATION.md) for testing

Good luck! Happy coding! 🚀
