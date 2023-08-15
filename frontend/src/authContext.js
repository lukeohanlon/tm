// authContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!authToken); // Track login status

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
    setIsLoggedIn(true); // Update login status
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setIsLoggedIn(false); // Update login status
  };

  return (
    <AuthContext.Provider value={{ authToken, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
