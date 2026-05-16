/*
todos los usuarios/festivales??? xd
aceptar festivales (usuarios empresa) -> verificarlo sino, no operan
*/

import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stack, 
  Alert, 
  CircularProgress, 
  Container, 
  Divider, 
  Grid,
  Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { api } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminPanel.css';

export const AdminPanel = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [toastBanear, setToastBanear] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    const [pendientes, setPendientes] = useState<any[]>([]);
    const [listaClientes, setListaClientes] = useState<any>([]);
    const [listaEmpresas, setListaEmpresas] = useState<any>([]);

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (!user || user.rol !== 'ADMIN') {
            if (user?.rol === 'EMPRESA') {
                navigate('/modificar-festival');
            } else if (user?.rol === 'CLIENTE') {
                navigate('/festivales-list');
            } else {
                navigate('/login');
            }
        }
    }, [user, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const resStatsEmpresa = await api.get('/empresas'); 
            const empresasData = resStatsEmpresa.data || [];
            setListaEmpresas(empresasData);

            //const empresasPendientes = empresasData.filter((emp: any) => emp.estado === 'PENDIENTE');
            setPendientes(empresasData.filter((emp: any) => emp.estado === 'PENDIENTE'));
            setListaEmpresas(empresasData.filter((emp: any) => emp.estado !== 'PENDIENTE'));
            
            const resStatsCliente = await api.get('/clientes'); 
            setListaClientes(resStatsCliente.data || []);
        } catch (e) {
            console.error("Error cargando empresas pendientes:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (id: number, action: 'verificar' | 'anular') => {
        try {
            const nuevoEstado = action === 'verificar' ? 'VERIFICADA' : 'RESTRINGIDA';
            await api.put(`/admin/empresa/${id}/estado`, { estado: nuevoEstado });//endpoint para verificar la empresa
            
            setMessage({ 
                type: 'success', 
                text: `Perfil de empresa ${action === 'verificar' ? 'verificado' : 'rechazado'} correctamente.` 
            });
            
            setPendientes(prev => prev.filter(emp => emp.id !== id));
        } catch (e) {
            setMessage({ type: 'error', text: "Error al procesar la acción" });
        }
    };

    const handleBanear = async (id: number, tipo: 'cliente' | 'empresa') => {
    if (!window.confirm(`¿Quieres banear permanentemente a este ${tipo}?`)) return;
    try {
        const endpoint = tipo === 'empresa' 
        ? `/admin/empresa/${id}/banear` 
        : `/admin/cliente/${id}/banear`;
        await api.put(endpoint);
        setToastBanear({ 
                open: true, 
                message: `${tipo === 'cliente' ? 'Cliente' : 'Empresa'} baneado con éxito.`, 
                severity: 'success' 
            });
        fetchData();
    } catch (error) {
        setToastBanear({ 
                open: true, 
                message: `Error al intentar banear al ${tipo}.`, 
                severity: 'error' 
            });
        }
    };

    return (
        <Box className="fest-admin-root" sx={{ py: 8, minHeight: '100vh' }}>
            <div className="fest-bg-glow glow-blue" />
            <div className="fest-bg-glow glow-purple" />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
                <Box className="fest-admin-header" sx={{ mb: 6, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box className="fest-icon-container" sx={{ mb: 2 }}>
                        <PersonSearchIcon sx={{ color: 'white', fontSize: 40 }} />
                    </Box>
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Bebas Neue', letterSpacing: 2 }}>
                        Panel del admin
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        Gestión de usuarios y verificación de gestoras
                    </Typography>
                </Box>
                {message && (
                    <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 4, borderRadius: 2 }}>
                        {message.text}
                    </Alert>
                )}

                <Grid container spacing={3} sx={{ mb: 6, justifyContent: 'center' }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Paper className="fest-admin-card" sx={{ p: 3, textAlign: 'center', borderBottom: '4px solid #00C2FF' }}>
                            <GroupIcon sx={{ color: '#00C2FF', fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{listaClientes.length || 0}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Clientes</Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Paper className="fest-admin-card" sx={{ p: 3, textAlign: 'center', borderBottom: '4px solid #A020F0' }}>
                            <BusinessIcon sx={{ color: '#A020F0', fontSize: 40, mb: 1 }} />
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{listaEmpresas.length || 0}</Typography>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>Empresas</Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 6 }} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    <>
                        <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon sx={{ color: '#00C2FF' }} /> Solicitudes de registro
                        </Typography>

                        {pendientes.length === 0 ? (
                            <Paper className="fest-admin-card" sx={{ p: 4, textAlign: 'center', mb: 6 }}>
                                <Typography sx={{ color: 'rgba(255,255,255,0.5)' }}>No hay gestoras que tienen que esta verificadas</Typography>
                            </Paper>
                        ) : (
                            <Stack spacing={3} sx={{ mb: 6 }}>
                                {pendientes.map((empresa) => (
                                    <Paper key={empresa.id} className="fest-admin-card" sx={{ p: 3 }}>
                                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                                            <Grid size={{ xs: 12, md: 7 }}>
                                                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                    {empresa.razonSocial}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#00C2FF', mb: 1 }}>
                                                    📧 {empresa.email}
                                                </Typography>
                                                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 1.5 }} />
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                                                    CIF: {empresa.cif} | Contacto: {empresa.nombreContacto} ({empresa.telefonoContacto})
                                                </Typography>
                                            </Grid>

                                            <Grid size={{ xs: 12, md: 5 }}>
                                                <Stack spacing={2}>
                                                    <Button 
                                                        variant="contained" 
                                                        fullWidth
                                                        sx={{ background: 'linear-gradient(90deg, #00C2FF, #A020F0)', fontWeight: 'bold', textTransform: 'none' }}
                                                        startIcon={<CheckCircleIcon />}
                                                        onClick={() => handleAction(empresa.id, 'verificar')}
                                                    >
                                                        Verificar gestora
                                                    </Button>
                                                    <Button 
                                                        variant="outlined" 
                                                        color="error"
                                                        fullWidth
                                                        sx={{ textTransform: 'none', borderWidth: 2 }}
                                                        startIcon={<CancelIcon />}
                                                        onClick={() => handleAction(empresa.id, 'anular')}
                                                    >
                                                        Rechazar empresa
                                                    </Button>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                ))}
                            </Stack>
                        )}

                        <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupIcon sx={{ color: '#A020F0' }} /> Gestión de usuarios
                        </Typography>
                        <TableContainer component={Paper} className="fest-admin-card" sx={{ mb: 6, background: 'rgba(20, 20, 30, 0.8)' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Nombre</TableCell>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Email</TableCell>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>DNI</TableCell>
                                        <TableCell align="right" sx={{ color: 'rgba(255,255,255,0.6)' }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listaClientes.length === 0 ? (
                                        <TableRow><TableCell colSpan={4} align="center" sx={{ color: 'white', py: 3 }}>No hay clientes.</TableCell></TableRow>
                                    ) : (
                                        listaClientes.map((cliente: any) => (
                                            <TableRow key={cliente.id}>
                                                <TableCell sx={{ color: 'white' }}>{cliente.nombre} {cliente.apellidos}</TableCell>
                                                <TableCell sx={{ color: 'white' }}>{cliente.email}</TableCell>
                                                <TableCell sx={{ color: 'white' }}>{cliente.dni}</TableCell>
                                                <TableCell align="right">
                                                    <Button size="small" variant="contained" color="error" startIcon={<BlockIcon />} onClick={() => handleBanear(cliente.id, 'cliente')} disabled={listaEmpresas.estado === 'RESTRINGIDA'}>
                                                        Banear
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BusinessIcon sx={{ color: '#00C2FF' }} /> Gestión de gestoras
                        </Typography>
                        <TableContainer component={Paper} className="fest-admin-card" sx={{ mb: 6, background: 'rgba(20, 20, 30, 0.8)' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Razón Social</TableCell>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Email</TableCell>
                                        <TableCell sx={{ color: 'rgba(255,255,255,0.6)' }}>Estado</TableCell>
                                        <TableCell align="right" sx={{ color: 'rgba(255,255,255,0.6)' }}>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listaEmpresas.length === 0 ? (
                                        <TableRow><TableCell colSpan={4} align="center" sx={{ color: 'white', py: 3 }}>No hay gestoras.</TableCell></TableRow>
                                    ) : (
                                        listaEmpresas.map((empresa: any) => (
                                            <TableRow key={empresa.id}>
                                                <TableCell sx={{ color: 'white' }}>{empresa.razonSocial}</TableCell>
                                                <TableCell sx={{ color: 'white' }}>{empresa.email}</TableCell>
                                                <TableCell>
                                                    <Chip label={empresa.estado} color="success" size="small" variant="outlined" />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Button size="small" variant="contained" color="error" startIcon={<BlockIcon />} onClick={() => handleBanear(empresa.id, 'empresa')}>
                                                        Banear
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Container>
        </Box>
    );
};