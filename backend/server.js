require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db'); // Import db to test connection

const departmentRoutes = require('./routes/departments');
const studentRoutes = require('./routes/students');
const instructorRoutes = require('./routes/instructors');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');
const feeRoutes = require('./routes/fees');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// With the Vite proxy, a simple cors() setup is sufficient.
app.use(cors());
app.use(express.json());

// Add a ping route for health checks
app.get('/api/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
});

// API Routes
app.use('/api/departments', departmentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/dashboard', dashboardRoutes);


// Health check route
app.get('/', (req, res) => {
    res.send('SIS Backend is running!');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!', error: err.message });
});

const startServer = async () => {
    await db.testConnection(); // Test DB connection before starting the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();