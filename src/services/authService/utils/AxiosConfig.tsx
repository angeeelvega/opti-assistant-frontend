import axios from 'axios';
import authService from '../AuthService';

/**
 * @description Interceptor de solicitudes que agrega automáticamente el token de autorización
 * a los headers de todas las peticiones salientes
 * @param {AxiosRequestConfig} config - Configuración de la petición
 * @returns {AxiosRequestConfig} Configuración modificada con el token de autorización
 */
axios.interceptors.request.use(
  config => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  /**
   * @description Manejador de errores para las solicitudes fallidas
   * @param {Error} error - Error ocurrido durante la solicitud
   * @returns {Promise<Error>} Promesa rechazada con el error
   */
  error => {
    return Promise.reject(error);
  },
);

/**
 * @description Interceptor de respuestas que maneja automáticamente los errores
 * de autenticación y realiza el logout cuando el token es inválido o ha expirado
 */
axios.interceptors.response.use(
  /**
   * @description Manejador de respuestas exitosas
   * @param {AxiosResponse} response - Respuesta del servidor
   * @returns {AxiosResponse} Respuesta sin modificar
   */
  response => response,
  /**
   * @description Manejador de errores para las respuestas fallidas
   * Gestiona específicamente los errores 401 (No autorizado) realizando
   * el logout y redirigiendo al usuario a la página de login
   * @param {AxiosError} error - Error de la respuesta
   * @returns {Promise<Error>} Promesa rechazada con el error
   */
  async error => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axios;
