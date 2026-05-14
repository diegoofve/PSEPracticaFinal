/*
crear festivales (nombre festival, ubicación, aforo, descripción, fecha_ini, fecha_fin, precio por abono) --> se envia a pendiente
modificar festivales (solo 3 dias antes del festival) --> hacer para solo 3 dias antes
eliminarlos festivales?? lo mismo que cancelarlo

diferente tipo de abono para cada festival??

falta terminar de poner el eliminar festival (poner que si esta viendo/modificando un festival puedas modificarlo, si lo estas creando no)
*/

import { useState, useEffect } from 'react';
import { 
  Box, Typography, TextField, Button, CircularProgress, Alert, Grid, Paper, 
  InputAdornment, IconButton, Chip, Stack, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import FestivalIcon from '@mui/icons-material/Festival';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { api } from '../../lib/api.ts';
import './ModificarFestival.css';
import { useAuth } from '../../context/AuthContext';


export const ModificarFestival = () => {

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);//esto??

  const {user} = useAuth();
  const { id } = useParams(); // Si hay id modificamos, sino creamos.
  const navigate = useNavigate();
  const isEdit = Boolean(id); //pillas el id del fesstival a cambiar

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    aforo: 0,
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    precioAbono: 0,
    imagen: '',
    empresaId: undefined as number | undefined
  });

  const [artistas, setArtistas] = useState<string[]>([]);
  const [nuevoArtista, setNuevoArtista] = useState(''); //para meter artistas nuevos en el festival

