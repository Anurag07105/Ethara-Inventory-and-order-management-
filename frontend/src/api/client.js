import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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