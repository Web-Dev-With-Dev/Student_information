const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// A function to test connection that will be called in server.js
pool.testConnection = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Successfully connected to the database.');
    } catch (error) {
        console.error('!!! DATABASE CONNECTION FAILED !!!');
        console.error('Please check your .env file and ensure your MySQL server is running.');
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process with an error code
    } finally {
        if (connection) connection.release();
    }
};

module.exports = pool;