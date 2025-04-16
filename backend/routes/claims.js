const express = require('express');
const router = express.Router();
const db = require('../db');
const client = require('../client');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const redisKey = `claims:${id}`;

    try {
        const cachedData = await client.get(redisKey);
        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        db.query(
            'SELECT relationship, status, created_at FROM claims WHERE user_id = ?',
            [id],
            async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Database query error', details: err });
                }

                if (results.length === 0) {
                    return res.json({ message: "You haven't reported any found person yet." });
                }

                await client.setEx(redisKey, 3600, JSON.stringify(results));
                res.json(results);
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

module.exports = router;