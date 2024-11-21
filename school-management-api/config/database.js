import dotenv from 'dotenv';
import mysql from 'mysql2'; // Add this import

dotenv.config();

const connection = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12746303",
    password: "mfduaGVJBu",
    database: "sql12746303",
    port: 3306, 
});


connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

export default connection;
