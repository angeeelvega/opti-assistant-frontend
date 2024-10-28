import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
} from '@mui/material';
import { Inbox, Mail, Menu } from '@mui/icons-material';
import { DrawerProps } from '../../types/interfaces';

export const DrawerContent = ({ isOpen, isDesktop, onToggle }: DrawerProps) => {
  return (
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
          {isOpen && (
            <IconButton
              edge="start"
              color="secondary"
              aria-label="close menu"
              onClick={onToggle}
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
};
