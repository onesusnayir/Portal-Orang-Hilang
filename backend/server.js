const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));


// Import routes
const reportPage = require('./routes/report');

// Gunakan routes
app.use('/', reportPage);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});