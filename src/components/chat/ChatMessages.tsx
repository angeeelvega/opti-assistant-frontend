import { useRef, useEffect, useState } from 'react';
import { ChatMessagesProps, Message } from '../../types/interfaces';
import { VolumeUp } from '@mui/icons-material';
import { IconButton, CircularProgress, Button } from '@mui/material';
import { textToSpeechService } from '../../services/textToSpeechService';

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [playingMessageId, setPlayingMessageId] = useState<number | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSpeak = async (text: string | JSX.Element, messageId: number) => {
    if (typeof text !== 'string' || playingMessageId !== null) return;

    try {
      setPlayingMessageId(messageId);
      await textToSpeechService.speak(text);
    } catch (error) {
      console.error('Error al reproducir mensaje:', error);
    } finally {
      setPlayingMessageId(null);
    }
  };

  return (
    <div
      className="flex-1 overflow-y-auto p-4"
      style={{ height: 'calc(100vh - 128px)' }}
    >
      {messages.map((msg: Message, index: number) => (
        <div
          key={index}
          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
        >
          <div
            className={`p-3 rounded-xl ${msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black'} max-w-[80%] break-words shadow-sm whitespace-pre-wrap`}
          >
            <div className="flex items-start gap-2">
              <div>{msg.text}</div>
              {msg.sender === 'bot' && (
                <IconButton
                  onClick={() => handleSpeak(msg.text, index)}
                  size="small"
                  className="ml-1 text-gray-600 hover:text-gray-800"
                  disabled={playingMessageId !== null}
                >
                  {playingMessageId === index ? (
                    <CircularProgress size={20} />
                  ) : (
                    <VolumeUp fontSize="small" />
                  )}
                </IconButton>
              )}
            </div>
            {msg.files && msg.files.length > 0 && (
              <div className="mt-2">
                {msg.files.map((file, fileIndex) => (
                  <Button
                    key={fileIndex}
                    variant="contained"
                    color="primary"
                    onClick={() => window.open(file.value, '_blank')}
                    className="mr-2"
                  >
                    {file.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
