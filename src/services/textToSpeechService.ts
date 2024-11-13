import axios from 'axios';

const API_URL = import.meta.env.VITE_IBM_SERVICE_URL;
const API_KEY = import.meta.env.VITE_IBM_API_KEY;

export const textToSpeechService = {
  speak: async (text: string): Promise<void> => {
    try {
      // Primera llamada para ver la respuesta
      const checkResponse = await axios({
        method: 'POST',
        url: `${API_URL}/v1/synthesize?voice=es-LA_SofiaV3Voice`,
        data: {
          text: text,
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/wav',
          'Authorization': `Basic ${btoa(`apikey:${API_KEY}`)}`,
        },
      });

      console.log('Response completa:', checkResponse);

      // Segunda llamada para obtener el audio
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/v1/synthesize?voice=es-LA_SofiaV3Voice`,
        data: {
          text: text,
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'audio/wav',
          'Authorization': `Basic ${btoa(`apikey:${API_KEY}`)}`,
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
