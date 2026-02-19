import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with interceptor to add token
const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    try {
        const user = localStorage.getItem('user');
        if (user && user !== 'undefined') {
            const parsedUser = JSON.parse(user);
            if (parsedUser && parsedUser.token) {
                config.headers.Authorization = `Bearer ${parsedUser.token}`;
            }
        }
    } catch (error) {
        console.error('Error parsing user for auth header:', error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


const register = async (userData) => {
    try {
        console.log('Sending registration request:', userData);
        const response = await axios.post(`${API_URL}/signup`, userData);
        console.log('Registration response:', response.data);
        return response.data;
    } catch (error) {
        console.error('AuthService Registration Error:', error);
        throw error;
    }
};

const login = async (email, password) => {
    console.log('Attempting login for:', email);
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log('Login response:', response.data);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login error details:', error.response?.data || error.message);
        throw error;
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getProfile = async () => {
    const response = await api.get('profile');
    return response.data;
};


const updateProfile = async (userData) => {
    const response = await api.put('profile', userData);
    // Update local storage if critical info changed? Usually best to refresh from source.
    // But we might want to keep the token.
    let currentUser = null;
    try {
        const userStr = localStorage.getItem('user');
        currentUser = userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        console.error('Error parsing user in updateProfile:', e);
    }
    if (response.data && currentUser) {
        const updatedUser = { ...currentUser, ...response.data, token: currentUser.token }; // Keep token? Backend sent new token?
        // My backend sends new token on update.
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        if (!user || user === 'undefined') return null;
        return JSON.parse(user);
    } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        localStorage.removeItem('user'); // Clear invalid data
        return null;
    }
};

const getUsers = async () => {
    // Ensure we are hitting the correct endpoint. 
    // If baseURL is .../api/auth, then .get('/users') -> .../api/auth/users
    const currentUser = getCurrentUser();
    const excludeId = currentUser ? currentUser._id : null;
    const response = await api.get('/users', {
        params: { exclude: excludeId }
    }); 
    return response.data;
};

const getUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

const googleLogin = async (googleData) => {
    try {
        console.log('Sending Google auth request:', googleData);
        const response = await axios.post(`${API_URL}/google`, googleData);
        console.log('Google auth response:', response.data);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Google login error details:', error.response?.data || error.message);
        throw error;
    }
};

const toggleSaveCompany = async (id) => {
    const response = await api.post(`/save-company/${id}`);
    return response.data;
};

const getSavedCompanies = async () => {
    const response = await api.get('/saved-companies');
    return response.data;
};

const authService = {
    register,
    login,
    googleLogin,
    logout,
    getProfile,
    updateProfile,
    getCurrentUser,
    getUsers,
    getUserById,
    toggleSaveCompany,
    getSavedCompanies
};


export default authService;
