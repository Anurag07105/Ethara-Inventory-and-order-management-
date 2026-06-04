import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_RENDER;

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling global errors seamlessly
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // You can connect toast notifications here
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);