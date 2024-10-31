import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/home"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
