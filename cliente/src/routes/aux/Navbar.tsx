//change all navbar to include a full guide of all routes (home, festivales, admin panel, login/logout)

import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FestivalIcon from '@mui/icons-material/Festival';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import './Navbar.css';

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="fixed" elevation={0} className="navbar-root">

      {/* Subtle top glow line */}
      <div className="navbar-glow-line" />

      <Toolbar className="navbar-toolbar">

        {/* ── Logo ── */}
        <Box className="navbar-logo" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <Box className="navbar-logo-mark">
            <MusicNoteIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
          <span className="navbar-logo-text">Festival Pass</span>
        </Box>

        {/* ── Desktop links ── */}
        <Box className="navbar-desktop">
          {user && (
            <button className="nav-btn-ghost" onClick={() => navigate('/FestivalesList')}>
              <FestivalIcon sx={{ fontSize: 15 }} />
              Festivales
            </button>
          )}
          {user?.role === 'ADMIN' && (
            <button className="nav-btn-ghost" onClick={() => navigate('/AdminPanel')}>
              <AdminPanelSettingsIcon sx={{ fontSize: 15 }} />
              Administración
            </button>
          )}
          {user ? (
            <button className="nav-btn-primary" onClick={handleLogout}>
              <LogoutIcon sx={{ fontSize: 15 }} />
              Cerrar sesión
            </button>
          ) : (
            <button className="nav-btn-primary" onClick={() => navigate('/login')}>
              <LoginIcon sx={{ fontSize: 15 }} />
              Login
            </button>
          )}
        </Box>

        {/* ── Mobile hamburger ── */}
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
            onClose={() => setAnchorEl(null)}
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
            {user && (
              <MenuItem onClick={() => { navigate('/FestivalesList'); setAnchorEl(null); }}>
                <FestivalIcon sx={{ fontSize: 16 }} /> Festivales
              </MenuItem>
            )}
            {user?.role === 'ADMIN' && (
              <MenuItem onClick={() => { navigate('/AdminPanel'); setAnchorEl(null); }}>
                <AdminPanelSettingsIcon sx={{ fontSize: 16 }} /> Administración
              </MenuItem>
            )}
            {user ? (
              <MenuItem onClick={() => { handleLogout(); setAnchorEl(null); }}>
                <LogoutIcon sx={{ fontSize: 16 }} /> Cerrar sesión
              </MenuItem>
            ) : (
              <MenuItem onClick={() => { navigate('/login'); setAnchorEl(null); }}>
                <LoginIcon sx={{ fontSize: 16 }} /> Login
              </MenuItem>
            )}
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  );
};