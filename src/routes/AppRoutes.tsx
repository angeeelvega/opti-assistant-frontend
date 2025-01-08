import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMsal } from '@azure/msal-react';
import Login from '../pages/Login';
import Home from '../pages/Home';
import ProtectedRoute from '../components/protectedRoute/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  const isMsalAuthenticated = accounts.length > 0;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated || isMsalAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <Navigate
            to={isAuthenticated || isMsalAuthenticated ? '/home' : '/login'}
            replace
          />
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
