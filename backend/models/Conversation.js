const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    lastMessage: {
        text: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        read: {
            type: Boolean,
            default: false
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
