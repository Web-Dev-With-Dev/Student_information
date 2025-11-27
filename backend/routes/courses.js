const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Course');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { course_code, course_name, credits, dept_id, instructor_id, course_type, semester, max_capacity, status } = req.body;
        const [result] = await db.query(
            'INSERT INTO Course (course_code, course_name, credits, dept_id, instructor_id, course_type, semester, max_capacity, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [course_code, course_name, credits, dept_id, instructor_id, course_type, semester, max_capacity, status]
        );
        const [newRow] = await db.query('SELECT * FROM Course WHERE course_id = ?', [result.insertId]);
        res.status(201).json(newRow[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { course_code, course_name, credits, dept_id, instructor_id, course_type, semester, max_capacity, status } = req.body;
        await db.query(
            'UPDATE Course SET course_code = ?, course_name = ?, credits = ?, dept_id = ?, instructor_id = ?, course_type = ?, semester = ?, max_capacity = ?, status = ? WHERE course_id = ?',
            [course_code, course_name, credits, dept_id, instructor_id, course_type, semester, max_capacity, status, req.params.id]
        );
        const [updatedRow] = await db.query('SELECT * FROM Course WHERE course_id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.query('DELETE FROM Course WHERE course_id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
