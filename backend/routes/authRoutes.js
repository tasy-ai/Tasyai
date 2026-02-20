const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    authUser, 
    getUserProfile, 
    updateUserProfile, 
    getAllUsers, 
    getUserById, 
    googleLogin, 
    toggleSaveCompany, 
    getSavedCompanies,
    getSecurityQuestion,
    resetPasswordWithSecurityAnswer,
    submitFallbackResetRequest
} = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/google', googleLogin); 
router.get('/profile', protect, getUserProfile);

router.put('/profile', protect, updateUserProfile);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

// Saved Companies
router.post('/save-company/:id', protect, toggleSaveCompany);
router.get('/saved-companies', protect, getSavedCompanies);

// Forgot Password Flow
router.post('/forgot-password/question', getSecurityQuestion);
router.post('/forgot-password/reset', resetPasswordWithSecurityAnswer);
router.post('/forgot-password/request-fallback', submitFallbackResetRequest);

module.exports = router;
