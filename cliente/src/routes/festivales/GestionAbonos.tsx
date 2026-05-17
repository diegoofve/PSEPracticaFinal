import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Paper, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, Alert, Dialog, DialogTitle, DialogContent, IconButton, Snackbar } from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';

import { api } from '../../lib/api';
import './GestionAbonos.css';

export const GestionAbonos = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [compras, setCompras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const [qrModal, setQrModal] = useState<{ open: boolean, ticketData: string, festivalName: string }>({
    open: false,
    ticketData: '',
    festivalName: ''
  });
  

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

    const closeQrModal = () => setQrModal(prev => ({ ...prev, open: false }));

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
                
                const esCancelado = abonoComprado?.activo === false; 
                
                const yaDevuelto = venta.estado === 'DEVUELTO';

                const infoQR = JSON.stringify({
                  ventaId: venta.id,
                  cliente: user?.id,
                  festival: nombreFestival
                });

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
                        <Button 
                          variant="outlined" 
                          color="info" 
                          startIcon={<QrCode2Icon />}
                          sx={{ textTransform: 'none', fontWeight: 'bold', borderColor: '#00C2FF', color: '#00C2FF' }}
                          onClick={() => setQrModal({ open: true, ticketData: infoQR, festivalName: nombreFestival })}
                        >
                          Ver Entrada
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

       <Dialog 
        open={qrModal.open} 
        onClose={closeQrModal}
        sx={{
          '& .MuiDialog-paper': {
            background: 'rgba(20, 20, 30, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #00C2FF',
            borderRadius: 3,
            minWidth: '300px',
            textAlign: 'center'
          }
        }}
      >
        <DialogTitle sx={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Entrada Digital</Typography>
          <IconButton onClick={closeQrModal} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 4 }}>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
            {qrModal.festivalName}
          </Typography>
          
          <Box sx={{ background: 'white', p: 2, borderRadius: 2 }}>
            <QRCodeSVG value={qrModal.ticketData} size={200} level="H" />
          </Box>
          
          <Typography variant="caption" sx={{ color: '#00C2FF', mt: 3, display: 'block' }}>
            Muestra este código en el acceso
          </Typography>
        </DialogContent>
      </Dialog>   

      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setToast({ ...toast, open: false })} 
          severity={toast.severity} 
          variant="filled"
          sx={{ width: '100%', color: 'white' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>  

    </Box>
  );
};