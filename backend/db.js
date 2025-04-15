const mysql = require('mysql');
const redis = require('redis');

const redisClient = redis.createClient({
    host: 'localhost', // atau IP Redis server
    port: 6379
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'missing_persons_portal'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

module.exports = db;