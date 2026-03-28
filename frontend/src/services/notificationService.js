import axios from 'axios';
import authService from './authService';
import config from '../config';

const API_URL = `${config.API_BASE_URL}/notifications`;

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
