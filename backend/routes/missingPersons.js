const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db');
const client = require('../client');

// Set up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/missing person photos');
    },
    filename: function (req, file, cb) {
        const ext = '.' + file.mimetype.split('/')[1];
        const filename = file.originalname.replace(ext, '');
        const uniquefilename = filename + '-' + Date.now() + ext;
        cb(null, uniquefilename);
    }
});

const upload = multer({ storage: storage });

// Create new missing person report
router.post('/', upload.single('photo_url'),(req, res) => {
    const { user_id, full_name, age, gender, height, weight, last_seen_location, last_seen_date } = req.body;

    const photoPath = req.file ? req.file.path : null;

    db.query('INSERT INTO missing_persons (user_id, full_name, age, gender, height, weight, last_seen_location, last_seen_date, photo_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [user_id, full_name, age, gender, height, weight, last_seen_location, last_seen_date, photoPath, "missing"],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Database insertion error', details: err });
            res.json({ message: 'Missing person report created successfully' });
        });
});

// Get all missing persons
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const redisKey = `missing_persons:${id}`;

    try {
        const cachedData = await client.get(redisKey);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        db.query('SELECT full_name, status, created_at FROM missing_persons', 
            async (err, results) => {
            if (err) return res.status(500).json({ error: 'Database query error', details: err });

            if (results.length === 0) return res.json({ message: "You haven't reported any missing person yet." });
            
            client.setEx(redisKey, 3600, JSON.stringify(results));
            res.json(results);
        });
    }catch(error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }

});

module.exports = router;