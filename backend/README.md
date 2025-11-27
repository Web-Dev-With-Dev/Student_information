# Backend API Documentation

## Overview

The SIS Backend is built with Express.js and provides RESTful API endpoints for managing student information, courses, enrollments, and fees.

## Base URL

- **Development**: `http://localhost:3001/api`
- **Production**: Will depend on your deployment environment

## 🔌 Available Endpoints

### Health Check
- `GET /api/ping` - Server health check

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Instructors
- `GET /api/instructors` - Get all instructors
- `POST /api/instructors` - Create new instructor
- `PUT /api/instructors/:id` - Update instructor
- `DELETE /api/instructors/:id` - Delete instructor

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Create new enrollment
- `PUT /api/enrollments/:id` - Update enrollment
- `DELETE /api/enrollments/:id` - Delete enrollment

### Fees
- `GET /api/fees` - Get all fees
- `POST /api/fees` - Create new fee
- `PUT /api/fees/:id` - Update fee
- `DELETE /api/fees/:id` - Delete fee

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🚀 Getting Started

1. Copy `.env.example` to `.env`
2. Configure your MySQL database credentials
3. Run `npm install`
4. Run `npm start`

## 📋 Environment Variables

See `.env.example` for all available configuration options.

## 🔐 CORS Configuration

The backend accepts requests from the frontend URL specified in the `.env` file via the `CORS_ORIGIN` variable.

For local development: `http://localhost:5173`
For production: Set to your frontend domain

## 📊 Database Schema

See database documentation for the complete schema and relationships.

## 🐛 Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

## 📝 Request/Response Format

All requests and responses use JSON format with `Content-Type: application/json` header.
