import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: '/api', // The proxy will handle this
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;