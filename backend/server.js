const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Import routes
const missingPersons = require('./routes/missingPersons');
const foundPersons = require('./routes/foundPersons');

// Gunakan routes
app.use('/found-persons', foundPersons);
app.use('/missing-persons', missingPersons);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});