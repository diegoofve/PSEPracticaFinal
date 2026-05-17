import { useState } from 'react';
import { 
  Box, Typography, Card, CardContent, CardActions, Collapse, IconButton, 
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, 
  Grid, Divider, Chip, Stack, Alert, Snackbar, CardMedia
} from '@mui/material';

import { ExpandMore as ExpandMoreIcon, Place, CalendarMonth, CreditCard, ConfirmationNumber 
} from '@mui/icons-material';

import {QRCodeSVG} from 'qrcode.react';
import { styled } from '@mui/material/styles';
import { api } from "../../lib/api";
import './FestivalCard.css'

const ExpandMore = styled((props: any) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const FestivalCard = ({ festival }: { festival: any }) => {
  const [expanded, setExpanded] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const [datosVenta, setDatosVenta] = useState<any>(null);
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedAbono, setSelectedAbono] = useState<any>(null);
  const [paymentForm, setPaymentForm] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  
  });

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); 
    
    if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    setPaymentForm({ ...paymentForm, expiryDate: value.slice(0, 5) });
  };

  const handleConfirmPayment = async () => {
    if (!paymentForm.cardHolder || !paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv) {
      setToast({ open: true, message: 'Completa todos los campos de pago.', severity: 'error' });
      return;
    }
    try {
      const payload = {
        abonoId: selectedAbono.id,
        cardHolder: paymentForm.cardHolder,
        cardNumber: btoa(paymentForm.cardNumber),
        expiryDate: btoa(paymentForm.expiryDate),
        cvv: btoa(paymentForm.cvv)
      };

      const {data} = await api.post('/payment', payload);
      setToast({ open: true, message: 'Abono comprado', severity: 'success' });
      setDatosVenta(data);
      setOpenPayment(false);
      setOpenQR(true);
      setOpenPayment(false);
    } catch (error) {
      setToast({ open: true, message: 'Error al procesar el pago.', severity: 'error' });
    }
  };

  return (
    <Card className="fest-admin-card" sx={{ mb: 3, position: 'relative', overflow: 'hidden' }}>
      


      <CardContent>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', mb: 1 }}>
          {festival.nombre}
        </Typography>
          {festival.imagen && (
          <CardMedia
          component="img"
          height="220"
          image={festival.imagen}
          alt={`Cartel de ${festival.nombre}`}
          sx={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'scale(1.05)' },
            objectFit: 'cover'
          }}
        />
      )}
        <Stack direction="row" spacing={2} sx={{ mb: 2, color: 'rgba(255,255,255,0.6)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Place fontSize="small" /> <Typography variant="body2">{festival.ubicacion}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarMonth fontSize="small" /> 
            <Typography variant="body2">
              {new Date(festival.fechaInicio).toLocaleDateString()}
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
          {festival.descripcion}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: '#00C2FF', mb: 1 }}>Line-up:</Typography>
        <Stack direction="row" spacing={1}  useFlexGap sx={{ flexWrap: 'wrap', mb: 1 }}>
          {festival.artistas?.map((art: string) => (
            <Chip key={art} label={art} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} />
          ))}
        </Stack>
      </CardContent>

      <CardActions disableSpacing>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', ml: 1 }}>
          Ver abonos disponibles
        </Typography>
        <ExpandMore expand={expanded} onClick={() => setExpanded(!expanded)}>
          <ExpandMoreIcon sx={{ color: 'white' }} />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />
          <Typography variant="h6" sx={{ color: 'white', mb: 2, fontSize: '1rem' }}>Selecciona tu abono:</Typography>
            <Grid container spacing={2}>
            {festival.abonos?.map((abono: any) => (
              <Grid size={{xs: 12}} key={abono.id}>
                <Box sx={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Box>
                    <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                      {abono.nombre} - {abono.precio}€
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                      {abono.descripcion || 'Acceso al festival'} (Stock: {abono.stock})
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    size="small"
                    startIcon={<ConfirmationNumber />}
                    disabled={abono.stock <= 0}
                    onClick={() => { setSelectedAbono(abono); setOpenPayment(true); }}
                    sx={{ background: 'linear-gradient(90deg, #FF3C78, #A020F0)', textTransform: 'none' }}
                  >
                    {abono.stock > 0 ? 'Comprar' : 'Agotado'}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Collapse>

      <Dialog open={openPayment} onClose={() => setOpenPayment(false)} 
       sx={{ '& .MuiDialog-paper': {
            p: 2, 
            maxWidth: 450,
            bgcolor: 'rgba(20, 20, 30, 0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 4,
            color: 'white'} 
        }}>
        <DialogTitle sx={{ color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
          <CreditCard sx={{ color: '#FF3C78' }} /> Detalle del pago
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
            Estás comprando: <strong> {selectedAbono?.nombre}</strong> para {festival.nombre}.
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{xs: 12}}>
              <TextField className="fest-field" label="Titular de la tarjeta" placeholder= "Pepe Viyuela" fullWidth value={paymentForm.cardHolder} onChange={(e) => setPaymentForm({...paymentForm, cardHolder: e.target.value})} />
            </Grid>
            <Grid size={{xs: 12}}>
              <TextField className="fest-field" label="Número de tarjeta" placeholder="1234 5678 9012 3456" fullWidth value={paymentForm.cardNumber} onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})} />
            </Grid>
            <Grid size={{xs: 6}}>
              <TextField className="fest-field" label="Mes/Año" placeholder="12/29" fullWidth value={paymentForm.expiryDate} onChange={handleExpiryDateChange} />
            </Grid>
            <Grid size={{xs: 6}}>
              <TextField className="fest-field" label="CVV" placeholder="123" fullWidth value={paymentForm.cvv} onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenPayment(false)} sx={{ color: 'rgba(255,255,255,0.5)' }}>Cancelar</Button>
          <Button onClick={handleConfirmPayment} variant="contained" sx={{ background: 'linear-gradient(90deg, #00C2FF, #A020F0)', fontWeight: 'bold' }}>
            Confirmar Pago
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQR} onClose={() => {setOpenQR(false); window.location.reload()}} className="fest-payment-dialog">
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#00C2FF' }}>
          ¡Entrada lista!
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
            Presenta este código en el acceso al festival.
          </Typography>

          <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, display: 'inline-block' }}>
            <QRCodeSVG 
              value={JSON.stringify({
                vId: datosVenta?.id,
                cId: datosVenta?.clienteId,
                f: festival.nombre,
                t: selectedAbono?.nombre
              })}
              size={200}
            />
          </Box>

          <Box sx={{ mt: 3, width: '100%', bgcolor: 'rgba(255,255,255,0.05)', p: 2, borderRadius: 2 }}>
            <Typography variant="body2">Abono: {selectedAbono?.nombre}</Typography>
            <Typography variant="body2">Fecha: {new Date().toLocaleDateString()}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenQR(false);window.location.reload()}} fullWidth sx={{ color: 'white' }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={toast.open} autoHideDuration={4000} onClose={() => setToast({...toast, open: false})} sx={{ zIndex: 9999 }}>
        <Alert severity={toast.severity} variant="filled">{toast.message}</Alert>
      </Snackbar>
    </Card>
      
  );
};