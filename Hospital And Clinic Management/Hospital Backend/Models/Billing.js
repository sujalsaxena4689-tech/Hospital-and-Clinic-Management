const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    invoiceId: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    desc: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Billing', billingSchema);