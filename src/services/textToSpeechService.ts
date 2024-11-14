import axios from 'axios';
import { env } from '../config/env';

export const textToSpeechService = {
  speak: async (text: string): Promise<void> => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${env.IBM_SERVICE_URL}/v1/synthesize?voice=es-LA_DanielaExpressive`,
        data: { text },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/wav',
          'Authorization': `Basic ${btoa(`apikey:${env.IBM_API_KEY}`)}`,
        },
        responseType: 'blob',
      });

      const audioBlob = new Blob([response.data], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);

      audio.onloadeddata = () => console.log('Audio loaded successfully');
      audio.onerror = e => console.error('Audio error:', e);

      await audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        console.log('Audio finished playing');
      };
    } catch (error) {
      console.error('Error en IBM text to speech:', error);
      throw new Error('Error al procesar el texto a voz');
    }
  },
};
