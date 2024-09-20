import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      axios.get('/api/profile', { headers: { Authorization: `Bearer ${authToken}` } })
        .then(response => setUser(response.data.user))
        .catch(() => {
          setAuthToken(null);
          localStorage.removeItem('authToken');
        });
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const { authToken, refreshToken } = response.data;
      localStorage.setItem('authToken', authToken);
      setAuthToken(authToken);
      const userResponse = await axios.get('/api/profile', { headers: { Authorization: `Bearer ${authToken}` } });
      setUser(userResponse.data.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
