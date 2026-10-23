const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Patient = require('./Models/Patient');
const Doctor = require('./Models/Doctor');
const Appointment = require('./Models/Appointment');
const Billing = require('./Models/Billing');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Database Connection (NEW - Fixed)
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('[MongoDB] Connected to database successfully.');
})
.catch((err) => {
    console.error('[MongoDB Error]:', err);
});
// ==================== PATIENTS API ROUTES ====================

// GET: Fetch all patients
app.get('/api/patients', async (req, res) => {
    try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Register new patient
app.post('/api/patients', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Remove patient
app.delete('/api/patients/:id', async (req, res) => {
    try {
        await Patient.findOneAndDelete({ patientId: req.params.id });
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== DOCTORS API ROUTES ====================

// GET: Fetch all doctors
app.get('/api/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Add new doctor
app.post('/api/doctors', async (req, res) => {
    try {
        const newDoctor = new Doctor(req.body);
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ==================== APPOINTMENTS API ROUTES ====================

// GET: Fetch all appointments
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Schedule appointment
app.post('/api/appointments', async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Toggle appointment status
app.put('/api/appointments/:id', async (req, res) => {
    try {
        const appt = await Appointment.findOne({ appointmentId: req.params.id });
        if (!appt) return res.status(404).json({ error: 'Appointment not found' });
        
        appt.status = appt.status === 'Confirmed' ? 'Pending' : 'Confirmed';
        await appt.save();
        res.status(200).json(appt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Remove appointment
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        await Appointment.findOneAndDelete({ appointmentId: req.params.id });
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==================== BILLING API ROUTES ====================

// GET: Fetch all billing invoices
app.get('/api/billing', async (req, res) => {
    try {
        const bills = await Billing.find();
        res.status(200).json(bills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Create invoice
app.post('/api/billing', async (req, res) => {
    try {
        const newBill = new Billing(req.body);
        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT: Mark invoice as paid
app.put('/api/billing/:id', async (req, res) => {
    try {
        const bill = await Billing.findOneAndUpdate(
            { invoiceId: req.params.id },
            { status: 'Paid' },
            { new: true }
        );
        res.status(200).json(bill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`[Express] Server running on port ${PORT}`);
});
