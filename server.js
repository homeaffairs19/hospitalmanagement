const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Create patients table if not exists
connection.query(`
    CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        medicalIssue VARCHAR(255) NOT NULL,
        doctorAssigned VARCHAR(255) NOT NULL
    );
`, (err, result) => {
    if (err) throw err;
    console.log("Patients table checked/created");
});

// Get all patients
app.get('/patients', (req, res) => {
    connection.query('SELECT * FROM patients', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Add a new patient
app.post('/patients', (req, res) => {
    const { name, age, medicalIssue, doctorAssigned } = req.body;
    connection.query(
        'INSERT INTO patients (name, age, medicalIssue, doctorAssigned) VALUES (?, ?, ?, ?)', 
        [name, age, medicalIssue, doctorAssigned],
        (err, result) => {
            if (err) throw err;
            res.status(201).send({ message: 'Patient added successfully' });
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
