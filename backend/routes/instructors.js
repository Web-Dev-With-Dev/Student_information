const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Instructor');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { emp_id, first_name, last_name, email, phone, dept_id, designation, qualification, salary, joining_date, status } = req.body;
        const [result] = await db.query(
            'INSERT INTO Instructor (emp_id, first_name, last_name, email, phone, dept_id, designation, qualification, salary, joining_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [emp_id, first_name, last_name, email, phone, dept_id, designation, qualification, salary, joining_date, status]
        );
        const [newRow] = await db.query('SELECT * FROM Instructor WHERE instructor_id = ?', [result.insertId]);
        res.status(201).json(newRow[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { emp_id, first_name, last_name, email, phone, dept_id, designation, qualification, salary, joining_date, status } = req.body;
        await db.query(
            'UPDATE Instructor SET emp_id = ?, first_name = ?, last_name = ?, email = ?, phone = ?, dept_id = ?, designation = ?, qualification = ?, salary = ?, joining_date = ?, status = ? WHERE instructor_id = ?',
            [emp_id, first_name, last_name, email, phone, dept_id, designation, qualification, salary, joining_date, status, req.params.id]
        );
        const [updatedRow] = await db.query('SELECT * FROM Instructor WHERE instructor_id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.query('DELETE FROM Instructor WHERE instructor_id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
