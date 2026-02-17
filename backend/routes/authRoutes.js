const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, updateUserProfile, getAllUsers, getUserById } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);

module.exports = router;
