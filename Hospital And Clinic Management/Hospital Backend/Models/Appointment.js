const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentId: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    doctorName: { type: String, required: true },
    dateTime: { type: String, required: true },
    status: { type: String, default: 'Confirmed' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);