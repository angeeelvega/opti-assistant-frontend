import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { User, AuthContextType } from '../types/auth';
import { useMsal } from '@azure/msal-react';
import { encryptionService } from '../services/encryptionService';
import { authService } from '../services/AuthService';
import { env } from '../config/env';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { instance } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          const msalAccount = accounts[0];
          instance.setActiveAccount(msalAccount);
          const user = authService.getUser();
          if (user) {
            setUser(user);
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Error en initializeAuth:', error);
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    initializeAuth();
  }, [instance]);

  /**
   * @description Función asíncrona que maneja el proceso de inicio de sesión.
   * Valida las credenciales del usuario y actualiza el estado de autenticación
   * en caso de éxito, almacenando la información en sessionStorage
   */
  const login = async (
    credentials: string | User,
    tokenOrPassword?: string,
  ): Promise<void> => {
    try {
      if (typeof credentials === 'string') {
        // Login con username/password
        if (credentials === 'admin' && tokenOrPassword === 'admin123') {
          const userData: User = {
            id: '1',
            email: 'admin@example.com',
            name: 'Admin',
            provider: 'email',
          };
          const encryptedUser = encryptionService.encrypt(
            JSON.stringify(userData),
          );

          sessionStorage.setItem('user', encryptedUser);
          sessionStorage.setItem('isAuthenticated', 'true');

          setUser(userData);
          setIsAuthenticated(true);
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        // Login con provider (Google/Microsoft)
        const encryptedUser = encryptionService.encrypt(
          JSON.stringify(credentials),
        );
        const encryptedToken = tokenOrPassword
          ? encryptionService.encrypt(tokenOrPassword)
          : null;

        sessionStorage.setItem('user', encryptedUser);
        sessionStorage.setItem('isAuthenticated', 'true');
        if (encryptedToken) {
          localStorage.setItem('token', encryptedToken);
        }

        setUser(credentials);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    sessionStorage.clear();
    localStorage.clear();

    // Logout de Microsoft
    await instance.logoutRedirect({
      postLogoutRedirectUri: env.REDIRECT_LOGOUT_URI
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
