import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '../types/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * @description Componente principal que gestiona la autenticación en la aplicación.
 * Proporciona el contexto de autenticación y maneja el estado global de la sesión del usuario,
 * incluyendo el almacenamiento en sessionStorage y las redirecciones automáticas.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  /**
   * @description Efecto que se ejecuta al montar el componente para verificar
   * el estado de autenticación existente en sessionStorage y realizar las
   * redirecciones necesarias basadas en dicho estado
   */
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = sessionStorage.getItem('isAuthenticated');
      const storedUser = sessionStorage.getItem('user');

      if (storedAuth === 'true' && storedUser) {
        setIsAuthenticated(true);
        setUser(JSON.parse(storedUser));
        if (window.location.pathname === '/login') {
          navigate('/home');
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('user');
        if (window.location.pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [navigate]);

  /**
   * @description Función asíncrona que maneja el proceso de inicio de sesión.
   * Valida las credenciales del usuario y actualiza el estado de autenticación
   * en caso de éxito, almacenando la información en sessionStorage
   */
  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === 'admin' && password === 'admin123') {
      const userData: User = {
        username: username,
        role: 'admin',
      };

      setIsAuthenticated(true);
      setUser(userData);

      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  /**
   * @description Función que gestiona el cierre de sesión del usuario.
   * Limpia el estado de autenticación, elimina los datos de sessionStorage
   * y redirecciona al usuario a la página de login
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @description Hook personalizado que facilita el acceso al contexto de autenticación
 * desde cualquier componente de la aplicación. Proporciona acceso al estado de
 * autenticación y las funciones de login/logout
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
