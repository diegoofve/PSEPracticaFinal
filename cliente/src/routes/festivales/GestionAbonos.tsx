import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Alert } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import './GestionAbonos.css';

export const GestionAbonos = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchHistorial = useCallback(async () => {
      try {
        const response = await api.get('/cliente/abonos');
        setCompras(response.data);
      } catch (error) {
        console.error("Error al cargar el historial", error);
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    if (!user || user.rol !== 'CLIENTE') {
      navigate(user?.rol === 'EMPRESA' ? '/modificar-festival' : '/login');
      return;
    }
    fetchHistorial();
    }, [user, navigate, fetchHistorial]);
  if (user?.rol !== 'CLIENTE') return null;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: 'white' }}>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Bebas Neue', display: 'flex', alignItems: 'center', gap: 2 }}>
        <LayersIcon sx={{ color: '#A020F0' }} /> Mi historial de abonos
      </Typography>

      {message && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}

      <TableContainer component={Paper} className="fest-admin-card" sx={{ background: 'rgba(20, 20, 30, 0.8)' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Festival</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Tipo abono</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Precio</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Estado festival</TableCell>
              <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {compras.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ color: 'white', py: 4 }}>
                  No has comprado ningún abono todavía.
                </TableCell>
              </TableRow>
            ) : (
              compras.map((venta) => {
                const abonoComprado = venta.abonos?.[0];
                
                const nombreFestival = abonoComprado?.festival || 'Festival desconocido';
                const tipoAbono = abonoComprado?.nombre || 'Abono desconocido';
                
                const esCancelado = abonoComprado?.festivalActivo === false; 
                
                const yaDevuelto = venta.estado === 'DEVUELTO';

                return (
                  <TableRow key={venta.id}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{nombreFestival}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{tipoAbono}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{venta.total} €</TableCell>
                    <TableCell>
                      <Chip 
                        label={esCancelado ? "CANCELADO" : "ACTIVO"} 
                        color={esCancelado ? "error" : "success"} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {esCancelado && !yaDevuelto ? (
                        <Button 
                          variant="contained" 
                          color="warning" 
                          startIcon={<AccountBalanceWalletIcon />}
                          disabled 
                          sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                          Solicitar devolución
                        </Button>
                      ) : yaDevuelto ? (
                        <Typography variant="body2" sx={{ color: '#00C2FF', fontWeight: 'bold' }}>Reembolsado</Typography>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>Sin acciones</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};