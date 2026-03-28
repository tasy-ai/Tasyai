import axios from 'axios';
import authService from './authService';

const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000/api/notifications' 
  : 'https://tasyai-9d31.onrender.com/api/notifications';

const getAuthHeaders = () => {
    const token = authService.getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const notificationService = {
    getNotifications: async () => {
        try {
            if (!authService.getToken()) return [];
            const response = await axios.get(API_URL, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return [];
        }
    },

    addNotification: async (notification) => {
        try {
            if (!authService.getToken()) return null;
            const response = await axios.post(API_URL, notification, getAuthHeaders());
            window.dispatchEvent(new CustomEvent('new_notification', { detail: response.data }));
            return response.data;
        } catch (error) {
            console.error('Error adding notification:', error);
            return null;
        }
    },

    markAllAsRead: async () => {
        try {
            if (!authService.getToken()) return;
            const response = await axios.put(`${API_URL}/read-all`, {}, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    },

    markAsRead: async (id) => {
        try {
            if (!authService.getToken()) return;
            const response = await axios.put(`${API_URL}/${id}/read`, {}, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    },

    clearAll: async () => {
        try {
            if (!authService.getToken()) return;
            await axios.delete(API_URL, getAuthHeaders());
        } catch (error) {
            console.error('Error clearing notifications:', error);
        }
    }
};

export default notificationService;
