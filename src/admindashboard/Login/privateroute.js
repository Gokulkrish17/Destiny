import React from 'react';
import { jwtDecode } from 'jwt-decode'; // Use the appropriate export for your version
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAuthenticated = decoded.exp > Date.now() / 1000; // Check if the token is valid
    } catch (error) {
      isAuthenticated = false;
    }
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
