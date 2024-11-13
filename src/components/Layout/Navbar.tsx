import { IconButton, Typography } from '@mui/material';
import { Menu, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  isDesktop: boolean;
  openDesktop: boolean;
  toggleMenu: () => void;
}

export const Navbar = ({ isDesktop, openDesktop, toggleMenu }: NavbarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
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
      <IconButton
        color="secondary"
        onClick={handleLogout}
        title="Cerrar sesión"
      >
        <Logout />
      </IconButton>
    </div>
  );
};
