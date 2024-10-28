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
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { Send, AttachFile, Inbox, Mail, Menu } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [openDesktop, setOpenDesktop] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');

      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Respuesta del bot', sender: 'bot' },
        ]);
      }, 1000);
    }
  };

  const toggleMenu = () => {
    if (isDesktop) {
      setOpenDesktop(!openDesktop);
    } else {
      setOpenMobile(!openMobile);
    }
  };

  const PermanentDrawer = (
    <Box
      sx={{
        width: 250,
        paddingTop: 2,
        paddingLeft: 2,
        boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'primary.main',
      }}
      role="presentation"
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts', 'Drafts', 'Drafts'].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ),
        )}
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
    <div className="flex flex-col min-h-screen ">
      <div
        className={`flex flex-col flex-grow pt-16 ${openDesktop ? 'ml-250' : ''}`}
      >
        <AppBar
          position="fixed"
          sx={{
            marginLeft: openDesktop ? 250 : 0,
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'primary.main',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div">
              Opti - Assistant
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="flex flex-grow">
          {openDesktop && isDesktop && (
            <div className="hidden md:block">{PermanentDrawer}</div>
          )}
          <Drawer
            anchor="left"
            open={openMobile}
            onClose={toggleMenu}
            variant="temporary"
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {PermanentDrawer}
          </Drawer>

          <div className="flex flex-col flex-grow p-5 ">
            <Paper
              sx={{
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'primary.main',
              }}
              className="w-full md:max-w-[800px] mx-auto flex-grow flex flex-col justify-start p-4 shadow-lg"
            >
              <div className="flex flex-col p-2 max-h-[650px] overflow-y-auto flex-grow">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div
                      className={`p-2 rounded-xl ${msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-300 text-black'} w-auto max-w-[80%] break-words`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </Paper>
            <div className="w-full flex justify-center my-4">
              <IconButton color="secondary">
                <AttachFile />
              </IconButton>
              <TextareaAutosize
                className="w-full md:max-w-[800px] text-sm font-normal font-sans leading-5 px-3 py-2 rounded-xl shadow-lg resize-none"
                aria-label="empty textarea"
                placeholder="Escribe tu solicitud"
                minRows={3}
                maxRows={10}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
              />
              <IconButton color="secondary" onClick={handleSend}>
                <Send />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
