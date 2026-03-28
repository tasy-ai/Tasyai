const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    title: {
        type: String,
        required: [true, 'Please add a notification title']
    },
    message: {
        type: String,
        required: [true, 'Please add a notification message']
    },
    type: {
        type: String,
        default: 'info' // company, people, info, success, etc.
    },
    iconName: {
        type: String,
        default: 'Bell'
    },
    color: {
        type: String,
        default: 'bg-blue-500/10 border-blue-500/20'
    },
    hasActions: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notification', notificationSchema);
