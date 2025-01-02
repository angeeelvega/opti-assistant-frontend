import axios from 'axios';
import { SendMessageParams, ChatResponse } from '../types/chatResponse';
import { env } from '../config/env';

const api = axios.create({
  baseURL: env.CHAT_API_URL,
});

export const chatService = {
  sendMessage: async ({
    message,
    user_id,
  }: SendMessageParams): Promise<ChatResponse> => {
    try {
      const response = await api.post('/api/chat', {
        message: message.trim(),
        user_id,
      });

      if (response.data.response.result) {
        return {
          result: response.data.response.result,
          source_documents: response.data.response.source_documents || [],
        };
      }

      return {
        result: response.data.response,
        source_documents: [],
      };
    } catch (error) {
      console.error('Error in chat service:', error);
      throw new Error('Failed to send message');
    }
  },
};

// // Interceptor para agregar el token de autorización
// api.interceptors.request.use(
//   config => {
//     const token = JSON.parse(localStorage.getItem('authState')!)?.token;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );
