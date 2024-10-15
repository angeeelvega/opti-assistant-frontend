import {
  TextareaAutosize,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider, Drawer
} from '@mui/material';
import { Send, AttachFile, Inbox, Mail, Menu } from '@mui/icons-material';
import React from 'react';

const Home = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (newOpen: boolean | ((prevState: boolean) => boolean)) => () => {
      setOpen(newOpen);
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
    <div>
      <div className="w-full flex p-5 md:p-2">
        <IconButton color="secondary" onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      {/* Contenedor del chat */}
      <div className="">
        <div className=" flex flex-col items-center justify-center  pl-3 pr-3 md:p-10">
          <div className="flex flex-col items-center mt-56">
            <img
              src="src/assets/img/logo-footer.png"
              className="h-12 filter invert brightness-100"
            />
            <div className="mt-8 w-full md:max-w-[600px] ">
              <h1 className='font-bold text-center'>¡Hola! </h1>
              <p>¿Cómo puedo ayudarte hoy?</p>
            </div>
          </div>
          <div className="fixed bottom-0 w-full flex justify-center p-4 md:p-10 ">
            <IconButton color="secondary">
              <AttachFile />
            </IconButton>
            <TextareaAutosize
              className="w-full md:max-w-[600px] text-sm font-normal font-sans leading-5 px-3 py-2 rounded-xl rounded-br-none shadow-lg"
              aria-label="empty textarea"
              placeholder="Escribe tu solicitud"
              color={'primary'}
              minRows={3}
              maxRows={10}
            />
            <IconButton color="secondary">
              <Send />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
