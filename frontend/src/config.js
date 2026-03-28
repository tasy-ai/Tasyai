const isLocalhold = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Base URL for the backend API
// Priority: 1. Environment variable, 2. Hardcoded production URL, 3. Localhost fallback
const BACKEND_URL = import.meta.env.VITE_API_URL || (isLocalhold ? 'http://localhost:5000' : 'https://tasyai-9d31.onrender.com');

const config = {
    BACKEND_URL,
    API_BASE_URL: `${BACKEND_URL}/api`,
    SOCKET_URL: BACKEND_URL,
};

export default config;
