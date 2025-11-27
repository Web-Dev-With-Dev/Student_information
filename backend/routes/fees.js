const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await db.query('SELECT * FROM Fees');
        res.json(rows);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { student_id, semester, academic_year, tuition_fee, other_fee, total_fee, amount_paid, due_date, status } = req.body;
        const [result] = await db.query(
            'INSERT INTO Fees (student_id, semester, academic_year, tuition_fee, other_fee, total_fee, amount_paid, due_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [student_id, semester, academic_year, tuition_fee, other_fee, total_fee, amount_paid, due_date, status]
        );
        const [newRow] = await db.query('SELECT * FROM Fees WHERE fee_id = ?', [result.insertId]);
        res.status(201).json(newRow[0]);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { student_id, semester, academic_year, tuition_fee, other_fee, total_fee, amount_paid, due_date, status } = req.body;
        await db.query(
            'UPDATE Fees SET student_id = ?, semester = ?, academic_year = ?, tuition_fee = ?, other_fee = ?, total_fee = ?, amount_paid = ?, due_date = ?, status = ? WHERE fee_id = ?',
            [student_id, semester, academic_year, tuition_fee, other_fee, total_fee, amount_paid, due_date, status, req.params.id]
        );
        const [updatedRow] = await db.query('SELECT * FROM Fees WHERE fee_id = ?', [req.params.id]);
        res.json(updatedRow[0]);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.query('DELETE FROM Fees WHERE fee_id = ?', [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
