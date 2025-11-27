# Quick Start Guide (5 Minutes)

## Option 1: Windows Quick Setup

### 1. Setup Database (First time only)
```powershell
# Make sure MySQL is running, then:
mysql -u root -p < backend\database.sql
# Enter your MySQL password when prompted
```

### 2. Create Backend .env File
```powershell
cd backend
copy .env.example .env
# Edit .env with Notepad and set your MySQL password
notepad .env
```

Example `.env`:
```
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_DATABASE=sis_db
CORS_ORIGIN=http://localhost:5173
```

### 3. Create Frontend .env.local File
```powershell
cd ..
copy .env.example .env.local
```

Content (usually no changes needed):
```
VITE_API_URL=http://localhost:3001/api
```

### 4. Install Dependencies (First time only)
```powershell
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 5. Start Servers

**In PowerShell Terminal 1:**
```powershell
cd backend
npm start
# Should show: Server is running on http://localhost:3001
```

**In PowerShell Terminal 2:**
```powershell
npm run dev
# Should show: Local: http://localhost:5173
```

### 6. Open Browser
```
http://localhost:5173
```

---

## Option 2: Linux/Mac Quick Setup

### 1. Setup Database
```bash
mysql -u root -p < backend/database.sql
```

### 2. Create Backend .env
```bash
cd backend
cp .env.example .env
nano .env  # Edit with your MySQL password
```

### 3. Create Frontend .env.local
```bash
cd ..
cp .env.example .env.local
```

### 4. Install Dependencies
```bash
npm install
cd backend && npm install && cd ..
```

### 5. Start Servers

**Terminal 1:**
```bash
cd backend
npm start
```

**Terminal 2:**
```bash
npm run dev
```

### 6. Open Browser
```
http://localhost:5173
```

---

## Verification Checklist

- [ ] MySQL server is running
- [ ] Backend shows "Successfully connected to the database"
- [ ] Backend shows "Server is running on http://localhost:3001"
- [ ] Frontend shows Vite dev server info
- [ ] Browser opens http://localhost:5173 without errors
- [ ] Can see student list or dashboard (means database connected)

## Troubleshooting

### Backend won't start
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1;"

# Check port 3001 is free
# Windows: netstat -ano | findstr :3001
# Linux/Mac: lsof -i :3001
```

### Frontend shows "Failed to fetch"
```bash
# Ensure backend is running (check Terminal 1)
# Check .env.local has correct API URL
# Restart frontend: Ctrl+C, then npm run dev
```

### Database errors
```bash
# Verify database exists
mysql -u root -p -e "SHOW DATABASES;" | grep sis_db

# Re-create database if needed
mysql -u root -p < backend/database.sql
```

## What Works Now

✅ View all students, courses, instructors, departments, fees, enrollments
✅ Add new records
✅ Edit existing records
✅ Delete records
✅ See dashboard statistics
✅ All data syncs with MySQL database

## Next Steps

1. Explore the UI - click through all pages
2. Test adding a new student
3. Check MySQL to verify data: `mysql -u root -p sis_db -e "SELECT * FROM Student;"`
4. Review code in `services/api.ts` to understand API calls
5. Read [LOCAL_SETUP.md](./LOCAL_SETUP.md) for detailed documentation
6. Check [DATABASE_SETUP.md](./DATABASE_SETUP.md) for schema details

## Important Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 3001 | http://localhost:3001 |
| MySQL | 3306 | localhost (no web UI) |

## Ready for Production?

When ready to deploy:
1. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Check [PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)
3. See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for GitHub upload

---

**All Set!** 🚀 You now have a fully functional Student Information System running locally!
