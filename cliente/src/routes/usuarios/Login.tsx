//falta poner que si una empresa no esta validada no puede iniciar sesión

import { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api.ts';
import './Login.css';

export const Login = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{email?: string; password?: string; api?: string }>({});

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {login} = useAuth();

    const validate = () => {
        const newErrors: typeof errors = {};
        if(!email) newErrors.email = 'El email es obligatorio';
        if(!email.includes('@')) newErrors.email = 'El email es invalido';
        if(!password) newErrors.password = 'La contraseña es obligatoria';
        if(password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


  const handleSubmit = async (e: React.FormEvent) => { //deprecated xd
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await api.post('/login', { email, password });
      login(response.data.token);
      navigate('/festivales-list');
    } catch (error: any) {
      setErrors({ api: error.response?.data?.message || 'Error al iniciar sesión' });
    } finally {
      setLoading(false);
    }
  };

  return (<Box className="fest-root">
    <Box className="fest-bg-glow glow1" />
    <Box className="fest-bg-glow glow2" />
    <Box className="fest-bg-glow glow3" />
    <Box className="fest-scanlines" />

    <Box component="form" className="fest-card" onSubmit={handleSubmit}>

      <Box className="fest-ticket-strip">
        <Box className="fest-logo-mark">
          <MusicNoteIcon sx={{ color: '#fff', fontSize: 22 }} />
        </Box>
        <Box>
          <Typography className="fest-title" component="h1">
            Festivals
          </Typography>
          <Typography className="fest-subtitle">
            2026-2027
          </Typography>
        </Box>
      </Box>

      <Box className="fest-dot-row">
        <Box className="fest-dot d1" />
        <Box className="fest-dot d2" />
        <Box className="fest-dot d3" />
      </Box>

      {errors.api && (
        <Alert
          severity="error"
          className="fest-alert"
          sx={{
            mb: 2,
            background: 'rgba(255, 60, 60, 0.1)',
            border: '0.5px solid rgba(255, 60, 60, 0.3)',
            borderRadius: '8px',
            color: '#FF6B6B',
            '& .MuiAlert-icon': { color: '#FF6B6B' },
          }}
        >
          {errors.api}
        </Alert>
      )}

      <TextField
        className="fest-field"
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        slotProps={{
            input: {
            startAdornment: (
                <InputAdornment position="start">
                <EmailIcon sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 18 }} />
                </InputAdornment>
            ),
            },
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.06)',
            color: '#fff',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
            '&.Mui-focused fieldset': { borderColor: 'rgba(255,60,120,0.6)', borderWidth: '1px' },
          },
          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FF3C78' },
          '& .MuiFormHelperText-root': { color: '#FF6B6B' },
          '& input': { fontFamily: "'DM Sans', sans-serif" },
        }}
      />
      <TextField
        label="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        slotProps={{
            input: {
            startAdornment: (
                <InputAdornment position="start">
                <LockIcon sx={{ color: 'rgba(255,255,255,0.35)', fontSize: 18 }} />
                </InputAdornment>
            ),
            },
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.06)',
            color: '#fff',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
            '&.Mui-focused fieldset': { borderColor: 'rgba(255,60,120,0.6)', borderWidth: '1px' },
          },
          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: '13px' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#FF3C78' },
          '& .MuiFormHelperText-root': { color: '#FF6B6B' },
          '& input': { fontFamily: "'DM Sans', sans-serif" },
        }}
      />
      <Button
        type="submit"
        fullWidth
        disabled={loading}
        className="fest-btn"
        sx={{
          mt: 1,
          padding: '13px',
          borderRadius: '10px',
          background: 'linear-gradient(90deg, #FF3C78 0%, #A020F0 100%)',
          color: '#fff',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '19px',
          letterSpacing: '3px',
          textTransform: 'none',
          overflow: 'hidden',
          transition: 'opacity 0.2s, transform 0.15s',
          '&:hover': {
            background: 'linear-gradient(90deg, #FF3C78 0%, #A020F0 100%)',
            opacity: 0.88,
            transform: 'translateY(-2px)',
          },
          '&.Mui-disabled': {
            background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.3)',
          },
        }}
      >
        <Box className="fest-btn-shine" />
        {loading
          ? <CircularProgress size={22} sx={{ color: '#fff' }} />
          : 'Entrar al festival'
        }
      </Button>
      <Box className="fest-divider">
        <Box className="fest-divider-line" />
        <Typography className="fest-divider-text">acceso</Typography>
        <Box className="fest-divider-line" />
      </Box>
      <Box className="fest-tags">
        <span className="fest-tag tag-pink">Electrónica</span>
        <span className="fest-tag tag-purple">Indie</span>
        <span className="fest-tag tag-amber">Live Acts</span>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              ¿Aún no tienes cuenta? <span onClick={() => navigate('/register')} style={{ color: '#FF3C78', cursor: 'pointer', fontWeight: 'bold' }}>Regístrate</span>
            </Typography>
          </Box>

    </Box>
  </Box>
  )};