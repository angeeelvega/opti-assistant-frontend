import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { Navbar } from '../components/Layout/Navbar';
import { Drawer } from '../components/Layout/Drawer';

export const RootLayout = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(isDesktop);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen">
      <Drawer
        isOpen={isDrawerOpen}
        isDesktop={isDesktop}
        onToggle={handleDrawerToggle}
      />
      <div className="flex-1">
        <Navbar
          isDesktop={isDesktop}
          openDesktop={isDrawerOpen}
          toggleMenu={handleDrawerToggle}
        />
        <main className="h-[calc(100vh-64px)] pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
