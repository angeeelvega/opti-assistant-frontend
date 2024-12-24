import axios from 'axios';
import { env } from '../config/env';

export const microsoftService = {
  async getUserIdByMicrosoftId(microsoftId: string): Promise<string> {
    try {
      const response = await axios.post(
        `${env.CHAT_API_URL}/auth/microsoft/consultar_microsoftid`,
        {
          microsoft_id: microsoftId,
        },
      );

      return response.data.user_id;
    } catch (error) {
      console.error('Error consultando user_id:', error);
      throw new Error('Error al obtener el user_id');
    }
  },
};