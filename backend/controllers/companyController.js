const Company = require('../models/Company');

// @desc    Create a new company
// @route   POST /api/companies
// @access  Private
const createCompany = async (req, res) => {
    try {
        const { 
            name, 
            tagline, 
            description, 
            industry, 
            fundingStage, 
            logo, 
            benefits, 
            openings, 
            website, 
            location 
        } = req.body;

        const company = await Company.create({
            name,
            tagline,
            description,
            industry,
            fundingStage,
            logo,
            benefits,
            openings,
            website,
            location,
            creator: req.user._id
        });

        res.status(201).json(company);
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Server error creating company', error: error.message });
    }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({}).populate('creator', 'name email profilePicture');
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Server error fetching companies' });
    }
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id).populate('creator', 'name email profilePicture');
        if (company) {
            res.json(company);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ message: 'Server error fetching company' });
    }
};

// @desc    Get companies created by user
// @route   GET /api/companies/my-companies
// @access  Private
const getMyCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ creator: req.user._id });
        res.json(companies);
    } catch (error) {
        console.error('Error fetching user companies:', error);
        res.status(500).json({ message: 'Server error fetching your companies' });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    getMyCompanies
};
