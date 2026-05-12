import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Fest.io
        </Typography>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {user && <MenuItem onClick={() => navigate('/FestivalesList')}>Festivales</MenuItem>}
            {user && <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>}
            {!user && <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>}
          </Menu>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {user && (
            <Button color="inherit" onClick={() => navigate('/FestivalesList')}>
              Festivales
            </Button>
          )}
          
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
          {user?.role === 'ADMIN' && (
            <Button color=
            "inherit" onClick={() => navigate('/AdminPanel')}>
            Administración de usuarios en general
            </Button>
    )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};