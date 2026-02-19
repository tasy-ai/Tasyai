const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false 
    },
    country: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        enum: ['0-2', '3-5', '6-10', '10+', ''],
        default: ''
    },
    role: {
        type: String,
        enum: ['founder', 'co-founder', 'investor', 'talent', ''],
        default: ''
    },
    skills: {
        type: [String],
        default: []
    },
    achievements: {
        type: String,
        default: ''
    },
    partnership: {
        type: String,
        default: ''
    },
    motto: {
        type: String,
        default: ''
    },
    time: {
        type: String, 
        default: ''
    },
    profilePicture: {
        type: String, // URL or base64 string
        default: ''
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    savedCompanies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }]
}, {
    timestamps: true
});

// Encrypt password using bcrypt
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    console.log(`Hashing password for: ${this.email}`);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
