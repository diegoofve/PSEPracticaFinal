//incluir aquí histórico abonos + solcitud de devolución por festival cancelado (esto ultimo aun no)

import { useEffect, useState } from 'react';
import { 
  Box, Typography, Paper, CircularProgress, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, Alert 
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LayersIcon from '@mui/icons-material/Layers';
import { api } from '../../lib/api';
import './GestionAbonos.css'

export const HistorialAbonos = () => {
  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchHistorial = async () => {
    try {
      const response = await api.get('/usuarios/cliente/compras');//se supone que la api tiene que ser asi porque el id lo devuelve el back
      setCompras(response.data);
    } catch (error) {
      console.error("Error al cargar el historial", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  /*
  const handleSolicitarDevolucion = async (ventaId: number) => {
    try {
      await api.post(`/payments/refund/${ventaId}`);//ruta de mentira (esta no es y se tiene que implementar)
      setMessage({ type: 'success', text: 'Solicitud de devolución enviada con éxito.' });
      fetchHistorial(); // Refrescamos para ver cambios de estado
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'No se pudo procesar la devolución.' 
      });
    }
  };*/

  if (loading) return <CircularProgress color="secondary" sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, color: 'white' }}>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Bebas Neue', display: 'flex', alignItems: 'center', gap: 2 }}>
        <LayersIcon sx={{ color: '#A020F0' }} /> Mi Historial de Abonos
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
                const festival = venta.ventasAbonos[0]?.abono?.festival;
                const esCancelado = festival?.estado === 'CANCELADO' || festival?.estado === 'ANULADO';
                const yaDevuelto = venta.estado === 'DEVUELTO';

                return (
                  <TableRow key={venta.id}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>{festival?.nombre}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{venta.ventasAbonos[0]?.abono?.tipo}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{venta.total} €</TableCell>
                    <TableCell>
                      <Chip 
                        label={festival?.estado} 
                        color={esCancelado ? "error" : "success"} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    {/* <TableCell> //aun no esta implementado el refund del festival
                      {esCancelado && !yaDevuelto ? (
                        <Button 
                          variant="contained" 
                          color="warning" 
                          startIcon={<AccountBalanceWalletIcon />}
                          onClick={() => handleSolicitarDevolucion(venta.id)}
                          sx={{ textTransform: 'none', fontWeight: 'bold' }}
                        >
                          Solicitar Devolución
                        </Button>
                      ) : yaDevuelto ? (
                        <Typography variant="body2" sx={{ color: '#00C2FF' }}>Dinero devuelto</Typography>
                      ) : (
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>Sin acciones</Typography>
                      )}
                    </TableCell>*/}
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