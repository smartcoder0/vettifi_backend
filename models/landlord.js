const mongoose = require('mongoose');

const LandlordSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tenants: {
        type: Array,
        required: false
    },
    history: {
        type: Array,
        required: false
    },
    createdAt: {
        type: String,
        required: false
    },
    updatedAt: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('landlords', LandlordSchema);