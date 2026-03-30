import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authService = {
  register: (userData) => 
    axios.post(`${API_BASE_URL}/auth/register`, userData),
  
  login: (credentials) => 
    axios.post(`${API_BASE_URL}/auth/login`, credentials),

  getUserProfile: (userId) =>
    axios.get(`${API_BASE_URL}/auth/users/${userId}`),

  updateProfile: (profileData) =>
    axios.put(`${API_BASE_URL}/auth/profile`, profileData),
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  getToken: () => localStorage.getItem('token'),
  
  setToken: (token) => localStorage.setItem('token', token),
  
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  
  isAuthenticated: () => !!localStorage.getItem('token'),
};

// Setup axios interceptor to add token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default authService;
