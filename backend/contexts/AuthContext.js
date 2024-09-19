// contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifiez si un token est stocké et définissez l'utilisateur
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => setUser(response.data))
        .catch(() => setAuthToken(null));
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/login', { email, password });
    const { authToken } = response.data;
    localStorage.setItem('authToken', authToken);
    setAuthToken(authToken);
    const userResponse = await axios.get('/api/profile', { headers: { Authorization: `Bearer ${authToken}` } });
    setUser(userResponse.data);
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
