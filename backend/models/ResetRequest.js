const mongoose = require('mongoose');

const resetRequestSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add a registered email']
    },
    fullName: {
        type: String,
        required: [true, 'Please add your full name']
    },
    reason: {
        type: String,
        required: [true, 'Please add a reason for reset request']
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ResetRequest', resetRequestSchema);
