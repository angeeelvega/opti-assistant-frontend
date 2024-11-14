import axios from 'axios';
import { env } from '../config/env';

export const uploadService = {
  uploadPDF: async (file: File): Promise<string> => {
    try {
      if (!file.type.includes('pdf')) {
        throw new Error('El archivo debe ser un PDF');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${env.CHAT_API_URL}/upload-pdf`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
