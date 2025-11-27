const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Enrollment');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { student_id, course_id, enrollment_date, grade, status } = req.body;
        const [result] = await db.query(
            'INSERT INTO Enrollment (student_id, course_id, enrollment_date, grade, status) VALUES (?, ?, ?, ?, ?)',
            [student_id, course_id, enrollment_date, grade, status]
        );
        const [newRow] = await db.query('SELECT * FROM Enrollment WHERE enrollment_id = ?', [result.insertId]);
        res.status(201).json(newRow[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { student_id, course_id, enrollment_date, grade, status } = req.body;
        await db.query(
            'UPDATE Enrollment SET student_id = ?, course_id = ?, enrollment_date = ?, grade = ?, status = ? WHERE enrollment_id = ?',
            [student_id, course_id, enrollment_date, grade, status, req.params.id]
        );
        const [updatedRow] = await db.query('SELECT * FROM Enrollment WHERE enrollment_id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.query('DELETE FROM Enrollment WHERE enrollment_id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
