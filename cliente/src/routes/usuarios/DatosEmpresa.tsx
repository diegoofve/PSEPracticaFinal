//ver ventas propias (beneficio generado)
//cada gestoria tiene que ver sus ventas totales + mostrar tus festivales + ingreso es solo la compra de abonos (sin contar cancelados)


import { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { api } from '../../lib/api';

export const StatsVentas = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/');//endpoint que devuelve todas las cuentas de una empresa
        setTotal(data.totalGanado);
      } catch (error) {
        console.error("Error cargando ventas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <Paper 
      className="fest-admin-card" 
      sx={{ 
        p: 3, 
        textAlign: 'center', 
        background: 'rgba(20, 20, 30, 0.8)',
        border: '1px solid rgba(0, 194, 255, 0.3)',
        borderRadius: 4
      }}
    >
      <TrendingUpIcon sx={{ color: '#00C2FF', fontSize: 40, mb: 1 }} />
      <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
        Total Recaudado
      </Typography>
      
      {loading ? (
        <CircularProgress size={30} color="secondary" />
      ) : (
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Bebas Neue' }}>
          {total?.toLocaleString('es-ES')} €
        </Typography>
      )}
    </Paper>
  );
};