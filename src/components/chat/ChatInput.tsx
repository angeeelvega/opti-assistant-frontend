import { useState, useRef } from 'react';
import {
  TextareaAutosize,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Send, AttachFile, PictureAsPdf, Mic, Stop } from '@mui/icons-material';
import { chatService } from '../../services/ChatService';
import { uploadService } from '../../services/uploadService';
import { speechToTextService } from '../../services/speechToTextService';
import { ChatInputProps } from '../../types/interfaces';

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const userMessage = inputValue.trim();

    try {
      setIsLoading(true);
      setInputValue('');

      onSendMessage(userMessage, false);

      const response = await chatService.sendMessage({
        message: userMessage,
        user_id: '1',
      });

      if (response.result) {
        onSendMessage(response.result, true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      onSendMessage('Lo siento, hubo un error al procesar tu mensaje.', true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      onSendMessage(
        <div className="flex items-center gap-2">
          <PictureAsPdf color="error" />
          <span>{file.name}</span>
        </div>,
        false,
      );

      const response = await uploadService.uploadPDF(file);
      if (response) {
        onSendMessage(response, true);
      }
    } catch (error) {
      setErrorMessage('Error al subir el archivo PDF');
      setErrorModal(true);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mimeType = MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 16000
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        try {
          setIsLoading(true);
          const text = await speechToTextService.transcribe(audioBlob);
          if (text.trim()) {
            setInputValue(text);
            await handleSend();
          }
        } catch (error) {
          setErrorMessage('Error al procesar el audio');
          setErrorModal(true);
        } finally {
          setIsLoading(false);
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.start(250);
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setErrorMessage('Error al acceder al micrófono');
      setErrorModal(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <IconButton
            color="secondary"
            size="small"
            className="ml-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <AttachFile />
          </IconButton>
          <TextareaAutosize
            className="flex-1 text-sm font-normal font-sans resize-none border-0 focus:outline-none"
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
            disabled={isLoading || isRecording}
          />
          <IconButton
            color="secondary"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            className="mr-2"
          >
            {isRecording ? <Stop /> : <Mic />}
          </IconButton>
          <IconButton
            color="secondary"
            onClick={handleSend}
            className="mr-2"
            disabled={!inputValue.trim() || isLoading || isRecording}
          >
            <Send />
          </IconButton>
        </div>
      </div>
      <Dialog open={errorModal} onClose={() => setErrorModal(false)}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{errorMessage}</DialogContent>
        <DialogActions>
          <Button onClick={() => setErrorModal(false)} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
