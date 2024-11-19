import { useState, useEffect } from 'react';
import { Message } from '../types/interfaces';
import { chatService } from '../services/ChatService';
import { authService } from '../services/AuthService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = authService.getUser();
    console.log('user', user);
    if (user?.name) {
      setMessages([
        {
          text: `¡Hola ${user.name}! ¿En qué puedo ayudarte hoy?`,
          sender: 'bot',
        },
      ]);
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { text, sender: 'user' }]);

      const response = await chatService.sendMessage({
        message: text.trim(),
        user_id: '1',
      });

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
