import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress, 
  Grid, 
  Divider, 
  Stack, 
  Chip,
  Container,
  Button // ✅ Añadido el import de Button que faltaba
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FestivalIcon from '@mui/icons-material/Festival';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './DatosEmpresa.css';

const precioMinimo = (abonos: any[]): number => abonos.length === 0 ? 0 : Math.min(...abonos.map(a => Number(a.precio) || 0));

export const DatosEmpresa = () => {
  const [data, setData] = useState<{ totalGanado: number; festivales: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.rol !== 'EMPRESA') {
      if (user?.rol === 'ADMIN') {
        navigate('/AdminPanel');
      } else if (user?.rol === 'CLIENTE') {
        navigate('/festivales');
      } else {
        navigate('/login');
      }
      return;
    }

    const fetchEmpresaDashboard = async () => {
      try {
        const [resVentas, resFestivales] = await Promise.all([
          api.get('/empresa/ventas'),
          api.get('/festivales/empresa')
        ]);

        const ventasMapeadas = resVentas.data || [];
        const festivalesPropios = resFestivales.data || [];

        const beneficioCalculado = ventasMapeadas.reduce(
          (suma: number, v: any) => suma + (Number(v.total) || 0), 
          0
        );

        setData({
          totalGanado: beneficioCalculado,
          festivales: festivalesPropios
        });
      } catch (error) {
        console.error("Error cargando el dashboard de empresa", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresaDashboard();
  }, [user, navigate]);

  if (user?.rol !== 'EMPRESA') return null;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#0a0a12' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box className="fest-admin-root" sx={{ py: 8, minHeight: '100vh' }}>
      <div className="fest-bg-glow glow-blue" />
      <div className="fest-bg-glow glow-purple" />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 4 }} >
            <Paper 
              className="fest-admin-card" 
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                borderBottom: '4px solid #00C2FF',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <TrendingUpIcon sx={{ color: '#00C2FF', fontSize: 50, mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1 }}>
                Beneficio
              </Typography>
              <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Bebas Neue' }}>
                {data?.totalGanado?.toLocaleString('es-ES')} €
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mt: 1 }}>
                Solo abonos verificados
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }} >
            <Box sx={{ p: 2 }}>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Bebas Neue', mb: 1 }}>
                Panel de gestión
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />

        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontFamily: 'Bebas Neue', display: 'flex', alignItems: 'center', gap: 2 }}>
          <FestivalIcon sx={{ color: '#A020F0' }} /> Mis Festivales
        </Typography>

        <Grid container spacing={3}>
          {data?.festivales?.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.05)', textAlign: 'center', borderRadius: 4 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Aún no has creado ningún festival.</Typography>
              </Paper>
            </Grid>
          ) : (
            data?.festivales?.map((fest: any) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={fest.id}>
                <Paper 
                  className="fest-admin-card" 
                  sx={{ 
                    p: 3, 
                    height: '100%', 
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-5px)' },
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                      {fest.nombre}
                    </Typography>
                    
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        {fest.ubicacion}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        {new Date(fest.fechaInicio).toLocaleDateString()}
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip 
                        label={fest.activo ? 'ACTIVO' : 'CANCELADO'} 
                        size="small" 
                        color={fest.activo ? 'success' : 'error'}
                        sx={{ fontWeight: 'bold' }}
                      />
                      <Typography sx={{ color: '#00C2FF', fontWeight: 'bold' }}>
                        {fest.abonos && fest.abonos.length > 0 
                          ? `Desde ${precioMinimo(fest.abonos)} €` 
                          : `${Number(fest.precioAbono || 0)} €`
                        }
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', textTransform: 'none' }}
                      onClick={() => navigate(`/modificar-festival/${fest.id}`)}
                    >
                      Gestionar festival
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};