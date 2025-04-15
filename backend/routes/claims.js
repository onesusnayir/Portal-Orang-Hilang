const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT relationship, status, created_at FROM claims WHERE user_id = ?', [id] ,(err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error', details: err });
        }

        if (results.length === 0) {
            return res.json({ message: "You haven't reported any found person yet." });
        }

        res.json( results );
    });
});

module.exports = router;