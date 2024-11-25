import axios from 'axios';
import { env } from '../config/env';

export const userService = {
  async getUserIdByGoogleId(googleId: string): Promise<string> {
    try {
      const response = await axios.post(
        `${env.CHAT_API_URL}/api/consultar_googleid`,
        {
          google_id: googleId,
        },
      );

      return response.data.user_id;
    } catch (error) {
      console.error('Error consultando user_id:', error);
      throw new Error('Error al obtener el user_id');
    }
  },
};
