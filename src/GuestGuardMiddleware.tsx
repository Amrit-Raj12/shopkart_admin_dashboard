import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface GuestGuardProps {
  children: JSX.Element;
}

const GuestMiddleware: React.FC<GuestGuardProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (token) {
    const previousPath = location.state?.from?.pathname || '/';
    return <Navigate to={previousPath} replace />;
  }

  return children;
};

export default GuestMiddleware;
