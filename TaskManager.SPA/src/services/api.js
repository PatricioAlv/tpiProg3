import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    console.log('API Interceptor: Token exists:', !!token);
    if (token) {
      console.log('API Interceptor: Adding token to request');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('API Interceptor: No token found');
    }
    return config;
  },
  (error) => {
    console.error('API Interceptor: Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Interceptor: Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('API Interceptor: Response error:', error);
    console.error('API Interceptor: Error status:', error.response?.status);
    console.error('API Interceptor: Error data:', error.response?.data);
    
    if (error.response?.status === 401) {
      console.log('API Interceptor: Unauthorized - removing tokens');
      // Token expired or invalid
      Cookies.remove('token');
      Cookies.remove('user');
      // Recargar la página para forzar la re-evaluación del estado de auth
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
