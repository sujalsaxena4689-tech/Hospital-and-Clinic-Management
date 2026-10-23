const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctorId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    spec: { type: String, required: true },
    dept: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, default: 5.0 },
    image: { type: String, default: '' }
});

module.exports = mongoose.model('Doctor', doctorSchema);