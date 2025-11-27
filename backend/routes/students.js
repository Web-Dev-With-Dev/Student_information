const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Student');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { roll_number, first_name, last_name, email, phone, dob, gender, address, admission_date, dept_id, status } = req.body;
        const [result] = await db.query(
            'INSERT INTO Student (roll_number, first_name, last_name, email, phone, dob, gender, address, admission_date, dept_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [roll_number, first_name, last_name, email, phone, dob, gender, address, admission_date, dept_id, status]
        );
        const [newRow] = await db.query('SELECT * FROM Student WHERE student_id = ?', [result.insertId]);
        res.status(201).json(newRow[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { roll_number, first_name, last_name, email, phone, dob, gender, address, admission_date, dept_id, status } = req.body;
        await db.query(
            'UPDATE Student SET roll_number = ?, first_name = ?, last_name = ?, email = ?, phone = ?, dob = ?, gender = ?, address = ?, admission_date = ?, dept_id = ?, status = ? WHERE student_id = ?',
            [roll_number, first_name, last_name, email, phone, dob, gender, address, admission_date, dept_id, status, req.params.id]
        );
        const [updatedRow] = await db.query('SELECT * FROM Student WHERE student_id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.query('DELETE FROM Student WHERE student_id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
