const mongoose = require('mongoose');

const openingSchema = mongoose.Schema({
    role: { type: String, required: true },
    experience: { type: String, required: true },
    techStack: [String],
    workModel: { type: String, enum: ['Remote', 'Hybrid', 'Onsite'], default: 'Remote' },
    collaboration: { type: String }
});

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a company name']
    },
    tagline: {
        type: String,
        required: [true, 'Please add a tagline']
    },
    description: {
        type: String,
        required: [true, 'Please add a description/mission']
    },
    industry: {
        type: String,
        required: [true, 'Please add an industry']
    },
    fundingStage: {
        type: String,
        required: [true, 'Please add a funding stage']
    },
    logo: {
        type: String, // URL or base64
        default: ''
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    benefits: [String],
    openings: [openingSchema],
    website: String,
    location: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
