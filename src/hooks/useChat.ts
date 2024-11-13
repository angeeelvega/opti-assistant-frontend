import { useState } from 'react';
import { Message } from '../types/interfaces';
import { chatService } from '../services/ChatService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsLoading(true);

      // Agregar mensaje del usuario
      setMessages(prev => [...prev, { text, sender: 'user' }]);

      const response = await chatService.sendMessage({
        message: text.trim(),
        user_id: '1',
      });

      // Agregar respuesta del bot
      if (response.result) {
        setMessages(prev => [
          ...prev,
          { text: response.result as string, sender: 'bot' },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          text: 'Lo siento, hubo un error al procesar tu mensaje.',
          sender: 'bot',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
