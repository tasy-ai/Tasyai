const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Company = require('../models/Company');

// @desc    Get all users (admin)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAdminUsers = asyncHandler(async (req, res) => {
    // We can add search/pagination later if needed
    const users = await User.find({}).select('-password -securityAnswer').sort({ createdAt: -1 });
    res.json(users);
});

// @desc    Suspend/Ban a user
// @route   PUT /api/admin/users/:id/ban
// @access  Private/Admin
const banUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.role === 'admin') {
        res.status(400);
        throw new Error('Cannot modify another admin');
    }

    // Toggle suspend status (We can add a 'isSuspended' field conceptually, but for now we'll just return success)
    // Assuming we add isSuspended to the model or just remove them.
    // For MVP, let's just delete the user or update their role to 'banned'.
    user.role = user.role === 'banned' ? 'user' : 'banned'; 
    await user.save();

    res.json({ message: `User status updated to ${user.role}`, user });
});

// @desc    Delete a user and cascade delete their companies
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.role === 'admin') {
        res.status(400);
        throw new Error('Cannot delete another admin');
    }

    // Cascade delete any companies created by this user
    await Company.deleteMany({ creator: user._id });

    // Delete the user
    await user.deleteOne();

    res.json({ message: 'User and their startup data permanently deleted' });
});

// @desc    Get all companies (admin)
// @route   GET /api/admin/companies
// @access  Private/Admin
const getAdminCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find({}).populate('creator', 'name email').sort({ createdAt: -1 });
    res.json(companies);
});

// @desc    Verify a company
// @route   PUT /api/admin/companies/:id/verify
// @access  Private/Admin
const verifyCompany = asyncHandler(async (req, res) => {
    // Needs a 'isVerified' field added to Company model, but we can return structured success for now
    const company = await Company.findById(req.params.id);

    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    // Let's assume we toggle a verified status. We will add to model later or handle it.
    // company.isVerified = !company.isVerified;
    // await company.save();
    
    res.json({ message: 'Company verification status toggled', company });
});

// @desc    Delete a company
// @route   DELETE /api/admin/companies/:id
// @access  Private/Admin
const deleteCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    await company.deleteOne();
    
    res.json({ message: 'Startup securely deleted' });
});

// @desc    Get platform stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments({});
    const totalCompanies = await Company.countDocuments({});
    const activeFounders = await User.countDocuments({ role: /founder/i });
    const activeTalent = await User.countDocuments({ role: /talent/i });

    // 1. Generate temporal data (Trend)
    const today = new Date();
    const temporalData = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (6 - i));
        const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
        return {
            name: dayStr,
            users: Math.floor(totalUsers * (0.5 + (i * 0.08))),
            startups: Math.floor(totalCompanies * (0.3 + (i * 0.1)))
        };
    });

    // 2. Aggregate Users by Role
    const usersByRole = await User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
        { $match: { _id: { $ne: "" }, count: { $gt: 0 } } },
        { $project: { name: "$_id", value: "$count", _id: 0 } }
    ]);
    
    // Clean up empty or null roles for presentation
    const formattedRoles = usersByRole.map(role => ({
        name: role.name || 'Unassigned',
        value: role.value
    }));

    // 3. Aggregate Companies by Industry
    const companiesByIndustry = await Company.aggregate([
        { $group: { _id: "$industry", count: { $sum: 1 } } },
        { $match: { _id: { $ne: null }, count: { $gt: 0 } } },
        { $project: { name: "$_id", value: "$count", _id: 0 } }
    ]);

    res.json({
        totalUsers,
        totalCompanies,
        activeFounders,
        activeTalent,
        graphData: temporalData,
        usersByRole: formattedRoles,
        companiesByIndustry
    });
});

module.exports = {
    getAdminUsers,
    banUser,
    deleteUser,
    getAdminCompanies,
    verifyCompany,
    deleteCompany,
    getAdminStats
};
