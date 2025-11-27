const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/stats', async (req, res, next) => {
    try {
        const [students] = await db.query('SELECT COUNT(*) as count FROM Student');
        const [instructors] = await db.query('SELECT COUNT(*) as count FROM Instructor');
        const [courses] = await db.query("SELECT COUNT(*) as count FROM Course WHERE status = 'Active'");
        const [departments] = await db.query('SELECT COUNT(*) as count FROM Department');

        res.json({
            students: students[0].count,
            instructors: instructors[0].count,
            courses: courses[0].count,
            departments: departments[0].count,
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;
