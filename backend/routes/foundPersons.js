const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db');

// Set up storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/found person photos');
    },
    filename: function (req, file, cb) {
        const ext = '.' + file.mimetype.split('/')[1];
        const filename = file.originalname.replace(ext, '');
        const uniquefilename = filename + '-' + Date.now() + ext;
        cb(null, uniquefilename);
    }
});

const upload = multer({ storage: storage });

// Create new found person record
router.post('/', upload.single('photo_url'), (req, res) => {
    const { found_location, found_date, description } = req.body;

    const photoPath = req.file ? req.file.path : null;

    db.query('INSERT INTO found_persons (found_location, found_date, photo_url, description, status) VALUES (?, ?, ?, ?, ?)',
        [found_location, found_date, photoPath, description, 'unidentified'],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Database query error', details: err });
            res.json({ message: 'Found person record created successfully' });
        });
});

router.get('/', (req, res) => {
    db.query('SELECT found_location, status, created_at FROM found_persons', (err, results) => {
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