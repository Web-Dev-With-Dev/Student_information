# Student Information System (SIS) - Admin Panel

A full-stack web application for managing student information, courses, enrollments, and fees. Built with React (TypeScript) frontend and Express.js backend with MySQL database.

## 🎯 Features

- **Dashboard**: Overview of key statistics and data summaries
- **Student Management**: Create, read, update, delete student records
- **Course Management**: Manage course offerings and details
- **Department Management**: Organize courses and instructors by department
- **Instructor Management**: Track instructor information
- **Enrollment Management**: Manage student course enrollments
- **Fee Management**: Track and manage student fees
- **AI Integration**: Gemini API for intelligent features

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)
- **Gemini API Key** (for AI features)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sis-admin-panel.git
cd sis-admin-panel
```

### 2. Frontend Setup

```bash
# Install frontend dependencies
npm install

# Create .env.local from .env.example
cp .env.example .env.local

# Add your Gemini API key to .env.local
# GEMINI_API_KEY=your_key_here
```

### 3. Backend Setup

```bash
cd backend

# Install backend dependencies
npm install

# Create .env from .env.example
cp .env.example .env

# Configure your MySQL credentials in .env
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_DATABASE=sis_db
```

### 4. Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE sis_db;
USE sis_db;

-- Create your tables here
-- See database schema documentation
```

2. Or import from a dump file if provided:
```bash
mysql -u root -p sis_db < database_schema.sql
```

### 5. Run the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend Dev Server:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## 📁 Project Structure

```
sis-admin-panel/
├── frontend files (React + TypeScript)
├── components/          # React components
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── types.ts            # TypeScript type definitions
├── vite.config.ts      # Vite configuration
├── backend/            # Express.js backend
│   ├── server.js       # Express app setup
│   ├── db.js           # Database connection
│   ├── routes/         # API route handlers
│   └── package.json    # Backend dependencies
└── package.json        # Frontend dependencies
```

## 🔌 API Integration

The frontend communicates with the backend through a proxy configured in `vite.config.ts`:

- **Frontend**: Runs on `http://localhost:5173`
- **Backend**: Runs on `http://localhost:3001`
- **Proxy**: API requests to `/api/*` are forwarded to `http://localhost:3001/api/*`

This setup eliminates CORS issues during development.

## 🛠️ Available Scripts

### Frontend
```bash
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

### Backend
```bash
npm start         # Start Express server
```

## 📦 Deployment

### Building for Production

```bash
# Build frontend
npm run build

# The output will be in the dist/ folder
# This can be served by any static file server or Node.js
```

### Environment Variables for Production

**Frontend (.env.local)**
```
GEMINI_API_KEY=your_production_key
VITE_API_URL=https://your-backend-domain.com/api
```

**Backend (.env)**
```
PORT=3001
NODE_ENV=production
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
CORS_ORIGIN=https://your-frontend-domain.com
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment guide.

## 🔒 Security Notes

1. **Never commit `.env` files** - they contain sensitive information
2. **Use environment-specific configurations** for development and production
3. **Store API keys securely** in your deployment environment
4. **Update dependencies regularly** to patch security vulnerabilities

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Ensure backend server is running on port 3001
- Check if MySQL is running
- Verify database credentials in backend `.env`
- Check browser console for CORS errors

### Database connection failed
- Verify MySQL server is running
- Check database credentials in `.env`
- Ensure the database exists
- Verify user permissions

### Build errors
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Check Node.js version compatibility

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues or questions, please create an issue on GitHub.
