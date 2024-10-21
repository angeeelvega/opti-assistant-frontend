import {
  TextareaAutosize,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  Paper,
} from '@mui/material';
import { Send, AttachFile, Inbox, Mail, Menu } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Home = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleDrawer =
    (newOpen: boolean | ((prevState: boolean) => boolean)) => () => {
      setOpen(newOpen);
    };

  useEffect(() => {
    // Desplaza el scroll hacia abajo cuando se actualizan los mensajes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); // Se ejecuta cada vez que `messages` cambia

  const handleSend = () => {
    if (inputValue.trim()) {
      // Agrega el mensaje del usuario
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue(''); // Limpiar el input

      // Simula la respuesta del bot (puedes personalizar esto)
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Respuesta del bot', sender: 'bot' },
        ]);
      }, 1000); // Respuesta después de 1 segundo
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Menú superior */}
      <div className="w-full flex p-5 md:p-2">
        <IconButton color="secondary" onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <Paper
          elevation={3}
          className="w-full md:max-w-[600px] mx-auto flex-grow flex flex-col justify-start p-4" // Cambia justify-center a justify-start
        >
          <div className="flex flex-col p-2 max-h-[650px] overflow-y-auto">
            {/* Renderiza los mensajes */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div
                  className={`p-2 rounded-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} w-auto  max-w-[80%] break-words`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Esta div sirve como ancla para el scroll */}
            <div ref={messagesEndRef} />
          </div>
        </Paper>

        <div className="w-full flex justify-center my-4">
          <IconButton color="secondary">
            <AttachFile />
          </IconButton>
          <TextareaAutosize
            className="w-full md:max-w-[600px] text-sm font-normal font-sans leading-5 px-3 py-2 rounded-xl shadow-lg resize-none"
            aria-label="empty textarea"
            placeholder="Escribe tu solicitud"
            minRows={3}
            maxRows={10}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)} // Maneja el cambio del input
            onKeyDown={e => e.key === 'Enter' && handleSend()} // Enviar con Enter
          />
          <IconButton color="secondary" onClick={handleSend}>
            <Send />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
