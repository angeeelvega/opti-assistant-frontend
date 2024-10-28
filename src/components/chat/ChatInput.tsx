import { TextareaAutosize, IconButton } from '@mui/material';
import { Send, AttachFile } from '@mui/icons-material';
import { useState } from 'react';
import { ChatInputProps } from '../../types/interfaces';

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <IconButton color="secondary" size="small" className="ml-2">
            <AttachFile />
          </IconButton>
          <TextareaAutosize
            className="flex-1 text-sm font-normal font-sans leading-5 px-3 py-2 resize-none border-0 focus:outline-none"
            aria-label="empty textarea"
            placeholder="Escribe tu solicitud..."
            minRows={1}
            maxRows={4}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <IconButton
            color="secondary"
            onClick={handleSend}
            className="mr-2"
            disabled={!inputValue.trim()}
          >
            <Send />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
