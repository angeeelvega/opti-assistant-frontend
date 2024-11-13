import axios from 'axios';

const API_URL = import.meta.env.VITE_IBM_SERVICE_URL;
const API_KEY = import.meta.env.VITE_IBM_API_KEY;

export const textToSpeechService = {
  speak: async (text: string): Promise<void> => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/v1/synthesize`,
        data: {
          text: text,
          voice: 'es-ES_LauraV3Voice',
          accept: 'audio/wav',
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`apikey:${API_KEY}`)}`,
        },
        responseType: 'blob',
      });

      const audio = new Audio();
      audio.src = URL.createObjectURL(response.data);

      await audio.play();

      // Limpiar el objeto URL cuando el audio termine
      audio.onended = () => {
        URL.revokeObjectURL(audio.src);
      };
    } catch (error) {
      console.error('Error en IBM text to speech:', error);
      throw new Error('Error al procesar el texto a voz');
    }
  },
};
