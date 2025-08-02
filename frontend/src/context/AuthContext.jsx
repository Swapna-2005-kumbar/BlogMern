import React, { createContext, useContext, useEffect, useState } from 'react';
// REMOVE THIS LINE: import { supabase } from '../lib/supabase';
import api from '../api'; // Import your Axios instance

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user data from local storage (if available)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      fetchUserProfile(); // Fetch user profile if not in local storage
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/api/auth/me'); // Call the backend route
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null); // Set user to null in case of error
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw the error for the component to handle
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Store user data in local storage
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Re-throw the error for the component to handle
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user data from local storage
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}