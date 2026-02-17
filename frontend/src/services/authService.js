import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with interceptor to add token
const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
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
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (response.data && currentUser) {
        const updatedUser = { ...currentUser, ...response.data, token: currentUser.token }; // Keep token? Backend sent new token?
        // My backend sends new token on update.
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    getCurrentUser
};

export default authService;
