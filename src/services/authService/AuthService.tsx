import axios from 'axios';
import { LoginResponse } from './interfaces/loginResponse';

const API_URL = 'tu-api-url'; // TODO USAR ENVIRONMENT

/**
 * @description Servicio que maneja todas las operaciones relacionadas con la autenticación,
 * incluyendo el manejo de tokens, datos de usuario y headers de autorización
 */
const authService = {
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

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
    localStorage.removeItem('user');
  },

  /**
   * @description Obtiene los datos del usuario actualmente autenticado desde el almacenamiento local
   * @returns {User|null} Datos del usuario o null si no hay usuario autenticado
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  /**
   * @description Obtiene el token de autenticación almacenado localmente
   * @returns {string|null} Token de autenticación o null si no existe
   */
  getToken() {
    return localStorage.getItem('token');
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
};

export default authService;