useEffect(() => {
    if (!user || user.role !== 'EMPRESA') {
      navigate(user?.role === 'CLIENTE' ? '/festivales-list' : '/login');
    }
  }, [user, navigate]);

  if (user?.role !== 'EMPRESA') return null;

  useEffect(() => {
    if (isEdit) {
    const fetchFestival = async () => {
        try {
          const response = await api.get(``);//endpoint de donde pillamos el festival
          const data = response.data;
          setFormData({
            nombre: data.nombre,
            ubicacion: data.ubicacion,
            aforo: data.aforo,
            descripcion: data.descripcion || '',
            fechaInicio: data.fechaInicio ? data.fechaInicio.split('T')[0] : '',
            fechaFin: data.fechaFin ? data.fechaFin.split('T')[0] : '',
            precioAbono: data.precioAbono || 100000, //punish user for no price
            imagen: data.imagen || '',
            empresaId: data.empresaId
          });
          setArtistas(data.artistas || []);
        } catch (error) {
          setMessage({ type: 'error', text: 'Error al cargar los datos del festival.' });
        } finally {
          setInitialLoading(false);
        }
      };
      fetchFestival();
    }
  }, [id, isEdit]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/festivales/${id}`); //hay que ajustar el endpoint (supongo q depende del id que envies???)
      navigate('/modificar-festival'); //ir a tus festivales
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Error al eliminar el festival.' });
      setOpenDeleteModal(false);
      setDeleting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'aforo' || name === 'precioAbono' 
            ? parseFloat(value) || 0 
            : value 
    });
  };
  const addArtista = () => {
    if (nuevoArtista.trim() && !artistas.includes(nuevoArtista.trim())) {
      setArtistas([...artistas, nuevoArtista.trim()]);
      setNuevoArtista('');
    }
  };
  const removeArtista = (name: string) => {
    setArtistas(artistas.filter(a => a !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      ...formData,
      artistas: artistas.length > 0 ? artistas : undefined
    };

    try {
      if (isEdit) {
        await api.put(`/festivales/${id}`, payload);//actualizar los festivales; endpoint para hacer put??
        setMessage({ type: 'success', text: 'Festival actualizado.' });
      } else {
        await api.post('/festivales', payload);//mismo problema
        setMessage({ type: 'success', text: 'Festival creado con éxito' });
        setTimeout(() => navigate('/modificar-festival'), 1500);//ir a tus festivales cuando se ha creado/modificado uno
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Error al guardar el festival.' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#0a0a12' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
  <Box className="fest-admin-root">
      <Box className="fest-bg-glow glow-blue" />
      <Box className="fest-bg-glow glow-purple" />

      <Box sx={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 800, p: 2 }}>
        <Paper elevation={24} className="fest-admin-card">
          
          <Box className="fest-admin-header">
            <Box className="fest-icon-container">
              <FestivalIcon sx={{ color: 'white', fontSize: 30 }} />
            </Box>
            <Box>
              <Typography variant="h4"  sx={{ color: 'white', fontWeight: 'bold' }}>
                {isEdit ? 'Editar Festival' : 'Crear Festival'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Completa los datos del festival para {isEdit ? 'actualizarlo' : 'publicarlo'} en la plataforma.
              </Typography>
            </Box>
          </Box>

          {message && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <TextField className="fest-field" label="Nombre del Festival" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth required />
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <TextField className="fest-field" label="Ubicación" name="ubicacion" value={formData.ubicacion} onChange={handleChange} fullWidth required slotProps={{ input: { startAdornment: <InputAdornment position="start"><LocationOnIcon sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment> } }} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField className="fest-field" label="Aforo Máximo" name="aforo" type="number" value={formData.aforo} onChange={handleChange} fullWidth required slotProps={{ input: { startAdornment: <InputAdornment position="start"><PeopleIcon sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment> } }} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField className="fest-field" label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleChange} fullWidth multiline rows={3} slotProps={{ input: { startAdornment: <InputAdornment position="start"><DescriptionIcon sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment> } }} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField className="fest-field" label="Fecha Inicio" name="fechaInicio" type="date" value={formData.fechaInicio} onChange={handleChange} fullWidth required slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: <InputAdornment position="start"><CalendarMonthIcon sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment> } }} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField className="fest-field" label="Fecha Fin" name="fechaFin" type="date" value={formData.fechaFin} onChange={handleChange} fullWidth required slotProps={{ inputLabel: { shrink: true } }} />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField className="fest-field" label="Precio del Abono (€)" name="precioAbono" type="number" value={formData.precioAbono} onChange={handleChange} fullWidth required slotProps={{ inputLabel: { shrink: true }, input: { startAdornment: <InputAdornment position="start">€</InputAdornment> } }} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonAddIcon sx={{ fontSize: 18 }} /> Artistas
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <TextField className="fest-field" placeholder="Añadir artista:" value={nuevoArtista} onChange={(e) => setNuevoArtista(e.target.value)} fullWidth onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addArtista())} />
                  <IconButton onClick={addArtista} sx={{ bgcolor: '#A020F0', color: 'white', '&:hover': { bgcolor: '#8219c4' } }}>
                    <AddCircleIcon />
                  </IconButton>
                </Box>
                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }} >
                  {artistas.map((artista) => (
                    <Chip key={artista} label={artista} onDelete={() => removeArtista(artista)} sx={{ bgcolor: 'rgba(160, 32, 240, 0.2)', color: '#d18aff', border: '1px solid rgba(160, 32, 240, 0.4)', mb: 1 }} />
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField className="fest-field" label="URL de la imagen del cartel" name="imagen" value={formData.imagen} onChange={handleChange} fullWidth slotProps={{ input: { startAdornment: <InputAdornment position="start"><AddPhotoAlternateIcon sx={{ color: 'rgba(255,255,255,0.3)' }} /></InputAdornment> } }} />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button type="submit" fullWidth disabled={loading} className="fest-submit-btn">
                  {loading ? <CircularProgress size={24} color="inherit" /> : (isEdit ? 'Guardar Cambios' : 'Publicar Festival')}
                </Button>
                <Button fullWidth onClick={() => navigate(-1)} sx={{ mt: 1, color: 'rgba(255,255,255,0.5)', textTransform: 'none' }}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Dialog 
                open={openDeleteModal} 
                onClose={() => setOpenDeleteModal(false)}
                sx={{'& .MuiDialog-paper': { bgcolor: '#1a1a24', color: 'white', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' } }}
            >
                <DialogTitle sx={{ color: '#FF6B6B' }}>¿Estás seguro?</DialogTitle>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button onClick={() => setOpenDeleteModal(false)} sx={{ color: 'rgba(255,255,255,0.6)' }}>Cancelar</Button>
                <Button onClick={handleDelete} color="error" variant="contained" disabled={deleting} sx={{ borderRadius: 2, fontWeight: 'bold' }}>
                    {deleting ? <CircularProgress size={20} color="inherit" /> : 'Sí, eliminarlo'}
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
      </Box>
    </Box>
  );
}