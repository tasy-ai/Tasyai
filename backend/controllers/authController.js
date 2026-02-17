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
    try {
        const { name, email, password } = req.body;
        console.log('--- REGISTER REQUEST RECEIVED ---');
        console.log('Body:', JSON.stringify(req.body));

        if (!name || !email || !password) {
            console.log('Missing required fields');
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });

        if (userExists) {
            console.log(`User already exists: ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        console.log('Creating user in DB...');
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
        });

        if (user) {
            console.log(`User registered successfully: ${user.email} with ID: ${user._id}`);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                isOnboarded: user.isOnboarded,
            });
        } else {
            console.log('User creation returned null/undefined');
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    console.log('--- LOGIN REQUEST RECEIVED ---');
    console.log('Body:', JSON.stringify(req.body));
    const { email, password } = req.body;
    
    console.log(`Login attempt for: ${email}`);
    
    // Find user and include password field
    const user = await User.findOne({ email: email ? email.toLowerCase() : '' }).select('+password');

    if (!user) {
        console.log(`User not found in DB: ${email}`);
        return res.status(401).json({ message: 'Debug: User not found' });
    }

    const isMatch = await user.matchPassword(password);
    console.log(`Password match result: ${isMatch} (Provided length: ${password ? password.length : 0})`);
    
    if (isMatch) {
        console.log(`Login successful: ${email}`);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isOnboarded: user.isOnboarded,
            profilePicture: user.profilePicture
        });
    } else {
        console.log(`Password mismatch for: ${email}`);
        res.status(401).json({ message: 'Debug: Password mismatch' });
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
    try {
        console.log('--- UPDATE PROFILE REQUEST ---');
        // Check if req.user exists (set by protect middleware)
        if (!req.user || !req.user._id) {
             console.log('Error: req.user is missing. Middleware might have failed.');
             return res.status(401).json({ message: 'Not authorized, user not found in request' });
        }

        console.log('User ID from token:', req.user._id);
        console.log('Update Data Body:', JSON.stringify(req.body));

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
            
            // Mark onboarding complete if critical info is filled
            if (req.body.role || (req.body.skills && req.body.skills.length > 0)) {
                user.isOnboarded = true;
            }

            // Check if there are any other fields to update
            if (req.body.isOnboarded !== undefined) {
                 user.isOnboarded = req.body.isOnboarded;
            }

            console.log('Saving user...');
            const updatedUser = await user.save();
            console.log('User saved successfully');

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                country: updatedUser.country,
                experience: updatedUser.experience,
                role: updatedUser.role,
                skills: updatedUser.skills,
                achievements: updatedUser.achievements,
                partnership: updatedUser.partnership,
                motto: updatedUser.motto,
                time: updatedUser.time,
                profilePicture: updatedUser.profilePicture,
                isOnboarded: updatedUser.isOnboarded,
                token: generateToken(updatedUser._id),
            });
        } else {
            console.log('User not found in DB by ID');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('CRITICAL ERROR in updateUserProfile:', error);
        const logError = require('../utils/logger');
        logError(`Update Error: ${error.message}\nStack: ${error.stack}`);
        res.status(500).json({ message: 'Server error updating profile', error: error.message, stack: error.stack });
    }
};


// @desc    Get all users
// @route   GET /api/auth/users
// @access  Public (or Private)
const getAllUsers = async (req, res) => {
    try {
        const excludeId = req.query.exclude;
        // console.log('Get Users Request. Exclude ID:', excludeId); // Debugging
        
        let query = {};
        if (excludeId) {
            query = { _id: { $ne: excludeId } };
        }
        
        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user by ID
// @route   GET /api/auth/users/:id
// @access  Public
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById
};
