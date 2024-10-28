import { useRef, useEffect } from 'react';
import { ChatMessagesProps } from '../../types/interfaces';

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto p-4"
      style={{
        height: 'calc(100vh - 64px - 88px)',
      }}
    >
      {messages.map((msg, index) => (
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
            {msg.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
