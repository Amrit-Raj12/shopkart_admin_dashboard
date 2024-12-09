// import { Navigate } from 'react-router-dom';

// interface AuthGuardProps {
//   children: JSX.Element;
// }

// const AuthMiddleware: React.FC<AuthGuardProps> = ({ children }) => {
//   // Replace this with your actual authentication logic
//   const isAuthenticated = !!localStorage.getItem('token');

//   return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
// };

// export default AuthMiddleware;

import { jwtDecode } from 'jwt-decode';
import { Navigate, useLocation } from 'react-router-dom';


interface AuthGuardProps {
  children: JSX.Element;
}

interface DecodedToken {
  exp: number; // Expiration time in seconds
}

const AuthMiddleware: React.FC<AuthGuardProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now(); // Compare expiration in milliseconds
      if (isExpired) {
        localStorage.removeItem('token');
        return <Navigate to="/auth/signin" state={{ from: location }} replace />;
      }
      return children;
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('token');
      return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }
  }

  return <Navigate to="/auth/signin" state={{ from: location }} replace />;
};

export default AuthMiddleware;


