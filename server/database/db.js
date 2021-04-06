const mysql = require('mysql2');
require('dotenv').config();

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connect.connect(function (err) {
    if (err) {
        console.error('Database error');
        return;
    }
    console.log('Sucessful database connection');
});

module.exports = {
    cnn_mysql: connect
}