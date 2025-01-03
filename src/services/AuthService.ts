import { User } from '../types/auth';
import axios from 'axios';
import { LoginResponse } from '../types/loginResponse';
import { encryptionService } from './encryptionService';
import { env } from '../config/env';

const API_URL = axios.create({
  baseURL: env.CHAT_API_URL,
});

const AUTH_KEY = 'auth_user';

/**
 * @description Servicio que maneja todas las operaciones relacionadas con la autenticación,
 * incluyendo el manejo de tokens, datos de usuario y headers de autorización
 */
export const authService = {
  /**
   * @description Realiza la autenticación del usuario contra el backend y almacena el token y datos del usuario
   * @param {string} username - Nombre de usuario o correo electrónico
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<LoginResponse>} Respuesta del servidor que incluye el token y datos del usuario
   * @throws {Error} Error de autenticación o conexión con el servidor
   */
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      if (response.data) {
        const encryptedToken = encryptionService.encrypt(response.data.token);
        localStorage.setItem('token', encryptedToken);
        this.setUser(response.data.user);
      }

      return response.data;
    } catch (error) {
      console.error('Error en el servicio de login:', error);
      throw error;
    }
  },

  /**
   * @description Cierra la sesión del usuario eliminando el token y datos almacenados localmente
   */
  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    localStorage.clear();
  },

  /**
   * @description Obtiene los datos del usuario actualmente autenticado desde el almacenamiento local
   * @returns {User|null} Datos del usuario o null si no hay usuario autenticado
   */
  getCurrentUser() {
    const user = this.getUser();
    if (user) return user;
    return null;
  },

  /**
   * @description Obtiene el token de autenticación almacenado localmente
   * @returns {string|null} Token de autenticación o null si no existe
   */
  getToken() {
    try {
      const encryptedToken = localStorage.getItem('token');
      if (!encryptedToken) return null;
      return encryptionService.decrypt(encryptedToken);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  /**
   * @description Configura el header de autorización para todas las peticiones HTTP
   * utilizando el token almacenado localmente
   */
  setAuthHeader() {
    const token = this.getToken();
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  },

  async loginWithGoogle(credential: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        credential,
      });

      if (response.data) {
        const userData = {
          id: response.data.user.id.toString(),
          email: response.data.user.email,
          name: response.data.user.name,
          picture: response.data.user.picture,
          provider: response.data.user.provider,
          google_id: response.data.user.google_id,
        };

        sessionStorage.setItem('user_id', JSON.stringify(userData));
        
        const encryptedToken = encryptionService.encrypt(response.data.token);
        localStorage.setItem('token', encryptedToken);
      }

      return response.data;
    } catch (error) {
      console.error('Error en login con Google:', error);
      throw error;
    }
  },

  setUser: (user: User) => {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    try {
      const userStr = sessionStorage.getItem('user_id');
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  getUserId: (): string | null => {
    return sessionStorage.getItem('user_id');
  },

  isAuthenticated: (): boolean => {
    return !!sessionStorage.getItem(AUTH_KEY);
  }
};

export default authService;
