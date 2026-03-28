const express = require('express');
const router = express.Router();
const {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
} = require('../controllers/notificationController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getNotifications)
    .post(protect, createNotification)
    .delete(protect, clearAllNotifications);

router.route('/read-all')
    .put(protect, markAllAsRead);

router.route('/:id/read')
    .put(protect, markAsRead);

module.exports = router;
