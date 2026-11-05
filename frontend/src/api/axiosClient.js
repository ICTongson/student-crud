import axios from 'axios';

// Default to the Spring Boot endpoint: http://localhost:8080/tongson/students
export const getApiBaseUrl = () => {
  const stored = localStorage.getItem('STUDENT_API_BASE_URL');
  // Disregard old default port 5000 if previously cached in browser
  if (stored && !stored.includes('5000')) {
    return stored;
  }
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/tongson/students';
};

export const setApiBaseUrl = (newUrl) => {
  const sanitized = newUrl.replace(/\/+$/, '');
  localStorage.setItem('STUDENT_API_BASE_URL', sanitized);
};

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

axiosClient.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred.';
    if (error.response) {
      message = error.response.data?.message || 
                error.response.data || 
                `Server returned error ${error.response.status}: ${error.response.statusText}`;
      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }
    } else if (error.request) {
      message = `Cannot reach backend at ${getApiBaseUrl()}. Please verify your backend server is running and CORS is enabled.`;
    } else {
      message = error.message;
    }
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
