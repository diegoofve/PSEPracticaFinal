import { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress, Grid } from '@mui/material';
import { api } from "../../lib/api";
import { FestivalCard } from "./FestivalCard";
import './FestivalesList.css';
import {useAuth} from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const FestivalesList = () => {
  const {user, loading: authLoading} = useAuth();
  const navigate = useNavigate();
  const [festivales, setFestivales] = useState([]);
  const [loadingData, setLoading] = useState(true);

    useEffect(() => {
      if (authLoading) return;
        if (!user || user.rol !== 'CLIENTE') {
          if (user?.rol === 'ADMIN') {
            navigate('/admin-panel');
          } else if (user?.rol === 'EMPRESA') {
            navigate('/modificar-festival');
          } else {
            navigate('/login');
          }
          return;
        }
        const loadFestivales = async () => {
        try {
        const response = await api.get('/festivales');
        setFestivales(response.data);
        } catch (error) {
        console.error("Error cargando festivales", error);
        } finally {
        setLoading(false);
        }
        };
        loadFestivales();
    } , [user,navigate, authLoading]);

    if (authLoading || (loadingData && user?.rol === 'CLIENTE')) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

    if (user?.rol !== 'CLIENTE') return null;

  return (
    <Box className="fest-admin-root" sx={{ py: 8 }}>
      <div className="fest-bg-glow glow-blue" />
      <div className="fest-bg-glow glow-purple" />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10 }}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 4, textAlign: 'center', fontFamily: 'Bebas Neue' }}>
          Festivales disponibles
        </Typography>

        {loadingData ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {festivales.map((f: any) => (
              <Grid size={{xs: 12}} key={f.id}>
                <FestivalCard festival={f} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};