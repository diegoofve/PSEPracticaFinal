//modificar perfil + delete perfil de cliente

import { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert, Grid, Paper, InputAdornment,
Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { useAuth } from '../../context/AuthContext.tsx';
import { api } from '../../lib/api.ts';
import './ModificarPerfilCliente.css';

export const ModificarPerfilCliente = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();//esto q es y porque es necesario??

  const [loadingInitial, setLoadingInitial] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [userType, setUserType] = useState<'cliente' | 'empresa' | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);//esto??

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/');//endpoint para ver mis datos??
        const userData = response.data;

        if (userData.cif) {
          setUserType('empresa');
        } else {
          setUserType('cliente');
        }

        setFormData({ ...userData, password: ''});//no cargamos la contraseña(privacidad)
      } catch (error: any) {
        setMessage({ type: 'error', text: 'Error al cargar los datos del perfil.' });
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const payload = { ...formData };
      if (!payload.password) {
        delete payload.password;
      }
      
      const endpointUpdate = userType === 'cliente' ? '/updatecliente' : '/updateempresa';

      await api.put(endpointUpdate, payload);//la dirección de la api esta bien?
      setMessage({ type: 'success', text: 'Perfil actualizado.' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error al actualizar el perfil' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const endpointDelete = userType === 'cliente' ? '/deletecliente' : '/deleteempresa';
      await api.delete(endpointDelete); //hay que ajustar el endpoint
      //logout();
      navigate('/login');
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Error al eliminar la cuenta.' });
      setOpenDeleteModal(false);
      setDeleting(false);
    }
  };

  if (loadingInitial) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0a0a12' }}>
        <CircularProgress sx={{ color: '#FF3C78' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6, bgcolor: '#0a0a12', position: 'relative', overflow: 'hidden', p: 2 }}>
    <Box sx={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, bgcolor: 'rgba(255, 60, 120, 0.25)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />
    <Box sx={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 500, height: 500, bgcolor: 'rgba(160, 32, 240, 0.2)', borderRadius: '50%', filter: 'blur(120px)', zIndex: 0 }} />

    <Box sx={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 600 }}>
        
        <Paper elevation={24} component="form" onSubmit={handleUpdate} sx={{ bgcolor: 'rgba(20, 20, 30, 0.65)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 4, p: { xs: 3, md: 5 } }}>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, pb: 2, borderBottom: '1px dashed rgba(255, 255, 255, 0.15)' }}>
            <Box sx={{ background: 'linear-gradient(135deg, #FF3C78, #A020F0)', borderRadius: 2, width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PersonIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h4" component="h1"  sx={{ color: 'white' , fontWeight:"bold"}}>
                Mi Perfil
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                {userType === 'cliente' ? 'Datos del cliente' : 'Datos de Promotor'}
              </Typography>
            </Box>
          </Box>

          {message && (
            <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>
          )}

          <Grid container spacing={2.5}>
            {userType === 'cliente' && (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Nombre" name="nombre" value={formData.nombre || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Apellidos" name="apellidos" value={formData.apellidos || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="DNI" name="dni" value={formData.dni || ''} onChange={handleChange} fullWidth disabled slotProps={{ input: { startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment> } }} helperText="El DNI no se puede modificar" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Teléfono" name="telefono" value={formData.telefono || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> } }} />
                </Grid>
              </>
            )}

            {userType === 'empresa' && (
              <>
                <Grid size={{ xs: 12 }}>
                  <TextField className="fest-field" label="Razón Social" name="razon" value={formData.razon || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><BusinessIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="CIF" name="cif" value={formData.cif || ''} onChange={handleChange} fullWidth disabled slotProps={{ input: { startAdornment: <InputAdornment position="start"><BadgeIcon /></InputAdornment> } }} helperText="El CIF no se puede modificar" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField className="fest-field" label="Teléfono" name="telefono" value={formData.telefono || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PhoneIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField className="fest-field" label="Domicilio Fiscal" name="domicilio" value={formData.domicilio || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment> } }} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField className="fest-field" label="Nombre Contacto" name="nombreContacto" value={formData.nombreContacto || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> } }} />
                </Grid>
              </>
            )}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField className="fest-field" label="Email" type="email" name="email" value={formData.email || ''} onChange={handleChange} fullWidth disabled slotProps={{ input: { startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> } }} helperText="El email no se puede cambiar" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField className="fest-field" label="Nueva Contraseña" type="password" name="password" value={formData.password || ''} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockIcon /></InputAdornment> } }}/>
            </Grid>
          </Grid>

          <Button type="submit" fullWidth disabled={saving} sx={{ mt: 4, p: 1.5, borderRadius: 2, background: 'linear-gradient(90deg, #FF3C78 0%, #A020F0 100%)', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', textTransform: 'none', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
            {saving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Guardar cambios'}
          </Button>
        </Paper>

        <Box sx={{ mt: 4, p: 3, border: '1px solid rgba(255, 60, 60, 0.3)', borderRadius: 4, bgcolor: 'rgba(255, 60, 60, 0.05)', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#FF6B6B', mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <WarningAmberIcon /> Eliminar la cuenta.
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
            Una vez que elimines tu cuenta no podrás volver a iniciar sesión.
          </Typography>
          <Button variant="outlined" color="error" onClick={() => setOpenDeleteModal(true)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold', borderColor: 'rgba(255, 60, 60, 0.5)', '&:hover': { bgcolor: 'rgba(255, 60, 60, 0.1)' } }}>
            Eliminar mi cuenta definitivamente
          </Button>
        </Box>

      </Box>

      <Dialog 
        open={openDeleteModal} 
        onClose={() => setOpenDeleteModal(false)}
        sx={{'& .MuiDialog-paper': { bgcolor: '#1a1a24', color: 'white', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' } }}
      >
        <DialogTitle sx={{ color: '#FF6B6B' }}>¿Estás seguro?</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Esta acción eliminará permanentemente tu cuenta y te inhabilitara de poder iniciar sesión más veces.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={() => setOpenDeleteModal(false)} sx={{ color: 'rgba(255,255,255,0.6)' }}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting} sx={{ borderRadius: 2, fontWeight: 'bold' }}>
            {deleting ? <CircularProgress size={20} color="inherit" /> : 'Sí, eliminarla'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};