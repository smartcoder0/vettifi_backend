const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
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
    profilePic: {
        type: String,
        required: true
    },
    nin: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    reviews: {
        type: Array,
        required: false,
    },
    pendingPayments: {
        type: Array,
        required: false
    },
    propertyType: {
        type: String,
        required: true
    },
    leaseAmount: {
        type: String,
        required: true
    },
    leaseDuration: {
        type: String,
        required: true
    },
    paymentProof: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    report: {
        type: String,
        required: false
    },
    status: {
        type: String,
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

module.exports = mongoose.model('tenants', TenantSchema);