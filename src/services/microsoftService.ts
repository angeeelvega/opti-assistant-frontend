import axios from 'axios';
import { env } from '../config/env';

export const microsoftService = {
  async verifyUserId(email: string, microsoftId: string, firstName: string, lastName: string): Promise<number> {
    try {
      const response = await axios.post(
        `${env.CHAT_API_URL}/auth/microsoft/user_id`,
        {
          microsoft_id: microsoftId,
          correoElectronico: email,
          nombre: firstName,
          apellido: lastName,
        },
      );
      return response.data.user_id;
    } catch (error) {
      console.error('Error verificando user_id:', error);
      throw error;
    }
  }
}