/**
 * Notification Service
 * Handles storing and retrieving user notifications using localStorage.
 */

const NOTIFICATIONS_KEY = 'tasyai_notifications';

const notificationService = {
    /**
     * Get all notifications for the current user
     */
    getNotifications: () => {
        try {
            const data = localStorage.getItem(NOTIFICATIONS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return [];
        }
    },

    /**
     * Add a new notification
     * @param {Object} notification - { title, message, type, color, iconName }
     */
    addNotification: (notification) => {
        try {
            const notifications = notificationService.getNotifications();
            const newNotif = {
                id: Date.now(),
                title: notification.title,
                message: notification.message,
                type: notification.type || 'info', // company, people, info, success
                time: 'Just now',
                timestamp: new Date().toISOString(),
                read: false,
                color: notification.color || 'bg-blue-500/10 border-blue-500/20',
                iconName: notification.iconName || 'Bell'
            };
            
            const updatedNotifications = [newNotif, ...notifications];
            localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updatedNotifications.slice(0, 50))); // Keep last 50
            
            // Trigger a custom event so other components can listen if they want
            window.dispatchEvent(new CustomEvent('new_notification', { detail: newNotif }));
            
            return newNotif;
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: () => {
        try {
            const notifications = notificationService.getNotifications();
            const updated = notifications.map(n => ({ ...n, read: true }));
            localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    },

    /**
     * Clear all notifications
     */
    clearAll: () => {
        localStorage.removeItem(NOTIFICATIONS_KEY);
    }
};

export default notificationService;
