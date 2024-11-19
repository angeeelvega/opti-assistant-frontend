import axios from 'axios';
import { env } from '../config/env';

export const speechToTextService = {
  transcribe: async (audioBlob: Blob): Promise<string> => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${env.IBM_SPEECH_TO_TEXT_SERVICE_URL}/v1/recognize`,
        data: audioBlob,
        headers: {
          'Content-Type': audioBlob.type,
          'Accept': 'application/json',
          'Authorization': `Basic ${btoa(`apikey:${env.IBM_SPEECH_TO_TEXT_API_KEY}`)}`,
        },
        params: {
          model: 'es-ES_BroadbandModel',
          contentType: audioBlob.type,
        },
      });

      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].alternatives[0].transcript;
      }

      throw new Error('No se pudo transcribir el audio');
    } catch (error) {
      console.error('Error en speech to text:', error);
      throw new Error('Error al procesar el audio');
    }
  },
};
