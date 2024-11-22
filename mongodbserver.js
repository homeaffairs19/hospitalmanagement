const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection URI with correct credentials and database name
const uri = 'mongodb+srv://pandeyharsh190902:Satwikpandey%4003@cluster0.vmrwa.mongodb.net/hospital?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define the patient schema and model
const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    medicalIssue: { type: String, required: true },
    doctorAssigned: { type: String, required: true }
});


const Patient = mongoose.model('Patient', patientSchema);

// Route to get all patients (GET request)
app.get('/patients', (req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(500).json({ error: 'Error fetching patients' }));
});

// Route to add a new patient (POST request)
app.post('/patients', (req, res) => {
    const newPatient = new Patient(req.body);
    
    console.log('Incoming request data:', req.body);  // Log the incoming data
    
    newPatient.save()
        .then(() => {
            console.log('Patient data saved successfully');
            res.status(201).json({ message: 'Patient added successfully' });
        })
        .catch(err => {
            console.error('Error saving patient data:', err);
            res.status(400).json({ error: 'Error adding patient', details: err });
        });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
