import { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert, InputAdornment, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';

import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api.ts';
import './Register.css';

  export const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formType, setFormType] = useState<'cliente' | 'empresa'>('cliente');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const [dataCliente, setDataCliente] = useState({
    nombre: '', apellidos: '', fechaNacimiento: '', dni: '', telefono: '', email: '', password: '' });

    const [dataEmpresa, setDataEmpresa] = useState({
    razon: '', cif: '', domicilio: '', nombreContacto: '', telefono: '', email: '', password: ''});

    const handleClienteChange = (e: React.ChangeEvent<HTMLInputElement>) => setDataCliente({ ...dataCliente, [e.target.name]: e.target.value });
    const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement>) => setDataEmpresa({ ...dataEmpresa, [e.target.name]: e.target.value });

  const validateCliente = () => {
    const newErrors: typeof errors = {};

    if (!dataCliente.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!dataCliente.apellidos.trim()) newErrors.apellidos = 'Los apellidos son obligatorios';

    if (!dataCliente.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha es obligatoria';
    } else {
      const birthDate = new Date(dataCliente.fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) newErrors.fechaNacimiento = 'Debes ser mayor de edad para registrarte.';
    }

    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i;
    if (!dniRegex.test(dataCliente.dni)) newErrors.dni = 'DNI no válido.';

    const telefonoRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
    if (!telefonoRegex.test(dataCliente.telefono)) newErrors.telefono = 'Teléfono no válido.';

    if (!dataCliente.email.includes('@')) newErrors.email = 'El email es inválido';
    if (dataCliente.password.length < 8) newErrors.password = 'Mínimo 8 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmpresa = () => {
    const newErrors: typeof errors = {};
  if (!dataEmpresa.razon.trim()) {
    newErrors.razon = 'La razón social es obligatoria';
  }
  const cifRegex = /^[ABCDEFGHJKLMNPQRSUVWabcdefghjklmnpqrsuvw][0-9]{8}$/;
  if (!cifRegex.test(dataEmpresa.cif)) {
    newErrors.cif = 'CIF no válido.';
  }
  if (!dataEmpresa.domicilio.trim()) {
    newErrors.domicilio = 'El domicilio es obligatorio';
  }
  if (!dataEmpresa.nombreContacto.trim()) {
    newErrors.nombreContacto = 'El nombre de contacto es obligatorio';
  }
  const telefonoRegex = /^(\+34|0034|34)?[6789]\d{8}$/;
  if (!telefonoRegex.test(dataEmpresa.telefono)) {
    newErrors.telefono = 'Teléfono no válido.';
  }
  if (!dataEmpresa.email.includes('@')) {
    newErrors.email = 'El email es inválido';
  }
  if (dataEmpresa.password.length < 8) {
    newErrors.password = 'Mínimo 8 caracteres';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const isValid = formType === 'cliente' ? validateCliente() : validateEmpresa();
    if (!isValid) return;

    setLoading(true);
    try {
      const endpoint = formType === 'cliente' ? '/register/cliente' : '/register/empresa'; //esto hay que cambiar las rutas de para coincidir cn la api
      const payload = formType === 'cliente' ? dataCliente : dataEmpresa;
      navigate('/FestivalesList');
    } catch (error: any) {
      setErrors({ api: error.response?.data?.message || 'Error al registrar la cuenta del cliente' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0a12', position: 'relative', overflow: 'hidden', p: 2 }}>
      <Box sx={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, bgcolor: 'rgba(255, 60, 120, 0.25)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 500, height: 500, bgcolor: 'rgba(160, 32, 240, 0.2)', borderRadius: '50%', filter: 'blur(120px)', zIndex: 0 }} />

      <Box sx={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 600 }}>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 3, background: 'rgba(255,255,255,0.05)', p: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', justifyContent: 'center' }}>
          <Button onClick={() => { setFormType('cliente'); setErrors({}); }} sx={{ flex: 1, py: 1.5, borderRadius: '10px', textTransform: 'none', fontWeight: 'bold', background: formType === 'cliente' ? 'linear-gradient(90deg, #FF3C78 0%, #A020F0 100%)' : 'transparent', color: formType === 'cliente' ? 'white' : 'rgba(255,255,255,0.5)' }}>
            Cliente
          </Button>
          <Button onClick={() => { setFormType('empresa'); setErrors({}); }} sx={{ flex: 1, py: 1.5, borderRadius: '10px', textTransform: 'none', fontWeight: 'bold', background: formType === 'empresa' ? 'linear-gradient(90deg, #FF3C78 0%, #A020F0 100%)' : 'transparent', color: formType === 'empresa' ? 'white' : 'rgba(255,255,255,0.5)' }}>
            Empresa
          </Button>
        </Box>

        <Paper elevation={24} component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'rgba(20, 20, 30, 0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 4, p: { xs: 3, md: 5 } }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, pb: 2, borderBottom: '1px dashed rgba(255, 255, 255, 0.15)' }}>
            <Box sx={{ background: 'linear-gradient(135deg, #FF3C78, #A020F0)', borderRadius: 2, width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MusicNoteIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h4" component="h1" sx={{ color: 'white' ,fontWeight : "bold"}}>
                {formType === 'cliente' ? 'Nuevo Acceso' : 'Alta Promotor'}
              </Typography>
            </Box>
          </Box>

          {errors.api && <Alert severity="error" sx={{ mb: 3 }}>{errors.api}</Alert>}

          <Grid container spacing={2.5}>
            {formType === 'cliente' && (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Nombre" name="nombre" value={dataCliente.nombre} onChange={handleClienteChange} error={!!errors.nombre} helperText={errors.nombre} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Apellidos" name="apellidos" value={dataCliente.apellidos} onChange={handleClienteChange} error={!!errors.apellidos} helperText={errors.apellidos} fullWidth />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="DNI" name="dni" value={dataCliente.dni} onChange={handleClienteChange} error={!!errors.dni} helperText={errors.dni} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Teléfono" name="telefono" value={dataCliente.telefono} onChange={handleClienteChange} error={!!errors.telefono} helperText={errors.telefono} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField className="fest-field" label="Fecha Nacimiento" type="date" name="fechaNacimiento" value={dataCliente.fechaNacimiento} onChange={handleClienteChange} error={!!errors.fechaNacimiento} helperText={errors.fechaNacimiento} fullWidth slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: <InputAdornment position="start"><CalendarTodayIcon /></InputAdornment> } }} />
                </Grid>
              </>
            )}

            {formType === 'empresa' && (
              <>
                <Grid size={{ xs: 12 }}>
                  <TextField className="fest-field" label="Razón Social" name="razon" value={dataEmpresa.razon} onChange={handleEmpresaChange} error={!!errors.razon} helperText={errors.razon} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><BusinessIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="CIF" name="cif" value={dataEmpresa.cif} onChange={handleEmpresaChange} error={!!errors.cif} helperText={errors.cif} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Teléfono" name="telefono" value={dataEmpresa.telefono} onChange={handleEmpresaChange} error={!!errors.telefono} helperText={errors.telefono} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField className="fest-field" label="Domicilio Fiscal" name="domicilio" value={dataEmpresa.domicilio} onChange={handleEmpresaChange} error={!!errors.domicilio} helperText={errors.domicilio} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField className="fest-field" label="Nombre Contacto" name="nombreContacto" value={dataEmpresa.nombreContacto} onChange={handleEmpresaChange} error={!!errors.nombreContacto} helperText={errors.nombreContacto} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> } }} />
                </Grid>
              </>
            )}

            {/* CAMPOS COMUNES (Email y Password) */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField className="fest-field" label="Email" type="email" name="email" value={formType === 'cliente' ? dataCliente.email : dataEmpresa.email} onChange={formType === 'cliente' ? handleClienteChange : handleEmpresaChange} error={!!errors.email} helperText={errors.email} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> } }} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField className="fest-field" label="Contraseña" type="password" name="password" value={formType === 'cliente' ? dataCliente.password : dataEmpresa.password} onChange={formType === 'cliente' ? handleClienteChange : handleEmpresaChange} error={!!errors.password} helperText={errors.password} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment> } }} />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth disabled={loading} sx={{ mt: 4, p: 1.5, borderRadius: 2, background: 'linear-gradient(90deg, #FF3C78 0%, #A020F0 100%)', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'none', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (formType === 'cliente' ? 'Crear Acceso' : 'Dar de Alta Empresa')}
          </Button>
          
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              ¿Ya estás registrado? <span onClick={() => navigate('/login')} style={{ color: '#FF3C78', cursor: 'pointer', fontWeight: 'bold' }}>Inicia Sesión</span>
            </Typography>
          </Box>

        </Paper>
      </Box>
    </Box>
  );
};