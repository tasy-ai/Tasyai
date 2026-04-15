import axios from 'axios';
import config from '../config';

const API_URL = `${config.API_BASE_URL}/admin`;

const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

const getStats = async () => {
    const response = await axios.get(`${API_URL}/stats`, { headers: getAuthHeaders() });
    return response.data;
};

const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, { headers: getAuthHeaders() });
    return response.data;
};

const banUser = async (id) => {
    const response = await axios.put(`${API_URL}/users/${id}/ban`, {}, { headers: getAuthHeaders() });
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/users/${id}/delete`, { headers: getAuthHeaders() });
    return response.data;
};

const getCompanies = async () => {
    const response = await axios.get(`${API_URL}/companies`, { headers: getAuthHeaders() });
    return response.data;
};

const verifyCompany = async (id) => {
    const response = await axios.put(`${API_URL}/companies/${id}/verify`, {}, { headers: getAuthHeaders() });
    return response.data;
};

const deleteCompany = async (id) => {
    const response = await axios.delete(`${API_URL}/companies/${id}/delete`, { headers: getAuthHeaders() });
    return response.data;
};

const adminService = {
    getStats,
    getUsers,
    banUser,
    deleteUser,
    getCompanies,
    verifyCompany,
    deleteCompany
};

export default adminService;
