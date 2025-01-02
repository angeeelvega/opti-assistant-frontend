import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMsal } from '@azure/msal-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();

  if (!isAuthenticated && accounts.length === 0) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
