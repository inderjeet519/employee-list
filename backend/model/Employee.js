const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: [String], required: true },
    image: { type: String, required: true},
    createdAt: { type: Date, default: Date.now } // Automatically set creation date
});

module.exports = mongoose.model('Employee', employeeSchema);