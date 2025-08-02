import axiosInstance from './axiosInstance';

/**
 * Registers a new user.
 * @param {object} userData - The user's data { name, email, password }.
 * @returns {Promise<object>} The server response data.
 */
export const register = async (userData) => {
  try {
    const { data } = await axiosInstance.post('/auth/register', userData);
    return data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Logs in a user.
 * @param {object} credentials - The user's credentials { email, password }.
 * @returns {Promise<object>} The server response data, including the token.
 */
export const login = async (credentials) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', credentials);
    return data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
