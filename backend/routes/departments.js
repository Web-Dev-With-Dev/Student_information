const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all departments
router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Department');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

// ADD a new department
router.post('/', async (req, res, next) => {
    try {
        const { dept_name, dept_code, hod_name, building, phone } = req.body;
        const [result] = await db.query(
            'INSERT INTO Department (dept_name, dept_code, hod_name, building, phone) VALUES (?, ?, ?, ?, ?)',
            [dept_name, dept_code, hod_name, building, phone]
        );
        const [newRow] = await db.query('SELECT * FROM Department WHERE dept_id = ?', [result.insertId]);
        res.status(201).json(newRow[0]);
    } catch (err) {
        next(err);
    }
});

// UPDATE a department
router.put('/:id', async (req, res, next) => {
    try {
        const { dept_name, dept_code, hod_name, building, phone } = req.body;
        await db.query(
            'UPDATE Department SET dept_name = ?, dept_code = ?, hod_name = ?, building = ?, phone = ? WHERE dept_id = ?',
            [dept_name, dept_code, hod_name, building, phone, req.params.id]
        );
        const [updatedRow] = await db.query('SELECT * FROM Department WHERE dept_id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        next(err);
    }
});

// DELETE a department
router.delete('/:id', async (req, res, next) => {
    try {
        await db.query('DELETE FROM Department WHERE dept_id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        // Handle foreign key constraint error
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
           return res.status(400).json({ message: 'Cannot delete department. It is referenced by students, instructors, or courses.' });
        }
        next(err);
    }
});

module.exports = router;
