// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedTypes }) => {
  const userType = localStorage.getItem('userToken'); // Supondo que 'userToken' guarde o tipo do usuário
  const isAuthenticated = userType !== null;
  
  if (!isAuthenticated || (allowedTypes && !allowedTypes.includes(parseInt(userType)))) {
    // Usuário não está autenticado ou não tem permissão para ver esta página
    return <Navigate to="/login" replace />;
  }

  // Usuário está autenticado e tem permissão para ver esta página
  return children;
};

export default ProtectedRoute;
