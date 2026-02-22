const User = require('../models/User');
const ResetRequest = require('../models/ResetRequest');
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
        const { name, email, password, securityQuestion, securityAnswer } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            securityQuestion,
            securityAnswer
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
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Find user and include password field
    const user = await User.findOne({ email: email ? email.toLowerCase() : '' }).select('+password');

    if (!user) {
        return res.status(401).json({ message: 'Debug: User not found' });
    }

    const isMatch = await user.matchPassword(password);
    
    if (isMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isOnboarded: user.isOnboarded,
            profilePicture: user.profilePicture
        });
    } else {
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
            interests: user.interests || [],
            linkedin: user.linkedin || '',
            portfolio: user.portfolio || '',
            github: user.github || ''
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
        // Check if req.user exists (set by protect middleware)
        if (!req.user || !req.user._id) {
             return res.status(401).json({ message: 'Not authorized, user not found in request' });
        }

        const user = await User.findById(req.user._id).select('+password +securityAnswer');

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
            user.interests = req.body.interests || user.interests;
            user.linkedin = req.body.linkedin || user.linkedin;
            user.portfolio = req.body.portfolio || user.portfolio;
            user.github = req.body.github || user.github;
            
            // Mark onboarding complete if critical info is filled
            if (req.body.role || (req.body.skills && req.body.skills.length > 0)) {
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
                interests: updatedUser.interests || [],
                linkedin: updatedUser.linkedin || '',
                portfolio: updatedUser.portfolio || '',
                github: updatedUser.github || '',
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('CRITICAL ERROR in updateUserProfile:', error);
        try {
            const logError = require('../utils/logger');
            logError(`Update Error: ${error.message}\nStack: ${error.stack}`);
        } catch (logErr) {
            console.error('Failed to log to file:', logErr);
        }
        res.status(500).json({ 
            message: 'Server error updating profile', 
            error: error.message,
            details: error.errors ? Object.keys(error.errors).map(k => error.errors[k].message) : null
        });
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

// @desc    Google login or register
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
    try {
        const { email, name, profilePicture } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        let user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            // Update profile picture if it's missing
            if (!user.profilePicture && profilePicture) {
                user.profilePicture = profilePicture;
                await user.save();
            }
        } else {
            // Create user with a random password since it's required by the schema
            const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
            user = await User.create({
                name: name || email.split('@')[0],
                email: email.toLowerCase(),
                password: randomPassword,
                profilePicture: profilePicture || '',
                isOnboarded: false
            });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            isOnboarded: user.isOnboarded,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        console.error('Error in googleLogin:', error);
        res.status(500).json({ message: 'Server error during Google login', error: error.message });
    }
};

// @desc    Toggle save company
// @route   POST /api/auth/save-company/:id
// @access  Private
const toggleSaveCompany = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const companyId = req.params.id;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isAlreadySaved = user.savedCompanies.includes(companyId);

        if (isAlreadySaved) {
            // Unsave
            user.savedCompanies = user.savedCompanies.filter(id => id.toString() !== companyId);
        } else {
            // Save
            user.savedCompanies.push(companyId);
        }

        await user.save();
        res.json({ savedCompanies: user.savedCompanies, isSaved: !isAlreadySaved });
    } catch (error) {
        console.error('Error toggling save company:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get saved companies
// @route   GET /api/auth/saved-companies
// @access  Private
const getSavedCompanies = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('savedCompanies');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.savedCompanies);
    } catch (error) {
        console.error('Error fetching saved companies:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get security question by email
// @route   POST /api/auth/forgot-password/question
// @access  Public
const getSecurityQuestion = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ securityQuestion: user.securityQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Verify security answer and reset password
// @route   POST /api/auth/forgot-password/reset
// @access  Public
const resetPasswordWithSecurityAnswer = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email || !answer || !newPassword) {
            return res.status(400).json({ message: 'Please provide email, answer and new password' });
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select('+securityAnswer +password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.matchSecurityAnswer(answer);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect security answer' });

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password reset successful. You can now login with your new password.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Submit fallback reset request
// @route   POST /api/auth/forgot-password/request-fallback
// @access  Public
const submitFallbackResetRequest = async (req, res) => {
    try {
        const { email, fullName, reason } = req.body;
        if (!email || !fullName || !reason) {
            return res.status(400).json({ message: 'Please provide email, name and reason' });
        }

        const request = await ResetRequest.create({ email, fullName, reason });
        res.status(210).json({ 
            message: 'Your request has been submitted. Our admin will review it and contact you soon.',
            requestID: request._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
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
};

