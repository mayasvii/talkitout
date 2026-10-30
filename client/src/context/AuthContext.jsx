import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('talkitout_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error('Failed to parse saved user from localStorage', e);
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('talkitout_token') || null;
  });

  const [loading, setLoading] = useState(true);

  // Verify and sync stored user profile with backend on initial load
  useEffect(() => {
    const syncUser = async () => {
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res && res.data) {
            setUser(res.data);
            localStorage.setItem('talkitout_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.warn('Session expired or invalid token:', err.message);
          logout();
        }
      }
      setLoading(false);
    };

    syncUser();
  }, [token]);

  /**
   * Set user credentials and persist to localStorage
   */
  const login = (userData, tokenString) => {
    setUser(userData);
    setToken(tokenString);
    localStorage.setItem('talkitout_token', tokenString);
    localStorage.setItem('talkitout_user', JSON.stringify(userData));
  };

  /**
   * Clear user credentials and remove from localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('talkitout_token');
    localStorage.removeItem('talkitout_user');
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
