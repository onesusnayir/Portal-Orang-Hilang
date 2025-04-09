const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');

// Atur folder penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // pastikan folder ini ada
    },
    filename: (req, file, cb) => {
        const uniqueName = file.originalname + '-' + Date.now()+ '.' +  file.mimetype.split('/')[1];
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// Route POST
router.post('/missing', upload.single('photo_url'), (req, res) => {
    const {
        full_name,
        age,
        gender,
        height,
        weight,
        last_seen_location,
        last_seen_date
    } = req.body;

    const photoPath = req.file ? req.file.path : null;

    if (!full_name || !age || !gender || !height || !weight || !last_seen_location || !last_seen_date || !photoPath) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(
        'INSERT INTO missing_persons (full_name, age, gender, height, weight, last_seen_location, last_seen_date, photo_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [full_name, age, gender, height, weight, last_seen_location, last_seen_date, photoPath, "missing"],
        (err, result) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: 'Database insertion error', details: err });
            }
            res.json({ message: 'Missing person report created successfully', missingId: result.insertId });
        }
    );
});

// || Create new report
router.post('/reports', (req, res) => {
    const { user_id, missing_id, description, status } = req.body;

    if (!user_id || !missing_id || !description || !status){
        return res.status(404).json({error: "All field are required"})
    }

    const sql = `INSERT INTO reports ( user_id, missing_id, description, status) VALUES ( ?, ?, ?, ?)`;
    db.query(sql, [ user_id, missing_id, description, status], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Report created successfully', reportId: result.insertId });
    });
});

module.exports = router;
