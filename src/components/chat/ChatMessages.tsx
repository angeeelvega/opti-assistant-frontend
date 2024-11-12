import { useRef, useEffect } from 'react';
import { ChatMessagesProps, Message } from '../../types/interfaces';
import { VolumeUp } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSpeak = (text: string | JSX.Element) => {
    if (typeof text === 'string') {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="flex-1 overflow-y-auto p-4"
      style={{
        height: 'calc(100vh - 64px - 88px)',
      }}
    >
      {messages.map((msg: Message, index: number) => (
        <div
          key={index}
          className={`flex ${
            msg.sender === 'user' ? 'justify-end' : 'justify-start'
          } mb-4`}
        >
          <div
            className={`p-3 rounded-xl ${
              msg.sender === 'user'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-black'
            } max-w-[80%] break-words shadow-sm whitespace-pre-wrap`}
          >
            <div className="flex items-start gap-2">
              <div>{msg.text}</div>
              {msg.sender === 'bot' && (
                <IconButton
                  onClick={() => handleSpeak(msg.text)}
                  size="small"
                  className="ml-1 text-gray-600 hover:text-gray-800"
                >
                  <VolumeUp fontSize="small" />
                </IconButton>
              )}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
