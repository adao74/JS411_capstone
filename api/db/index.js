const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

class Connection {
    constructor() {
        if (!this.pool) {
            console.log('creating mysql connection...');
            
            this.pool = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                ssl: {
                    rejectUnauthorized: false
                },
                waitForConnections: true,
                connectionLimit: 10,
                maxIdle: 10,
                idleTimeout: 60000,
                queueLimit: 0
            });

            // Test the connection
            this.pool.query('SELECT 1', (err, results) => {
                if (err) {
                    console.error('Error connecting to the database:', err);
                } else {
                    console.log('Successfully connected to database');
                }
            });
        }
        return this.pool.promise(); // Returns a promise-based pool for async/await usage
    }
}

const instance = new Connection();
module.exports = instance; 