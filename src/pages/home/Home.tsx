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

  useEffect(() => {
    if (isDesktop) {
      setOpenDesktop(true);
      setOpenMobile(false);
    } else {
      setOpenDesktop(false);
      setOpenMobile(false);
    }
  }, [isDesktop]);

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
        backgroundColor: 'primary.main',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      role="presentation"
    >
      {isDesktop && (
        <div className="flex items-center h-16 px-4">
          {openDesktop && (
            <IconButton
              edge="start"
              color="secondary"
              aria-label="close menu"
              onClick={toggleMenu}
            >
              <Menu />
            </IconButton>
          )}
        </div>
      )}

      <List sx={{ pt: isDesktop ? 0 : 1 }}>
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
    <div className="flex min-h-screen">
      {isDesktop && (
        <Drawer
          variant="persistent"
          anchor="left"
          open={openDesktop}
          sx={{
            width: 250,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
              top: 0,
              height: '100%',
            },
          }}
        >
          {PermanentDrawer}
        </Drawer>
      )}

      {!isDesktop && (
        <Drawer
          anchor="left"
          open={openMobile}
          onClose={toggleMenu}
          variant="temporary"
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
        >
          {PermanentDrawer}
        </Drawer>
      )}

      <div className={`flex-1 transition-all duration-300 `}>
        <Paper
          sx={{
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'primary.main',
            minHeight: '100vh',
          }}
          className="w-full md:max-w-[800px] mx-auto flex flex-col shadow-lg"
        >
          <div
            className="fixed top-0 flex items-center h-16 px-4 shadow-md bg-white z-50"
            style={{
              right: 0,
              width: openDesktop && isDesktop ? 'calc(100% - 250px)' : '100%',
              left: openDesktop && isDesktop ? '250px' : 0,
              transition: 'left 0.3s, width 0.3s',
            }}
          >
            {(!isDesktop || !openDesktop) && (
              <IconButton
                edge="start"
                color="secondary"
                aria-label="toggle menu"
                onClick={toggleMenu}
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              color="secondary"
              className="flex-1"
            >
              Opti - Assistant
            </Typography>
          </div>
          <div className="flex flex-col h-screen pt-16">
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
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default Home;
