import axios from "axios";

const api = axios.create({
  baseURL: "", // Vite proxy will forward to your backend
  withCredentials: true, // if you use cookies for auth, otherwise you can remove this line
});

// Optionally, add an interceptor to attach token from localStorage if you use JWT in headers
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;