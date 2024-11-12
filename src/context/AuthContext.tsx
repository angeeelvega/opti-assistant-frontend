import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';
import { encryptionService } from '../services/encryptionService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

/**
 * @description Componente principal que gestiona la autenticación en la aplicación.
 * Proporciona el contexto de autenticación y maneja el estado global de la sesión del usuario,
 * incluyendo el almacenamiento en sessionStorage y las redirecciones automáticas.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const encryptedUser = sessionStorage.getItem('user');
    if (!encryptedUser) return null;
    try {
      return encryptionService.decrypt(encryptedUser);
    } catch (error) {
      console.error('Error decrypting user:', error);
      return null;
    }
  });

  /**
   * @description Función asíncrona que maneja el proceso de inicio de sesión.
   * Valida las credenciales del usuario y actualiza el estado de autenticación
   * en caso de éxito, almacenando la información en sessionStorage
   */
  const login = async (
    credentials: string | User,
    tokenOrPassword?: string,
  ): Promise<void> => {
    // Si es login con Google (credentials es User)
    if (typeof credentials === 'object') {
      const encryptedUser = encryptionService.encrypt(credentials);
      const encryptedToken = tokenOrPassword
        ? encryptionService.encrypt(tokenOrPassword)
        : null;

      setUser(credentials);
      setIsAuthenticated(true);
      sessionStorage.setItem('user', encryptedUser);
      sessionStorage.setItem('isAuthenticated', 'true');
      if (encryptedToken) {
        sessionStorage.setItem('token', encryptedToken);
      }
    }
    // Si es login normal
    else if (typeof credentials === 'string' && tokenOrPassword) {
      if (credentials === 'admin' && tokenOrPassword === 'admin123') {
        const userData: User = {
          id: '1',
          email: 'admin@example.com',
          name: 'Admin',
          provider: 'email',
        };
        const encryptedUser = encryptionService.encrypt(userData);
        setUser(userData);
        setIsAuthenticated(true);
        sessionStorage.setItem('user', encryptedUser);
        sessionStorage.setItem('isAuthenticated', 'true');
      }
    }
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
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
