const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isOnboarded: user.isOnboarded,
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isOnboarded: user.isOnboarded,
            profilePicture: user.profilePicture // send back existing profile pic if needed
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get user profile (protected)
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            country: user.country,
            experience: user.experience,
            role: user.role,
            skills: user.skills,
            achievements: user.achievements,
            partnership: user.partnership,
            motto: user.motto,
            time: user.time,
            profilePicture: user.profilePicture,
            isOnboarded: user.isOnboarded,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile (protected) - Used after chatbot/onboarding
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        // Updating onboarding fields
        user.country = req.body.country || user.country;
        user.experience = req.body.experience || user.experience;
        user.role = req.body.role || user.role;
        user.skills = req.body.skills || user.skills;
        user.achievements = req.body.achievements || user.achievements;
        user.partnership = req.body.partnership || user.partnership;
        user.motto = req.body.motto || user.motto;
        user.time = req.body.time || user.time;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        
        // Mark onboarding complete if all critical info is filled (simple heuristic)
        if (req.body.role || req.body.skills) {
            user.isOnboarded = true;
        }

        // Check if there are any other fields to update
        if (req.body.isOnboarded !== undefined) {
             user.isOnboarded = req.body.isOnboarded;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id), 
            isOnboarded: updatedUser.isOnboarded,
        });

    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
};
