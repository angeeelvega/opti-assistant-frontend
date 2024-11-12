import { useEffect, useState } from 'react';
import {
  Drawer,
  IconButton,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Message } from '../../types/interfaces';
import { DrawerContent } from '../../components/Drawer/DrawerContent';
import { ChatMessages } from '../../components/Chat/ChatMessages';
import { ChatInput } from '../../components/Chat/ChatInput';

const Home = () => {
  const [messages, setMessages] = useState<
    Array<Message | { text: JSX.Element; sender: 'user' | 'bot' }>
  >([]);
  const [openDesktop, setOpenDesktop] = useState(true);
  const [openMobile, setOpenMobile] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    if (isDesktop) {
      setOpenDesktop(true);
      setOpenMobile(false);
    } else {
      setOpenDesktop(false);
      setOpenMobile(false);
    }
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
          <DrawerContent
            isOpen={openDesktop}
            isDesktop={isDesktop}
            onToggle={toggleMenu}
          />
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
          <DrawerContent
            isOpen={openMobile}
            isDesktop={isDesktop}
            onToggle={toggleMenu}
          />
        </Drawer>
      )}

      <div className="flex-1 transition-all duration-300">
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
            <ChatMessages messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </Paper>
      </div>
    </div>
  );
};
export default Home;
