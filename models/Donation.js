const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    firstName:{type: String, required: true, unique: true },
    lastName: {type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true },
    phone: {type: String, required: true, unique: true },
    donationType: {type: String, required: true, unique: true },
    paymentMethod: {type: String, required: true, unique: true },
    amount:{type: Number, required: true, unique: true },
    date:{type: Date, default: Date.now}
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;