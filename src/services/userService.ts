import axios from 'axios';
import { env } from '../config/env';

export const userService = {
  async getUserIdByGoogleId(
    googleId: string, 
    email: string, 
    firstName: string, 
    lastName: string
  ): Promise<string> {
    try {
      const response = await axios.post(
        `${env.CHAT_API_URL}/auth/google/consultar_googleid`,
        {
          google_id: googleId,
          correoElectronico: email,
          nombre: firstName,
          apellido: lastName
        },
      );

      const userId = response.data.user_id.toString();
      sessionStorage.setItem('user_id', userId);

      return userId;
    } catch (error) {
      console.error('Error consultando user_id:', error);
      throw new Error('Error al obtener el user_id');
    }
  },
};
