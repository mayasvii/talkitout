import axios from 'axios';

/**
 * Custom Axios instance configured with base URL and automatic JWT authorization header.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor:
 * Injects stored JWT token into every outgoing API request header.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('talkitout_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor:
 * Standardizes API responses and handles session expiration gracefully.
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // If backend returns 401 Unauthorized due to expired or invalid token
    if (error.response && error.response.status === 401) {
      // If unauthenticated on protected routes, we can optionally clear stored token
      const isAuthRoute = error.config.url.includes('/auth/login') || error.config.url.includes('/auth/register');
      if (!isAuthRoute) {
        localStorage.removeItem('talkitout_token');
        localStorage.removeItem('talkitout_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
