//ver ventas propias (beneficio generado)
//cada gestoria tiene que ver sus ventas totales + mostrar tus festivales + ingreso es solo la compra de abonos (sin contar cancelados)

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
  Container 
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FestivalIcon from '@mui/icons-material/Festival';
import { api } from '../../lib/api';
import './DatosEmpresa.css';

export const StatsVentas = () => {
  const [data, setData] = useState<{ totalGanado: number; festivales: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresaDashboard = async () => {
      try {
        const response = await api.get('/usuarios/empresa/dashboard');//esto debe dar el totalganado, festival...
        setData(response.data);
      } catch (error) {
        console.error("Error cargando el dashboard de empresa", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpresaDashboard();
  }, []);

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
          <Grid size={{xs:12, md:4}} >
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
                Beneficio Total
              </Typography>
              <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Bebas Neue' }}>
                {data?.totalGanado?.toLocaleString('es-ES')} €
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', mt: 1 }}>
                * Solo incluye abonos verificados
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{xs:12, md:8}} >
            <Box sx={{ p: 2 }}>
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Bebas Neue', mb: 1 }}>
                Panel de Gestión
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Aquí puedes ver el rendimiento de tus eventos y la lista de festivales activos bajo tu gestión.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 4 }} />

        {/* LISTADO DE FESTIVALES PROPIOS */}
        <Typography variant="h4" sx={{ color: 'white', mb: 4, fontFamily: 'Bebas Neue', display: 'flex', alignItems: 'center', gap: 2 }}>
          <FestivalIcon sx={{ color: '#A020F0' }} /> Mis Festivales
        </Typography>

        <Grid container spacing={3}>
          {data?.festivales.length === 0 ? (
            <Grid size={{xs:12}}>
              <Paper sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.05)', textAlign: 'center', borderRadius: 4 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>Aún no has creado ningún festival.</Typography>
              </Paper>
            </Grid>
          ) : (
            data?.festivales.map((fest: any) => (
              <Grid size={{xs:12 ,sm:6, md:4}}  key={fest.id}>
                <Paper 
                  className="fest-admin-card" 
                  sx={{ 
                    p: 3, 
                    height: '100%', 
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-5px)' },
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
                    {fest.nombre}
                  </Typography>
                  
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                      📍 {fest.ubicacion}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                      📅 {new Date(fest.fechaInicio).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', mb: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={fest.estado} 
                      size="small" 
                      color={fest.estado === 'VERIFICADO' ? 'success' : 'warning'}
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Typography sx={{ color: '#00C2FF', fontWeight: 'bold' }}>
                      {fest.precioAbono} €
                    </Typography>
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