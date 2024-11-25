import { useState, useEffect } from 'react';
import { Message } from '../types/interfaces';
import { chatService } from '../services/ChatService';
import { authService } from '../services/AuthService';
import { useAuth } from '../context/AuthContext';

export const useChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Array<Message>>(() => [
    {
      text: `¡Hola ${user?.name || ''}! ¿En qué puedo ayudarte hoy?`,
      sender: 'bot',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { text, sender: 'user' }]);

      const user = authService.getUser();
      if (!user?.id) throw new Error('Usuario no encontrado');

      const response = await chatService.sendMessage({
        message: text.trim(),
        user_id: user.id,
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
    setMessages,
  };
};
