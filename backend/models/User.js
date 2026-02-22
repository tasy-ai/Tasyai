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
    }],
    interests: {
        type: [String],
        default: []
    },
    linkedin: {
        type: String,
        default: ''
    },
    portfolio: {
        type: String,
        default: ''
    },
    github: {
        type: String,
        default: ''
    },
    securityQuestion: {
        type: String,
        required: [true, 'Please add a security question']
    },
    securityAnswer: {
        type: String,
        required: [true, 'Please add a security answer'],
        select: false
    }
}, {
    timestamps: true
});

// Encrypt password and security answer using bcrypt
userSchema.pre('save', async function() {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    if (this.isModified('securityAnswer')) {
        const salt = await bcrypt.genSalt(10);
        this.securityAnswer = await bcrypt.hash(this.securityAnswer.toLowerCase().trim(), salt);
    }
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Match user entered security answer to hashed answer in database
userSchema.methods.matchSecurityAnswer = async function(enteredAnswer) {
    return await bcrypt.compare(enteredAnswer.toLowerCase().trim(), this.securityAnswer);
};

module.exports = mongoose.model('User', userSchema);
