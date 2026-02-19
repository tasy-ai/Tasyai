const express = require('express');
const router = express.Router();
const { 
    createCompany, 
    getCompanies, 
    getCompanyById, 
    getMyCompanies 
} = require('../controllers/companyController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(getCompanies)
    .post(protect, createCompany);

router.get('/my-companies', protect, getMyCompanies);

router.get('/:id', getCompanyById);

module.exports = router;
