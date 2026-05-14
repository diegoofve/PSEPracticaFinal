import { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FestivalIcon from '@mui/icons-material/Festival';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BarChartIcon from '@mui/icons-material/BarChart';
import EditNoteIcon from '@mui/icons-material/EditNote';

import './Navbar.css';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar position="fixed" elevation={0} className="navbar-root">

      <div className="navbar-glow-line" />

      <Toolbar className="navbar-toolbar">

        <Box className="navbar-logo" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <Box className="navbar-logo-mark">
            <MusicNoteIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
          <span className="navbar-logo-text">Festival Pass</span>
        </Box>

        <Box className="navbar-desktop">
          
          {user?.role === 'CLIENTE' && (
            <>
              <button className="nav-btn-ghost" onClick={() => navigate('/festivales-list')}>
                <FestivalIcon sx={{ fontSize: 15 }} /> Festivales
              </button>
              <button className="nav-btn-ghost" onClick={() => navigate('/gestion-abonos')}>
                <ConfirmationNumberIcon sx={{ fontSize: 15 }} /> Mis Abonos
              </button>
              <button className="nav-btn-ghost" onClick={() => navigate('/modificar-perfil-cliente')}>
                <AccountCircleIcon sx={{ fontSize: 15 }} /> Mi Perfil
              </button>
            </>
          )}

          {user?.role === 'EMPRESA' && (
            <>
              <button className="nav-btn-ghost" onClick={() => navigate('/datos-empresa')}>
                <BarChartIcon sx={{ fontSize: 15 }} /> Dashboard
              </button>
              <button className="nav-btn-ghost" onClick={() => navigate('/modificar-festival')}>
                <EditNoteIcon sx={{ fontSize: 15 }} /> Gestionar Festival
              </button>
            </>
          )}

          {user?.role === 'ADMIN' && (
            <button className="nav-btn-ghost" onClick={() => navigate('/admin-panel')}>
              <AdminPanelSettingsIcon sx={{ fontSize: 15 }} /> Administración
            </button>
          )}

          {user ? (
            <button className="nav-btn-primary" onClick={handleLogout}>
              <LogoutIcon sx={{ fontSize: 15 }} /> Cerrar sesión
            </button>
          ) : (
            <button className="nav-btn-primary" onClick={() => navigate('/login')}>
              <LoginIcon sx={{ fontSize: 15 }} /> Login
            </button>
          )}
        </Box>

        <Box className="navbar-mobile">
          <IconButton
            className="nav-hamburger"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
          >
            <MenuIcon sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 22 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            slotProps={{
              paper: {
                sx: {
                background: 'rgba(18, 12, 30, 0.97)',
                border: '0.5px solid rgba(255,255,255,0.12)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
                mt: 1,
                minWidth: 180,
                '& .MuiMenuItem-root': {
                  fontFamily: "var(--font-body)",
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.75)',
                  gap: '8px',
                  borderRadius: '8px',
                  mx: '4px',
                  '&:hover': {
                    background: 'rgba(255,60,120,0.12)',
                    color: '#fff',
                  },
                },
              },
            }}}
          >
            {user?.role === 'CLIENTE' && [
              <MenuItem key="festivales" onClick={() => { navigate('/festivales-list'); closeMenu(); }}>
                <FestivalIcon sx={{ fontSize: 16 }} /> Festivales
              </MenuItem>,
              <MenuItem key="abonos" onClick={() => { navigate('/gestion-abonos'); closeMenu(); }}>
                <ConfirmationNumberIcon sx={{ fontSize: 16 }} /> Mis Abonos
              </MenuItem>,
              <MenuItem key="perfil" onClick={() => { navigate('/modificar-perfil-cliente'); closeMenu(); }}>
                <AccountCircleIcon sx={{ fontSize: 16 }} /> Mi Perfil
              </MenuItem>
            ]}

            {user?.role === 'EMPRESA' && [
              <MenuItem key="dashboard" onClick={() => { navigate('/datos-empresa'); closeMenu(); }}>
                <BarChartIcon sx={{ fontSize: 16 }} /> Dashboard
              </MenuItem>,
              <MenuItem key="festival" onClick={() => { navigate('/modificar-festival'); closeMenu(); }}>
                <EditNoteIcon sx={{ fontSize: 16 }} /> Gestionar Festival
              </MenuItem>
            ]}

            {user?.role === 'ADMIN' && (
              <MenuItem onClick={() => { navigate('/admin-panel'); closeMenu(); }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 16 }} /> Administración
              </MenuItem>
            )}

            {user ? (
              <MenuItem onClick={() => { handleLogout(); closeMenu(); }}>
                <LogoutIcon sx={{ fontSize: 16 }} /> Cerrar sesión
              </MenuItem>
            ) : (
              <MenuItem onClick={() => { navigate('/login'); closeMenu(); }}>
                <LoginIcon sx={{ fontSize: 16 }} /> Login
              </MenuItem>
            )}
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};