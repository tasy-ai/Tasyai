import axios from 'axios';

const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:5000/api/companies' 
  : 'https://tasyai-9d31.onrender.com/api/companies';

// Get token from local storage
const getAuthHeader = () => {
    try {
        const user = localStorage.getItem('user');
        if (user && user !== 'undefined') {
            const parsedUser = JSON.parse(user);
            if (parsedUser && parsedUser.token) {
                return { Authorization: `Bearer ${parsedUser.token}` };
            }
        }
    } catch (error) {
        console.error('Error getting auth header:', error);
    }
    return {};
};

const createCompany = async (companyData) => {
    try {
        const response = await axios.post(API_URL, companyData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('CompanyService Create Error:', error.response?.data || error.message);
        throw error;
    }
};

const getCompanies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('CompanyService Get Error:', error.response?.data || error.message);
        throw error;
    }
};

const getMyCompanies = async () => {
    try {
        const response = await axios.get(`${API_URL}/my-companies`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('CompanyService MyCompanies Error:', error.response?.data || error.message);
        throw error;
    }
};

const getCompanyById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('CompanyService GetById Error:', error.response?.data || error.message);
        throw error;
    }
};

const companyService = {
    createCompany,
    getCompanies,
    getMyCompanies,
    getCompanyById
};

export default companyService;
