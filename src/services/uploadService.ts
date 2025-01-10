import axios from 'axios';
import { env } from '../config/env';

export const uploadService = {
  uploadPDF: async (file: File): Promise<string> => {
    try {
      if (!file.type.includes('pdf')) {
        throw new Error('El archivo debe ser un PDF');
      }

      let userId = sessionStorage.getItem('user_id');
      
      if (!userId) {
        const authUser = sessionStorage.getItem('auth_user');
        if (authUser) {
          const user = JSON.parse(authUser);
          userId = user.id;
        }
      }

      if (!userId) throw new Error('Usuario no encontrado');

      const base64File = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]);
        };
        reader.onerror = error => reject(error);
      });

      const response = await axios.post(
        `${env.CHAT_API_URL}/api/upload_pdf`,
        {
          file: base64File,
          user_id: userId,
          filename: file.name
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.message;
    } catch (error) {
      console.error('Error al subir el PDF:', error);
      throw new Error('Error al subir el archivo PDF');
    }
  },
};
