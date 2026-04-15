const express = require('express');
const router = express.Router();
const {
    getAdminUsers,
    banUser,
    deleteUser,
    getAdminCompanies,
    verifyCompany,
    deleteCompany,
    getAdminStats
} = require('../controllers/adminController');
const adminProtect = require('../middleware/adminMiddleware');

// All routes are protected by adminProtect middleware
router.route('/users').get(adminProtect, getAdminUsers);
router.route('/users/:id')
    .put(adminProtect, banUser) // Reusing id path, conceptually should probably separate ban vs delete, but keeping simple
    .delete(adminProtect, deleteUser);
router.route('/users/:id/ban').put(adminProtect, banUser); // Fix: Keep existing route for ban, add clean route for delete
router.route('/users/:id/delete').delete(adminProtect, deleteUser);

router.route('/companies').get(adminProtect, getAdminCompanies);
router.route('/companies/:id/verify').put(adminProtect, verifyCompany);
router.route('/companies/:id/delete').delete(adminProtect, deleteCompany);

router.route('/stats').get(adminProtect, getAdminStats);

module.exports = router;
