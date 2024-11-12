export const textToSpeechService = {
  speak: async (text: string): Promise<void> => {
    try {
      // Usando la API Web Speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Configurar el idioma a español
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error en text to speech:', error);
      throw error;
    }
  },
};
