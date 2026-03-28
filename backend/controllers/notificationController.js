const Notification = require('../models/Notification');

// @desc    Get all notifications for logged in user
// @route   GET /api/notifications
// @access  Private
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50); // Keep last 50
            
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Create a notification (Internal use or direct POST)
// @route   POST /api/notifications
// @access  Private
const createNotification = async (req, res) => {
    try {
        const { recipient, title, message, type, iconName, color, hasActions } = req.body;

        if (!recipient || !title || !message) {
            return res.status(400).json({ message: 'Please provide recipient, title, and message' });
        }

        const notification = await Notification.create({
            recipient,
            sender: req.user.id,
            title,
            message,
            type: type || 'info',
            iconName: iconName || 'Bell',
            color: color || 'bg-blue-500/10 border-blue-500/20',
            hasActions: hasActions || false
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Mark a specific notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        // Make sure the logged in user matches the notification recipient
        if (notification.recipient.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({ success: true, message: 'All notifications marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Clear all notifications
// @route   DELETE /api/notifications
// @access  Private
const clearAllNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ recipient: req.user.id });
        res.status(200).json({ success: true, message: 'All notifications cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications
};
