import { useEffect, useState } from 'react';
import {
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
  Drawer as MuiDrawer,
} from '@mui/material';
import { Menu, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Message } from '../types/interfaces';
import { Drawer } from '../components/Layout/Drawer';
import { ChatMessages } from '../components/Chat/ChatMessages';
import { ChatInput } from '../components/Chat/ChatInput';

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [messages, setMessages] = useState<
    Array<Message | { text: JSX.Element; sender: 'user' | 'bot' }>
  >([]);
  const [openDesktop, setOpenDesktop] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    setOpenDesktop(isDesktop);
    setOpenMobile(false);
  }, [isDesktop]);

  const toggleMenu = () => {
    if (isDesktop) {
      setOpenDesktop(!openDesktop);
    } else {
      setOpenMobile(!openMobile);
    }
  };

  const handleSendMessage = (
    text: string | JSX.Element,
    isBot: boolean = false,
  ) => {
    setMessages(prev => [
      ...prev,
      {
        text,
        sender: isBot ? 'bot' : 'user',
      },
    ]);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {!isDesktop && (
        <MuiDrawer
          variant="temporary"
          anchor="left"
          open={openMobile}
          onClose={toggleMenu}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
        >
          <Drawer
            isOpen={openMobile}
            isDesktop={isDesktop}
            onToggle={toggleMenu}
          />
        </MuiDrawer>
      )}

      {isDesktop && (
        <MuiDrawer
          variant="persistent"
          anchor="left"
          open={openDesktop}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
        >
          <Drawer
            isOpen={openDesktop}
            isDesktop={isDesktop}
            onToggle={toggleMenu}
          />
        </MuiDrawer>
      )}

      <div
        className="flex-1"
        style={{
          marginLeft: isDesktop && openDesktop ? '250px' : '0',
          transition: 'margin-left 0.3s',
        }}
      >
        <div
          className="fixed top-0 flex items-center h-16 px-4 shadow-md bg-white z-50"
          style={{
            right: 0,
            left: isDesktop && openDesktop ? '250px' : '0',
            transition: 'left 0.3s',
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
          <IconButton
            color="secondary"
            onClick={handleLogout}
            title="Cerrar sesión"
          >
            <Logout />
          </IconButton>
        </div>

        <div 
          className="flex justify-center"
          style={{
            position: 'fixed',
            top: '64px',
            bottom: 0,
            right: 0,
            left: isDesktop && openDesktop ? '250px' : '0',
            transition: 'left 0.3s',
          }}
        >
          <Paper 
            elevation={0}
            className="flex flex-col w-full"
            sx={{
              maxWidth: isDesktop ? '800px' : '100%',
              boxShadow: '0 3px 5px rgba(0, 0, 0, 0.1)',
              height: '100%'
            }}
          >
            <ChatMessages messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
          </Paper>
        </div>
      </div>
    </div>
  );
};
export default Home;
